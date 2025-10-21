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
