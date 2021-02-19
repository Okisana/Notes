"use strict";

window.addEventListener('DOMContentLoaded', ()=>{

document.getElementById("rightSection").value = ""; // empty textarea

let newNoteButton = document.getElementById('newNoteButton'); // poga pievieno jaunas piezīmes nosaukumu
let noteName; // jaunas piezimes nosaukums
let noteText = document.getElementById("rightSection"); // textarea
const textareaValue = ()=>document.getElementById("rightSection").value;  // textarea saturs FUNKCIJA!!!!
      
let noteNameButton = document.querySelectorAll("button.noteNameButton");
const liElement = document.querySelectorAll('.liBorders');
const saveButton = document.querySelector('#buttonSave');
const newnamesList = document.querySelector('.ulList');
const deleteButton = document.getElementById('buttonDelete');
/* note Structure
const note1 = {
  id:
  name: "first Note",
  content: "hello"
};
*/
const notes = [];

function findNoteById(id){
  return notes.find((note) => note.id === id);
}

//newnamesList.innerHTML = ""; // iztukšot html elementus

//jaunas piezīmes izveidošana
newNoteButton.onclick = function(){
  noteName = prompt('Enter note name: ', '');

  document.getElementById("rightSection").value = "";

  if(noteName){
       let newnote = {
      name: noteName,
        id: notes.length+1, 
        };

    notes.push(newnote);

    newnamesList.innerHTML += ` 
    <li class="liBorders">
      <button class="noteNameButton" data-id="${newnote.id}"> ${newnote.name} </button>
      </li>`;

        } 

     };

     //
saveButton.addEventListener('click', () =>{
  
  const newContent = textareaValue();
  // .content.push(document.getElementById("rightSection").value);  
 const latestNote = notes[notes.length -1]; // masīva pēdējais elements 
  latestNote.content = newContent;
   console.log(notes);
});

console.log("notes", notes); // textarea saturs ielikts in array

// event delegation from parent ulList to child classes noteNameButton
document.querySelector('.ulList').addEventListener('click', (event)=>{
  let id = parseInt(event.target.getAttribute('data-id'));
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
   deleteButton.addEventListener('click',()=>{
      document.querySelector('.ulList').addEventListener('click', (event)=>{
        if(event.target && event.target.contains('activeNoteName')){
          event.target.remove();
       }
     });
   });

  

 
  
  



});
  




  

