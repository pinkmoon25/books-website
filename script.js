const form = document.getElementById('add-book');
const title = document.getElementById('title');
const author = document.getElementById('author');
const addBtn = document.getElementById('add');
const div = document.querySelector('.book');

const bookArr = [];

function addBooks(){
  let myBooks = {
    title: title.value,
    author: author.value,
    id: bookArr.length + 1
  }
  bookArr.push(myBooks);
};

function storeData(){
  localStorage.setItem('bookCollection', JSON.stringify(bookArr));
}

let data;

function getData(){

  data = JSON.parse(localStorage.getItem('bookCollection'));

  if(data == null) return;
  
}

function displayBooks(){
  div.innerHTML = '';

  for(let i=0; i<data.length; i++){

  let h2 = document.createElement('h2');
  let h3 = document.createElement('h3');
  let removeBtn = document.createElement('button');

  h2.classList.add('title');
  h3.classList.add('author');
  removeBtn.classList.add('remove');

  h2.textContent = data[i].title;
  h3.textContent = data[i].author;
  removeBtn.textContent = 'remove';

  div.appendChild(h2);
  div.appendChild(h3);
  div.appendChild(removeBtn);

  title.value = '';
  author.value = '';
  }
}

addBtn.addEventListener('click', (e)=>{
  e.preventDefault();
  addBooks();
  storeData();
  getData();
  displayBooks();
});

document.addEventListener('DOMContentLoaded', ()=>{
  getData();
  displayBooks();
});


