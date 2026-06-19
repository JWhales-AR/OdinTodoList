import TaskItem from "./task-item.js";

export default class ProjectItem {
    #UUID = crypto.randomUUID();
    #taskItems = [];

    constructor(name, notes) {
        this.name = name;
        this.notes = notes;
    }

    getUUID() { return this.#UUID; }

    getTaskItems = function * () {
        for (let taskItem of this.#taskItems) {
            yield taskItem;
        }
    }

    appendTaskItem(taskItem) {
        this.#taskItems.push(taskItem);
    }

    removeTaskItem(taskItemToRemove) {
        this.#taskItems.splice(this.#taskItems.find(taskItem =>
            taskItem.getUUID() === taskItemToRemove.getUUID()
        ), 1);
    }

    stringify() {
        return JSON.stringify({
            privates: {
                UUID: this.#UUID,
                taskItems: this.#taskItems.map(taskItem => taskItem.stringify()),
            },
            data: this,
        });
    }

    static parse(projectItemStringified) {
        let loadedProjectItem = JSON.parse(projectItemStringified);
        let projectItem = Object.assign(new ProjectItem, loadedProjectItem.data);
        projectItem.#UUID = loadedProjectItem.privates.UUID;
        projectItem.#taskItems = loadedProjectItem.privates.taskItems
            .map(taskItemStringified => TaskItem.parse(taskItemStringified));
        return projectItem;
    }
};
