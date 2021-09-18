(function () {
  const toggle = document.querySelector("button[class='toggle']");
  const pane = document.querySelector(".pane");

  toggle.addEventListener("click", handleToggle);

  pane.addEventListener("click", handleToggle);

  function handleToggle() {
    const notes_container = document.querySelector("aside.notes-container");
    if (toggle.getAttribute("show") === "false") {
      notes_container.style.display = "grid";
      notes_container.style.animation = "left-right 0.6s ease";
      pane.style.animation = "bg 0.6s ease";
      pane.style.display = "block";
      toggle.setAttribute("show", "true");
    } else {
      setTimeout(() => {
        notes_container.style.display = "none";
        pane.style.display = "none";
      }, 600);
      notes_container.style.animation = "right-left 0.6s ease";
      pane.style.animation = "bg-reverse 0.6s ease";
      toggle.setAttribute("show", "false");
    }
  }
})();

const change_theme = document.querySelector("button.change-theme");
change_theme.addEventListener("click", changeTheme);

function changeTheme() {
  const sun = document.querySelector("button > div.sun");
  const notes = document.querySelectorAll("article.note-item");

  if (window.theme === "dark") {
    window.theme = "light";
    window.localStorage["save_theme"] = "light";
    console.log(change_theme.style.backgroundColor);
    change_theme.style.boxShadow = "none";
    sun.style.boxShadow = "2px 2px 3px var(--sun)";
    sun.style.backgroundColor = "var(--sun)";

    notes.forEach((note, index) => {
      const note_color = note.children[0].style.backgroundColor
        .replace(/\)/g, ", 0.8)")
        .replace(/^rgb/g, "rgba");

      note.querySelector(".note-body").style.backgroundColor = note_color;
      note.querySelector(".corner").style.backgroundColor = "#f6f6f6";
      if (index === 0) {
        content_editable.style.backgroundColor = note_color;
      }
    });
    document.forms[0].style.backgroundColor = "#B2B6C0";
    document.body.style.backgroundColor = "var(--text)";
    document.body.style.color = "var(--bg-color)";
    document.querySelector("aside.notes-container").style.backgroundColor =
      "#f6f6f6";
    document.querySelector("header.tools").style.backgroundColor = "#f6f6f6";
  } else {
    window.theme = "dark";
    window.localStorage["save_theme"] = "dark";
    change_theme.style.backgroundColor = "var(--corner)";
    change_theme.style.boxShadow = "2px 2px 5px var(--corner)";
    sun.style.boxShadow = "none";
    sun.style.backgroundColor = "var(--primary)";
    document.forms[0].style.backgroundColor = "var(--textarea)";
    document.querySelector("aside.notes-container").style.backgroundColor =
      "var(--primary)";
    document.querySelector("header.tools").style.backgroundColor =
      "var(--primary)";
    document.body.style.backgroundColor = "var(--bg-color)";
    document.body.style.color = "var(--text)";

    notes.forEach((note, index) => {
      note.querySelector(".note-body").style.backgroundColor =
        "var(--textarea)";
      note.querySelector(".corner").style.backgroundColor = "var(--primary)";

      if (index === 0) {
        content_editable.style.backgroundColor = "var(--textarea)";
      }
    });
  }
}

function changeElementThemeColor(note) {
  if (window.theme === "light") {
    const note_color = note.children[0].style.backgroundColor
      .replace(/\)/g, ", 0.8)")
      .replace(/^rgb/g, "rgba");
    note.querySelector(".note-body").style.backgroundColor = note_color;
    note.querySelector(".corner").style.backgroundColor = "#f6f6f6";
  } else {
    note.querySelector(".note-body").style.backgroundColor = "var(--textarea)";
    note.querySelector(".corner").style.backgroundColor = "var(--primary)";
  }
}

function changeTextareaThemeColor(note) {
  if (window.theme === "light") {
    const note_color = note.children[0].style.backgroundColor
      .replace(/\)/g, ", 0.8)")
      .replace(/^rgb/g, "rgba");
    content_editable.style.backgroundColor = note_color;
  } else {
    content_editable.style.backgroundColor = "var(--textarea)";
  }
}
