const myLibrary = []

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function() {
        return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`
    };
}

function addBookToLibrary(title, author, pages, read) {
    const newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
}

addBookToLibrary('The new Hobbit', 'newTolkien', 789, 'yep')

const bookList = JSON.parse(books);
console.log(bookList)

function displayLibrary() {
    const bookContainer = document.querySelector(".book-container");
    for (book of myLibrary) {
        const bookCard = document.createElement("div");
        const bookTitle = document.createElement("div");
        const bookAuthor = document.createElement("div");
        const bookPages = document.createElement("div");
        const bookRead = document.createElement("div");
        bookTitle.textContent = book.title;
        bookCard.appendChild(bookTitle);
        bookAuthor.textContent = book.author;
        bookCard.appendChild(bookAuthor);
        bookPages.textContent = book.pages;
        bookCard.appendChild(bookPages);
        bookRead.textContent = book.read;
        bookCard.appendChild(bookRead);
        bookContainer.appendChild(bookCard)
    }
}


displayLibrary()