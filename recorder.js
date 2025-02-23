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
        
        // Store transcription in localStorage for use on actions.html
        localStorage.setItem("transcription", transcript.trim());
        
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

// Function to extract tasks and events dynamically with better NLP
function extractActions(transcript) {
    const tasks = [];
    const events = [];
    
    const taskPatterns = [
        /follow up with (.*?) about (.*?)/i,
        /prepare (.*?) for (.*?)/i,
        /remind me to (.*?)/i,
        /check on (.*?)/i,
        /complete (.*?)/i
    ];
    
    const eventPatterns = [
        /(schedule|plan) (a|an)? ?(.*?) (on|for)? (.*?) (morning|afternoon|evening)?/i,
        /(meeting|conference call|appointment) (on|for)? (.*?) (morning|afternoon|evening)?/i
    ];
    
    transcript.split(".").forEach(sentence => {
        sentence = sentence.trim();
        
        for (let pattern of taskPatterns) {
            let match = sentence.match(pattern);
            if (match) {
                tasks.push(sentence.charAt(0).toUpperCase() + sentence.slice(1));
                break;
            }
        }
        
        for (let pattern of eventPatterns) {
            let match = sentence.match(pattern);
            if (match) {
                events.push(sentence.charAt(0).toUpperCase() + sentence.slice(1));
                break;
            }
        }
    });
    
    displayActions(tasks, events);
    

    console.log("Extracted Tasks:", tasks);
    console.log("Extracted Events:", events);
    
    // Store in localStorage
    localStorage.setItem("tasks", JSON.stringify(tasks));
    localStorage.setItem("events", JSON.stringify(events));
}

// Function to display tasks and events dynamically
function displayActions(tasks, events) {
    tasksContainer.innerHTML = "<h3>Tasks</h3>" + (tasks.length ? tasks.map(task => `<p>${task}</p>`).join("") : "<p>No tasks found.</p>");
    eventsContainer.innerHTML = "<h3>Events</h3>" + (events.length ? events.map(event => `<p>${event}</p>`).join("") : "<p>No events found.</p>");
}
// ✅ Auto-update Add Task page
function updateTaskPage(tasks) {
    if (window.location.pathname.includes("add_task.html")) {
        const taskList = document.getElementById("taskList");
        if (taskList) {
            taskList.innerHTML = tasks.length ? tasks.map(task => `<li>${task}</li>`).join("") : "<li>No tasks added.</li>";
        }
    }
}
// ✅ Auto-update Add Event page
function updateEventPage(events) {
    if (window.location.pathname.includes("add_event.html")) {
        const eventList = document.getElementById("eventList");
        if (eventList) {
            eventList.innerHTML = events.length ? events.map(event => `<li>${event}</li>`).join("") : "<li>No events added.</li>";
        }
    }
}

// Load extracted actions on actions.html
if (window.location.pathname.includes("actions.html")) {
    const storedTranscript = localStorage.getItem("transcription") || "No transcription available.";
    document.getElementById("transcribedText").innerText = storedTranscript;
    
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const storedEvents = JSON.parse(localStorage.getItem("events")) || [];
    displayActions(storedTasks, storedEvents);
} 
