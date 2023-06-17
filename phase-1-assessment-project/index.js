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
      year: ${wine.year}<br></p>
      <p class="avgRtng">average user rating: ${wine.averageUserRating}</p>
    <img src="${wine.frontImageURL}" class="wine-photo"/>
    <br>
    <select name="userRatings" class="ratings" id="select">
    <option value="0">Rate This Wine</option>
    <option value="5">your rating: 5</option>
    <option value="4">your rating: 4</option>
    <option value="3">your rating: 3</option>
    <option value="2">your rating: 2</option>
    <option value="1">your rating: 1</option>
    </select>
    <button id="removeWine"> remove this wine</button>
   <br>
    `;
    
    card.innerHTML = cardFront;
card.querySelector("#removeWine").addEventListener('click', () => {
    card.remove();
    removeWine(wine.id);
})
    let img = card.querySelector(".wine-photo");
    img.addEventListener("mouseover", () => {
      if (wine.year) {
        img.src = wine.backImageURL;
      } else {
        img.src = wine.frontImageURL;
      };

      function removeWine(id){
        fetch(`http://localhost:3000/wines/${id}`,{
            method:"DELETE",
            headers: {
                "Conent-Type" : "applkication/json"
            }
        })
        .then(res => res.json())
        .then(wine => console.log(wine))
      }
    //   let dropDown = document.querySelector(".ratings");
      
    //   const rating = dropDown.value;
      card.querySelector(".ratings").addEventListener("change", (e) => { wine.totalUserRatings +=1;
        wine.yourRating = parseInt(e.target.value); wine.ratingsTally += parseInt(e.target.value);
        wine.averageUserRating = Math.ceil(wine.ratingsTally/wine.totalUserRatings);
        card.querySelector(".avgRtng").textContent = `average user rating: ${wine.averageUserRating}`;
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


