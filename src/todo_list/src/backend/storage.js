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

    constructor() {
        this.#projectItems = [];
        this.selectedProjectID = undefined;
    }

    setSelectedProjectID(projectItem) {
        this.selectedProjectID = projectItem.getUUID();
        this.storeList();
    }

    getSelectedProjectID() {
        return this.selectedProjectID;
    }

    appendProject(projectItem) {
        this.#projectItems.push(projectItem);
        this.storeList();
    }

    appendTaskToSelectedProject(taskItem) {
        taskItem.setProjectID(this.selectedProjectID);
        for (let projectItem of this.#projectItems) {
            if (projectItem.getUUID() === this.selectedProjectID) {
                projectItem.appendTaskItem(taskItem);
                break;
            }
        }
        this.storeList();
    }

    removeTaskFromSelectedProject(taskItem) {
        for (let projectItem of this.#projectItems) {
            if (projectItem.getUUID() === taskItem.getProjectID()) {
                projectItem.removeTaskItem(taskItem);
                break;
            }
        }
        this.storeList();
    }

    getProjectItems = function * () {
        for (let projectItem of this.#projectItems) {
            yield projectItem;
        }
    }

    getSelectedProject() {
        for (let projectItem of this.#projectItems) {
            if (projectItem.getUUID() === this.selectedProjectID) {
                return projectItem;
            }
        }
    }

    static loadList() {
        let loadedListStringified = storage.getItem("projects");
        if (loadedListStringified !== null && loadedListStringified !== undefined) {
            let loadedList = JSON.parse(loadedListStringified);
            let newList = new ProjectItemList();
            newList.#projectItems = loadedList.projectItems.map(
                projectItemStringified => ProjectItem.parse(projectItemStringified)
            );;
            newList.selectedProjectID = loadedList.selectedProjectID;
            return newList;
        }
    }

    storeList() {
        storage.setItem("projects", JSON.stringify({
            projectItems: this.#projectItems
                .map(projectItem => projectItem.stringify()),
            selectedProjectID: this.selectedProjectID,
        }));
    }
}

let projectItemList;
let loadedProjectItemList = ProjectItemList.loadList();
if (loadedProjectItemList !== undefined) {
    projectItemList = loadedProjectItemList;
} else {
    projectItemList = new ProjectItemList();
    let defaultProjectItem = new ProjectItem("Default", "The Default Project", false);
    projectItemList.selectedProjectID = defaultProjectItem.getUUID();
    projectItemList.appendProject(defaultProjectItem);
}

console.log(projectItemList);

export default projectItemList;
