import todaySvg from '../assets/today.svg';
import calendarAllSvg from '../assets/calendar_all.svg';
import incompleteSvg from '../assets/incomplete.svg';
import folderSvg from '../assets/folder.svg';
import deleteSvg from '../assets/delete.svg';
import editSvg from '../assets/edit.svg';

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

    let projectsList = function () {

        function newProjectItem(text, modifiable = true) {
            let element = document.createElement("li");
            element.classList.add("project-item");
            element.innerHTML = `<span>${folderSvg} ${text}</span>`;

            if (modifiable) {
                let deleteButton = document.createElement("button");
                deleteButton.classList.add("project-delete-button");
                deleteButton.innerHTML = deleteSvg;

                let editButton = document.createElement("button");
                editButton.classList.add("project-edit-button");
                editButton.innerHTML = editSvg;

                let buttonsContainer = document.createElement("div");
                buttonsContainer.classList.add("project-button-container");
                buttonsContainer.appendChild(deleteButton);
                buttonsContainer.appendChild(editButton);
                element.appendChild(buttonsContainer);
            }

            return element;
        }

        let element = document.createElement("ul");
        element.appendChild(newProjectItem("Default", false));
        element.appendChild(newProjectItem("Project 1"));
        element.appendChild(newProjectItem("Project 2"));

        return element;
    }();

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

export default sideBar;
