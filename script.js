const title = document.getElementById('title');
const author = document.getElementById('author');
const addBtn = document.getElementById('add');
const bookList = document.querySelector('.book');

class Book {
  constructor(title, author, id) {
    this.title = title;
    this.author = author;
    this.id = id;
  }

  static addBook(book) {
    const div = document.createElement('div');
    const para = document.createElement('p');
    const removeBtn = document.createElement('button');

    div.classList.add('new-book');
    para.classList.add('book-detail');
    removeBtn.classList.add('remove');

    para.innerHTML = `<q><cite>${book.title}</cite></q> by ${book.author}`;
    removeBtn.setAttribute('id', `${book.id}`);
    removeBtn.textContent = 'remove';
    removeBtn.addEventListener('click', () => {
      Book.removeBook(book.id);
      removeBtn.parentElement.remove();
    });

    div.appendChild(para);
    div.appendChild(removeBtn);

    bookList.appendChild(div);
  }

  static displayBooks() {
    const books = Book.getBook();
    books.forEach((book) => {
      Book.addBook(book);
    });
  }

  static getBook() {
    let bookArr = [];
    if (localStorage.getItem('bookCollection') !== null) {
      bookArr = JSON.parse(localStorage.getItem('bookCollection'));
    } else {
      bookArr = [];
    }

    return bookArr;
  }

  static storeBook(book) {
    const books = Book.getBook();
    books.push(book);
    localStorage.setItem('bookCollection', JSON.stringify(books));
  }

  static removeBook(id) {
    const book = Book.getBook();
    book.splice(id, 1);
    localStorage.setItem('bookCollection', JSON.stringify(book));
  }
}

addBtn.addEventListener('click', (e) => {
  e.preventDefault();
  if (title.value === '' || author.value === '') return;

  const bookArr = Book.getBook();
  const newBook = new Book(title.value, author.value, bookArr.length);
  Book.addBook(newBook);
  Book.storeBook(newBook);
  title.value = '';
  author.value = '';
});

document.addEventListener('DOMContentLoaded', () => {
  Book.getBook();
  Book.displayBooks();
});
