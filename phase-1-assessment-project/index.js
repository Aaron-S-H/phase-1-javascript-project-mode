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
    card.setAttribute('id', `${wine.id}`);
    let cardFront = `
    <h2 class = "cardFront">${wine.name}</h2>
    <p>Origin: ${wine.origin}<br>
       ${wine.year}</p>
    <img src="${wine.frontImageURL}" id="wine-photo${wine.id}"/>
    <br>
    <select name="userRatings" class="ratings">
    <option value="">Rate This Wine</option>
    <option value="5">5</option>
    <option value="4">4</option>
    <option value="3">3</option>
    <option value="2">2</option>
    <option value="1">1</option>
    </select>

    <p class="ratings">average user rating: ${wine.averageUserRating}</p>
    `;
    let cardBack = `
    <h2 class = "cardBack">${wine.name}</h2>
    <p>Alcohol: ${wine.alcohol}<br>
       Price: ${wine.price}</p>
    <img src="${wine.backImageURL}" id="wine-photo${wine.id}"/>
    <br>
    <select name="userRatings" class="ratings">
    <option value="">Rate This Wine</option>
    <option value="5">5</option>
    <option value="4">4</option>
    <option value="3">3</option>
    <option value="2">2</option>
    <option value="1">1</option>
    </select>
    <p class="ratings">average user rating: ${wine.averageUserRating}</p>
    `;
    card.innerHTML = cardFront;

    let img = card.querySelector("#wine-photo");
    img.addEventListener("mouseover", () => {
      if (wine.year) {
        card.innerHTML = cardBack;
      } else {
        card.innerHTML = cardFront;
      }
      const dropDown = document.querySelector(".ratings");
      
    //   const rating = dropDown.value;
      dropDown.addEventListener("change",() => {wine.yourRating = dropDown.value;
        wine.userRatings += dropDown.value; wine.numberOfRatings += 1; wine.averageUserRating = wine.userRatings/wine.numberOfRatings;
        updateRatings(wine);


    });
    });

    collection.appendChild(card);

    function updateRatings(wine){
        fetch(`http://localhost:3000/wines/${wine.id}`,{
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body:JSON.stringify(wine),
        }) .then((res) => res.json());
    }
  }
});


//this one in the callback 
function dropDownWork(value) {
    wine.yourRating = value;
        wine.userRatings += value; wine.numberOfRatings += 1; wine.averageUserRating = wine.userRatings / wine.numberOfRatings;
        updateRatings(wine);
}
