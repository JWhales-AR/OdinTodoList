import ProjectItem from "./project-item.js";

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

export class ProjectItemList {
    #projectItems;

    constructor(selectedProjectID) {
        this.#projectItems = [];
        this.selectedProjectID = selectedProjectID;
    }

    appendProject(projectItem) {
        this.#projectItems.push(projectItem);
    }

    appendTaskToSelectedProject(taskItem) {
        taskItem.setProjectID(this.selectedProjectID);
        for (let projectItem of this.#projectItems) {
            if (projectItem.getUUID() === this.selectedProjectID) {
                projectItem.appendTaskItem(taskItem);
                break;
            }
        }
    }

    removeTaskFromSelectedProject(taskItem) {
        for (let projectItem of this.#projectItems) {
            if (projectItem.getUUID() === taskItem.getProjectID()) {
                projectItem.removeTaskItem(taskItem);
                break;
            }
        }
    }

    getProjectItems = function * () {
        for (let projectItem of this.#projectItems) {
            yield projectItem;
        }
    }

    static loadList() {
        let loadedList = JSON.parse(storage.getItem("projects")).map(
            projectItemStringified => ProjectItem.parse(projectItemStringified)
        );
        let newList = new ProjectItemList();
        newList.#projectItems = loadedList;
        return newList;
    }

    storeList() {
        storage.setItem("projects",
            JSON.stringify(
                this.#projectItems
                    .map(projectItem => projectItem.stringify())
            ));
    }
}

let projectItemList = new ProjectItemList();
export default projectItemList;
