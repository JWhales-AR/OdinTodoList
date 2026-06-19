import "./style.css";
import { mainElement, renderTaskItemsInSelectedProject } from "./ui/mainelement.js";
import { sideBar, renderProjectItems } from "./ui/sidebar.js";
const body = document.querySelector("body");

body.appendChild(sideBar);
body.appendChild(mainElement);

renderProjectItems();
renderTaskItemsInSelectedProject();
