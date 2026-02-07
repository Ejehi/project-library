let myLibrary = [];

function Book(id, author, title, pages, status) {
    this.author = author;
    this.title = title;
    this.id = id;
    this.pages = pages;
    this.status = status;
}

Book.prototype.toggleReadStatus = function() {
    this.status = !this.status;
    console.log(this.status);
    console.log(myLibrary);
}

function addBookToLibrary(author, title, pages, status) {
    const newBook = new Book(crypto.randomUUID(), author, title, pages, status);
    myLibrary.push(newBook);
}

function displayBooksInLibrary(library) {
    const cards = document.querySelectorAll(".card");
    for (const card of cards) {
            shelf.removeChild(card);
    }
    for(const book of library) {
        const newCard = document.createElement('div');
        const author = document.createElement('div');
        const title = document.createElement('div');
        const pages = document.createElement('div');
        const readInfo = document.createElement('div');
        const deleteBtn = document.createElement('button');
        const statusBtn = document.createElement('button');
        newCard.classList.add('card');
        deleteBtn.textContent = "Remove";
        statusBtn.textContent = "Toggle Status";
        deleteBtn.classList.add('delete');
        statusBtn.classList.add('status');
        author.textContent = `Written By ${book.author}`;
        title.textContent = `${book.title}`;
        pages.textContent = `${book.pages} pages`;
        if ( book.status === true) {
            readInfo.textContent = `This Book Has Been Read`;
        }
        else {
            readInfo.textContent = `This Book Has Not Been Read`;
        }
        newCard.appendChild(title);
        newCard.appendChild(author);
        newCard.appendChild(pages);
        newCard.appendChild(readInfo);
        newCard.appendChild(deleteBtn);
        newCard.appendChild(statusBtn);
        newCard.setAttribute("data-uniqueid", book.id);
        shelf.appendChild(newCard);
    }
}

function deleteBookFromLibrary(id) {
    const filteredLibrary = myLibrary.filter(book => book.id !== id);
    myLibrary = filteredLibrary;
    displayBooksInLibrary(myLibrary);
}

function changeReadStatus(cardId) {
    for (book of myLibrary) {
        if (book.id == cardId) book.toggleReadStatus();
    }
    displayBooksInLibrary(myLibrary);
}


const container = document.querySelector(".container");

const shelf = document.querySelector(".shelf");

const addBookBtn = document.querySelector("#addBook");

const dialogBox = document.querySelector('dialog');
const newBookForm = document.querySelector('#library-form');
const authorField = document.querySelector('#author');
const titleField = document.querySelector('#title');
const pagesField = document.querySelector('#pages');
const readCheck = document.querySelector('#status');
const submitBtn = document.querySelector('dialog button');

submitBtn.addEventListener('click', function (event) {
    event.preventDefault();

    let author = authorField.value;
    let title = titleField.value;
    let pages = pagesField.value;
    let status = document.querySelector('#status').checked ? true : false;
    addBookToLibrary(author, title, pages, status);
    displayBooksInLibrary(myLibrary);
    dialogBox.close();
});

shelf.addEventListener('click', function(event) {
    if (event.target && event.target.matches('.delete')) {
        let cardToDelete = event.target.parentElement.dataset.uniqueid;
        deleteBookFromLibrary(cardToDelete);
    }
    else if (event.target && event.target.matches('.status')) {
        let cardIdOfStatus = event.target.parentElement.dataset.uniqueid;
        changeReadStatus(cardIdOfStatus);
    }
});
    
addBookBtn.addEventListener('click', function () {
    dialogBox.showModal();
});

// submitBookInfo.addEventListener('click', function (event) {
//     event.preventDefault();
//     let author = authorField.value;
//     let title = titleField.value;
//     let pages = pagesField.value;
//     let status = document.querySelector('input[name = "status"]:checked').value === "true" ? true : false;
//     addBookToLibrary(author, title, pages, status);
//     displayBooksInLibrary(myLibrary);
//     dialogBox.close();
// });
