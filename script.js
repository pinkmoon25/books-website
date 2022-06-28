const title = document.getElementById('title');
const author = document.getElementById('author');
const addBtn = document.getElementById('add');
const div = document.querySelector('.book');

let bookArr = [];

function addBooks() {
  const myBooks = {
    title: title.value,
    author: author.value,
    id: bookArr.length + 1,
  };
  if (title.value === '' || author.value === '') { return; }

  bookArr.push(myBooks);
}

function storeData() {
  localStorage.setItem('bookCollection', JSON.stringify(bookArr));
}

function getData() {
  bookArr = JSON.parse(localStorage.getItem('bookCollection')) || [ ] ;
}

function removeBook(id) {
  bookArr.splice(id, 1);
}

function displayBooks() {
  div.innerHTML = '';

  for (let i = 0; i < bookArr.length; i += 1) {
    const h2 = document.createElement('h2');
    const h3 = document.createElement('h3');
    const removeBtn = document.createElement('button');
    const hr = document.createElement('hr');

    h2.classList.add('title');
    h3.classList.add('author');
    removeBtn.classList.add('remove');

    h2.textContent = bookArr[i].title;
    h3.textContent = bookArr[i].author;
    removeBtn.textContent = 'remove';
    removeBtn.addEventListener('click', () => {
      removeBook(i);
      storeData();
      getData();
      displayBooks();
    });

    div.appendChild(h2);
    div.appendChild(h3);
    div.appendChild(removeBtn);
    div.appendChild(hr);

    title.value = '';
    author.value = '';
  }
}

addBtn.addEventListener('click', (e) => {
  e.preventDefault();
  addBooks();
  storeData();
  getData();
  displayBooks();
});

window.addEventListener('load', () => {
  getData();
  displayBooks();
});
