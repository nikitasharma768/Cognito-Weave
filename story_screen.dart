import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:speech_to_text/speech_to_text.dart';
import 'package:flutter_tts/flutter_tts.dart';
import 'package:flutter_vibrate/flutter_vibrate.dart';
import 'dart:convert';
import 'dart:async';

// --- CONFIGURATION ---
const String FLASK_API_URL = 'http://10.0.2.2:5000/augment_prompt'; // Use 10.0.2.2 for Android emulator
const Duration HAPTIC_TIMEOUT = Duration(seconds: 5);

class StoryScreen extends StatefulWidget {
  @override
  _StoryScreenState createState() => _StoryScreenState();
}

class _StoryScreenState extends State<StoryScreen> {
  final SpeechToText _speech = SpeechToText();
  final FlutterTts _tts = FlutterTts();
  String _prompt = "Hello! Tap the microphone and tell me a favorite memory.";
  String _transcribedText = "";
  bool _isListening = false;
  Timer? _hapticTimer;

  @override
  void initState() {
    super.initState();
    _initSpeechAndTTS();
  }

  // --- AUGMENTATION CORE: TtS, StT, Haptics ---

  void _initSpeechAndTTS() async {
    await _speech.initialize(onStatus: (status) {
      if (status == 'listening') {
        _stopHapticTimer();
      }
    });
    await _tts.setLanguage("en-US");
    _speak(_prompt); // Initial spoken prompt
  }

  void _speak(String text) async {
    await _tts.stop();
    await _tts.speak(text);
  }

  void _startHapticTimer() {
    // 1. AUGMENTATION: Start timer to track attention loss
    _hapticTimer?.cancel();
    _hapticTimer = Timer.periodic(HAPTIC_TIMEOUT, (timer) {
      if (!_isListening) {
        _triggerHapticFeedback();
        // NOTE: In a real app, you would log this trigger event to the DB here.
      }
    });
  }

  void _stopHapticTimer() {
    _hapticTimer?.cancel();
  }

  void _triggerHapticFeedback() async {
    // 2. AUGMENTATION: Subtle cue to regain focus
    if (await Vibrate.canVibrate) {
      // Use the lightest vibration for a gentle cue
      Vibrate.feedback(FeedbackType.light); 
      print("Haptic feedback triggered.");
    }
  }

  // --- API AND MEMORY SCAFFOLDING ---

  void _startListening() async {
    if (_speech.isAvailable && !_isListening) {
      setState(() {
        _isListening = true;
        _transcribedText = '';
      });
      _stopHapticTimer();
      await _speech.listen(
        onResult: (result) {
          setState(() {
            _transcribedText = result.recognizedWords;
          });
          if (result.finalResult) {
            _stopListening();
          }
        },
        listenFor: Duration(seconds: 15), // Max 15 seconds recording
      );
    }
  }

  void _stopListening() async {
    if (_isListening) {
      await _speech.stop();
      setState(() {
        _isListening = false;
      });
      if (_transcribedText.isNotEmpty) {
        // 3. Send final transcription to Flask API for scaffolding
        await _fetchAugmentedPrompt(_transcribedText);
      }
    }
  }

  Future<void> _fetchAugmentedPrompt(String userResponse) async {
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
        });
        _speak(newPrompt);
        _startHapticTimer(); // Restart the timer after the new prompt
      } else {
        _handleError("API failed with status: ${response.statusCode}");
      }
    } catch (e) {
      _handleError("Network or server error: $e");
    }
  }

  void _handleError(String message) {
    final errorPrompt = "I'm sorry, I ran into an error. Please try again.";
    setState(() {
      _prompt = errorPrompt;
    });
    _speak(errorPrompt);
    _startHapticTimer();
    print(message);
  }

  // --- ELDERLY-FIRST UI (Render) ---

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.yellow[50], // Light background for contrast
      appBar: AppBar(
        title: Text('Cognito-Weave', style: TextStyle(fontSize: 28, color: Colors.black)),
        backgroundColor: Colors.yellow,
      ),
      body: Center(
        child: Padding(
          padding: const EdgeInsets.all(32.0),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: <Widget>[
              // Main Prompt (Large, High-Contrast)
              Text(
                _prompt,
                textAlign: TextAlign.center,
                style: TextStyle(
                  fontSize: 36, // Large Font
                  fontWeight: FontWeight.bold,
                  color: Colors.black87,
                ),
              ),
              SizedBox(height: 40),
              // Display Transcribed Text
              Text(
                _transcribedText.isEmpty 
                  ? (_isListening ? 'Listening...' : 'Tap the microphone to speak.') 
                  : 'You said: "${_transcribedText}"',
                textAlign: TextAlign.center,
                style: TextStyle(
                  fontSize: 28,
                  color: Colors.black54,
                ),
              ),
              SizedBox(height: 60),
              // Large Microphone Button (Easy Target)
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
    );
  }
}