import githubSVG from "./img/github.svg"
import deleteSVG from "./img/delete.svg"
import highSVG from "./img/high.svg"
import mediumSVG from "./img/medium.svg"
import lowSVG from "./img/low.svg"

const displayHandler = (function() {

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
        taskDate.textContent = date;
        taskPriority.classList.add("task-priority");
        taskDelete.classList.add("task-delete");
        taskDelete.src = deleteSVG;
        taskDelete.alt = "Delete trash sign"

        if (priority === 1) {
            taskPriority.src = highSVG;
        } else if (priority === 2) {
            taskPriority.src = mediumSVG;
        } else if (priority === 3) {
            taskPriority.src = lowSVG;
        }

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
        priorityMedium.classList.add("item");
        priorityMedium.textContent = "Medium";
        priorityLow.classList.add("item");
        priorityLow.textContent = "Low";

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
        loadFooter, loadSidebar, addProject, addTaskCard,
    }
})();

export default displayHandler;