import "./style.css";
import { mainElement, makeNewTaskItem } from "./ui/mainelement";
import { sideBar, makeNewProjectItem } from "./ui/sidebar";

const body = document.querySelector("body");

body.appendChild(sideBar);
body.appendChild(mainElement);

makeNewTaskItem("Dummy Task 1 | Due 10-05-2026 | High");
makeNewTaskItem("Dummy Task 2 | Due 10-08-2026 | Medium");
makeNewTaskItem("Dummy Task 3 | Due 10-05-2027 | Low");

makeNewProjectItem("Default", false);
makeNewProjectItem("Project 1");
makeNewProjectItem("Project 2");
