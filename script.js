/*********************************
 * TOOL NAVIGATION
 *********************************/
function openTool(tool) {
    window.location.href = "tools/" + tool + ".html";
}

/*********************************
 * TOOLS SETTINGS TOGGLE
 *********************************/
function toggleExtraTools() {
    const section = document.getElementById("extraTools");
    if (!section) return;
    section.classList.toggle("show");
}

/*********************************
 * THEME TOGGLE (DARK / LIGHT)
 *********************************/
function toggleTheme() {
    document.body.classList.toggle("light");

    if (document.body.classList.contains("light")) {
        localStorage.setItem("theme", "light");
    } else {
        localStorage.setItem("theme", "dark");
    }
}

window.onload = function () {
    if (localStorage.getItem("theme") === "light") {
        document.body.classList.add("light");
    }
};

/*********************************
 * CALCULATOR FUNCTIONS
 *********************************/
function appendValue(value) {
    const display = document.getElementById("display");
    if (display) display.value += value;
}

function clearDisplay() {
    const display = document.getElementById("display");
    if (display) display.value = "";
}

function deleteLast() {
    const display = document.getElementById("display");
    if (display) display.value = display.value.slice(0, -1);
}

function calculate() {
    const display = document.getElementById("display");
    if (!display) return;

    try {
        display.value = eval(display.value);
    } catch {
        display.value = "Error";
    }
}

/*********************************
 * TO-DO LIST FUNCTIONS
 *********************************/
function addTask() {
    const input = document.getElementById("taskInput");
    const list = document.getElementById("taskList");

    if (!input || !list) return;
    if (input.value.trim() === "") return;

    const li = document.createElement("li");
    li.textContent = input.value;

    const btn = document.createElement("button");
    btn.textContent = "❌";
    btn.onclick = () => {
        li.remove();
        saveTasks();
    };

    li.appendChild(btn);
    list.appendChild(li);
    input.value = "";

    saveTasks();
}

function saveTasks() {
    const list = document.getElementById("taskList");
    if (list) localStorage.setItem("tasks", list.innerHTML);
}

function loadTasks() {
    const list = document.getElementById("taskList");
    if (list) list.innerHTML = localStorage.getItem("tasks") || "";
}

/*********************************
 * NOTES FUNCTIONS
 *********************************/
function saveNote() {
    const title = document.getElementById("noteTitle");
    const text = document.getElementById("noteText");
    const list = document.getElementById("notesList");

    if (!title || !text || !list) return;
    if (title.value === "" || text.value === "") return;

    const notes = JSON.parse(localStorage.getItem("notes")) || [];
    notes.push({ title: title.value, text: text.value });
    localStorage.setItem("notes", JSON.stringify(notes));

    title.value = "";
    text.value = "";
    loadNotes();
}

function loadNotes() {
    const list = document.getElementById("notesList");
    if (!list) return;

    const notes = JSON.parse(localStorage.getItem("notes")) || [];
    list.innerHTML = "";

    notes.forEach((note, index) => {
        const li = document.createElement("li");
        li.innerHTML = `<strong>${note.title}</strong><br>${note.text}`;

        const btn = document.createElement("button");
        btn.textContent = "❌ Delete";
        btn.onclick = () => deleteNote(index);

        li.appendChild(btn);
        list.appendChild(li);
    });
}

function deleteNote(index) {
    const notes = JSON.parse(localStorage.getItem("notes")) || [];
    notes.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notes));
    loadNotes();
}

/*********************************
 * LOAD DATA ON PAGE LOAD
 *********************************/
document.addEventListener("DOMContentLoaded", () => {
    loadTasks();
    loadNotes();
});




