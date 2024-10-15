const myLibrary = []

const bookDump = [
    {
      "author": "Chinua Achebe",
      "pages": 209,
      "title": "Things Fall Apart",
      "read": "on"
    },
    {
      "author": "Hans Christian Andersen",
      "pages": 784,
      "title": "Fairy tales",
      "read": ""
    },
    {
      "author": "Dante Alighieri",
      "pages": 928,
      "title": "The Divine Comedy",
      "read": ""
    },
    {
      "author": "Unknown",
      "pages": 160,
      "title": "The Epic Of Gilgamesh",
      "read": "on"
    },
    {
      "author": "Unknown",
      "pages": 176,
      "title": "The Book Of Job",
      "read": "on"
    },
    {
      "author": "Unknown",
      "pages": 288,
      "title": "One Thousand and One Nights",
      "read": ""
    }
]

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function() {
        return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`
    };
}

function addBookToLibrary(library, title, author, pages, read) {
    const newBook = new Book(title, author, pages, read);
    library.push(newBook);
}

function addListOfBooksToLibrary(library, bookList) {
    for (book of bookList) {
        addBookToLibrary(library, book.title, book.author, book.pages, book.read)
    };
}

function displayLibrary(library) {
    const bookContainer = document.querySelector(".book-container");
    bookContainer.innerHTML = ""; // Clear previous books

    library.forEach(book => {
        const bookCard = document.createElement("div");
        bookCard.classList.add("book-card");

        // Add a book id for each card
        const bookNumber = library.indexOf(book);
        bookCard.id = bookNumber;

        // Add the close button
        const closeButton = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        const svgPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        svgPath.setAttribute("d", "m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z");
        closeButton.appendChild(svgPath);
        closeButton.setAttribute("viewBox", "0 -960 960 960");
        bookCard.appendChild(closeButton)

        // Create an array of book properties
        const bookProperties = [
            { label: 'book-title', value: book.title},
            { label: 'book-author', value: `Author: ${book.author}`},
            { label: 'book-pages', value: `Lenght: ${book.pages} pages`}
        ];

        // Create a div for each property
        bookProperties.forEach(property => {
            const propertyDiv = document.createElement("div");
            propertyDiv.textContent = property.value;
            propertyDiv.classList.add(property.label);
            bookCard.appendChild(propertyDiv);
        });

        // Add a checkbox for the read property
        const readCheckbox = document.createElement("input");
        readCheckbox.type = "checkbox";
        if (book.read === "on") {
            readCheckbox.checked = true;
        }
        readCheckbox.addEventListener("change", changeReadStatus);

        const bookReadRow = document.createElement("div");
        bookReadRow.classList.add("book-read");
        const bookReadTitle = document.createElement("div");
        bookReadTitle.textContent = "Read: "
        bookReadRow.appendChild(bookReadTitle)
        bookReadRow.appendChild(readCheckbox);
        bookCard.appendChild(bookReadRow);

        bookContainer.appendChild(bookCard);
    });

    deleteCrosses = document.querySelectorAll("svg")
    deleteCrosses.forEach(deleteCross => {
        deleteCross.addEventListener("click", removeBookCardFromDisplay);
    })
}

function changeReadStatus() {
    const bookID = this.parentElement.parentElement.id
    if (this.checked) {
        myLibrary[bookID].read = "on"
    } else {
        myLibrary[bookID].read = ""
    }
}

function removeBookCardFromDisplay(e) {
    const bookID = e.target.parentElement.id;
    removeBookFromLibrary(bookID);
    displayLibrary(myLibrary);
}

function removeBookFromLibrary(bookIndex) {
    myLibrary.splice(bookIndex, 1);
}

function addFormBookToLibrary(form) {
    const formData = new FormData(form);
    const bookToAdd = Object.fromEntries(formData);
    addBookToLibrary(myLibrary, bookToAdd.title, bookToAdd.author, bookToAdd.pages, bookToAdd.read)
  }
  
function addFormBookToDisplay(e) {
    e.preventDefault();
    addFormBookToLibrary(e.target);
    displayLibrary(myLibrary);
    dialog.close();
}

function cancelBookCreation() {
    dialog.close();
}

// Add first books on pages loading
document.addEventListener("DOMContentLoaded", () => {
    addListOfBooksToLibrary(myLibrary, bookDump);
    displayLibrary(myLibrary);
})

const addBookButton = document.querySelector("#showDialog");
const dialog = document.querySelector("dialog");
addBookButton.addEventListener("click", () => {
    dialog.showModal();
});

document.querySelector("form").addEventListener("submit", addFormBookToDisplay);
document.querySelector("form").addEventListener("reset", cancelBookCreation);


// To do
// - add title
// - make it look better, style the cards, the background...
// - add form validation 
// - change book names


