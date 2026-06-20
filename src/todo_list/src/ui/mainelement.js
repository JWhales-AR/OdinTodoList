import deleteSvg from '../assets/delete.svg';
import editSvg from '../assets/edit.svg';
import TaskItem from '../backend/task-item.js';
import projectItemList from '../backend/storage.js';
import makeTaskUpdateDialog from './task-update-dialog.js';


function updateTaskItemDisplay(taskItem) {
    const checkboxTaskText = document.getElementById(`${taskItem.getUUID()}`)
        .querySelector(".task-checkbox-wrapper span");
    checkboxTaskText.innerHTML = taskItem.getNameDuePriority();
}

function makeNewTaskItem(taskItem) {
    let element = document.createElement("li");
    element.classList.add("task-item");
    element.id = taskItem.getUUID();

    let deleteButton = document.createElement("button");
    deleteButton.classList.add("task-delete-button");
    deleteButton.innerHTML = deleteSvg;
    deleteButton.addEventListener("click", (event) => {
        document.getElementById(element.id).remove();
        projectItemList.removeTaskFromSelectedProject(taskItem);
        event.stopPropagation();
    });

    let editButton = document.createElement("button");
    editButton.classList.add("task-edit-button");
    editButton.innerHTML = editSvg;
    editButton.addEventListener("click", (event) => {
        makeTaskUpdateDialog(taskItem, "edit", updateTaskItemDisplay)
            .showModal();
        event.stopPropagation();
    });

    let buttonsContainer = document.createElement("div");
    buttonsContainer.classList.add("task-button-container");
    buttonsContainer.appendChild(deleteButton);
    buttonsContainer.appendChild(editButton);

    let checkbox = document.createElement("input");
    checkbox.classList.add("task-checkbox");
    checkbox.innerHTML = "";
    checkbox.type = "checkbox";
    if (taskItem.completed) {
        checkbox.checked = true;
    }
    checkbox.addEventListener("change", () => {
        taskItem.toggleCompletion();
        projectItemList.storeList();
    });

    let labelSpan = document.createElement("span");
    labelSpan.textContent = ` ${taskItem.getNameDuePriority()}`;

    let checkboxTaskWrapper = document.createElement("div");
    checkboxTaskWrapper.classList.add("task-checkbox-wrapper");
    checkboxTaskWrapper.appendChild(checkbox);
    checkboxTaskWrapper.appendChild(labelSpan);

    element.appendChild(checkboxTaskWrapper);
    element.appendChild(buttonsContainer);

    const tasksList = document.getElementById("tasks-list");
    tasksList.appendChild(element);
}

function renderTaskItemsInSelectedProject() {
    Array.from(document.getElementsByClassName("task-item"))
        .forEach(node => node.remove());
    let selectedProject = projectItemList.getSelectedProject();
    if (selectedProject !== undefined) {
        for (let taskItem of selectedProject.getTaskItems()) {
            makeNewTaskItem(taskItem);
        }
    }
    // Array.from(document.getElementsByClassName("task-checkbox"))
    //     .forEach(node => node.addEventListener("change", event => {
    //         console.log(event.target);
    //     }))
}


let taskListHeader = function () {
    let element = document.createElement("h1");
    let spanProjectName = "<span id='project-name'>"
        + "Default" + "</span>";
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
        let dialog = makeTaskUpdateDialog(new TaskItem("?"), "create", makeNewTaskItem);
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


export { mainElement, makeNewTaskItem, renderTaskItemsInSelectedProject };
