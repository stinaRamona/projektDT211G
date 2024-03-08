 "use strict"; 

let searchBtnEl = document.getElementById("searchBtn"); 

searchBtnEl.addEventListener('click', getValue);

//Tar värdet från searchbar och sätter in det i URL för API:n 
function getValue() {
    let searchbarValue = document.getElementById("searchBar").value; 

    let bookURL = `https://api.bigbookapi.com/search-books?api-key=e6f1f17954b54f6bbc6cb857bc9bfb82&query=${searchbarValue}`;

    getBookInfo(bookURL)
}

//Hämtar API:n med sökvärdet i 
async function getBookInfo(bookURL) {
    try {
        let response = await fetch(bookURL); 

        let bookInfo = await response.json(); 

        console.table(bookInfo.books.title); 
 
    } catch {
        console.log("Något gick fel...")
    }
};  

/*
function displayBookInfo(bookInfo) {
    bookInfo.forEach(book => {
        
    });
}
*/