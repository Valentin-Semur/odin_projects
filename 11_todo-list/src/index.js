import "./styles.css";
import dataHandler from "./dataHandler.js"
import displayHandler from "./displayHandler.js";


const logicInterface = (function() {

    let TASKS = [];
    let PROJECTS = [];
    let CURRENT_PAGE;

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
        const projectDiv = document.querySelector(`#id-${project.getName()}`);
        projectDiv.addEventListener("click", () => {showAllTasks(project.getName(), undefined, undefined)})
        const projectDelete = projectDiv.nextElementSibling;
        projectDelete.addEventListener("click", () => {removeProject(project)});
    }

    const removeProject = (projectToRemove) => {
        const updatedProjects = PROJECTS.filter(function(project) {
            return project !== projectToRemove;
        })
        PROJECTS = updatedProjects;
        showAllProjects();
        showAllTasks();
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

    const showAllTasks = (projectFilter, priorityFilter, todayFilter) => {
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

    const showAllProjects = () => {
        displayHandler.resetProjects();
        for (let project of PROJECTS) {
            showProject(project);
        }
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
    }

    const createAddProjectListener = () => {
        const addProjectDiv = document.querySelector("#add-project");
        addProjectDiv.addEventListener("click", displayHandler.showAddProjectInput);
    }

    return {
        showTask,
        showProject,
        showAllTasks,
        showAllProjects,
        initAddTaskOption,
        addPriorityFilter,
        createAddProjectListener,
        TASKS,
        PROJECTS
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

        logicInterface.PROJECTS.push(project);
    }
    logicInterface.showAllProjects();
}


const initPage = () => {
    displayHandler.loadFooter();


    displayHandler.loadSidebar();
    logicInterface.addPriorityFilter();

    createAndShowMockProjects();
    createAndShowMockTasks();
    logicInterface.createAddProjectListener();
}



initPage();
