import githubSVG from "./img/github.svg"

const displayHandler = (function() {






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
    }
})();

export default displayHandler;