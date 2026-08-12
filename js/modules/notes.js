// =========================
// Notes / Activity Log Module
// =========================

export function renderNotes() {

    const notesContainer = document.getElementById("notesContainer");

    if (!notesContainer) return;

    notesContainer.innerHTML = `

        <div class="notes-section">

            <h2>Notes / Activity Log</h2>

            <p>Add notes and view activity history for your contacts.</p>

            <div class="note-form">

                <textarea
                    id="noteText"
                    placeholder="Write a note..."
                    rows="4"></textarea>

                <button id="addNoteBtn">
                    Add Note
                </button>

            </div>

            <div id="notesTimeline" class="notes-timeline">

                <p class="empty-note">
                    No notes available.
                </p>

            </div>

        </div>

    `;

    // =========================
    // Button Elements
    // =========================

    const addNoteBtn = document.getElementById("addNoteBtn");
    const noteText = document.getElementById("noteText");
    const notesTimeline = document.getElementById("notesTimeline");

    // =========================
    // Add Note
    // =========================

    addNoteBtn.addEventListener("click", function () {

        const text = noteText.value.trim();

        if (text === "") {
            alert("Please enter a note.");
            return;
        }

        // Remove empty message
        const emptyNote = notesTimeline.querySelector(".empty-note");

        if (emptyNote) {
            emptyNote.remove();
        }

        // Current date & time
        const now = new Date();

        const noteCard = document.createElement("div");
        noteCard.className = "note-card";

        noteCard.innerHTML = `
            <div class="note-date">
                ${now.toLocaleString()}
            </div>

            <div class="note-text">
                ${text}
            </div>
        `;

        // Add newest note at top
        notesTimeline.prepend(noteCard);

        // Clear textarea
        noteText.value = "";

    });

}