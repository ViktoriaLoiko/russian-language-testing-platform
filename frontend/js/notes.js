// Current user
const currentUser =
    JSON.parse(localStorage.getItem("user"));

if (!currentUser) {

    window.location.href =
        "/pages/login.html";
}

// Elements
const notesGrid =
    document.getElementById("notesGrid");

const noteModal =
    document.getElementById("noteModal");

const openNoteModal =
    document.getElementById("openNoteModal");

const noteClose =
    document.getElementById("noteClose");

const saveNoteButton =
    document.getElementById("saveNoteButton");

const noteTitle =
    document.getElementById("noteTitle");

const noteText =
    document.getElementById("noteText");

const noteMessage =
    document.getElementById("noteMessage");

// Open modal
openNoteModal.addEventListener("click", () => {

    noteModal.style.display = "block";
});

// Close modal
noteClose.addEventListener("click", () => {

    noteModal.style.display = "none";
});

// Close by click outside
window.addEventListener("click", (event) => {

    if (event.target === noteModal) {

        noteModal.style.display = "none";
    }
});

// Save note
saveNoteButton.addEventListener(
    "click",
    async () => {

        if (
            !noteTitle.value.trim() ||
            !noteText.value.trim()
        ) {

            noteMessage.textContent =
                "Заполните все поля.";

            return;
        }

        const response =
            await fetch(
                "/api/notes/create",
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify({

                        userId: currentUser.id,

                        title:
                            noteTitle.value,

                        noteText:
                            noteText.value
                    })
                }
            );

        const data =
            await response.json();

        if (response.ok) {

            noteMessage.textContent =
                "Заметка сохранена.";

            noteTitle.value = "";
            noteText.value = "";

            loadNotes();

        } else {

            noteMessage.textContent =
                data.message;
        }
    }
);

// Load notes
async function loadNotes() {

    const response =
        await fetch(
            `/api/notes/user/${currentUser.id}`
        );

    const notes =
        await response.json();

    notesGrid.innerHTML = "";

    if (notes.length === 0) {

        notesGrid.innerHTML = `
            <div class="note-card note-yellow">
                <h3>Нет заметок</h3>

                <p>
                    Создайте первую заметку.
                </p>
            </div>
        `;

        return;
    }

    const colors = [
        "note-yellow",
        "note-green",
        "note-blue"
    ];

    notes.forEach((note, index) => {

        const card =
            document.createElement("div");

        card.className =
            `note-card ${colors[index % 3]}`;

        card.innerHTML = `
            <h3>${note.title}</h3>

            <p>${note.note_text}</p>

            <span>
                ${new Date(note.created_at).toLocaleDateString()}
            </span>

            <button
                class="small-button delete-note-button"
                data-id="${note.id}">
                Удалить
            </button>
        `;

        notesGrid.appendChild(card);
    });

    const deleteButtons =
    document.querySelectorAll(".delete-note-button");

deleteButtons.forEach((button) => {

    button.addEventListener("click", async () => {

        const noteId =
            button.dataset.id;

        const response =
            await fetch(`/api/notes/delete/${noteId}`, {
                method: "DELETE"
            });

        if (response.ok) {
            loadNotes();
        } else {
            alert("Ошибка удаления заметки");
        }
    });
});
}

// First load
loadNotes();