const actionList = document.getElementById("actionList");
const analyzeButton = document.getElementById("analyze");
const nextButton = document.getElementById("next");

// Simulate action extraction
analyzeButton.addEventListener("click", () => {
    actionList.innerHTML = "";
    const actions = [
        "Schedule a meeting on Monday at 10 AM",
        "Follow up with the client about the proposal",
        "Prepare slides for the presentation"
    ];
    
    actions.forEach(action => {
        const li = document.createElement("li");
        li.textContent = action;
        actionList.appendChild(li);
    });
    
    nextButton.disabled = false;
});

// Proceed to task & event management
nextButton.addEventListener("click", () => {
    window.location.href = "tasks.html";
});
