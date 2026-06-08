import "./style.css";
import mainElement from "./ui/mainelement";
import sideBar from "./ui/sidebar";

let body = document.querySelector("body");

body.appendChild(sideBar);
body.appendChild(mainElement);
