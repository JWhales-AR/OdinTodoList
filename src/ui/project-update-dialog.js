import projectItemList from "../backend/storage.js";

const body = document.querySelector("body");

export default function makeProjectUpdateDialog(projectItem, actionName, refreshCommand) {
    let projectName = projectItem.name;

    let element = document.createElement("dialog");
    element.classList.add("project-update-dialog");

    let updateForm = function (dialog) {
        let nameField = function () {
            let element = document.createElement("p");
            element.classList.add("project-update-field");

            let input = document.createElement("input");
            input.name = "project_name";
            input.type = "text";
            input.id = "dialog-project-name";
            input.placeholder = projectName === "?" ? "Project #" : projectName;

            let label = document.createElement("label");
            label.textContent = "Project Name";
            label.htmlFor = input.id;

            element.appendChild(label);
            element.appendChild(input);

            return element;
        }();

        let formHeader = function () {
            projectName = projectName.length > 5 ?
                `${projectName.substr(0, 3)}..` : projectName;

            let element = document.createElement("h1");
            element.textContent = `project<${projectName}>.${actionName}()`;

            return element;
        }();

        let element = document.createElement("form");
        element.action = "#";
        element.onsubmit = "return false;";
        element.classList.add("project-update-form");

        let notesField = function () {
            let element = document.createElement("p");
            element.classList.add("project-update-field");

            let input = document.createElement("textarea");
            input.placeholder = projectItem.notes === undefined?
                "Notes..." : projectItem.notes;
            input.name = "project_notes";
            input.id = "dialog-project-notes";

            let label = document.createElement("label");
            label.textContent = "Notes";
            label.htmlFor = "project-notes";

            element.appendChild(label);
            element.appendChild(input);

            return element;
        }();
        let projectConfirmButton = function () {
            let element = document.createElement("button");
            element.type = "button";
            element.id = "project-confirm-button";
            element.classList.add("action-button");
            element.textContent = `${actionName} project`;
            element.addEventListener("click", () => {
                let projectNameInput = document.getElementById("dialog-project-name");
                projectItem.name = projectNameInput.value.length > 0?
                    projectNameInput.value : projectNameInput.placeholder;
                let projectNotesInput = document.getElementById("dialog-project-notes");
                projectItem.description = projectNotesInput.value.length > 0?
                    projectNotesInput.value : projectNotesInput.placeholder;

                if (refreshCommand !== undefined) {
                    refreshCommand(projectItem);
                }
                if (actionName === "create") {
                    projectItemList.appendProject(projectItem);
                } else {
                    projectItemList.storeList();
                }

                dialog.remove();
            });

            return element;
        }();
        let projectUpdateCancelButton = function () {
            let element = document.createElement("button");
            element.type = "button";
            element.id = "project-cancel-button";
            element.classList.add("borderless-action-button");
            element.textContent = "cancel";
            element.addEventListener("click", () => dialog.remove());

            return element;
        }();

        let buttonsWrapper = document.createElement("p");
        buttonsWrapper.classList.add("buttons-wrapper");
        buttonsWrapper.appendChild(projectConfirmButton);
        buttonsWrapper.appendChild(projectUpdateCancelButton);

        element.appendChild(formHeader);
        element.appendChild(nameField);
        element.appendChild(notesField);
        element.appendChild(buttonsWrapper);

        return element;
    }(element);

    element.appendChild(updateForm);

    body.appendChild(element);

    return element;
};
