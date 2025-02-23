const transcriptionText = document.getElementById("transcriptionText");
const editButton = document.getElementById("edit");
const saveButton = document.getElementById("save");
const nextButton = document.getElementById("next");

// Enable editing
editButton.addEventListener("click", () => {
    transcriptionText.removeAttribute("readonly");
    transcriptionText.focus();
});

// Save edited transcription
saveButton.addEventListener("click", () => {
    transcriptionText.setAttribute("readonly", true);
    alert("Transcription saved successfully!");
});

// Proceed to action extraction
nextButton.addEventListener("click", () => {
    window.location.href = "actions.html";
});
