const taskList = document.getElementById("taskList");
const addTaskButton = document.getElementById("addTask");
const addEventButton = document.getElementById("addEvent");
const saveButton = document.getElementById("save");
const nextButton = document.getElementById("next");

// Function to add a new task
addTaskButton.addEventListener("click", () => {
    const task = prompt("Enter a new task:");
    if (task) {
        const li = document.createElement("li");
        li.textContent = task;
        taskList.appendChild(li);
    }
});

// Function to add a new event
addEventButton.addEventListener("click", () => {
    const event = prompt("Enter event details:");
    if (event) {
        const li = document.createElement("li");
        li.textContent = event;
        taskList.appendChild(li);
    }
});

// Save tasks and events
saveButton.addEventListener("click", () => {
    alert("Tasks and events saved successfully!");
});

// Proceed to settings
nextButton.addEventListener("click", () => {
    window.location.href = "settings.html";
});
