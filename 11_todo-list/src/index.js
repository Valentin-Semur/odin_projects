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

    const _isNotInPriorityFilter = (priority, filter) => {
        if (filter === "high" && (priority === 3 || priority === 4)) {
            return false;
        } else if (filter === "medium" && priority === 2) {
            return false;
        } else if (filter === "low" && (priority === 0 || priority === 1)) {
            return false;
        }
        return true
    }

    const _isNotToday = (date) => {
        return date.toLocaleString().split(',')[0] != new Date().toLocaleString().split(',')[0]
    }

    const showAllTasks = (projectFilter, priorityFilter, todayFilter) => { // add filter intelligence
        displayHandler.resetTasks();
        
        for (let task of TASKS) {
            if (task.getProject() != projectFilter && projectFilter != undefined) {
                continue;
            } else if (_isNotInPriorityFilter(task.getPriority(), priorityFilter) && priorityFilter != undefined) {
                continue;
            } else if (_isNotToday(task.getDueDate()) && todayFilter === true) {
                continue;
            } else {
                showTask(task);
            }
        }

        initAddTaskOption();
    }

    const addTaskFromForm = (e) => {
        e.preventDefault();
        const taskItem = displayHandler.getTaskCreatorValues();
        const task = dataHandler.taskFactory()
            .setName(taskItem.name)
            .setDueDate(taskItem.dueDate)
            .setPriority(taskItem.priority)
            .setProject(taskItem.project)
            .setDescription(taskItem.description)

        TASKS.push(task);
        showAllTasks();
    }

    const addPriorityFilter = () => {
        const high = document.querySelector("#priority-high");
        const medium = document.querySelector("#priority-medium");
        const low = document.querySelector("#priority-low");

        high.addEventListener("click", () => {showAllTasks(undefined, "high", undefined)})
        medium.addEventListener("click", () => {showAllTasks(undefined, "medium", undefined)})
        low.addEventListener("click", () => {showAllTasks(undefined, "low", undefined)})

        console.log(high)
    }

    return {
        showTask, showProject, showAllTasks, initAddTaskOption, addPriorityFilter, TASKS, PROJECTS
    }

})();





const createAndShowMockTasks = () => {
    const mockTasks = {
        task1: {
            name: "Do the dishes",
            dueDate: new Date("2024-11-15"),
            priority: 0,
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
            dueDate: new Date("2024-11-15"),
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


const initPage = () => {
    displayHandler.loadFooter();


    displayHandler.loadSidebar();
    logicInterface.addPriorityFilter();

    createAndShowMockTasks();
    createAndShowMockProjects();
}



initPage();
