import {
  store,
  saveData,
  drawTodo,
  convertToTodo,
  hideTodoDone,
} from "./helpers/store.js";
import Todo from "./helpers/todo.js";

document.addEventListener("DOMContentLoaded", () => {
  if (JSON.parse(localStorage.getItem("tasks"))) {
    store.tasks = convertToTodo();
    drawTodo(store);
  }

  store.saveBtn.addEventListener("click", () => {
    if(store.currentState === "edit") return;
    main(store);
  });

  function main(store) {
    saveEvent(store);
    saveData(store);
    drawTodo(store);
  }

  function saveEvent(store) {
    if (store.currentState === "edit") return;
    if (store.input.value.trim() === "") return;
    const task = new Todo(store.input.value);
    store.tasks.push(task);
    store.input.value = "";
  }

  store.checkbox.addEventListener("click", () => {
    hideTodoDone(store);
  });
});
