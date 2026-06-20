import projectItemList from "../backend/storage.js";

const body = document.querySelector("body");

export default function makeTaskUpdateDialog(taskItem, actionName, refreshCommand) {
    let taskName = taskItem.name;
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

            if (inputType === "date" && taskItem.dueDate !== undefined) {
                input.valueAsDate = taskItem.dueDate;
            }

            let label = document.createElement("label");
            label.textContent = labelText;
            label.htmlFor = inputId;

            element.appendChild(label);
            element.appendChild(input);

            return element;
        }

        let formHeader = function () {
            let taskNameShort = taskName.length > 5 ?
                `${taskName.substr(0, 3)}..` : taskName;

            let element = document.createElement("h1");
            element.textContent = `task<${taskNameShort}>.${actionName}()`;

            return element;
        }();

        let element = document.createElement("form");
        element.action = "#";
        element.onsubmit = "return false;";
        element.classList.add("task-update-form");

        let nameField = makeFormInput(
            "task_name", "task-name", "Task Name", "text",
            taskName === "?"? "Task #" : taskName
        );
        let descriptionField = function () {
            let element = document.createElement("p");
            element.classList.add("task-update-field");

            let input = document.createElement("textarea");
            input.placeholder = taskItem.description === undefined?
                "Description..." : taskItem.description;
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
                if ((taskItem.priority === radioId)
                    || (taskItem.priority === undefined && radioId === "low")) {
                        element.checked = true;
                    }
                let label = document.createElement("label");
                label.htmlFor = element.id;
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
                let taskNameInput = document.getElementById("task-name");
                taskItem.name = taskNameInput.value.length > 0?
                    taskNameInput.value : taskNameInput.placeholder;
                let taskDescriptionInput = document.getElementById("task-description");
                taskItem.description = taskDescriptionInput.value.length > 0?
                    taskDescriptionInput.value : taskDescriptionInput.placeholder;
                let dueDateInput = document.getElementById("task-due-date");
                taskItem.dueDate = dueDateInput.value === ""?
                    new Date() : dueDateInput.valueAsDate;
                let priorityRadioChecked = document.querySelector(".priority-radio-button[name='priority']:checked");
                taskItem.priority = priorityRadioChecked.value;

                if (refreshCommand !== undefined) {
                    refreshCommand(taskItem);
                }
                if (actionName === "create") {
                    projectItemList.appendTaskToSelectedProject(taskItem);
                } else {
                    projectItemList.storeList();
                }

                dialog.remove();
            });

            return element;
        }();
        let taskUpdateCancelButton = function () {
            let element = document.createElement("button");
            element.type = "button";
            element.id = "task-cancel-button";
            element.classList.add("borderless-action-button");
            element.textContent = "cancel";
            element.addEventListener("click", () => dialog.remove());

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
