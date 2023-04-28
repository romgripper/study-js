// Book Constructor
class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
    isValid() {
        return this.title != "" && this.author != "" && this.isbn != "";
    }
}

// UI Constructor
class UI {
    static list = document.getElementById("book-list");
    static title = document.getElementById("title");
    static author = document.getElementById("author");
    static isbn = document.getElementById("isbn");
    static container = document.querySelector(".container");
    static form = document.getElementById("book-form");

    static addBookToList(book) {
        const bookRow = UI.createBookRow(book);
        UI.setupDeleteBook(bookRow, book);
        UI.list.appendChild(bookRow);
    }

    static clearFields() {
        UI.title.value = "";
        UI.author.value = "";
        UI.isbn.value = "";
    }

    static showAlert(message, className) {
        const div = document.createElement("div");
        div.className = `alert ${className}`;
        div.appendChild(document.createTextNode(message));
        UI.container.insertBefore(div, UI.form);
        setTimeout(() => {
            div.remove();
        }, 3000);
    }

    static setupAddBook() {
        this.form.addEventListener("submit", function (e) {
            // Get form values
            const title = UI.title.value,
                author = UI.author.value,
                isbn = UI.isbn.value;
            // Instantiate book
            const book = new Book(title, author, isbn);
            if (book.isValid()) {
                if (
                    Store.getBooks()
                        .map((b) => b.isbn)
                        .includes(book.isbn)
                ) {
                    UI.showAlert(
                        `ISBN of Book ${book.title} is already existing`,
                        "error"
                    );
                } else {
                    // Add book to list
                    Store.addBook(book);

                    // Clear fields
                    UI.clearFields();
                    UI.showAlert(`Book ${book.title} added`, "success");
                }
            } else {
                UI.showAlert("Please fill in all the fields", "error");
            }
            UI.displayBooks();

            e.preventDefault();
        });
    }

    static setupDeleteBook(bookRow, book) {
        bookRow.addEventListener("click", function (e) {
            if (e.target.classList.contains("delete")) {
                Store.deleteBook(book);
                UI.showAlert(`Book ${book.title} deleted`, "success");
                UI.displayBooks();
            }
        });
    }

    static displayBooks() {
        UI.list.innerHTML = "";
        const books = Store.getBooks();
        books.forEach((book) => UI.addBookToList(book));
    }

    static init() {
        UI.setupAddBook();
        UI.displayBooks();
    }

    static createBookRow(book) {
        // Create tr element
        const row = document.createElement("tr");
        // Insert cols
        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="delete">X</a></td>
        `;

        return row;
    }
}

class Store {
    static KEY = "books";

    static getBooks() {
        let storageValue = localStorage.getItem(Store.KEY);
        storageValue = storageValue ? storageValue : "[]";
        return JSON.parse(storageValue);
    }

    static addBook(book) {
        const books = Store.getBooks();
        books.push(book);
        Store.setBooks(books);
    }

    static deleteBook(book) {
        const books = Store.getBooks().filter((b) => b.isbn !== book.isbn);
        Store.setBooks(books);
    }

    static setBooks(books) {
        localStorage.setItem(Store.KEY, JSON.stringify(books));
    }
}

// Instantiate UI
document.addEventListener("DOMContentLoaded", UI.init);
