import githubSVG from "./img/github.svg"

const displayHandler = (function() {

    const _createElement = (type) => {
        const element = document.createElement(type);
        return element;
    }

    const _addClassesToElement = (element, classes) => {
        if (Array.isArray(classes)) {
            for (let cssClass of classes) {
                element.classList.add(cssClass);
            }
        } else {
            element.classList.add(classes);
        }
    }

    const _createElementWithTextClassID = (type, text, classes, id) => {
        const element = _createElement(type);
        element.textContent = text;
        if (typeof classes !== "undefined") {
            _addClassesToElement(element, classes);
        }
        if (typeof id !== "undefined") {
            element.id = id
        }
        return element;
    }

    
    const projectTitle = _createElementWithTextClassID("p", "Projects", "title");


    const loadSidebar = () => {
        const sidebarElement = document.querySelector("#sidebar");
        const inboxTitle = document.createElement("p");
        const todayTitle = document.createElement("p");
        const projectDiv = document.createElement("div");
        //const projectTitle = document.createElement("p");
        const addProject = document.createElement("p");
        const priorityDiv = document.createElement("div");
        const priorityTitle = document.createElement("p");
        const priorityHigh = document.createElement("p");
        const priorityMedium = document.createElement("p");
        const priorityLow = document.createElement("p");

        inboxTitle.textContent = "Inbox";
        todayTitle.textContent = "Today";
        projectDiv.id = "projects";
        //projectTitle.classList.add("title");
        //projectTitle.textContent = "Projects";
        addProject.classList.add("Item");
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

        const projectTitle = _createElementWithTextClassID("p", "Projects", "title");

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
        loadFooter, loadSidebar,
    }
})();

export default displayHandler;