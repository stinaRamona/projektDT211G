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
        let artInfoPlace = artInfo.items[0].country[0]; // får ut museet där det finns (för första alternativet) - kan sättas in i nominatum! 
        console.table(artInfoPlace);
        getMapInfo(artInfoPlace); // det fungerar att få in landet, men inte själva museet. Kanske behöver testa en annan karttjänst. 
    } catch  {
        console.log("N\xe5got gick fel...");
    }
}
async function getMapInfo(artInfoPlace) {
    try {
        let mapURL = `https://www.google.com/maps/embed/v1/search?q=${artInfoPlace}&key=`;
        let response = await fetch(mapURL);
        let mapInfo = await response.json();
        document.getElementsByTagName("iframe")[0].src = mapInfo;
    //console.table(mapInfo.features[0].geometry.coordinates); 
    } catch  {
        console.log("kunde inte l\xe4sa in information...");
    }
} //UcDZGnfQh4LGU3kPhDQO ID
 //gtwDsWMPhuTrBH7k2ps5IGlC8b_ZxPOnGhwMw-ZVUFc KEY
 // G key AIzaSyA5jgtp-GaWnXrNI1dveaqERx0OEMqsUzM 

//# sourceMappingURL=index.aa69868b.js.map
