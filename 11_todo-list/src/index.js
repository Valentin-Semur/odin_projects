import "./styles.css";
import taskFactory from "./task.js"
import projectFactory from "./project.js"



const task1 = taskFactory()
console.log(task1.getTaskDetails())