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
        bookStatus.textContent = capitalizeFirstLetter(book.status);

        if (bookStatus.textContent === 'Completed') {
            bookStatus.style.color = 'green';
        } else {
            bookStatus.style.color = 'red';
        }

        const btmPart = document.createElement('div');
        btmPart.className = 'btmPart';

        const btmButtons = document.createElement('div');
        btmButtons.className='btmButtons';

        const editButton = document.createElement('button');
        editButton.className = 'editBtn';
        editButton.textContent = '✒️';
        editButton.addEventListener('click', () => {
            modalOpen.showModal();
            displayBooks();
        });

        const deleteButton=document.createElement('button');
        deleteButton.className='deleteButton';
        deleteButton.textContent='🚮'
        deleteButton.addEventListener('click', () => {
            books.splice(index, 1); 
            displayBooks();
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

closeModal.addEventListener('click', () => {
    modalOpen.close();
});

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

submitBtn.addEventListener('click', () => {
    let title = document.querySelector('.titleBook').value;
    let author = document.querySelector('.authorBook').value;
    let pages = document.querySelector('.pagesBook').value;
    let status = document.querySelector('input[name="status"]:checked')?.value;

    if (!title || !author || !pages || !status) {
        alert('All details are necessary!!');
    } else {
        books.push({ title, author, pages: parseInt(pages), status });
        displayBooks();
        modalOpen.close();
    }

});

