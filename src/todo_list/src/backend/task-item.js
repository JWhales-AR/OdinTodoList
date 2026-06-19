import { format } from "date-fns";

function capitalize(string) {
    return string[0].toUpperCase() + string.substr(1);
}

export default class TaskItem {
    #UUID = crypto.randomUUID();
    #projectID;

    constructor(name, description, dueDate, priority, projectID) {
        this.name = name;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.#projectID = projectID;
    }

    getUUID() { return this.#UUID; }

    getProjectID() { return this.#projectID; }
    setProjectID(projectID) { this.#projectID = projectID; }

    getNameDuePriority() {
        return `${this.name} | Due ${format(this.dueDate, "eee, dd MMMM")} | ${capitalize(this.priority)}`
    }

    stringify() {
        return JSON.stringify({
            privates: {
                UUID: this.#UUID,
                projectID: this.#projectID,
            },
            data: this,
        })
    }

    static parse(taskItemStringified) {
        let loadedTaskItem = JSON.parse(taskItemStringified);
        let taskItem = Object.assign(new TaskItem, loadedTaskItem.data);
        taskItem.#UUID = loadedTaskItem.privates.UUID;
        taskItem.#projectID = loadedTaskItem.privates.projectID;
        return taskItem;
    }
}
