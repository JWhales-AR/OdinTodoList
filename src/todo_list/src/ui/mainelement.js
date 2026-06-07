import deleteSvg from '../assets/delete.svg';
import editSvg from '../assets/edit.svg';

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

    let tasksList = function () {

        function newTaskItem(text) {
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
            return element;
        }

        let element = document.createElement("ul");
        element.appendChild(newTaskItem("Dummy Task 1 | Due 10-05-2026 | Medium"));
        element.appendChild(newTaskItem("Dummy Task 2 | Due 10-04-2026 | Low"));
        element.appendChild(newTaskItem("Dummy Task 3 | Due 01-05-2026  | Medium"));

        return element;
    }();


    let taskAddButton = function () {
        let element = document.createElement("button");
        element.id = "task-add-button";
        element.classList.add("action-button");

        element.textContent = "Add New Task";

        return element;
    }();

    let element = document.createElement("div");
    element.id = "task-container";
    element.appendChild(tasksList);
    element.appendChild(taskAddButton);

    return element;
}();

let mainElement = document.createElement("main");
mainElement.appendChild(taskListHeader);
mainElement.appendChild(tasksContaner);

export default mainElement;
