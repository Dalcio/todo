const content_editable = document.querySelector("div.textarea");
const bold = document.querySelector("button.bold");
const italic = document.querySelector("button.italic");
const underline = document.querySelector("button.underline");
const line_through = document.querySelector("button.line-through");
const list_btn = document.querySelector("button.list-btn");

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

content_editable.addEventListener("click", activeTools);

content_editable.addEventListener("focus", () => {
  document.addEventListener("keydown", activeTools);
});

function activeTools() {
  const current_node = getSelectionStart();

  activeBold(false);
  activeItalic(false);
  activeUnderline(false);
  activeLineThrough(false);
  activeList(false);

  if (current_node.classList[0] !== "textarea") {
    const active_tools = getRecursiveTagName(current_node, []);
    if (active_tools?.length > 0) {
      activeBold(active_tools.includes("b"));
      activeItalic(active_tools.includes("i"));
      activeUnderline(active_tools.includes("u"));
      activeLineThrough(active_tools.includes("strike"));
      activeList(active_tools.includes("li"));
    }
  }
}

function getRecursiveTagName(node, active_tools) {
  if (node?.tagName === "DIV" && node?.classList[0] === "textarea") {
    return [...active_tools];
  }

  if (node?.tagName === "B") {
    active_tools.push("b");
  } else if (node?.tagName === "I") {
    active_tools.push("i");
  } else if (node?.tagName === "U") {
    active_tools.push("u");
  } else if (node?.tagName === "STRIKE") {
    active_tools.push("strike");
  } else if (node?.tagName === "LI") {
    active_tools.push("li");
  }

  return getRecursiveTagName(node.parentNode, active_tools);
}

function activeBold(active) {
  if (typeof active === "boolean") {
    bold.setAttribute("is-active", (active && "true") || "false");
  }
}

function activeItalic(active) {
  if (typeof active === "boolean") {
    italic.setAttribute("is-active", (active && "true") || "false");
  }
}

function activeUnderline(active) {
  if (typeof active === "boolean") {
    underline.setAttribute("is-active", (active && "true") || "false");
  }
}

function activeLineThrough(active) {
  if (typeof active === "boolean") {
    line_through.setAttribute("is-active", (active && "true") || "false");
  }
}

function activeList(active) {
  if (typeof active === "boolean") {
    list_btn.setAttribute("is-active", (active && "true") || "false");
  }
}

/**
 *return the node the selection is anchored in (i.e. where the user started to select, selecting "backwards" will return the end instead of the start) – if you want the element type as a string, just get the nodeName property of the returned node. This works for zero-length selections as well (i.e. just a caret position).
 */
function getSelectionStart() {
  var node = document.getSelection().anchorNode;
  return node.nodeType == 3 ? node.parentNode : node;
}
