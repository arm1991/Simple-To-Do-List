import { store, drawTodo, saveData } from "./index.js"

export class Todo {
    constructor(title) {
        this.id = Math.floor(Date.now());
        this.title = title;
        this.done = false;
        this.isEdited = false;
    }

    createTodo(todo, task) {
        todo.className = "to-do-title";
        todo.setAttribute("id", task.id);
        todo.innerHTML = `<h4 class="text ${task.done ? 'done' : ''}" id="to-do-${task.id}">${task.title}</h4>`;

        const icons = this.createBtns(document.createElement('div'), task);

        todo.appendChild(icons);
        return todo;
    }

    createBtns(icons, task) {
        icons.className = "icons";

        const deleteBtn = document.createElement('button');
        deleteBtn.innerHTML = `<img src="./assets/delete.svg" alt="remove">`;
        deleteBtn.addEventListener("click", () => this.deleteData(task.id));

        const editBtn = document.createElement('button');
        editBtn.innerHTML = `<img src="./assets/edit.svg" alt="edit">`;
        editBtn.addEventListener("click", () => this.editEvent(task));

        const markAsDoneBtn = document.createElement('button');
        markAsDoneBtn.innerHTML = `<img src="./assets/mark-as-done.svg" alt="mark-as-done">`;
        markAsDoneBtn.addEventListener("click", () => this.markAsDone(task));


        icons.appendChild(deleteBtn);
        icons.appendChild(editBtn);
        icons.appendChild(markAsDoneBtn);
        return icons;
    }

    deleteData(id) {
        if (store.currentState === "edit") return;
        const div = document.querySelector(".delete-item");
        div.style.display = "block";
        document.querySelector("#yes").addEventListener("click", () => {
            store.tasks = store.tasks.filter(task => task.id !== id);
            div.style.display = "none";
            drawTodo();
            saveData();
        });
        document.querySelector("#no").addEventListener("click", () => {
            div.style.display = "none";
            return;
        });
    }

    editEvent(task) {
        if (store.currentState === "edit") return;
        store.currentState = "edit";
        task.isEdited = true;
        store.checkbox.setAttribute('disabled', '');
        this.changeTodoCSS(task);
        const todo = document.getElementById(`input-${task.id}`);
        this.setValue(todo, task);

        document.getElementById(`button-${task.id}`).addEventListener("click", () => {
            if (todo.value.trim() === "")
                return;

            store.currentState = null;
            task.isEdited = false;
            store.checkbox.removeAttribute('disabled');
            task.title = todo.value;
            drawTodo();
        });
    }

    changeTodoCSS(task){
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

    markAsDone(task) {
        const todoDone = document.querySelector(`#to-do-${task.id}`);
        if (task.done) {
            task.done = false;
            todoDone.classList.remove("done");
        } else {
            task.done = true;
            todoDone.classList.add("done");
        }
        saveData();
    }
}
