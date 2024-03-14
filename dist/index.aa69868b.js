"use strict";
let searchBtnEl = document.getElementById("searchBtn");
let bookInfoContainer = document.getElementById("bookInfoContainer");
searchBtnEl.addEventListener("click", getValue);
//Tar värdet från searchbar och sätter in det i URL för API:n 
function getValue() {
    bookInfoContainer.innerHTML = "";
    let searchbarValue = document.getElementById("searchBar").value;
    let bookURL = `https://api.bigbookapi.com/search-books?api-key=e6f1f17954b54f6bbc6cb857bc9bfb82&query=${searchbarValue}&number=2`;
    getBookID(bookURL);
}
//Hämtar API:n med sökvärdet i och får fram ID på boken för att kunna få mer info
async function getBookID(bookURL) {
    try {
        let response = await fetch(bookURL);
        let bookInfo = await response.json();
        let bookArray = bookInfo.books;
        bookArray.forEach((book)=>{
            let bookId = book[0].id;
            getBookInfo(bookId);
        });
    } catch  {
        console.log("N\xe5got gick fel...");
    }
}
//Hämtar mer info om boken utifrån bokID från förra API:t
async function getBookInfo(bookId) {
    let InfoURL = `https://api.bigbookapi.com/${bookId}?api-key=e6f1f17954b54f6bbc6cb857bc9bfb82`;
    try {
        let response = await fetch(InfoURL);
        let bookDescription1 = await response.json();
        displayBookInfo(bookDescription1);
        let OLID = bookDescription1.identifiers.open_library_id;
        getBookRating(OLID);
    } catch  {
        console.log("N\xe5got gick snett");
    }
}
//hämtar recension från New York Times (OM DET FINNS EN!)
async function getBookRating(OLID) {
    let reviewURL = `https://openlibrary.org/works/${OLID}/ratings.json`;
    try {
        let response = await fetch(reviewURL);
        let bookRating = await response.json();
        let avgRat = bookRating.summary.average;
        displayBookInfo(bookDescription, avgRat);
    } catch  {
        console.log("N\xe5got gick galet!");
    }
}
// Rensa innehållet en gång vid start
bookInfoContainer.innerHTML = "";
//Här kommer funktioner för att skriva ut själva innehålet till DOM 
function displayBookInfo(bookDescription1, avgRat) {
    console.log(avgRat) // glr att den fastnar i catch. Kanske inte kan skicka in två värden i en funktion  
    ;
    // Skapa element för att visa bokinfo
    let titleElement = document.createElement("h2");
    titleElement.textContent = bookDescription1.title;
    let authorElement = document.createElement("p");
    authorElement.textContent = "F\xf6rfattare: " + bookDescription1.authors[0].name;
    let descriptionElement = document.createElement("p");
    descriptionElement.textContent = "Beskrivning: " + bookDescription1.description;
    let ratingElement = document.createElement("p");
    ratingElement.textContent = "Betyg fr\xe5n Open Library: " + avgRat;
    // Lägg till de skapade elementen i DOM
    bookInfoContainer.appendChild(titleElement);
    bookInfoContainer.appendChild(authorElement);
    bookInfoContainer.appendChild(descriptionElement);
    bookInfoContainer.appendChild(ratingElement);
    // Skapa en linje mellan varje bok 
    let lineBreak = document.createElement("hr");
    bookInfoContainer.appendChild(lineBreak);
}

//# sourceMappingURL=index.aa69868b.js.map
