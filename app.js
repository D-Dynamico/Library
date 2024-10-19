let books = [
    { title: "Game of Thrones", author: "R.R.Martin", status: "Completed", pages: 694 }
];

let editIndex = null;

function displayBooks() {
    const bookList = document.querySelector('#bookList');
    bookList.innerHTML = '';

    books.forEach((book, index) => {
        const bookContainer = document.createElement('div');
        bookContainer.className = 'container';

        const bookName = document.createElement('div');
        bookName.className = 'name';
        bookName.textContent = `"${book.title}"`;

        const bookAuthor = document.createElement('div');
        bookAuthor.className = 'author';
        bookAuthor.textContent = `by ${book.author}`;

        const bookStatus = document.createElement('div');
        bookStatus.className = 'status';
        bookStatus.textContent = capitalizeFirstLetter(book.status);

        bookStatus.style.color = book.status.toLowerCase() === 'completed' ? 'green' : 'red';

        const btmPart = document.createElement('div');
        btmPart.className = 'btmPart';

        const btmButtons = document.createElement('div');
        btmButtons.className = 'btmButtons';

        const editButton = document.createElement('button');
        editButton.className = 'editBtn';
        editButton.textContent = '✒️';
        editButton.addEventListener('click', () => {
            editIndex = index;
            document.querySelector('.titleBook').value = book.title;
            document.querySelector('.authorBook').value = book.author;
            document.querySelector('.pagesBook').value = book.pages;
            document.querySelector(`input[name="status"][value="${book.status.toLowerCase()}"]`).checked = true;
            modalOpen.showModal();
        });

        const deleteButton = document.createElement('button');
        deleteButton.className = 'deleteButton';
        deleteButton.textContent = '🚮';
        deleteButton.addEventListener('click', () => {
            books.splice(index, 1);
            displayBooks();
            checkEmptyBooks();
        });

        const bookPages = document.createElement('div');
        bookPages.className = 'pages';
        bookPages.textContent = `(${book.pages})`;

        btmButtons.appendChild(editButton);
        btmButtons.appendChild(deleteButton);

        btmPart.appendChild(btmButtons);
        btmPart.appendChild(bookPages);

        bookContainer.appendChild(bookName);
        bookContainer.appendChild(bookAuthor);
        bookContainer.appendChild(bookStatus);
        bookContainer.appendChild(btmPart);

        bookList.appendChild(bookContainer);
    });

    checkEmptyBooks();
}

document.addEventListener('DOMContentLoaded', () => {
    displayBooks();
});

const reset = document.querySelector(".txt");
reset.addEventListener("click", () => {
    location.reload();
});

const newBtn = document.querySelector('.newBook');
const modalOpen = document.querySelector('.modal');
const closeModal = document.querySelector('.closeForm');
const submitBtn = document.querySelector('.submitForm');

newBtn.addEventListener('click', () => {
    editIndex = null;
    document.querySelector('.form').reset();
    modalOpen.showModal();
});

closeModal.addEventListener('click', (event) => {
    event.preventDefault();
    modalOpen.close();
});

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

submitBtn.addEventListener('click', (event) => {
    event.preventDefault();

    let title = document.querySelector('.titleBook').value;
    let author = document.querySelector('.authorBook').value;
    let pages = document.querySelector('.pagesBook').value;
    let status = document.querySelector('input[name="status"]:checked')?.value;

    if (!title || !author || !pages || !status) {
        alert('All details are necessary!!');
    } else {
        const newBook = { title, author, pages: parseInt(pages), status: capitalizeFirstLetter(status) };

        if (editIndex !== null) {
            books[editIndex] = newBook;
        } else {
            books.push(newBook);
        }

        displayBooks();
        modalOpen.close();
    }
});

function checkEmptyBooks() {
    const message = document.querySelector('.message');
    if (books.length === 0) {
        message.style.display = 'block';
    } else {
        message.style.display = 'none';
    }
}
