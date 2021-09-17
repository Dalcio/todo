const add_new_note = document.querySelector("button.add-new-note");
const content_editable = document.querySelector("div.textarea");
const bold = document.querySelector("button.bold");
const italic = document.querySelector("button.italic");
const underline = document.querySelector("button.underline");
const line_through = document.querySelector("button.line-through");
const list_btn = document.querySelector("button.list-btn");

add_new_note.addEventListener("click", function () {
  createNoteItem();
});

bold.addEventListener("click", function () {
  document.execCommand("bold");
});

italic.addEventListener("click", function () {
  document.execCommand("italic");
});

underline.addEventListener("click", function () {
  document.execCommand("underline");
});

line_through.addEventListener("click", function () {
  document.execCommand("strikethrough");
});

list_btn.addEventListener("click", function () {
  document.execCommand("insertunorderedlist");
});

