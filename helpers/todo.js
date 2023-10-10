import { saveData, drawTodo, store } from "./store.js";

class Todo {
  constructor(title) {
    this.id = Math.floor(
      Math.random() * Math.floor(Math.random() * Date.now())
    );
    this.title = title;
    this.done = false;
    this.isEdited = false;
  }

  createTodo(todo, task, store) {
    todo.className = "to-do-title";
    todo.setAttribute("id", task.id);
    todo.innerHTML = `<h4 class="text ${task.done ? "done" : ""}" id="to-do-${
      task.id
    }">${task.title}</h4>`;

    const icons = this.createBtns(document.createElement("div"), task, store);

    todo.appendChild(icons);
    return todo;
  }

  createBtns(icons, task, store) {
    icons.className = "icons";

    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = `<img src="./assets/delete.svg" alt="remove">`;
    deleteBtn.addEventListener("click", () => this.deleteData(task.id, store));

    const editBtn = document.createElement("button");
    editBtn.innerHTML = `<img src="./assets/edit.svg" alt="edit">`;
    editBtn.addEventListener("click", () => this.editEvent(task, store));

    const markAsDoneBtn = document.createElement("button");
    markAsDoneBtn.innerHTML = `<img src="./assets/mark-as-done.svg" alt="mark-as-done">`;
    markAsDoneBtn.addEventListener("click", () => this.markAsDone(task, store));

    icons.appendChild(deleteBtn);
    icons.appendChild(editBtn);
    icons.appendChild(markAsDoneBtn);
    return icons;
  }

  deleteData(id) {
    if (store.currentState === "edit") return;
    const div = document.querySelector(".delete-item");
    console.log(id);
    div.style.display = "block";
    this.deleteEvent(id, div, store);
  }

  deleteEvent(id, div, store) {
    document.body.addEventListener("click", (event) => {
      if (event.target.id === "yes") {
        store.tasks = store.tasks.filter((task) => task.id !== id);
        div.style.display = "none";
        saveData(store);
        drawTodo(store);
      } else if (event.target.id === "no") {
        div.style.display = "none";
        return;
      }
    });
  }

  editEvent(task, store) {
    if (store.currentState === "edit") return;
    store.currentState = "edit";
    task.isEdited = true;
    store.checkbox.setAttribute("disabled", "");
    this.changeTodoCSS(task);
    const todo = document.getElementById(`input-${task.id}`);
    this.setValue(todo, task);

    document
      .getElementById(`button-${task.id}`)
      .addEventListener("click", () => {
        if (todo.value.trim() === "") return;

        store.currentState = null;
        task.isEdited = false;
        store.checkbox.removeAttribute("disabled");
        task.title = todo.value;
        saveData(store);
        drawTodo(store);
      });
  }

  changeTodoCSS(task) {
    const todo = document.getElementById(`${task.id}`);
    todo.innerHTML = `
            <input type="text" class="text edit-input" id="input-${task.id}">
            <button class="text edit-save-button" id="button-${task.id}">save</button>
        `;
    todo.style.padding = "0 0 0 15px";
  }

  setValue(todo, task) {
    todo.value = task.title;
  }

  markAsDone(task, store) {
    const todoDone = document.querySelector(`#to-do-${task.id}`);
    if (task.done) {
      task.done = false;
      todoDone.classList.remove("done");
    } else {
      task.done = true;
      todoDone.classList.add("done");
    }
    saveData(store);
  }
}

export default Todo;
