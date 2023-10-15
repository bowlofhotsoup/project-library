const addBtn = document.getElementById('addBtn');

addBtn.addEventListener('click', () => {
    if(form.title.value !== '' && form.author.value !== '' && form.pages.value !== '') {
        addBookToLibrary();
    } 
});

const newBookBtn = document.getElementById('newBtn');
newBookBtn.addEventListener('click', () => popUpForm.style.display = 'block');

const popUpForm = document.getElementById('popUp');
const closePopUp = document.getElementById('close');
closePopUp.addEventListener('click', () => popUpForm.style.display = 'none');

class Book{
    constructor(title, author, pages, read){
        this.title = form.title.value;
        this.author = form.author.value;
        this.pages = form.pages.value + ' pages';
        this.read = form.read.checked;
    }
}

let myLibrary = [];
let newBook;

function addBookToLibrary(){
    event.preventDefault();
    popUpForm.style.display = 'none';
    newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
    setData();
    render();
    form.reset();
}

function render(){
    const display = document.getElementById('Library-container');
    const books = document.querySelectorAll('.book');
    books.forEach(book => display.removeChild(book));
    for(let i = 0; i < myLibrary.length; i++){
        createBook(myLibrary[i]);
    }
}

function createBook(item){
    const library = document.querySelector('#Library-container');
    const bookDiv = document.createElement('div');
    const titleDiv = document.createElement('div');
    const authDiv = document.createElement('div');
    const pageDiv = document.createElement('div');
    const readBtn = document.createElement('button');
    const removeBtn = document.createElement('button');

    library.appendChild(bookDiv);

    bookDiv.classList.add('book');
    bookDiv.setAttribute('id', myLibrary.indexOf(item));

    titleDiv.textContent = item.title;
    titleDiv.classList.add('title');
    bookDiv.appendChild(titleDiv);

    authDiv.textContent = item.author;
    authDiv.classList.add('author');
    bookDiv.appendChild(authDiv);

    pageDiv.textContent = item.pages;
    pageDiv.classList.add('pages');
    bookDiv.appendChild(pageDiv);

    readBtn.classList.add('readBtn');
    bookDiv.appendChild(readBtn);
    if(item.read === false){
        readBtn.textContent = 'Not Read';
        readBtn.style.backgroundColor = '#C67B9A';
    }else{
        readBtn.textContent = 'Read';
        readBtn.style.backgroundColor = '#C6F6B6';
    }
    readBtn.addEventListener('click', () => {
        item.read = !item.read;
        setData();
        render();
    })

    removeBtn.textContent = 'Remove';
    removeBtn.setAttribute('id', 'removeBtn');
    bookDiv.appendChild(removeBtn);
    removeBtn.addEventListener('click', () => {
        myLibrary.splice(myLibrary.indexOf(item), 1);
        setData();
        render();
    })
}

function setData(){
    localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
}

function restore(){
    if(!localStorage.myLibrary){
        render();
    }else{
        let objects = localStorage.getItem('myLibrary');
        objects = JSON.parse(objects);
        myLibrary = objects;
        render();
    }
}

restore();