let all_notes = [];
const colors = [
  "#ff8c00",
  "#228B22",
  "#30b2aa",
  "#ff6347",
  "#70cd32",
  "#ffc0cb",
  "#fff8dc",
  "#ff7f50",
];
const pallet = document.querySelector("button.pallet");

function createNoteItem() {
  const notes_list = document.querySelector("section.notes-list");
  const id = new Date().getTime();
  const created_date = new Date().toGMTString().replace(/ GMT/, "");
  const current_color = handleCalor(-1);
  const note_content = "";
  const note_text = "";

  const note_item = {
    id,
    created_date,
    current_color,
    note_content,
    note_text,
  };

  all_notes.unshift(note_item);
  const created_note_item = createNoteItemEl(note_item);
  notes_list.insertAdjacentElement("afterbegin", created_note_item);
  document.querySelector("section.notes-list").scrollTop =
    document.querySelector("section.notes-list").scrollHeight;
  handleTextArea(id);
}

function createNoteItemEl({ id, current_color, created_date, note_text }) {
  /* note item */
  const note_item_el = document.createElement("article");
  note_item_el.setAttribute("class", "note-item");
  note_item_el.setAttribute("id", id);
  note_item_el.setAttribute("role", "listitem");

  /* top border */
  const top_border = document.createElement("div");
  top_border.setAttribute("class", "top-border");
  top_border.style.backgroundColor = current_color;

  /* created date */
  const created_date_el = document.createElement("div");
  created_date_el.setAttribute("aria-label", `Created at ${created_date}`);
  created_date_el.setAttribute("class", "created-date");
  created_date_el.textContent = created_date;

  /* note content */
  const note_content_el = document.createElement("p");
  note_content_el.textContent = note_text;

  /* corner */
  const corner = document.createElement("div");
  corner.setAttribute("class", "corner");

  /* appending elements */
  note_item_el.appendChild(top_border);
  note_item_el.appendChild(created_date_el);
  note_item_el.appendChild(note_content_el);
  note_item_el.appendChild(corner);

  /* click event */

  note_item_el.addEventListener("click", function (event) {
    const target_id = Number(event.currentTarget.getAttribute("id"));
    handleTextArea(target_id);
  });

  return note_item_el;
}

function handleCalor(current) {
  if (typeof current === "string") {
    current = colors.indexOf(current);
  }
  current = current === colors.length - 1 ? 0 : current + 1;

  return colors[current];
}

function handleTextArea(id) {
  const textarea = document.querySelector("div.textarea");
  const current_note = all_notes.filter(({ id: _id }) => _id === id)[0];

  textarea.innerHTML = current_note.note_content;

  textarea.style.borderTopColor = current_note.current_color;

  pallet.style.backgroundColor = current_note.current_color;

  pallet.setAttribute("id", id);
}

pallet.addEventListener("click", function (event) {
  if (all_notes.length > 0) {
    const id = Number(event.currentTarget.getAttribute("id"));
    const index = all_notes.findIndex(({ id: _id }) => _id === id);
    let current_note = { ...all_notes[index] };
    const new_color = handleCalor(current_note.current_color);
    current_note = { ...current_note, current_color: new_color };
    all_notes[index] = { ...current_note };
    updateColorElement(id, new_color);
    saveNotes();
  }
});

function updateColorElement(target_id, new_color) {
  document.querySelector("div.textarea").style.borderTopColor = new_color;

  const target_query = `article[id="${target_id}"] > div.top-border`;
  const target_element = document.querySelector(target_query);
  target_element.style.backgroundColor = new_color;

  pallet.style.backgroundColor = new_color;
}
