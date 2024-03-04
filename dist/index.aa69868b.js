/*Jag vill att man ska kunna söka på ett konstverk och att 
det visas vart det befinner sig. Då behöver jag dels koppla query-till sökvärdet 
i sökbaren, samt koppla url.dataprovider till nominatium för att få upp det på en karta. */ /*Ska visas när man sökt på konstverket: 
*dcTitleLangAware 
* dcDescription 
*/ let searchBtnEl = document.getElementById("searchBtn");
searchBtnEl.addEventListener("click", getValue);
//Tar värdet från searchbar och sätter in det i URL för API:n 
function getValue() {
    let searchbarValue = document.getElementById("searchBar").value;
    let artURL = `https://api.europeana.eu/record/v2/search.json?wskey=idgelielo&query=${searchbarValue}`;
    getArtInfo(artURL);
}
//Hämtar API:n med sökvärdet i 
async function getArtInfo(artURL) {
    try {
        let response = await fetch(artURL);
        let artInfo = await response.json();
        console.log(artInfo);
    } catch  {
        console.log("N\xe5got gick fel...");
    }
}

//# sourceMappingURL=index.aa69868b.js.map
