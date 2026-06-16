import deleteSvg from '../assets/delete.svg';
import editSvg from '../assets/edit.svg';

import makeTaskUpdateDialog from './task-update-dialog.js';

let taskListHeader = function () {
    let element = document.createElement("h1");
    let spanProjectName = "<span id='project-name'>"
        + "TASKS" + "</span>";
    let spanProjectSubDir =
        "<span id='project-sub-dir' class='accent-text'>"
            + "All" + "</span>";
    element.innerHTML = `__${spanProjectName}_${spanProjectSubDir}`;

    return element;
}();

let tasksContaner = function () {

    let tasksList = document.createElement("ul");
    tasksList.id = "tasks-list";

    let taskAddButton = function () {
        let element = document.createElement("button");
        element.id = "task-add-button";
        element.classList.add("action-button");

        element.textContent = "Add New Task";

        return element;
    }();
    taskAddButton.addEventListener("click", () => {
        let dialog = makeTaskUpdateDialog("?", "create");
        dialog.showModal();
    })

    let element = document.createElement("div");
    element.id = "task-container";
    element.appendChild(tasksList);
    element.appendChild(taskAddButton);

    return element;
}();

let mainElement = document.createElement("main");
mainElement.appendChild(taskListHeader);
mainElement.appendChild(tasksContaner);


function makeNewTaskItem(text) {
    const tasksList = document.getElementById("tasks-list");

    let deleteButton = document.createElement("button");
    deleteButton.classList.add("task-delete-button");
    deleteButton.innerHTML = deleteSvg;

    let editButton = document.createElement("button");
    editButton.classList.add("task-edit-button");
    editButton.innerHTML = editSvg;

    let buttonsContainer = document.createElement("div");
    buttonsContainer.classList.add("task-button-container");
    buttonsContainer.appendChild(deleteButton);
    buttonsContainer.appendChild(editButton);

    let checkbox = document.createElement("input");
    checkbox.classList.add("task-checkbox");
    checkbox.type = "checkbox";

    let checkboxTaskWrapper = document.createElement("div");
    checkboxTaskWrapper.appendChild(checkbox);
    checkboxTaskWrapper.innerHTML += ` <span>${text}</span>`;

    let element = document.createElement("li");
    element.classList.add("task-item");
    element.appendChild(checkboxTaskWrapper);
    element.appendChild(buttonsContainer);

    tasksList.appendChild(element);
}


export { mainElement, makeNewTaskItem };
