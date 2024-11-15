import "./styles.css";
import dataHandler from "./dataHandler.js"
import displayHandler from "./displayHandler.js";


const logicInterface = (function() {

    let TASKS = [];
    let PROJECTS = [];

    const initAddTaskOption = () => {
        displayHandler.addCardaddTask();
        const submitTaskButton = document.querySelector(".task-new button");
        submitTaskButton.addEventListener("click", addTaskFromForm);
    }


    const showTask = (task) => {
        displayHandler.addTaskCard(
            task.isCompleted(),
            task.getName(),
            task.getDueDate(),
            task.getPriority()
        )
    }

    const showProject = (project) => {
        displayHandler.addProject(project.getName());
    }

    const showAllTasks = (projectFilter, priorityFilter, dateFilter) => { // add filter intelligence
        displayHandler.resetTasks();
        initAddTaskOption();
        
        for (let task of TASKS) {
            showTask(task);
        }
    }

    const addTaskFromForm = (e) => {
        e.preventDefault();
        const name = document.querySelector("#new-task-name input");
        const dueDate = document.querySelector("#new-task-date input");
        console.log(dueDate.value);
        const task = dataHandler.taskFactory()
            .setName(name.value)
            .setDueDate(new Date(dueDate.value))

        TASKS.push(task);
        showAllTasks();
        
        console.log("lol");
    }
    



    return {
        showTask, showProject, showAllTasks, initAddTaskOption, TASKS, PROJECTS
    }

})();





const createAndShowMockTasks = () => {
    const mockTasks = {
        task1: {
            name: "Do the dishes",
            dueDate: new Date("2029-09-01"),
            priority: 2,
            completed: false,
            project: "Life"
        },
        task2: {
            name: "Homework",
            dueDate: new Date("2020-01-01"),
            priority: 3,
            completed: true,
            project: "Work"
        },
        task3: {
            name: "Bisous to Magali",
            dueDate: new Date("2024-11-14"),
            priority: 4,
            completed: false,
            project: "Life"
        }
    }

    for (let [name, mockTask] of Object.entries(mockTasks)) {
        const task = dataHandler.taskFactory()
            .setName(mockTask.name)
            .setDueDate(mockTask.dueDate)
            .setPriority(mockTask.priority)
            .setCompleted(mockTask.completed)
            .setProject(mockTask.project)

        logicInterface.TASKS.push(task);
    }

    logicInterface.showAllTasks();
};

const createAndShowMockProjects = () => {
    const mockProjects = ["Work", "Life"];

    for (let mockProject of mockProjects) {
        const project = dataHandler.projectFactory()
            .setName(mockProject)

        logicInterface.showProject(project);
    }
}





displayHandler.loadFooter();
displayHandler.loadSidebar();

createAndShowMockTasks();
createAndShowMockProjects();
