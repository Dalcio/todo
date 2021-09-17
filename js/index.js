const add_new_note = document.querySelector("button.add-new-note");
const textarea = document.querySelector("div.textarea");

window.addEventListener("load", () => {
  const data = window.localStorage["save_notes"];
  all_notes = [...JSON.parse(data)];

  if (all_notes.length === 0) {
    textarea.contentEditable = false;
  } else {
    // update the note list tree
    const notes_list = document.querySelector("section.notes-list");
    notes_list.innerHTML = "";

    all_notes.reverse().map((note_item, index) => {
      created_note_item = createNoteItemEl(note_item);
      notes_list.insertAdjacentElement("afterbegin", created_note_item);
      document.querySelector("section.notes-list").scrollTop =
        document.querySelector("section.notes-list").scrollHeight;
      if (index === all_notes.length - 1) {
        handleTextArea(note_item.id);
      }
    });
    all_notes.reverse();
  }
});

add_new_note.addEventListener("click", function () {
  textarea.contentEditable = true;
  createNoteItem();
});

// textarea.addEventListener("input", activeTools);
textarea.addEventListener("input", function ({ target }) {
  activeTools();
  const note_id = Number(pallet.getAttribute("id"));
  const created_date = new Date().toGMTString().replace(/ GMT/, "");

  const el_index = all_notes.findIndex(({ id }) => id === note_id);
  const element_to_update = all_notes.splice(el_index, 1)[0];

  element_to_update.note_content = target.innerHTML;
  element_to_update.created_date = created_date;
  all_notes.unshift(element_to_update);

  /* getting note element */
  const target_element = document.querySelector(`article[id="${note_id}"]`);
  const new_index = all_notes.findIndex(({ id }) => id === note_id);
  if (new_index !== el_index) {
    updateTree(target_element, true);
  }
  target_element.children[1].textContent = element_to_update.created_date;
  target_element.children[2].textContent = element_to_update.note_content
    .replace(/&nbsp;/, " ")
    .substring(0, 55);
  if (new_index !== el_index) {
    updateTree(target_element);
  }
  saveNotes();
});

function saveNotes() {
  window.localStorage["save_notes"] = JSON.stringify(all_notes);
}

function updateTree(child, remove) {
  const notes_list =
    (remove && child.parentNode) ||
    document.querySelector("section.notes-list");
  debugger;
  if (remove) {
    notes_list.removeChild(child);
    debugger;
  } else {
    notes_list.insertAdjacentElement("afterbegin", child);
  }
}
