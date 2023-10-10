import Todo from "./todo.js";

export const store = {
  tasks: [],
  currentState: null,
  isHide: false,
  checkbox: document.querySelector("#hide-button"),
  saveBtn: document.querySelector("#save"),
  input: document.querySelector(".input"),
  todoContainer: document.querySelector(".to-do"),
};

export function saveData(store) {
  localStorage.setItem("tasks", JSON.stringify(store.tasks));
}

export function drawTodo(store) {
  console.log(store);
  store.todoContainer.innerHTML = "";
  const fragment = document.createDocumentFragment();
  store.tasks.forEach((task) => {
    if (store.isHide === true && task.done === true) return;

    const listItem = document.createElement("li");
    listItem.appendChild(
      task.createTodo(document.createElement("div"), task, store)
    );

    fragment.appendChild(listItem);
  });

  store.todoContainer.appendChild(fragment);
}

export function convertToTodo() {
  if (!JSON.parse(localStorage.getItem("tasks"))) return [];
  else {
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    tasks = tasks.map((task) => new Todo(task.title));
    return tasks;
  }
}

export function hideTodoDone(store) {
  store.isHide = !store.isHide;
  drawTodo(store);
}
