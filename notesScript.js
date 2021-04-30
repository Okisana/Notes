"use strict";

const onLoad = () => {
  document.getElementById("rightSection").value = ""; // empty textarea

  let notes = JSON.parse(localStorage.getItem("notes")) || [];

  const findNoteById = (id) => notes.find((note) => note.id === id);
  const deleteNoteById = (id) => notes.filter((note) => note.id !== id);

  function clearNoteMenu() {
    const newnamesList = document.querySelector(".ulList");
    newnamesList.innerHTML = "";
  }

  function renderNoteMenu(notes) {
    clearNoteMenu();
    notes.forEach((note) => {
      renderNoteMenuItem(note);
      // pārbaudi vai ir status checked izsauc f. checkNoteStatus();
    });
  }
  renderNoteMenu(notes);

  document.querySelector(".ulList").addEventListener("click", (event) => {
    // jauzlabo if, janosaka vai tas kas uzklikstitnats ir checkbox

    if (event.target.type === "checkbox") {
      const id = parseInt(event.target.getAttribute("data-id"));
      const note = findNoteById(id);
      if (event.target.checked) {
        note.checked = true;
        console.log(notes);
      } else {
        note.checked = false;
      }
      sortNotesByChecked(notes);
    }
    renderNoteMenu(notes);
  });

  function sortNotesByChecked(notes) {
    // izsauc funkciju sort - el. liec uz pēdējo vietu
    notes.sort((note1, note2) => {
      if (note1.checked === note2.checked) {
        return 0;
      }
      if (note1.checked === false && note2.checked === true) {
        return -1;
      } else {
        return 1;
      }
    });
  }
  sortNotesByChecked(notes);

  const newNoteButton = document.getElementById("newNoteButton"); // poga pievieno jaunas piezīmes nosaukumu
  // jaunas piezīmes izveidošana

  function renderNoteMenuItem(note) {
    const newnamesList = document.querySelector(".ulList");
    newnamesList.innerHTML += `
      <li class="liBorders">
         <button class="noteNameButton" data-id="${note.id}"> ${
      note.name
    } </button>
         <input type="checkbox"  data-id="${note.id}" class="checkbox" ${
      note.checked ? "checked" : ""
    }>
      </li>
    `;
  }

  newNoteButton.onclick = () => {
    const noteName = prompt("Enter note name: ", "");

    document.getElementById("rightSection").value = "";

    if (noteName) {
      /* Structure of a note
        {
          id:
          name: "first Note",
          content: "hello"
        }
      */
      const newnote = {
        id: notes.length + 1,
        name: noteName,
        // content: undefined,
        checked: false,
      };

      notes.push(newnote);
      renderNoteMenuItem(newnote);
    }
  };

  const saveButton = document.querySelector("#buttonSave");
  saveButton.addEventListener("click", () => {
    const textareaValue = () => document.getElementById("rightSection").value; // textarea saturs FUNKCIJA!!!!

    const newContent = textareaValue();

    const latestNote = notes[notes.length - 1]; // masīva pēdējais elements
    latestNote.content = newContent;
    console.log(notes);
    localStorage.setItem("notes", JSON.stringify(notes));
  });

  console.log("notes", notes); // textarea saturs ielikts in array

  // event delegation from parent ulList to child classes noteNameButton
  document.querySelector(".ulList").addEventListener("click", (event) => {
    if (event.target.classList.contains("noteNameButton")) {
      console.log(event);

      const noteText = document.getElementById("rightSection"); // textarea

      const id = parseInt(event.target.getAttribute("data-id"));
      const note = findNoteById(id);
      noteText.value = note.content;

      const previousActive = document.querySelector(".activeNoteName");
      if (previousActive) {
        previousActive.classList.remove("activeNoteName");
      }
      event.target.classList.add("activeNoteName");
      const activeListItem = event.target;

      // izdzēst Note ar pogu delete
      const deleteButton = document.getElementById("buttonDelete");
      deleteButton.addEventListener("click", (event) => {
        activeListItem.parentNode.remove();
        noteText.value = "";
        notes = deleteNoteById(id);
        localStorage.setItem("notes", JSON.stringify(notes));
      });
    }
  });
};

window.addEventListener("DOMContentLoaded", onLoad);
