"use strict";
let myLibrary = [];

class Book{
	constructor(name, author, pages, read) {
		this.name = name;
		this.author = author;
		this.pages = pages;
		this.read = read;
	}

}

function createBook(name, author, pages, read) {
  myLibrary.push(new Book(name, author, pages, read));
}

function removeBook(e) {
  const index = e.target.parentElement.dataset.index;
  myLibrary.splice(index,1);
  displayLibrary();
}

function displayLibrary() {
  const library = document.querySelector(".library");
  library.innerHTML = "";
  myLibrary.forEach((object) => {
    const book = document.createElement("div");
    book.classList.add("card");
    library.appendChild(book);
    for (let key in object) {
      if (key != "read") {
        const item = document.createElement("div");
        item.textContent = `${key}: ${object[key]}`;
        book.appendChild(item);
      } else {
        const item = document.createElement("button");
        if (object[key] == true) {
          item.textContent = "Read";
					console.log(item.textContent);
        } else {
          item.textContent = "Not read";
					console.log(item.textContent);
        }
        book.appendChild(item);
				item.addEventListener('click', () => {
					if (item.textContent == "Read") {
						item.textContent = "Not read"
					}else{
						item.textContent = "Read"
					}
				})
      }
    }
    book.dataset.index = myLibrary.indexOf(object);
    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove item";
    removeButton.classList.add("remove-button");
    book.appendChild(removeButton);
    removeButton.addEventListener("click", removeBook);
  });
}

function readForm() {
  let bookName = document.getElementById("book-name").value;
  let authorName = document.getElementById("author-name").value;
  let numberPages = document.getElementById("number-pages").value;
  let haveRead = document.getElementById("have-read").checked;
  if (bookName == "" || authorName == "" || numberPages == "") return;
  createBook(bookName, authorName, numberPages, haveRead);
	closeForm()
	displayLibrary()
  document.getElementById("book-name").value = "";
  document.getElementById("author-name").value = "";
  document.getElementById("number-pages").value = "";
  document.getElementById("have-read").checked = false;
}

function openForm() {
  formElement.classList.remove("display-none");
  overlayElement.style.display = "block";
}

function closeForm() {
  formElement.classList.add("display-none");
  overlayElement.style.display = "none";
}

const overlayElement = document.querySelector(".overlay");
const formElement = document.querySelector(".add-book");
const addBookButton = document.querySelector(".button");
const addButton = document.querySelector("#add-book-button");

addButton.addEventListener("click", readForm);

addBookButton.addEventListener("click", openForm);

overlayElement.addEventListener("click", closeForm);
