import "./styles.css";
import { createHomeContent } from "./home.js"
import { createMenuContent } from "./menu.js";
import { createContactContent } from "./contact.js";

const showHomePage = function() {
    const container = document.querySelector("#content-container");
    container.innerHTML = "";

    const homeContent = createHomeContent();
    container.appendChild(homeContent);
}

const showMenuPage = function() {
    const container = document.querySelector("#content-container");
    container.innerHTML = "";
    
    const menuContent = createMenuContent();
    container.appendChild(menuContent);
}

const showContactPage = function() {
    const container = document.querySelector("#content-container");
    container.innerHTML = "";
    
    const contactContent = createContactContent();
    container.appendChild(contactContent);
}

const initButtons = function() {
    const homeButton = document.querySelector("#home-button");
    homeButton.addEventListener("click", showHomePage);

    const menuButton = document.querySelector("#menu-button");
    menuButton.addEventListener("click", showMenuPage);

    const contactButton = document.querySelector("#contact-button");
    contactButton.addEventListener("click", showContactPage);
}




showContactPage();
initButtons();