let mainElement = function () {

    let taskListHeader = function () {
        let element = document.createElement("h1");
        let spanProjectName = "<span id='project-name'>"
            + "TASKS" + "</span>";
        let spanProjectSubDir =
            "<span id='project-sub-dir' class='accent-text'>"
            + "All" + "</span>";
        element.innerHTML = `__${spanProjectName}_${spanProjectSubDir}`;

        return element;
    }();

    let tasksContaner = function () {

        let tasksList = function () {

            function newTaskItem(text) {
                let element = document.createElement("li");
                element.textContent = text;
                return element;
            }

            let element = document.createElement("ul");
            element.appendChild(newTaskItem("Dummy Task 1"));
            element.appendChild(newTaskItem("Dummy Task 2"));
            element.appendChild(newTaskItem("Dummy Task 3"));

            return element;
        }();


        let taskAddButton = function () {
            let element = document.createElement("button");
            element.id = "task-add-button";
            element.classList.add("task-button");
        
            element.textContent = "Add New Task";

            return element;
        }();

        let element = document.createElement("div");
        element.id = "task-container";
        element.appendChild(tasksList);
        element.appendChild(taskAddButton);

        return element;
    }();

    let mainElement = document.createElement("main");
    mainElement.appendChild(taskListHeader);
    mainElement.appendChild(tasksContaner);

    return mainElement;
}();


let sideBar = function () {

    let brandHeader = function () {
        let element = document.createElement("p");
        element.classList.add("sidebar-brand-header");
        element.innerHTML = "<span class='accent-text'>&ltodin&gt/</span>TODO_List";

        return element;
    }();

    let tasksView = function () {

        let optionsList = function () {

            function newListElement(text) {
                let element = document.createElement("li");
                element.textContent = text;
                return element;
            }

            let element = document.createElement("ul");
            element.appendChild(newListElement("All Tasks"));
            element.appendChild(newListElement("Due Today"));
            element.appendChild(newListElement("Incomplete Tasks"));

            return element;
        }();

        let element = document.createElement("div");
        element.id = "sidebar-tasks-view-container";
        element.classList.add("sidebar-view-container");
        element.appendChild(optionsList);

        return element;
    }();

    let projectsView = function () {

        let projectsViewHeader = function () {

            let addProjectButton = function () {
                let element = document.createElement("button");
                element.id = "add-project-button";
                element.classList.add("project-button");
                element.textContent = "+ Project";

                return element;
            }();

            let element = document.createElement("div");
            element.id = "sidebar-project-view-header";

            let viewHeaderPara = document.createElement("p");
            viewHeaderPara.classList.add("accent-text");
            viewHeaderPara.textContent = "PROJECTS_";

            element.appendChild(viewHeaderPara);
            element.appendChild(addProjectButton);

            return element;
        
        }();

        let projectsList = function () {

            function newListElement(text) {
                let element = document.createElement("li");
                element.textContent = text;
                return element;
            }

            let element = document.createElement("ul");
            element.appendChild(newListElement("Default"));
            element.appendChild(newListElement("Project 1"));
            element.appendChild(newListElement("Project 2"));

            return element;
        }();

        let element = document.createElement("div");
        element.id = "sidebar-projects-view-container";
        element.classList.add("sidebar-view-container");

        element.appendChild(projectsViewHeader);
        element.appendChild(projectsList);

        return element;
    }();

    let sideBar = document.createElement("nav");
    sideBar.classList.add("sidebar");
    sideBar.appendChild(brandHeader);
    sideBar.appendChild(tasksView);
    sideBar.appendChild(projectsView);

    return sideBar;
}();


export { mainElement, sideBar };
