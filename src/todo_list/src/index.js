import "./style.css";
import { mainElement, sideBar, makeTaskUpdateDialog } from "./ui";

let body = document.querySelector("body");

let taskUpdateDialogDummy = makeTaskUpdateDialog("?", "create");

body.appendChild(sideBar);
body.appendChild(mainElement);
body.appendChild(taskUpdateDialogDummy);

taskUpdateDialogDummy.showModal();
