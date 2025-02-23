# Voice-to-action
Smart Voice Assistant

Overview

Smart Voice Assistant is a web-based tool that converts speech into actionable tasks and events. It simplifies note-taking and task management by transcribing speech, extracting key actions, and organizing them into a structured format.

Features

Real-time Speech Transcription: Uses Web Speech API to convert spoken words into text.

Automatic Task & Event Extraction: Identifies key action points like reminders, meetings, and follow-ups.

To-Do List Integration (Upcoming): Extracted tasks will be structured into a to-do list for better task tracking.

Seamless Data Storage: Stores transcriptions, tasks, and events using LocalStorage for easy navigation across pages.

User-Friendly Interface: Simple and efficient UI to manage tasks and events.

Technologies Used

Frontend: HTML, CSS, JavaScript

Speech Recognition: Web Speech API

Data Storage: LocalStorage

Backend (Upcoming): Node.js for advanced data handling

Installation & Setup

Clone this repository:

git clone https://github.com/your-username/smart-voice-assistant.git

Navigate to the project folder:

cd smart-voice-assistant

Open index.html in a browser to start using the application.

How It Works

Click Start Recording to begin voice transcription.

Speak naturally; the system will transcribe and display the text in real-time.

The extracted actions (tasks & events) will be automatically identified.

Click Proceed to navigate to the next page and manage extracted tasks/events.

The extracted actions will be stored and displayed under "Manage Tasks & Events."

Challenges Faced & Solutions

Task & Event Extraction Issues: Improved the pattern-matching logic in JavaScript.

Proceed Button Not Functioning: Ensured transcription data loads properly before enabling navigation.

Inconsistent Transcription Updates: Adjusted Speech API settings for smoother text capturing.

Auto-Adding Tasks to To-Do List: Work in progress to ensure seamless automatic updates.

Role of AI Tools

To speed up development within a limited timeframe, AI tools were used for debugging, optimizing JavaScript logic, and refining NLP-based extraction patterns.

Future Enhancements

Improve the task and event extraction accuracy using AI-based NLP models.

Implement a backend using Node.js and a database for persistent storage.

Enhance the UI for a better user experience.

Contributing

Contributions are welcome! Feel free to fork the repository and submit pull requests.

License

This project is open-source and available under the MIT License.
