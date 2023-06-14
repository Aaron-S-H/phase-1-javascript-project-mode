document.addEventListener("DOMContentLoaded", () => {
    getAllWines();



const input = document.querySelector("input");
const form = document.getElementById("form");
const addWine = document.querySelector(".addWine");
const addWineForm = document.querySelector(".addWineForm");
addWine.addEventListener("click",()=>  { if(form.className === "hidden"){form.className = "addWineForm"; }
else{form.className = "hidden";}});


function getAllWines() {
    fetch("http://localhost:3000/wines")
    .then((res) => res.json())
    .then((wineData) => wineData.forEach((wine) => wineHandler(wine)));
}

function wineHandler(wine) {
    const collection = document.querySelector("ul");
    let card = document.createElement("li");
    card.className = "card";
    card.innerHTML = `
    <h2>${wine.name}</h2>
    <img src="${wine.frontImageURL}" class="toy-avatar"/>
    <p class="
    <p class="ratings"> ${wine.averageUserRating} average user rating</p>
    <select name="userRatings" id="ratings>
    <option value="5">5</option>
    <option value="4">4</option>
    <option value="3">3</option>
    <option value="2">2</option>
    <option value="1">1</option>
    <option value="0">0</option>
    </select>
    `;
    collection.appendChild(card);

}




});