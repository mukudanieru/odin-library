const myLibrary = [];

function Book(id, title, author, pages, hasRead) {
    if (!new.target) {
        throw Error("You must use the 'new' operator to call the constructor");
    }

    this.id = id;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.hasRead = hasRead;
}

Book.prototype.log = function () {
    console.log(`Book ID: ${this.id}`);
    console.log(`Title: ${this.title}`);
    console.log(`Author: ${this.author}`);
    console.log(`Pages: ${this.pages}`);
    console.log(`Read: ${this.hasRead ? "Yes" : "No"}`);
};

// Modal interaction
const addBookButton = document.querySelector("#add-book");
const modal = document.querySelector("#modal");

addBookButton.addEventListener("click", () => {
    modal.classList.add("active");
});

modal.addEventListener("click", (event) => {
    if (event.target.id === "modal" || event.target.id === "modal-close")
        modal.classList.remove("active");
});

// Form submission handling
const form = document.querySelector("#book-submission");

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const id = crypto.randomUUID();
    const title = document.querySelector("#title").value;
    const author = document.querySelector("#author").value;
    const pages = document.querySelector("#pages").value;
    const hasRead = document.querySelector("#has-read").checked;

    const newBook = new Book(id, title, author, pages, hasRead);
    newBook.log();

    form.reset();
    modal.classList.remove("active");
});
