const all_notes = [];
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
  const note_content = "some content";

  const note_item = {
    id,
    created_date,
    current_color,
    note_content,
  };

  all_notes.push(note_item);
  const created_note_item = createNoteItemEl(note_item);
  notes_list.appendChild(created_note_item);
  document.querySelector("section.notes-list").scrollTop =
    document.querySelector("section.notes-list").scrollHeight;
  handleTextArea(id);
}

function createNoteItemEl({ id, current_color, created_date, note_content }) {
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
  note_content_el.textContent = note_content;

  /* corner */
  const corner = document.createElement("div");
  corner.setAttribute("class", "corner");

  /* appending elements */
  note_item_el.appendChild(top_border);
  note_item_el.appendChild(created_date_el);
  note_item_el.appendChild(note_content_el);
  note_item_el.appendChild(corner);

  return note_item_el;
}

function handleCalor(current) {
  current = current === colors.length - 1 ? 0 : current + 1;
  return colors[current];
}

function handleTextArea(id) {
  const textarea = document.querySelector("div.textarea");
  const current_note = all_notes.filter(({ id: _id }) => _id === id)[0];

  textarea.textContent = current_note.note_content;

  textarea.style.borderTopColor = current_note.current_color;
  // document.querySelector(
  //   `section[id="${id}"] > div.top-border`
  // ).style.backgroundColor = current_note.current_color;

  pallet.style.backgroundColor = current_note.current_color;

  pallet.setAttribute("id", id);
}

pallet.addEventListener("click", function (event) {
  
  alert("click");
});
