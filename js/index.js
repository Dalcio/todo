const add_new_note = document.querySelector("button.add-new-note");
const textarea = document.querySelector("div.textarea");

window.addEventListener("load", () => {
  const data = window.localStorage["save_notes"];
  const theme =
    (window.localStorage["save_theme"] && window.localStorage["save_theme"]) ||
    "dark";

  if (theme === "light") {
    window.theme = "dark";
  } else {
    window.theme = "light";
  }

  all_notes = [...JSON.parse(data)];

  if (all_notes.length === 0) {
    textarea.contentEditable = false;
    emptyNotes();
  } else {
    renderNotes(all_notes);
  }

  changeTheme();
});

add_new_note.addEventListener("click", function () {
  textarea.contentEditable = true;
  createNoteItem();
});

textarea.addEventListener("input", function ({ target }) {
  activeTools();
  const note_id = Number(pallet.getAttribute("id"));
  const created_date = new Date().toGMTString().replace(/ GMT/, "");

  const el_index = all_notes.findIndex(({ id }) => id === note_id);
  const element_to_update = all_notes.splice(el_index, 1)[0];

  element_to_update.note_content = target.innerHTML;
  element_to_update.note_text = target.textContent.substring(0, 55);
  element_to_update.created_date = created_date;
  all_notes.unshift(element_to_update);

  /* getting note element */
  const target_element = document.querySelector(`article[id="${note_id}"]`);
  const new_index = all_notes.findIndex(({ id }) => id === note_id);

  if (new_index !== el_index) {
    updateTree(target_element, true);
  }

  target_element.children[1].textContent = element_to_update.created_date;
  target_element.children[2].textContent = element_to_update.note_text;

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
  if (remove) {
    notes_list.removeChild(child);
  } else {
    notes_list.insertAdjacentElement("afterbegin", child);
  }
}

function renderNotes(notes) {
  notes = [...notes];
  const notes_list = document.querySelector("section.notes-list");
  notes_list.innerHTML = "";

  notes.reverse().map((note_item, index) => {
    created_note_item = createNoteItemEl(note_item);
    notes_list.insertAdjacentElement("afterbegin", created_note_item);
    document.querySelector("section.notes-list").scrollTop = 0;
    changeElementThemeColor(created_note_item);
    if (index === notes.length - 1) {
      changeTextareaThemeColor(created_note_item);
      handleTextArea(note_item.id);
    }
  });
}

function emptyNotes() {
  const text = "Tap the new note button above at left to create a new note";
  textarea.innerHTML = `<p class="is-empty-notes">${text}</p>`;
  if (window.theme === "light") {
    textarea.style.backgroundColor = "var(--textarea)";
    textarea.style.borderTopColor = "var(--textarea)";
  } else {
    textarea.style.backgroundColor = "#B2B6C0";
    textarea.style.borderTopColor = "#B2B6C0";
  }
}
