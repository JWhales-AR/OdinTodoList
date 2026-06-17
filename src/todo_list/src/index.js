import "./style.css";
import { mainElement, makeNewTaskItem } from "./ui/mainelement.js";
import { sideBar, makeNewProjectItem } from "./ui/sidebar.js";
import ProjectItem from "./backend/project-item.js";
import TaskItem from "./backend/task-item.js";

const body = document.querySelector("body");

body.appendChild(sideBar);
body.appendChild(mainElement);

makeNewTaskItem(new TaskItem("Dummy Task 1", "Description...", "10-05-2026", "High"));
makeNewTaskItem(new TaskItem("Dummy Task 2", "Some Strange Task", "10-08-2026", "Medium"));
makeNewTaskItem(new TaskItem("Dummy Task 2", "I don't care anymore", "10-05-2026", "Low"));

makeNewProjectItem(new ProjectItem("Default", "The Default Project"), false);
makeNewProjectItem(new ProjectItem("Project 1", "Contains stuff belonging to Project 1"));
makeNewProjectItem(new ProjectItem("Project 2", "You know the drill"));
