import beerImage from "./img/menu/beer.png";
import breadImage from "./img/menu/bread.png";
import coffeeImage from "./img/menu/coffee.png";
import pizzaImage from "./img/menu/pizza.png";
import saladImage from "./img/menu/salad.png";
import spaghettiImage from "./img/menu/spaghetti.png"
import gold from "./img/menu/gold.png"

const createMenuContent = function() {
    console.log("menu");

    const menuContent = document.createElement("div");
    menuContent.id = "menu-content";

    const title = document.createElement("h1");
    title.textContent = "Menu";
    menuContent.appendChild(title);

    const menuItems = [
        {
            "name": "Beer",
            "image": beerImage,
            "price": "400g"
        },
        {
            "name": "Bread",
            "image": breadImage,
            "price": "120g"
        },
        {
            "name": "Coffee",
            "image": coffeeImage,
            "price": "300g"
        },
        {
            "name": "Pizza",
            "image": pizzaImage,
            "price": "600g"
        },
        {
            "name": "Salad",
            "image": saladImage,
            "price": "220g"
        },
        {
            "name": "Spaghetti",
            "image": spaghettiImage,
            "price": "240g"
        }
    ]
    for (let item of menuItems) {
        const itemContainer = createMenuItem(item);
        menuContent.appendChild(itemContainer);
    }

    return menuContent
}


const createMenuItem = function(item) {
    const itemContainer = document.createElement("div");
    itemContainer.classList.add("item-container");

    const itemTitle = document.createElement("h2");
    itemTitle.textContent = item.name;
    itemContainer.appendChild(itemTitle);

    const itemImage = document.createElement("img");
    itemImage.src = item.image;
    itemContainer.appendChild(itemImage);

    const priceContainer = document.createElement("div");
    priceContainer.classList.add("price");

    const goldImage = document.createElement("img");
    goldImage.id = "gold";
    goldImage.src = gold;
    priceContainer.appendChild(goldImage);

    const itemPrice = document.createElement("p");
    itemPrice.textContent = item.price;
    priceContainer.appendChild(itemPrice);

    itemContainer.appendChild(priceContainer);

    return itemContainer
}


export {createMenuContent};