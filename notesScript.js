"use strict";

const onLoad = () => {
  document.getElementById("rightSection").value = ""; // empty textarea

  const notes = [];

  const findNoteById = (id) => notes.find((note) => note.id === id);

  const newNoteButton = document.getElementById('newNoteButton'); // poga pievieno jaunas piezīmes nosaukumu
  // jaunas piezīmes izveidošana
  newNoteButton.onclick = () => {
    const noteName = prompt('Enter note name: ', '');

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
        name: noteName,
        id: notes.length+1,
      };

      notes.push(newnote);

      const newnamesList = document.querySelector('.ulList');
      newnamesList.innerHTML += `
        <li class="liBorders">
          <button class="noteNameButton" data-id="${newnote.id}"> ${newnote.name} </button>
        </li>
      `;
    }
  };

  const saveButton = document.querySelector('#buttonSave');
  saveButton.addEventListener('click', () => {
    const textareaValue = () => document.getElementById("rightSection").value;  // textarea saturs FUNKCIJA!!!!

    const newContent = textareaValue();

    const latestNote = notes[notes.length -1]; // masīva pēdējais elements
      latestNote.content = newContent;
      console.log(notes);
    });

    console.log("notes", notes); // textarea saturs ielikts in array

    // event delegation from parent ulList to child classes noteNameButton
    document.querySelector('.ulList').addEventListener('click', (event) => {
      const noteText = document.getElementById("rightSection"); // textarea

      const id = parseInt(event.target.getAttribute('data-id'));
      const note = findNoteById(id);
      noteText.value = note.content ;

      console.log(event);
    /*
      if(event.target && event.target.matches("li.liBorders") ){
        event.target.classList.add('activeNoteName'); // Kā noņemt no elementa class activeNoteName,
        // kad ir uzklikšķināta cita poga?
        console.log(event.target.classList.contains('activeNoteName'));
            }
          */
    });

    // izdzēst Note ar pogu delete
    const deleteButton = document.getElementById('buttonDelete');
    deleteButton.addEventListener('click', () => {
    });

    document.querySelector('.ulList').addEventListener('click', (event) => {
      if (event.target && event.target.contains('activeNoteName')) {
        event.target.remove();
      }
    });
}

window.addEventListener('DOMContentLoaded', onLoad);
