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

    const library = document.querySelector("#library");
    if (library.classList.contains("empty")) {
        library.classList.remove("empty");
        document.querySelector(".empty-list-title").remove();
        document.querySelector(".empty-list-message").remove();
    }

    myLibrary.push(newBook);

    myLibrary.forEach((currentBook) => {
        library.appendChild(newBookElement(currentBook));
    });

    form.reset();
    modal.classList.remove("active");
});

// Create a new book element
function newBookElement(bookObject) {
    const book = document.createElement("div");
    book.classList.add("book");
    book.id = bookObject.id;

    const bookContent = document.createElement("div");
    bookContent.classList.add("book-content");

    // Adding Book Image
    const bookImage = document.createElement("div");
    bookImage.classList.add("book-image");

    const readSVG = `
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-book-check-icon lucide-book-check">
            <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20"/>
            <path d="m9 9.5 2 2 4-4" />
        </svg>
        <div class="status">Read</div>
    `;

    const unreadSVG = `
        <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="lucide lucide-book-x-icon lucide-book-x">
        <path d="m14.5 7-5 5" />
        <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20"/>
        <path d="m9.5 7 5 5" />
    </svg>
    <div class="status">Unread</div>
    `;

    if (bookObject.hasRead) {
        bookImage.innerHTML = readSVG;
        bookImage.classList.add("read");
    } else {
        bookImage.innerHTML = unreadSVG;
        bookImage.classList.add("unread");
    }

    bookContent.appendChild(bookImage);

    // Adding Book Information
    const bookInformation = document.createElement("div");
    bookInformation.classList.add("book-information");

    const bookImportantInformation = document.createElement("div");
    bookImportantInformation.classList.add("book-important-information");

    const bookTitle = document.createElement("h1");
    bookTitle.classList.add("book-title");
    bookTitle.innerHTML = bookObject.title;
    bookImportantInformation.appendChild(bookTitle);

    const bookAuthor = document.createElement("h2");
    bookAuthor.classList.add("book-author");
    bookAuthor.innerHTML = bookObject.author;
    bookImportantInformation.appendChild(bookAuthor);

    bookInformation.appendChild(bookImportantInformation);

    const bookPages = document.createElement("div");
    bookPages.classList.add("book-pages");
    bookPages.innerHTML = `${bookObject.pages} pages`;

    bookInformation.appendChild(bookPages);

    bookContent.appendChild(bookInformation);

    // Adding Book Options
    const bookOption = document.createElement("div");
    bookOption.classList.add("book-option");

    const readBtn = document.createElement("div");
    readBtn.classList.add("book-btn");
    readBtn.id = "read-btn";

    const readBtnSVG = `
        <svg
            class="book-icon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-eye-icon lucide-eye">
            <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"/>
            <circle cx="12" cy="12" r="3" />
        </svg>
    `;

    readBtn.innerHTML = readBtnSVG;
    bookOption.appendChild(readBtn);

    const removeBtn = document.createElement("div");
    removeBtn.classList.add("book-btn");
    removeBtn.id = "remove-btn";

    const removeBtnSVG = `
            <svg
            class="book-icon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-x-icon lucide-x">
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
        </svg>
    `;

    removeBtn.innerHTML = removeBtnSVG;
    bookOption.appendChild(removeBtn);

    book.appendChild(bookContent);
    book.appendChild(bookOption);

    return book;
}
