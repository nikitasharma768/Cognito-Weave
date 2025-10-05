## Cognito-Weave

Cognito-Weave is a project designed to support people with memory and attention challenges, such as the elderly or visually impaired. The goal is to restore independence and improve daily life through technology-assisted memory support.

---

## Features
- Memory prompts and cognitive training exercises  
- Tracks user responses and progress over time  
- Acoustic and haptic feedback for better focus  
- Caregiver suggestions and review tools  
- Multi-language support for accessibility  

---

## Tech Stack
- *Frontend:* Flutter / Dart (mobile app)  
- *Backend:* Python (Flask server and APIs)  
- *Storage:* Local and cloud storage for progress and responses  
- *Environment:* .env file for local secrets, .env.example for setup guide  

---

## Getting Started

1. git clone https://github.com/nikitasharma768/Cognito-Weave.git
cd Cognito-Weave
2. Backend Setup
Copy code
cd server
pip install -r requirements.txt
3. Configure Environment
Copy .env.example to .env and update values as needed:
Copy code
cp .env.example .env
4. Run Backend
Copy code
python app.py
5. Run Frontend
Navigate to the web/ folder and run the Flutter app:
Copy code
flutter run
Why It Matters
Cognitive decline and memory loss reduce independence. Cognito-Weave provides a way to deliver reminders, exercises, and supportive feedback while enabling caregivers to stay engaged and helpful.
