const body = document.querySelector("body");

export default function makeTaskUpdateDialog(taskName, actionName) {
    let element = document.createElement("dialog");
    element.classList.add("task-update-dialog");

    let updateForm = function (dialog) {
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
        element.action = "#";
        element.onsubmit = "return false;";
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
            element.type = "button";
            element.id = "task-confirm-button";
            element.classList.add("action-button");
            element.textContent = `${actionName} task`;
            element.addEventListener("click", () => {
                dialog.close();
            });

            return element;
        }();
        let taskUpdateCancelButton = function () {
            let element = document.createElement("button");
            element.type = "button";
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
    }(element);

    element.appendChild(updateForm);

    body.appendChild(element);
    
    return element;
};
