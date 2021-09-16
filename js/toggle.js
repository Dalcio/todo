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
