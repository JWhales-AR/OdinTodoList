import "./style.css";
import { mainElement, makeNewTaskItem } from "./ui/mainelement.js";
import { sideBar, makeNewProjectItem } from "./ui/sidebar.js";
import ProjectItem from "./backend/project-item.js";
import TaskItem from "./backend/task-item.js";

const body = document.querySelector("body");

body.appendChild(sideBar);
body.appendChild(mainElement);

makeNewProjectItem(new ProjectItem("Default", "The Default Project"), false, true);
makeNewProjectItem(new ProjectItem("Project 1", "Contains stuff belonging to Project 1"));
makeNewProjectItem(new ProjectItem("Project 2", "You know the drill"));

makeNewTaskItem(new TaskItem("Dummy Task 1", "Description...", new Date(), "high"));
makeNewTaskItem(new TaskItem("Dummy Task 2", "Some Strange Task", new Date(), "medium"));
makeNewTaskItem(new TaskItem("Dummy Task 2", "I don't care anymore", new Date(), "low"));
