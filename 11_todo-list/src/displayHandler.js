import githubSVG from "./img/github.svg"
import deleteSVG from "./img/delete.svg"
import veryHighSVG from "./img/very-high.svg"
import highSVG from "./img/high.svg"
import mediumSVG from "./img/medium.svg"
import lowSVG from "./img/low.svg"
import veryLowSVG from "./img/very-low.svg"

const displayHandler = (function() {

    const _priorities = [
        {
            name: "very low",
            image: veryLowSVG
        },
        {
            name: "low",
            image: lowSVG
        },
        {
            name: "medium",
            image: mediumSVG
        },
        {
            name: "high",
            image: highSVG
        },
        {
            name: "very high",
            image: veryHighSVG
        }
    ]
    
    const _setTaskCreator = () => {
        const taskCreatorWrapper = document.createElement("div");
        const taskCreatorForm = document.createElement("form");
        const taskName = document.createElement("div");
        const taskNameTitle = document.createElement("p");
        const taskNameInput = document.createElement("input");
        const taskDescription = document.createElement("div");
        const taskDescriptionTitle = document.createElement("p");
        const taskDescriptionInput = document.createElement("input");
        const taskDate = document.createElement("div");
        const taskDateTitle = document.createElement("p");
        const taskDateInput = document.createElement("input");
        const taskPriority = document.createElement("div");
        const taskPriorityTitle = document.createElement("p");
        const taskPriorityInput = document.createElement("select");
        const taskProject = document.createElement("div");
        const taskProjectTitle = document.createElement("p");
        const taskProjectInput = document.createElement("select");
        const taskSubmit = document.createElement("button");

        for (let priority of _priorities) {
            const priorityOption = document.createElement("option");
            priorityOption.textContent = priority.name;
            taskPriorityInput.appendChild(priorityOption);
        }

        const _projects = ["No project", "Work", "Life"]; // to make dynamic
        for (let project of _projects) {
            const projectOption = document.createElement("option");
            projectOption.textContent = project;
            taskProjectInput.appendChild(projectOption);
        }

        taskCreatorWrapper.classList.add("wrapper");
        taskName.id = "new-task-name";
        taskNameTitle.textContent = "Task name";
        taskDescription.id = "new-task-description";
        taskDescriptionTitle.textContent = "Description";
        taskDate.id = "new-task-date";
        taskDateTitle.textContent = "Date";
        taskDateInput.type = "date";
        taskPriority.id = "new-task-priority";
        taskPriorityTitle.textContent = "Priority";
        taskProject.id = "new-task-project";
        taskProjectTitle.textContent = "Project";
        taskSubmit.textContent = "Add task";


        taskName.appendChild(taskNameTitle);
        taskName.appendChild(taskNameInput);
        taskDescription.appendChild(taskDescriptionTitle);
        taskDescription.appendChild(taskDescriptionInput);
        taskDate.appendChild(taskDateTitle);
        taskDate.appendChild(taskDateInput);
        taskPriority.appendChild(taskPriorityTitle);
        taskPriority.appendChild(taskPriorityInput);
        taskProject.appendChild(taskProjectTitle);
        taskProject.appendChild(taskProjectInput);

        taskCreatorForm.appendChild(taskName)
        taskCreatorForm.appendChild(taskDescription);
        taskCreatorForm.appendChild(taskDate);
        taskCreatorForm.appendChild(taskPriority);
        taskCreatorForm.appendChild(taskProject);
        taskCreatorForm.appendChild(taskSubmit);

        taskCreatorWrapper.appendChild(taskCreatorForm);

        return taskCreatorWrapper;
    }

    const _toggleTaskCreator = () => {
        const taskCreatorWrapper = document.querySelector(".wrapper");
        taskCreatorWrapper.classList.toggle("is-open");
    }

    const getTaskCreatorValues = () => {
        const nameInput = document.querySelector("#new-task-name input");
        const dueDateInput = document.querySelector("#new-task-date input");
        const priorityInput = document.querySelector("#new-task-priority select");
        const projectInput = document.querySelector("#new-task-project select");
        const descriptionInput = document.querySelector("#new-task-description input");

        const name = nameInput.value;
        const dueDate = new Date(dueDateInput.value);
        const priority = _priorities.findIndex(function(priority) {
            return priority.name == priorityInput.value
        });
        const project = projectInput.value;
        const description = descriptionInput.value;

        return {
            name: name,
            dueDate: dueDate,
            priority: priority,
            project: project,
            description: description
        }
    }
    
    const addCardaddTask = () => {
        const contentElement = document.querySelector("#content");
        const addTaskCard = document.createElement("div");
        const addTaskTitle = document.createElement("p");
        const taskCreator = _setTaskCreator();

        addTaskTitle.textContent = "+ Add new task";
        addTaskCard.classList.add("task-new");

        addTaskTitle.addEventListener("click", _toggleTaskCreator)

        addTaskCard.appendChild(addTaskTitle);
        addTaskCard.appendChild(taskCreator);
        contentElement.appendChild(addTaskCard);
    }

    const addTaskCard = (completed, name, date, priority) => {
        const contentElement = document.querySelector("#content");
        const taskCard = document.createElement("div");
        const taskComplete = document.createElement("input");
        const taskName = document.createElement("p");
        const taskDate = document.createElement("p");
        const taskPriority = document.createElement("img");
        const taskDelete = document.createElement("img");

        // are all those classes really necessary ?
        taskCard.classList.add("task-card");
        taskComplete.classList.add("task-complete");
        taskComplete.type = "checkbox";
        taskComplete.checked = completed;
        taskName.classList.add("task-name");
        taskName.textContent = name;
        taskDate.classList.add("task-date");
        taskDate.textContent = date.toLocaleDateString();
        taskPriority.classList.add("task-priority");
        taskPriority.src = _priorities[priority].image;
        taskDelete.classList.add("task-delete");
        taskDelete.src = deleteSVG;
        taskDelete.alt = "Delete trash sign"

        taskCard.appendChild(taskComplete);
        taskCard.appendChild(taskName);
        taskCard.appendChild(taskDate);
        taskCard.appendChild(taskPriority);
        taskCard.appendChild(taskDelete);
        contentElement.appendChild(taskCard);
    }

    const addProject = (name) => {
        const addProject = document.querySelector("#add-project");
        const projectDiv = document.createElement("div");
        const projectName = document.createElement("p");
        const projectDelete = document.createElement("img");

        projectDiv.classList.add("item");
        projectName.textContent = name;
        projectDelete.id = "delete-icon";
        projectDelete.src = deleteSVG;
        projectDelete.alt = "Delete trash sign";

        projectDiv.appendChild(projectName);
        projectDiv.appendChild(projectDelete);
        addProject.before(projectDiv);
    }

    const resetTasks = () => {
        const contentElement = document.querySelector("#content");
        contentElement.innerHTML = ""; 
    }
    
    const loadSidebar = () => {
        const sidebarElement = document.querySelector("#sidebar");
        const inboxTitle = document.createElement("p");
        const todayTitle = document.createElement("p");
        const projectDiv = document.createElement("div");
        const projectTitle = document.createElement("p");
        const addProject = document.createElement("p");
        const priorityDiv = document.createElement("div");
        const priorityTitle = document.createElement("p");
        const priorityHigh = document.createElement("p");
        const priorityMedium = document.createElement("p");
        const priorityLow = document.createElement("p");

        inboxTitle.textContent = "Inbox";
        todayTitle.textContent = "Today";
        projectDiv.id = "projects";
        projectTitle.classList.add("title");
        projectTitle.textContent = "Projects";
        addProject.classList.add("item");
        addProject.id = "add-project";
        addProject.textContent = "+ Add project";
        priorityDiv.id = "priorities";
        priorityTitle.classList.add("title");
        priorityTitle.textContent = "Priority";
        priorityHigh.classList.add("item");
        priorityHigh.textContent = "High";
        priorityHigh.id = "priority-high";
        priorityMedium.classList.add("item");
        priorityMedium.textContent = "Medium";
        priorityMedium.id = "priority-medium";
        priorityLow.classList.add("item");
        priorityLow.textContent = "Low";
        priorityLow.id = "priority-low";

        priorityDiv.appendChild(priorityTitle);
        priorityDiv.appendChild(priorityHigh);
        priorityDiv.appendChild(priorityMedium);
        priorityDiv.appendChild(priorityLow);
        projectDiv.appendChild(projectTitle);
        projectDiv.appendChild(addProject);
        sidebarElement.appendChild(inboxTitle);
        sidebarElement.appendChild(todayTitle);
        sidebarElement.appendChild(projectDiv);
        sidebarElement.appendChild(priorityDiv);
    }

    const loadFooter = () => {
        const footerElement = document.querySelector("footer");
        const copyrightText = document.createElement("p");
        const githubLink = document.createElement("a");
        const githubImage = document.createElement("img");
    
        copyrightText.textContent = "© 2024 - Valentin Semur"
        githubLink.href = "https://github.com/Valentin-Semur"
        githubImage.src = githubSVG;
        githubImage.alt = "Github logo"
    
        footerElement.appendChild(copyrightText);
        githubLink.appendChild(githubImage);
        footerElement.appendChild(githubLink);
    }


    return {
        loadFooter,
        loadSidebar,
        addProject,
        addTaskCard,
        addCardaddTask,
        resetTasks,
        getTaskCreatorValues,
    }
})();

export default displayHandler;