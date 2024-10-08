const myLibrary = []

const bookDump = [
    {
      "author": "Chinua Achebe",
      "pages": 209,
      "title": "Things Fall Apart",
      "read": "nope"
    },
    {
      "author": "Hans Christian Andersen",
      "pages": 784,
      "title": "Fairy tales",
      "read": "nope"
    },
    {
      "author": "Dante Alighieri",
      "pages": 928,
      "title": "The Divine Comedy",
      "read": "nope"
    },
    {
      "author": "Unknown",
      "pages": 160,
      "title": "The Epic Of Gilgamesh",
      "read": "nope"
    },
    {
      "author": "Unknown",
      "pages": 176,
      "title": "The Book Of Job",
      "read": "nope"
    },
    {
      "author": "Unknown",
      "pages": 288,
      "title": "One Thousand and One Nights",
      "read": "nope"
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
    }
}

function displayLibrary(library) {
    const bookContainer = document.querySelector(".book-container");
    bookContainer.innerHTML = ""; // Clear previous books

    library.forEach(book => {
        const bookCard = document.createElement("div");
        bookCard.classList.add("book-card");

        // Add a book id for each card
        const bookNumber = library.indexOf(book);
        bookCard.id = `book-${bookNumber}`;

        // Add the close button
        const closeButton = document.createElement("svg");
        const svgPath = document.createElement("path");
        svgPath.setAttribute("d", "m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z");
        svgPath.setAttribute("fill", "pink");
        closeButton.appendChild(svgPath);
        closeButton.setAttribute("viewBox", "0 -960 960 960");
        closeButton.setAttribute("height", "24px");
        closeButton.setAttribute("width", "24px");
        closeButton.setAttribute("fill", "pink");
        bookCard.appendChild(closeButton)

        // Create an array of book properties
        const bookProperties = [
            { label: 'book-title', value: book.title},
            { label: 'book-author', value: `Author: ${book.author}`},
            { label: 'book-pages', value: `Lenght: ${book.pages} pages`},
            { label: 'book-read', value: book.read}
        ];

        // Create a div for each property
        bookProperties.forEach(property => {
            const propertyDiv = document.createElement("div");
            propertyDiv.textContent = property.value;
            propertyDiv.classList.add(property.label);
            bookCard.appendChild(propertyDiv);
        });

        bookContainer.appendChild(bookCard);
    });
}

addListOfBooksToLibrary(myLibrary, bookDump);
displayLibrary(myLibrary);

const addBookButton = document.querySelector("#showDialog");
const dialog = document.querySelector("dialog");
addBookButton.addEventListener("click", () => {
    dialog.showModal();
});

function getData(form) {
    const formData = new FormData(form);
    const bookToAdd = Object.fromEntries(formData);
    addBookToLibrary(myLibrary, bookToAdd.title, bookToAdd.author, bookToAdd.pages, bookToAdd.read)
    displayLibrary(myLibrary);
  }
  

function printFormValues(e) {
    e.preventDefault();
    getData(e.target);
    dialog.close();
}

document.querySelector("form").addEventListener("submit", printFormValues)