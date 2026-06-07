import "./style.css";
import mainElement from "./ui/mainelement";
import sideBar from "./ui/sidebar";
import makeTaskUpdateDialog from "./ui/dialog";

let body = document.querySelector("body");

let taskUpdateDialogDummy = makeTaskUpdateDialog("?", "create");

body.appendChild(sideBar);
body.appendChild(mainElement);
body.appendChild(taskUpdateDialogDummy);

taskUpdateDialogDummy.showModal();
