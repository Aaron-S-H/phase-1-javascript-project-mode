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
    const form = document.getElementById("form");
    let cardFront = `
    <h2 class = "cardFront">${wine.name}</h2>
    <p>origin: ${wine.origin}<br>
      year: ${wine.year}<br>
       price: ${wine.price}</p>
    <img src="${wine.frontImageURL}" class="wine-photo"/>
    <br>
    <select name="userRatings" class="ratings" id="select">
    <option value="">Rate This Wine</option>
    <option value="5">5</option>
    <option value="4">4</option>
    <option value="3">3</option>
    <option value="2">2</option>
    <option value="1">1</option>
    </select>
   <br>
   <p class="yourRating> your rating:</p>
    `;
    
    card.innerHTML = cardFront;

    let img = card.querySelector(".wine-photo");
    img.addEventListener("mouseover", () => {
      if (wine.year) {
        img.src = wine.backImageURL;
      } else {
        img.src = wine.frontImageURL;
      }
    //   let dropDown = document.querySelector(".ratings");
      
    //   const rating = dropDown.value;
      card.querySelector(".ratings").addEventListener("change", (e) => { wine.totalUserRatings +=1;
        wine.yourRating = parseInt(e.target.value); wine.ratingsTally += parseInt(e.target.value);
        wine.averageUserRating = wine.ratingsTally/wine.totalUserRatings
    ;
    console.log(wine.averageUserRating);
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

// {wine.yourRating = e.target.value;
//     card.querySelector(".yourRating").textContent = `your rating: ${wine.yourRating}` }
//this one in the callback
function dropDownWork(value) {
    wine.yourRating = value;
        wine.userRatings += value; wine.numberOfRatings += 1; wine.averageUserRating = wine.userRatings / wine.numberOfRatings;
        updateRatings(wine);
}
