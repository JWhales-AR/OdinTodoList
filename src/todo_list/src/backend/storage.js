import ProjectItem from "./project-item.js";
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

export default class ProjectItemList {
    #projectItems;

    constructor() {
        this.#projectItems = [];
    }

    appendProject(projectItem) {
        this.#projectItems.push(projectItem);
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
