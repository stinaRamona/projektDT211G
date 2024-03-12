 "use strict"; 

let searchBtnEl = document.getElementById("searchBtn"); 

searchBtnEl.addEventListener('click', getValue);

//Tar värdet från searchbar och sätter in det i URL för API:n 
function getValue() {
    let searchbarValue = document.getElementById("searchBar").value; 

    let bookURL = `https://api.bigbookapi.com/search-books?api-key=10007acc79b54e4cb073cb822ea80a1c&query=${searchbarValue}`;

    getBookID(bookURL)
}

//Hämtar API:n med sökvärdet i och får fram ID på boken för att kunna få mer info
async function getBookID(bookURL) {
    try {
        let response = await fetch(bookURL); 

        let bookInfo = await response.json(); 

        let bookArray = bookInfo.books; 

        bookArray.forEach(book => {
            let bookId = book[0].id;  

            getBookInfo(bookId);
        }); 
 
    } catch {
        console.log("Något gick fel...")
    }
};  

//Hämtar mer info om boken utifrån bokID från förra API:t
async function getBookInfo(bookId) {
    let InfoURL = `https://api.bigbookapi.com/${bookId}?api-key=10007acc79b54e4cb073cb822ea80a1c`;

    try {
        let response = await fetch(InfoURL); 

        let bookDescription = await response.json(); 

        let isbn = bookDescription.identifiers.isbn_13; 

        getBookReview(isbn)
    } catch {
        console.log("Något gick snett")
    }
}; 

//hämtar recension från New York Times (OM DET FINNS EN!)
async function getBookReview(isbn) {
    let reviewURL = `https://api.nytimes.com/svc/books/v3/reviews.json?isbn=${isbn}&api-key=lBWbzayuv5GjiH2RhfBuxQIDwhQkZNVo`; 

    try {
        let response = await fetch(reviewURL); 

        let bookReview = await response.json(); 

        console.table(bookReview); 
    } catch {
        
        console.log("Något gick galet!")
    }
}


//Här kommer funktioner för att skriva ut själva innehålet till DOM 
/*
function displayBookInfo(bookDescription) {
    bookInfo.forEach(book => {
        
        document.getElementById("bookList").innerHTML = `
        <li>${book.title}</li>
        <li>${book.image}</li>
        <li>${book.id}</li> 
        ` 
    });
}*/
