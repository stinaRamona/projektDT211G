 "use strict"; 

let searchBtnEl = document.getElementById("searchBtn"); 

searchBtnEl.addEventListener('click', getValue);

//Tar värdet från searchbar och sätter in det i URL för API:n 
function getValue() {
    let searchbarValue = document.getElementById("searchBar").value; 

    let bookURL = `https://api.bigbookapi.com/search-books?api-key=e6f1f17954b54f6bbc6cb857bc9bfb82&query=${searchbarValue}`;

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

async function getBookInfo(bookId) {
    let InfoURL = `https://api.bigbookapi.com/${bookId}?api-key=e6f1f17954b54f6bbc6cb857bc9bfb82`; 

    try {
        let response = await fetch(InfoURL); 

        let bookDescription = response.json(); 

        console.log(bookDescription); 
    } catch {
        console.log("Något gick snett")
    }
}; 


/*
function displayBookInfo(bookInfo) {
    bookInfo.forEach(book => {
        
        document.getElementById("bookList").innerHTML = `
        <li>${book.title}</li>
        <li>${book.image}</li>
        <li>${book.id}</li> 
        ` 
    });
}*/
