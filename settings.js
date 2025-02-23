let recognition;
let isRecording = false;

const startButton = document.getElementById("startRecording");
const stopButton = document.getElementById("stopRecording");
const transcribedText = document.getElementById("transcribedText");
const proceedButton = document.getElementById("proceed");
const tasksContainer = document.getElementById("tasksContainer");
const eventsContainer = document.getElementById("eventsContainer");

// Disable proceed button initially
proceedButton.disabled = true;

// Check for SpeechRecognition API
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if (window.SpeechRecognition) {
    recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    recognition.onresult = (event) => {
        let transcript = "";
        for (let i = 0; i < event.results.length; i++) {
            transcript += event.results[i][0].transcript + " ";
        }
        transcribedText.innerText = transcript.trim();
        
        // Extract tasks and events automatically
        extractActions(transcript);

        // Enable Proceed button once transcription is available
        if (transcribedText.innerText.trim() !== "") {
            proceedButton.disabled = false;
        }
    };

    recognition.onerror = (event) => {
        console.error("Speech Recognition Error: ", event.error);
    };
}

startButton.addEventListener("click", () => {
    if (recognition && !isRecording) {
        recognition.start();
        isRecording = true;
        transcribedText.innerText = "Listening...";
        startButton.disabled = true;
        stopButton.disabled = false;
    }
});

stopButton.addEventListener("click", () => {
    if (recognition && isRecording) {
        recognition.stop();
        isRecording = false;
        startButton.disabled = false;
        stopButton.disabled = true;
    }
});

// Proceed to next page
proceedButton.addEventListener("click", () => {
    if (!proceedButton.disabled) {
        window.location.href = "actions.html";
    }
});

// Function to extract tasks and events
function extractActions(transcript) {
    const tasks = [];
    const events = [];
    
    const taskKeywords = ["to-do", "task", "remind me to", "follow up on", "check on"];
    const eventKeywords = ["meeting", "schedule", "appointment", "call with", "event"];
    
    transcript.split(".").forEach(sentence => {
        if (taskKeywords.some(keyword => sentence.includes(keyword))) {
            tasks.push(sentence.trim());
        } else if (eventKeywords.some(keyword => sentence.includes(keyword))) {
            events.push(sentence.trim());
        }
    });
    
    displayActions(tasks, events);
}

// Function to display tasks and events
function displayActions(tasks, events) {
    tasksContainer.innerHTML = "<h3>Tasks</h3>" + tasks.map(task => `<p>${task}</p>`).join("");
    eventsContainer.innerHTML = "<h3>Events</h3>" + events.map(event => `<p>${event}</p>`).join("");
}
