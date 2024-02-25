const popUpBtn = document.querySelector(".popUpBtn")
const closeBtn = document.querySelector(".closeBtn")
const addNoteContainer = document.querySelector(".addNoteContainer")
const noteForm = document.querySelector(".noteForm")
const titleInput = document.querySelector("#title")
const noteInput = document.querySelector("#note")
const noteContainer = document.querySelector(".grid-container")
const contents = document.querySelectorAll(".content")
const noteBox = document.querySelector("#noteBox")
const headerText = document.querySelector("header h2")
const noteBtn = document.querySelector(".noteForm button")



// Retrieve notes from local storage if available
let notes = JSON.parse(localStorage.getItem('notes')) || [];

const openPopUp = () => {
    addNoteContainer.classList.remove("hide")
    closeBtn.classList.remove("hide")
    popUpBtn.classList.add("hide")
    noteContainer.classList.add("hide")
    headerText.textContent = "Add a Note"
    noteBtn.classList.add('hide');
}

const closePopUp = () => {
    addNoteContainer.classList.add("hide")
    closeBtn.classList.add("hide")
    popUpBtn.classList.remove("hide")
    noteContainer.classList.remove("hide")
    headerText.textContent = "Quick Notes"
}

popUpBtn.addEventListener("click", openPopUp)
closeBtn.addEventListener("click", closePopUp)

noteForm.addEventListener("submit", (e) => {
    e.preventDefault();

    if (titleInput.value === "" || noteInput.value === "") {
        alert("hmmm")
    }
   
    else {
        addNote();
        closePopUp();
        saveNotesToLocalStorage();
    }
    titleInput.value = "";
    noteInput.value = "";
})

titleInput.addEventListener('input', () => {
    if (titleInput.value.length > 1 && noteInput.value.length > 1) {
        noteBtn.classList.remove('hide');
    } else {
        noteBtn.classList.add('hide');
    }
});

noteInput.addEventListener('input', () => {
    if (titleInput.value.length > 1 && noteInput.value.length > 1) {
        noteBtn.classList.remove('hide');
    } else {
        noteBtn.classList.add('hide');
    }
});


const addNote = () => {
    const markUp = `
    <div class="note-box">
        <h3 class="title">${titleInput.value}</h3>
        <p class="content">${noteInput.value}</p>
        <div class="btns">
            <button class="editBtn">
                <span class="material-symbols-rounded">
                    edit_note
                </span>
                <span>Edit</span>
            </button>
            <button class="deleteBtn">
                <span class="material-symbols-rounded">
                    delete
                </span>
                <span>Delete</span>
            </button>
        </div>
    </div>
    `
    noteContainer.insertAdjacentHTML("afterbegin", markUp);
    // Edit note
    editNote();
    // Delete note
    deleteNote();

    // Add the note to the notes array
    notes.unshift({ title: titleInput.value, content: noteInput.value });
};

const deleteNote = () => {
    const deleteBtns = document.querySelectorAll(".deleteBtn")

    deleteBtns.forEach((delBtn) => {
        delBtn.addEventListener("click", () => {
            const noteBox = delBtn.parentElement.parentElement;
            const title = noteBox.querySelector(".title").textContent;
            const content = noteBox.querySelector(".content").textContent;

            // Remove note from DOM
            noteBox.remove();

            // Remove note from notes array
            notes = notes.filter(note => note.title !== title || note.content !== content);
            saveNotesToLocalStorage();
        })
    })
}

const editNote = () => {
    const editBtns = document.querySelectorAll(".editBtn");

    editBtns.forEach((editBtn) => {
        editBtn.addEventListener("click", () => {
            const noteBox = editBtn.parentElement.parentElement;
            const title = noteBox.querySelector(".title").textContent;
            const content = noteBox.querySelector(".content").textContent;

            titleInput.value = title;
            noteInput.value = content;

            // Remove note from DOM
            noteBox.remove();
            // Remove note from notes array
            notes = notes.filter(note => note.title !== title || note.content !== content);
            openPopUp();
            noteBtn.classList.remove('hide');
        });
    });
};

// Save notes to local storage
const saveNotesToLocalStorage = () => {
    localStorage.setItem('notes', JSON.stringify(notes));
};

// Load notes from local storage
const loadNotesFromLocalStorage = () => {
    notes.forEach(note => {
        const markUp = `
        <div class="note-box">
            <h3 class="title">${note.title}</h3>
            <p class="content">${note.content}</p>
            <div class="btns">
                <button class="editBtn">
                    <span class="material-symbols-rounded">
                        edit_note
                    </span>
                    <span>Edit</span>
                </button>
                <button class="deleteBtn">
                    <span class="material-symbols-rounded">
                        delete
                    </span>
                    <span>Delete</span>
                </button>
            </div>
        </div>
        `
        noteContainer.insertAdjacentHTML("afterbegin", markUp);

        // After notes are loaded, reattach event listeners
        editNote();
        deleteNote();
    });
};

// Load notes when the page is loaded
loadNotesFromLocalStorage();


noteInput.addEventListener('input', () => {
    noteInput.style.height = 'auto'; // Reset the height to auto
    noteInput.style.height = noteInput.scrollHeight + 'px'; // Set the height to match the scroll height
});