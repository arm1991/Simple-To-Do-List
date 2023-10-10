import { Todo } from "./todo.js"

export const store = {
    tasks: convertToTodo(),
    currentState: null,
    isHide: false,
    checkbox: document.querySelector("#hide-button"),
    saveBtn: document.querySelector("#save"),
    input: document.querySelector(".input"),
    todoContainer: document.querySelector(".to-do"),
}

function main() {
    saveEvent();
    drawTodo();
    hideTodoDone()
}

function saveEvent() {
    store.saveBtn.addEventListener("click", ()=> {
        if (store.currentState === "edit") return;
        if (store.input.value.trim() === "") return;
        const task = new Todo(store.input.value);
        store.tasks.push(task);
        store.input.value = "";
        drawTodo();
        saveData();
    });
}

export function drawTodo() {
    store.todoContainer.innerHTML = "";
    const fragment = document.createDocumentFragment();
    store.tasks.forEach(task => {
        if(store.isHide === true && task.done === true) return;

        const listItem = document.createElement('li');
        listItem.appendChild(task.createTodo(document.createElement('div'), task));

        fragment.appendChild(listItem);
    });

    store.todoContainer.appendChild(fragment);
}

function convertToTodo() {
    if(!(JSON.parse(localStorage.getItem('tasks')))) return [];
    else {
        let tasks = JSON.parse(localStorage.getItem('tasks'));
        tasks = tasks.map(task => new Todo(task.title));
        return tasks;
    }
}

function hideTodoDone() {
    store.checkbox.addEventListener("click", () => {
        store.isHide = store.isHide === false ? true : false;
        drawTodo();
    });
}

export function saveData() {
    localStorage.setItem('tasks', JSON.stringify(store.tasks));
}

main();