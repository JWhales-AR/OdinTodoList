import TaskItem from "./task-item.js";

let storage;
try {
    storage = window["localStorage"];
} catch(e) {
    if (e instanceof ReferenceError) {
        let dummyStorage = {};
        storage = {
            setItem: function(name, value) {
                dummyStorage[name] = value;
            },
            getItem: function(name) {
                return dummyStorage[name];
            }
        };
    }
}

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

    stringify() {
        return JSON.stringify({
            privates: {
                UUID: this.#UUID,
                taskItems: this.#taskItems.map(taskItem => taskItem.stringify()),
            },
            data: this,
        });
    }

    static loadList() {
        return JSON.parse(storage.getItem("projects")).map(
            projectItemStringified => {
                let loadedProjectItem = JSON.parse(projectItemStringified);
                let projectItem = Object.assign(new ProjectItem, loadedProjectItem.data);
                projectItem.#UUID = loadedProjectItem.privates.UUID;
                projectItem.#taskItems = loadedProjectItem.privates.taskItems
                    .map(taskItemStringified => TaskItem.parse(taskItemStringified));
                return projectItem;
            }
        );
    }

    static storeList(projectItemList) {
        storage.setItem("projects",
            JSON.stringify(
                projectItemList
                    .map(projectItem => projectItem.stringify())
            ));
    }
};
