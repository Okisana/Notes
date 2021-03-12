"use strict";

const onLoad = () => {
  document.getElementById("rightSection").value = ""; // empty textarea
  
  let notes = JSON.parse(localStorage.getItem('notes'));

  const findNoteById = (id) => notes.find((note) => note.id === id);
  const deleteNoteById = (id) => notes.filter((note) => note.id !== id);

  notes.forEach((note) => {
    renderNoteMenuItem(note);
  });

  const newNoteButton = document.getElementById('newNoteButton'); // poga pievieno jaunas piezīmes nosaukumu
  // jaunas piezīmes izveidošana

  function renderNoteMenuItem(note){
    const newnamesList = document.querySelector('.ulList');
    newnamesList.innerHTML += `
      <li class="liBorders">
         <button class="noteNameButton" data-id="${note.id}"> ${note.name} </button>
         <input type="checkbox" id="checkbox">
      </li>
    `;
  }

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
        id: notes.length+1,
        name: noteName,
        // content: undefined,
        checked: false,
      };

      notes.push(newnote);
      renderNoteMenuItem (newnote);
    }
  };

  const saveButton = document.querySelector('#buttonSave');
  saveButton.addEventListener('click', () => {
    const textareaValue = () => document.getElementById("rightSection").value;  // textarea saturs FUNKCIJA!!!!

    const newContent = textareaValue();

    const latestNote = notes[notes.length -1]; // masīva pēdējais elements
      latestNote.content = newContent;
      console.log(notes);
      localStorage.setItem('notes', JSON.stringify(notes));
    });

    console.log("notes", notes); // textarea saturs ielikts in array

    // event delegation from parent ulList to child classes noteNameButton
    document.querySelector('.ulList').addEventListener('click', (event) => {
      const noteText = document.getElementById("rightSection"); // textarea

      const id = parseInt(event.target.getAttribute('data-id'));
      const note = findNoteById(id);
      noteText.value = note.content ;

      console.log(event);
      const previousActive = document.querySelector('.activeNoteName');
      if(previousActive){
        previousActive.classList.remove('activeNoteName');
      }
      event.target.classList.add('activeNoteName');
      const activeListItem = event.target;
    
     // izdzēst Note ar pogu delete
      const deleteButton = document.getElementById('buttonDelete');
      deleteButton.addEventListener('click', (event) => {
        activeListItem.parentNode.remove();
        noteText.value = "";
        notes = deleteNoteById(id);
        localStorage.setItem('notes', JSON.stringify(notes));
      });
    });

};

window.addEventListener('DOMContentLoaded', onLoad);
