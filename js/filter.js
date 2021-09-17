const search_box = document.forms[0];
const search_input = search_box.children[0];

search_box.addEventListener("submit", (event) => {
  event.preventDefault();

  const result = all_notes.filter(({ note_content }) =>
    note_content.includes(search_input.value)
  );

  renderNotes(result);
});

search_input.addEventListener("input", (event) => {
  const value = event.target.value;
  if (value.length >= 1) {
    const result = all_notes.filter(({ note_content }) =>
      note_content.includes(value)
    );

    renderNotes(result);
  } else {
    renderNotes(all_notes);
  }
});
