import todaySvg from '../assets/today.svg';
import calendarAllSvg from '../assets/calendar_all.svg';
import incompleteSvg from '../assets/incomplete.svg';
import folderSvg from '../assets/folder.svg';
import deleteSvg from '../assets/delete.svg';
import editSvg from '../assets/edit.svg';

import makeProjectUpdateDialog from './project-update-dialog.js';
import ProjectItem from '../backend/project-item.js';
import projectItemList from '../backend/storage.js';


function updateProjectItemDisplay(projectItem) {
    const checkboxTaskText = document.getElementById(`${projectItem.getUUID()}`)
        .querySelector(".project-item span");
    checkboxTaskText.innerHTML =  `${folderSvg} ${projectItem.name}`;
}

function makeNewProjectItem(projectItem, modifiable = true, selected = false) {
    const projectsList = document.getElementById("projects-list");

    let element = document.createElement("li");
    element.id = projectItem.getUUID();
    element.classList.add("project-item");
    element.innerHTML = `<span>${folderSvg} ${projectItem.name}</span>`;

    if (modifiable) {
        let deleteButton = document.createElement("button");
        deleteButton.classList.add("project-delete-button");
        deleteButton.innerHTML = deleteSvg;
        deleteButton.addEventListener("click", (event) => {
            document.getElementById(element.id).remove();
            event.stopPropagation();
        });

        let editButton = document.createElement("button");
        editButton.classList.add("project-edit-button");
        editButton.innerHTML = editSvg;
        editButton.addEventListener("click", (event) => {
            makeProjectUpdateDialog(projectItem, "edit", updateProjectItemDisplay).showModal();
            event.stopPropagation();
        });

        let buttonsContainer = document.createElement("div");
        buttonsContainer.classList.add("project-button-container");
        buttonsContainer.appendChild(deleteButton);
        buttonsContainer.appendChild(editButton);
        element.appendChild(buttonsContainer);
    }

    element.addEventListener("click", () => {
        Array.from(document.getElementsByClassName("project-item"))
            .forEach((node) => {
                node.classList.remove("selected");
            });
        element.classList.add("selected");
    });

    projectsList.appendChild(element);
    projectItemList.appendProject(projectItem);
    if (selected) {
        projectItemList.selectedProjectID = projectItem.getUUID();
    }
}


let brandHeader = function () {
    let element = document.createElement("p");
    element.classList.add("sidebar-brand-header");
    element.innerHTML = "<span class='accent-text'>&ltodin&gt/</span>TODO_List";

    return element;
}();

let tasksView = function () {

    let optionsList = function () {

        function newGlobalOption(text) {
            let element = document.createElement("li");
            element.classList.add("task-global-option");
            element.innerHTML = `<span>${text}</span>`;
            return element;
        }

        let element = document.createElement("ul");
        element.appendChild(newGlobalOption(`${calendarAllSvg} All Tasks`));
        element.appendChild(newGlobalOption(`${todaySvg} Due Today`));
        element.appendChild(newGlobalOption(`${incompleteSvg} Incomplete Tasks`));

        return element;
    }();

    let element = document.createElement("div");
    element.id = "sidebar-tasks-view-container";
    element.classList.add("sidebar-view-container");
    element.appendChild(optionsList);

    return element;
}();

let projectsView = function () {

    let projectsViewHeader = function () {

        let addProjectButton = function () {
            let element = document.createElement("button");
            element.id = "add-project-button";
            element.classList.add("action-button");
            element.textContent = "+ Project";
            element.addEventListener("click", () => {
                makeProjectUpdateDialog(new ProjectItem("?"), "create", makeNewProjectItem)
                    .showModal();
            });

            return element;
        }();

        let element = document.createElement("div");
        element.id = "sidebar-project-view-header";

        let viewHeaderPara = document.createElement("p");
        viewHeaderPara.classList.add("accent-text");
        viewHeaderPara.textContent = "PROJECTS_";

        element.appendChild(viewHeaderPara);
        element.appendChild(addProjectButton);

        return element;

    }();

    let projectsList = document.createElement("ul");
    projectsList.id = "projects-list";

    let element = document.createElement("div");
    element.id = "sidebar-projects-view-container";
    element.classList.add("sidebar-view-container");

    element.appendChild(projectsViewHeader);
    element.appendChild(projectsList);

    return element;
}();

let sideBar = document.createElement("nav");
sideBar.classList.add("sidebar");
sideBar.appendChild(brandHeader);
sideBar.appendChild(tasksView);
sideBar.appendChild(projectsView);


export { sideBar, makeNewProjectItem };
