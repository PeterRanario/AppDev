function saveName() {
    const name = document.getElementById("username").value;
    document.getElementById("greeting").textContent = "Hello, " + name + "!";
    logActivity("User entered name: " + name);
}

function logActivity(message) {
    const logList = document.getElementById("activityLog");
    const li = document.createElement("li");
    li.textContent = message;
    li.className = "log";
    logList.appendChild(li);
}

class todoList {
    constructor() {
        this.editingIndex = -1;
        this.addButton = document.getElementById('addButton');
        this.todoInput = document.getElementById('todoInput');
        this.todoList = document.getElementById('todoList');

        this.addButton.addEventListener('click', () => this.addOrUpdateTask());
        this.todoList.addEventListener('click', (e) => {
            const action = e.target.classList.contains('removeButton') ? 'remove' :
                e.target.classList.contains('editButton') ? 'edit' :
                e.target.classList.contains('doneButton') ? 'done' : null;
            if (action) this[action + 'Task'](e);
        });
    }

    addOrUpdateTask() {
        const taskText = this.todoInput.value.trim();
        if (taskText) {
            this.editingIndex === -1 ? this.addTask(taskText) : this.updateTask(taskText);
            this.todoInput.value = '';
        }
    }

    addTask(taskText) {
        const listItem = document.createElement('li');
        listItem.className = 'todo-item';
        listItem.innerHTML = `
            <span class="task-text">${taskText}</span>
            <span class="timestamp" style="display:block;color:gray;">
                Date Added: ${new Date().toLocaleString()}
            </span>
            <div>
                <button class="doneButton">Done</button>
                <button class="editButton">Edit</button>
                <button class="removeButton">Remove</button>
            </div>
        `;
        this.todoList.appendChild(listItem);
        logActivity("Added task: " + taskText);
    }

    doneTask(event) {
        const taskItem = event.target.closest('.todo-item');
        taskItem.querySelector('.task-text').classList.toggle('completed');
        logActivity("Marked task as done");
    }

    updateTask(taskText) {
        this.todoList.children[this.editingIndex]
            .querySelector('.task-text').textContent = taskText;
        logActivity("Updated task to: " + taskText);
        this.resetEditing();
    }

    removeTask(event) {
        const task = event.target.closest('.todo-item')
            .querySelector('.task-text').textContent;
        this.todoList.removeChild(event.target.closest('.todo-item'));
        logActivity("Removed task: " + task);
    }

    editTask(event) {
        const taskItem = event.target.closest('.todo-item');
        this.todoInput.value = taskItem.querySelector('.task-text').textContent;
        this.editingIndex = Array.from(this.todoList.children).indexOf(taskItem);
        this.addButton.textContent = 'Update';
        logActivity("Editing a task");
    }

    resetEditing() {
        this.editingIndex = -1;
        this.addButton.textContent = 'Add';
    }
}

document.addEventListener('DOMContentLoaded', () => new todoList());
