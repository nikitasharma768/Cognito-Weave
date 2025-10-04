import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:speech_to_text/speech_to_text.dart';
import 'package:flutter_tts/flutter_tts.dart';
import 'package:flutter_vibrate/flutter_vibrate.dart';
import 'package:audioplayers/audioplayers.dart'; // NEW: For acoustic pulse
import 'dart:convert';
import 'dart:async';

// --- CONFIGURATION ---
// IMPORTANT: Use your actual Flask API URL (e.g., http://10.0.2.2:5000/augment_prompt)
const String FLASK_API_URL = 'http://10.0.2.2:5000/augment_prompt'; 
const Duration HAPTIC_TIMEOUT = Duration(seconds: 7); // Longer timeout for cognitive tasks

class StoryScreen extends StatefulWidget {
  @override
  _StoryScreenState createState() => _StoryScreenState();
}

class _StoryScreenState extends State<StoryScreen> {
  // Initialization of Augmentation Tools
  final SpeechToText _speech = SpeechToText();
  final FlutterTts _tts = FlutterTts();
  final AudioPlayer _audioPlayer = AudioPlayer(); // NEW: Audio player for ULF cue

  String _prompt = "Tap to begin! Tell me a favorite memory from your past.";
  String _transcribedText = "";
  bool _isListening = false;
  Timer? _attentionTimer;
  int _hapticTriggerCount = 0;

  @override
  void initState() {
    super.initState();
    _initSpeechAndTTS();
  }
  
  // Clean up resources on disposal
  @override
  void dispose() {
    _attentionTimer?.cancel();
    _audioPlayer.dispose();
    super.dispose();
  }

  // --- AUGMENTATION CORE: TtS, StT, Haptics, Acoustics ---

  void _initSpeechAndTTS() async {
    await _speech.initialize();
    await _tts.setLanguage("en-US");
    _speak(_prompt); 
    _startAttentionTimer();
  }

  void _speak(String text) async {
    await _tts.stop();
    await _tts.speak(text);
  }

  void _startAttentionTimer() {
    // Timer fires if no activity is detected (not speaking, not interacting)
    _attentionTimer?.cancel();
    _attentionTimer = Timer.periodic(HAPTIC_TIMEOUT, (timer) {
      if (!_isListening) { // Only check attention if we aren't actively listening
        _triggerNeuroAcousticAlert();
      }
    });
  }

  void _stopAttentionTimer() {
    _attentionTimer?.cancel();
  }
  
  // NEW: Triggers both Haptic and Acoustic feedback
  void _triggerNeuroAcousticAlert() async {
    // 1. ACOUSTIC CUE: Play a low-frequency pulse (Requires 'assets/ulf_tone.mp3')
    await _audioPlayer.play(AssetSource('ulf_tone.mp3'), volume: 0.5); 
    
    // 2. HAPTIC CUE: Subtle vibration pulse
    if (await Vibrate.canVibrate) {
      Vibrate.feedback(FeedbackType.light); 
    }
    
    // 3. AUGMENTATION TRACKING: Log the event
    _hapticTriggerCount++;
    print("Attention alert triggered. Count: $_hapticTriggerCount");
  }

  // --- MEMORY SCAFFOLDING & API ---

  // User taps the button to start speaking
  void _startListening() async {
    if (_speech.isAvailable && !_isListening) {
      setState(() { _isListening = true; _transcribedText = ''; });
      _stopAttentionTimer(); // Stop attention check while patient is actively talking
      
      await _speech.listen(
        onResult: (result) {
          setState(() { _transcribedText = result.recognizedWords; });
          if (result.finalResult) { _stopListening(); }
        },
        listenFor: Duration(seconds: 15), 
      );
    }
  }

  // User taps the button to finish speaking or 15s timeout
  void _stopListening() async {
    if (_isListening) {
      await _speech.stop();
      setState(() { _isListening = false; });
      
      if (_transcribedText.isNotEmpty) {
        await _fetchAugmentedPrompt(_transcribedText);
      } else {
        _startAttentionTimer(); // Restart timer if no text was captured
      }
    }
  }

  // Sends patient response to the Flask API for rule-based scaffolding
  Future<void> _fetchAugmentedPrompt(String userResponse) async {
    // NOTE: You would log the session data (including _hapticTriggerCount)
    // to your Supabase/Firebase DB here before resetting the count.
    
    try {
      final response = await http.post(
        Uri.parse(FLASK_API_URL),
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode({'user_response': userResponse}),
      );

      if (response.statusCode == 200) {
        final data = jsonDecode(response.body);
        final newPrompt = data['prompt'];
        
        setState(() {
          _prompt = newPrompt;
          _transcribedText = '';
          _hapticTriggerCount = 0; // Reset counter for the next task cycle
        });
        _speak(newPrompt);
        _startAttentionTimer(); // Restart timer for the new memory prompt
      } else {
        // Handle API error
      }
    } catch (e) {
      // Handle network error
    }
  }
  
  // Function for the GestureDetector to manually reset the attention timer
  void _resetAttentionTimer() {
      if (!_isListening) { // Don't reset if the mic is already open
          _startAttentionTimer(); 
          print("Manual interaction detected. Timer reset.");
      }
  }

  // --- ELDERLY-FIRST UI (Render) ---

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.yellow[50], 
      appBar: AppBar(
        title: Text('Cognito-Weave', style: TextStyle(fontSize: 28, color: Colors.black)),
        backgroundColor: Colors.yellow,
      ),
      // Use GestureDetector to reset the attention timer on any screen tap
      body: GestureDetector(
        onTap: _resetAttentionTimer,
        child: Center(
          child: Padding(
            padding: const EdgeInsets.all(32.0),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: <Widget>[
                Text(
                  _prompt,
                  textAlign: TextAlign.center,
                  style: TextStyle(
                    fontSize: 36, 
                    fontWeight: FontWeight.bold,
                    color: Colors.black87,
                  ),
                ),
                SizedBox(height: 40),
                Text(
                  _transcribedText.isEmpty 
                    ? (_isListening ? 'Listening...' : 'Tap to speak.') 
                    : 'You said: "${_transcribedText}"',
                  textAlign: TextAlign.center,
                  style: TextStyle(fontSize: 28, color: Colors.black54),
                ),
                SizedBox(height: 60),
                FloatingActionButton.large( 
                  onPressed: _isListening ? _stopListening : _startListening,
                  backgroundColor: _isListening ? Colors.red : Colors.green,
                  child: Icon(
                    _isListening ? Icons.mic_off : Icons.mic,
                    size: 60,
                    color: Colors.white,
                  ),
                ),
                SizedBox(height: 20),
                Text(
                  _isListening ? "Tap to Finish" : "Tap to Talk",
                  style: TextStyle(fontSize: 24, fontWeight: FontWeight.w600),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
