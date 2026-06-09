const body = document.querySelector("body");

export default function makeProjectUpdateDialog(projectName, actionName) {
    let element = document.createElement("dialog");
    element.classList.add("project-update-dialog");

    let updateForm = function (dialog) {
        let nameField = function () {
            let element = document.createElement("p");
            element.classList.add("project-update-field");

            let input = document.createElement("input");
            input.name = "project_name";
            input.type = "text";
            input.id = "project-id";
            input.placeholder = "Project #";

            let label = document.createElement("label");
            label.textContent = "Project Name";
            label.htmlFor = input.id;

            element.appendChild(label);
            element.appendChild(input);

            return element;
        }();

        let formHeader = function () {
            let element = document.createElement("h1");
            element.textContent = `project<${projectName}>.${actionName}()`;

            return element;
        }();

        let element = document.createElement("form");
        element.action = "#";
        element.onsubmit = "return false;";
        element.classList.add("project-update-form");

        let descriptionField = function () {
            let element = document.createElement("p");
            element.classList.add("project-update-field");

            let input = document.createElement("textarea");
            input.placeholder = "Notes...";
            input.name = "project_notes";
            input.id = "project-notes";

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
                dialog.close();
            });

            return element;
        }();
        let projectUpdateCancelButton = function () {
            let element = document.createElement("button");
            element.type = "button";
            element.id = "project-cancel-button";
            element.classList.add("borderless-action-button");
            element.textContent = "cancel";
            element.addEventListener("click", () => dialog.close());

            return element;
        }();

        let buttonsWrapper = document.createElement("p");
        buttonsWrapper.classList.add("buttons-wrapper");
        buttonsWrapper.appendChild(projectConfirmButton);
        buttonsWrapper.appendChild(projectUpdateCancelButton);

        element.appendChild(formHeader);
        element.appendChild(nameField);
        element.appendChild(descriptionField);
        element.appendChild(buttonsWrapper);

        return element;
    }(element);

    element.appendChild(updateForm);

    body.appendChild(element);

    return element;
};
