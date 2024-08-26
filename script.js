// script.js

document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('task-input');
    const addTaskBtn = document.getElementById('push');
    const pendingTasksList = document.getElementById('pending-tasks');
    const completedTasksList = document.getElementById('completed-tasks');
    let isEditing = false;
    let currentTask = null;

    addTaskBtn.addEventListener('click', () => {
        if (isEditing && currentTask) {
            updateTask(currentTask);
        } else {
            addTask();
        }
    });

    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText !== '') {
            const taskItem = createTaskElement(taskText);
            pendingTasksList.appendChild(taskItem);
            taskInput.value = '';
            taskInput.focus();
        }
    }

    function createTaskElement(taskText) {
        const taskItem = document.createElement('li');
        taskItem.classList.add('task');
        taskItem.innerHTML = `
        <span>${taskText}</span>
        <button class="edit"><i class="fas fa-edit"></i></button>
        <button class="complete"><i class="fas fa-check"></i></button>
        <button class="delete"><i class="fas fa-trash"></i></button>
      `;

        const editBtn = taskItem.querySelector('.edit');
        editBtn.addEventListener('click', () => editTask(taskItem));

        const completeBtn = taskItem.querySelector('.complete');
        completeBtn.addEventListener('click', () => completeTask(taskItem));

        const deleteBtn = taskItem.querySelector('.delete');
        deleteBtn.addEventListener('click', () => deleteTask(taskItem));

        return taskItem;
    }

    function completeTask(taskItem) {
        taskItem.classList.add('completed');
        completedTasksList.appendChild(taskItem);
        const editBtn = taskItem.querySelector('.edit');
        const completeBtn = taskItem.querySelector('.complete');
        editBtn.remove();
        completeBtn.remove();
    }

    function editTask(taskItem) {
        const taskText = taskItem.querySelector('span').textContent;
        taskInput.value = taskText;
        taskInput.focus();
        isEditing = true;
        currentTask = taskItem;
    }

    function updateTask(taskItem) {
        const taskText = taskInput.value.trim();
        if (taskText !== '') {
            taskItem.querySelector('span').textContent = taskText;
            taskInput.value = '';
            taskInput.focus();
            isEditing = false;
            currentTask = null;
        }
    }

    function deleteTask(taskItem) {
        taskItem.remove();
        if (currentTask === taskItem) {
            taskInput.value = '';
            taskInput.focus();
            isEditing = false;
            currentTask = null;
        }
    }
});
 