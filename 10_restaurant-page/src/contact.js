import gusImage from "./img/people/gus.png";
import pamImage from "./img/people/pam.png";
import clintImage from "./img/people/clint.png";

const createContactContent = function() {
    const contactContent = document.createElement("div");
    contactContent.id = "contact-content";

    const title = document.createElement("h1");
    title.textContent = "Contact";
    contactContent.appendChild(title);

    const people = [
        {
            "name": "Gus",
            "image": gusImage,
            "quote": "Pam and Clint come into the saloon almost every night. I'd probably go out of business if they stopped coming. So make sure you don't drive them away!"
        },
        {
            "name": "Pam",
            "image": pamImage,
            "quote": "I was reading the newspaper this morning but then I got depressed. It's a rotten world, kid. Keep your head screwed on right and you'll make it through in one piece... That's what my Pappy always used to say. Heh heh heh."
        },
        {
            "name": "Clint",
            "image": clintImage,
            "quote": "It's nicer to work outdoors than by a hot furnace all day. I'm only a blacksmith because my father pushed me into it."
        }
    ]

    for (let character of people) {
        const characterCard = createContactCard(character);
        contactContent.appendChild(characterCard);
    }

    return contactContent
}

const createContactCard = function(contact) {
    const contactCard = document.createElement("div");
    contactCard.classList.add("contact-card");

    const contactName = document.createElement("h2");
    contactName.textContent = contact.name;
    contactCard.appendChild(contactName);

    const contactImage = document.createElement("img");
    contactImage.src = contact.image;
    contactCard.appendChild(contactImage);

    const contactQuote = document.createElement("p");
    contactQuote.textContent = contact.quote;
    contactCard.appendChild(contactQuote);

    return contactCard
}


export {createContactContent};