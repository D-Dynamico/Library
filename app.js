let books = [
    { title: "Game of Thrones", author: "R.R.Martin", status: "Completed", pages: 694 }
];

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
        bookStatus.textContent = book.status;

        const btmPart = document.createElement('div');
        btmPart.className = 'btmPart';

        const editButton = document.createElement('button');
        editButton.className = 'editBtn';
        editButton.textContent = '✒️';

        const bookPages = document.createElement('div');
        bookPages.className = 'pages';
        bookPages.textContent = `(${book.pages})`;

        btmPart.appendChild(editButton);
        btmPart.appendChild(bookPages);

        bookContainer.appendChild(bookName);
        bookContainer.appendChild(bookAuthor);
        bookContainer.appendChild(bookStatus);
        bookContainer.appendChild(btmPart);

        bookList.appendChild(bookContainer);
    });
}

document.addEventListener('DOMContentLoaded', displayBooks);

const reset = document.querySelector(".txt");
reset.addEventListener("click", () => {
    location.reload();
});

const newBtn = document.querySelector('.newBook');
const modalOpen = document.querySelector('.modal');
const closeModal = document.querySelector('.closeForm');
const submitBtn = document.querySelector('.submitForm');

newBtn.addEventListener('click', () => {
    modalOpen.showModal();
});

closeModal.addEventListener('click', (event) => {
    modalOpen.close();
});

submitBtn.addEventListener('click', () => {
    let title = document.querySelector('.titleBook').value;
    let author = document.querySelector('.authorBook').value;
    let pages = document.querySelector('.pagesBook').value;

    books.push({ title, author, pages: parseInt(pages) });
    displayBooks();
    modalOpen.close();
});

