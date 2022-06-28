const title = document.getElementById('title');
const author = document.getElementById('author');
const addBtn = document.getElementById('add');
const bookList = document.querySelector('.book');

let bookArr = [];

function createBook(title = '', author = '') {
  if (title === '' || author === '') {
    bookArr = [];
  } else {
    const myBooks = {
      title,
      author,
      id: bookArr.length + 1,
    };
    bookArr.push(myBooks);
  }
}

function addBook() {
  if (title.value === '' || author.value === '') return;

  const newBook = document.createElement('div');
  newBook.classList.add('new-book');
  const h2 = document.createElement('h2');
  h2.classList.add('title');
  h2.textContent = title.value;
  const h3 = document.createElement('h3');
  h3.classList.add('author');
  h3.textContent = author.value;

  const removeBtn = document.createElement('button');
  removeBtn.classList.add('remove');
  removeBtn.textContent = 'remove';

  newBook.appendChild(h2);
  newBook.appendChild(h3);
  newBook.appendChild(removeBtn);

  bookList.appendChild(newBook);
}

function deleteBook(element) {
  element.parentElement.remove();
}

bookList.addEventListener('click', (e) => {
  deleteBook(e.target);
});

function storeBooks() {
  localStorage.setItem('collection', JSON.stringify(bookArr));
}

let books;

function getBooks() {
  books = JSON.parse(localStorage.getItem('collection'));
}

function displayBooks() {
  getBooks();
  books.forEach((book) => {
    const newBook = document.createElement('div');
    newBook.classList.add('new-book');
    const h2 = document.createElement('h2');
    h2.classList.add('title');
    h2.textContent = book.title;
    const h3 = document.createElement('h3');
    h3.classList.add('author');
    h3.textContent = book.author;

    const removeBtn = document.createElement('button');
    removeBtn.classList.add('remove');
    removeBtn.textContent = 'remove';

    newBook.appendChild(h2);
    newBook.appendChild(h3);
    newBook.appendChild(removeBtn);

    bookList.appendChild(newBook);
  });
}

addBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const bookTitle = title.value;
  const authorName = author.value;
  if (bookTitle === '' || authorName === '') return;

  createBook(bookTitle, authorName);
  addBook();
  storeBooks();
  getBooks();
  title.value = '';
  author.value = '';
});

document.addEventListener('DOMContentLoaded', () => {
  displayBooks();
});
