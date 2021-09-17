const add_new_note = document.querySelector("button.add-new-note");

add_new_note.addEventListener("click", function () {
  createNoteItem();
});


/* saving content */

function saveNotes() {
  window.sessionStorage["save_notes"] = all_notes;
}
