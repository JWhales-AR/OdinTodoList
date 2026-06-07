import todaySvg from './assets/today.svg';
import calendarAllSvg from './assets/calendar_all.svg';
import incompleteSvg from './assets/incomplete.svg';
import folderSvg from './assets/folder.svg';
import deleteSvg from './assets/delete.svg';
import editSvg from './assets/edit.svg';

let mainElement = function () {

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

    return mainElement;
}();


let sideBar = function () {

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

    return sideBar;
}();


function makeTaskUpdateDialog(taskName, actionName) {
    let updateForm = function () {
        function makeFormInput(inputName, inputId, labelText, inputType, placeholderText) {
            let element = document.createElement("p");
            element.classList.add("task-update-field");

            let input = document.createElement("input");
            input.type = inputType;
            if (placeholderText !== undefined) 
                input.placeholder = placeholderText;
            input.name = inputName;
            input.id = inputId;

            let label = document.createElement("label");
            label.textContent = labelText;
            label.htmlFor = inputId;

            element.appendChild(label);
            element.appendChild(input);

            return element;
        }

        let formHeader = function () {
            let element = document.createElement("h1");
            element.textContent = `task<${taskName}>.${actionName}()`;

            return element;
        }();

        let element = document.createElement("form");
        element.classList.add("task-update-form");

        let nameField = makeFormInput("task_name", "task-name", "Task Name", "text", "Task #");
        let descriptionField = function () {
            let element = document.createElement("p");
            element.classList.add("task-update-field");

            let input = document.createElement("textarea");
            input.placeholder = "Description...";
            input.name = "task_description";
            input.id = "task-description";

            let label = document.createElement("label");
            label.textContent = "Description";
            label.htmlFor = "task-description";

            element.appendChild(label);
            element.appendChild(input);

            return element;
        }();
        let priorityField = function () {
            function makePriorityRadio(radioId, labelText) {
                let radioWrapper = document.createElement("p");
                radioWrapper.classList.add("radio-wrapper");

                let element = document.createElement("input");
                element.classList.add("priority-radio-button");
                element.id = radioId;
                element.value = radioId;
                element.type = "radio";
                element.name = "priority";

                let label = document.createElement("label");
                label.htmlFor = radioId;
                label.textContent = labelText;

                radioWrapper.appendChild(element);
                radioWrapper.appendChild(label);

                return radioWrapper;
            }

            let element = document.createElement("p");
            element.classList.add("task-update-field");

            let label = document.createElement("label");
            label.textContent = "Priority";

            let radioContainer = document.createElement("div");
            radioContainer.classList.add("radio-container");
            radioContainer.appendChild(makePriorityRadio("low", "Low"));
            radioContainer.appendChild(makePriorityRadio("medium", "Medium"));
            radioContainer.appendChild(makePriorityRadio("high", "High"));

            element.appendChild(label);
            element.appendChild(radioContainer);

            return element;
        }();
        let dueDateField = makeFormInput("task_due_date", "task-due-date", "Due Date", "date");
        let taskConfirmButton = function () {
            let element = document.createElement("button");
            element.id = "task-confirm-button";
            element.classList.add("action-button");
            element.textContent = `${actionName} task`;

            return element;
        }();
        let taskUpdateCancelButton = function () {
            let element = document.createElement("button");
            element.id = "task-cancel-button";
            element.classList.add("borderless-action-button");
            element.textContent = "cancel";

            return element;
        }();

        let buttonsWrapper = document.createElement("p");
        buttonsWrapper.classList.add("buttons-wrapper");
        buttonsWrapper.appendChild(taskConfirmButton);
        buttonsWrapper.appendChild(taskUpdateCancelButton);

        element.appendChild(formHeader);
        element.appendChild(nameField);
        element.appendChild(descriptionField);
        element.appendChild(dueDateField);
        element.appendChild(priorityField);
        element.appendChild(buttonsWrapper);

        return element;
    }();

    let element = document.createElement("dialog");
    element.classList.add("task-update-dialog");
    element.appendChild(updateForm);
    
    return element;
};


export { mainElement, sideBar, makeTaskUpdateDialog };
