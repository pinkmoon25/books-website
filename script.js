const title = document.getElementById('title');
const author = document.getElementById('author');
const addBtn = document.getElementById('add');
const bookList = document.querySelector('.book');

class Book{
  constructor(title, author, id){
    this.title = title;
    this.author = author;
    this.id = id;
  }
}

class BookData{

  static addBook(book){
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
      Storage.removeBook(book.id);
      removeBtn.parentElement.remove();
    })

    div.appendChild(para);
    div.appendChild(removeBtn);

    bookList.appendChild(div);
  }

  static displayBooks(){
    const books = Storage.getBook();
    books.forEach((book) => {
      BookData.addBook(book);
    })
  }
}

class Storage{
  static getBook(){
    let bookArr = [];
    if(localStorage.getItem('bookCollection') !== null) {
        bookArr = JSON.parse(localStorage.getItem('bookCollection'));
    }
    else {
      bookArr = [];
    }
  
    return bookArr;
  }

  static storeBook(book){
    const books = Storage.getBook();
    books.push(book);
    localStorage.setItem('bookCollection', JSON.stringify(books));
  }
  
  static removeBook(id){
    let book = Storage.getBook();
    book.splice(id, 1);
    localStorage.setItem('bookCollection', JSON.stringify(book));
  }
}

addBtn.addEventListener('click', (e)=>{
  e.preventDefault();
  if(title.value === '' || author.value === '') return;
  else{
    const bookArr = Storage.getBook();
    const newBook = new Book(title.value, author.value, bookArr.length);
    BookData.addBook(newBook);
    Storage.storeBook(newBook);
    title.value = '';
    author.value = '';
  }
})

document.addEventListener('DOMContentLoaded', () => {
  Storage.getBook();
  BookData.displayBooks();
} )
