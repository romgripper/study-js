// Book Constructor
function Book(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}

Book.prototype.isValid = function () {
    return this.title != "" && this.author != "" && this.isbn != "";
};

// UI Constructor
function UI() {
    this.list = document.getElementById("book-list");
    this.title = document.getElementById("title");
    this.author = document.getElementById("author");
    this.isbn = document.getElementById("isbn");
    this.container = document.querySelector(".container");
    this.form = document.getElementById("book-form");
}

// Add Book To List
UI.prototype.addBookToList = function (book) {
    this.list.appendChild(this.createBookRow(book));
};

UI.prototype.createBookRow = function (book) {
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
};

// Clear Fields
UI.prototype.clearFields = function () {
    this.title.value = "";
    this.author.value = "";
    this.isbn.value = "";
};

UI.prototype.showAlert = function (message, clasName) {
    const div = document.createElement("div");
    div.className = `alert ${clasName}`;
    div.appendChild(document.createTextNode(message));
    this.container.insertBefore(div, this.form);
    setTimeout(() => {
        div.remove();
    }, 3000);
};

// Event Listeners
UI.prototype.setupAddBook = function () {
    const ui = this;
    this.form.addEventListener("submit", function (e) {
        // Get form values
        const title = ui.title.value,
            author = ui.author.value,
            isbn = ui.isbn.value;

        // Instantiate book
        const book = new Book(title, author, isbn);
        if (book.isValid()) {
            // Add book to list
            ui.addBookToList(book);

            // Clear fields
            ui.clearFields();
            ui.showAlert("Book added", "success");
        } else {
            ui.showAlert("Please fill in all the fields", "error");
        }

        e.preventDefault();
    });
};

UI.prototype.setupDeleteBook = function () {
    const ui = this;
    this.list.addEventListener("click", function (e) {
        if (e.target.classList.contains("delete")) {
            e.target.parentElement.parentElement.remove();
            ui.showAlert("Book deleted", "success");
        }
    });
};

UI.prototype.init = function () {
    this.setupAddBook();
    this.setupDeleteBook();
};

// Instantiate UI
const ui = new UI();
ui.init();
