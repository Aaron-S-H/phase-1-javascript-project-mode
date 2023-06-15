document.addEventListener("DOMContentLoaded", () => {
  getAllWines();

  const input = document.querySelector("input");
  const form = document.getElementById("form");
  const addWine = document.querySelector(".addWine");
  const addWineForm = document.querySelector(".addWineForm");
  addWine.addEventListener("click", () => {
    if (form.className === "hidden") {
      form.className = "addWineForm";
    } else {
      form.className = "hidden";
    }
  });

  function getAllWines() {
    fetch("http://localhost:3000/wines")
      .then((res) => res.json())
      .then((wineData) => wineData.forEach((wine) => wineHandler(wine)));
  }

  function wineHandler(wine) {
    const collection = document.querySelector("ul");
    let card = document.createElement("li");
    let h2 = document.querySelector("h2");
    card.className = "card";
    let cardFront = `
    <h2 class = "cardFront">${wine.name}</h2>
    <h3>Origin: ${wine.origin}<br>
       ${wine.year}</h3>
    <img src="${wine.frontImageURL}" class="wine-photo"/>
    <br>
    <select name="userRatings" class="ratings">
    <option value="">Rate This Wine</option>
    <option value="5">5</option>
    <option value="4">4</option>
    <option value="3">3</option>
    <option value="2">2</option>
    <option value="1">1</option>
    </select>
    <br>
    <p class="ratings">average user rating: ${wine.averageUserRating}</p>
    `;
    let cardBack = `
    <h2 class = "cardBack">${wine.name}</h2>
    <h3>Origin: ${wine.alcohol}<br>
       ${wine.price}</h3>
    <img src="${wine.backImageURL}" class="wine-photo"/>
    <br>
    <select name="userRatings" class="ratings">
    <option value="">Rate This Wine</option>
    <option value="5">5</option>
    <option value="4">4</option>
    <option value="3">3</option>
    <option value="2">2</option>
    <option value="1">1</option>
    </select>
    <br>
    <p class="ratings">average user rating: ${wine.averageUserRating}</p>
    `;
    card.innerHTML = cardFront;

    let img = card.querySelector(".wine-photo");
    img.addEventListener("mouseover", () => {
      if (wine.year) {
        card.innerHTML = cardBack;
      } else {
        card.innerHTML = cardFront;
      }
      const dropDown = document.querySelector(".ratings");
      const rating = dropDown.children;
      dropDown.addEventListener("change", () => console.log(dropDown.value));
    });

    collection.appendChild(card);
  }
});
