
const createHomeContent = function() {
    const homeContent = document.createElement("div");
    homeContent.id = "home-content";

    const title = document.createElement("h1");
    title.textContent = "The Stardrop Salon";
    homeContent.appendChild(title);

    const description = createDescription();
    homeContent.appendChild(description);

    const hours = createHours();
    homeContent.appendChild(hours);

    const location = createLocation();
    homeContent.appendChild(location);

    return homeContent;
}

const createDescription = function() {
    const description = document.createElement("div");
    description.id = "description";
    
    const title = document.createElement("h2");
    title.textContent = "Description";
    description.appendChild(title);
    
    const text = document.createElement("p");
    text.textContent = "The Stardrop Saloon is owned by Gus, and is located in the center of Pelican Town. It's a meeting place for many villagers, and hosts a variety of entertainment, including fully playable arcade machines, a jukebox, and a Joja Cola vending machine.";
    description.appendChild(text);

    return description;
}

const createHours = function() {
    const hours = document.createElement("div");
    hours.id = "hours";

    const title = document.createElement("h2");
    title.textContent = "Hours";
    hours.appendChild(title);

    const daysOfTheWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    for (let day of daysOfTheWeek) {
        const dailySchedule = document.createElement("p");
        dailySchedule.textContent = day + " 12pm - 12am";
        hours.appendChild(dailySchedule);
    }

    return hours
}

const createLocation = function() {
    const location = document.createElement("div");
    location.id = "location";

    const title = document.createElement("h2");
    title.textContent = "Location";
    location.appendChild(title);

    const text = document.createElement("p");
    text.textContent = "Center of Pelican Town";
    location.appendChild(text);

    return location;
}






export {createHomeContent};
