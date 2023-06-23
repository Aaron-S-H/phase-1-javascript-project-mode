document.addEventListener("DOMContentLoaded", () => {
  fetchAllWines();

  const page = document.getElementById("wineList");
  const form = document.getElementById("form");
  const addWine = document.querySelector(".addWine");

//event listener on addWine form to hide display

  addWine.addEventListener("click", () => {
    if (form.className === "hidden") {
      form.className = "addWineForm";
    } else {
      form.className = "hidden";
    }
  });

//PATCH request to update ratings on server/db.json

  function updateRatings(wine) {
    fetch(`http://localhost:3000/wines/${wine.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(wine),
    }).then((res) => res.json());
  };

//GET request for wines

  function fetchAllWines() {
    fetch("http://localhost:3000/wines")
      .then((res) => res.json())
      .then((wineData) => wineData.forEach((wine) => renderWine(wine)));
  };

//sends GET request to iterate through full obj array with filter method, then populates DOM with array using forEach on new array

  function getFilteredWines(value) {
    fetch("http://localhost:3000/wines")
      .then((res) => res.json())
      .then((wineData) => {
        page.innerHTML = "";
        let filteredWines = wineData.filter((wine) => wine.origin === value);
        if (value === "ALL"){
          wineData.forEach(renderWine)
        }else{
        filteredWines.forEach(renderWine)};
      });
  };


  //takes wineObj, sends a POST request to update server with new wine, then populates DOM with wine list

  function updateNewWine(wineObj) {
    fetch("http://localhost:3000/wines", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(wineObj),
    })
      .then((res) => res.json())
      .then(renderWine(wineObj));
    page.innerHTML = "";
    fetchAllWines();
  };

//Submit wine form and wineObj variable

  const inputName = document.getElementById("inputName");
  const inputUrl = document.getElementById("inputURL");
  const inputOrigin = document.getElementById("inputOrigin");
  const inputYear = document.getElementById("inputYear");
  const addWineForm = document.querySelector("#submitNew");
  addWineForm.addEventListener("click", (event) => {
    event.preventDefault();
    let wineObj = {
      name: inputName.value,
      frontImageURL: inputUrl.value,
      backImageURL: inputUrl.value,
      year: inputYear.value,
      origin: inputOrigin.value,
      price: 0,
      yourRating: 0,
      totalUserRatings: 0,
      ratingsTally: 0,
      averageUserRating: 0,
      id: "",
    };
    updateNewWine(wineObj);
    form.reset();
  });

 //renders wine from obj array for DOM population

  function renderWine(wine) {
    const collection = document.querySelector("ul");
    let card = document.createElement("li");
    card.className = "card";
    card.innerHTML = `
    <h2 class = "cardFront">${wine.name}</h2>
    <p>origin: ${wine.origin}<br>
      year: ${wine.year}<br></p>
      <p class="avgRtng">average user rating: ${wine.averageUserRating}</p>
    <img src="${wine.frontImageURL}" class="wine-photo"/>
    <br>
    <select name="userRatings" class="ratings">
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

    //event listener mouseover to change wine front to wine back photo

    let img = card.querySelector(".wine-photo");
    img.addEventListener("mouseover", () => {
      if (img.className !== "changed") {
        img.src = wine.backImageURL;
        img.className = "changed";
      } else {
        img.src = wine.frontImageURL;
        img.className = "wine-photo";
      }
    });

    //event listener for "rate this wine"

    card.querySelector(".ratings").addEventListener("change", (e) => {
      wine.totalUserRatings += 1;
      wine.yourRating = parseInt(e.target.value);
      wine.ratingsTally += parseInt(e.target.value);
      wine.averageUserRating = Math.ceil(
        wine.ratingsTally / wine.totalUserRatings
      );
      card.querySelector(
        ".avgRtng"
      ).textContent = `average user rating: ${wine.averageUserRating}`;
      updateRatings(wine);
    });

    //event listener for "remove this wine"

    card.querySelector("#removeWine").addEventListener("click", () => {
      card.remove();
      removeWine(wine.id);
    });

    collection.appendChild(card);


    //event listener on wine by regions drop down

    document
      .getElementById("regions")
      .addEventListener("change", (event) =>
        getFilteredWines(event.target.value)
      );
  };

  function removeWine(id) {
    fetch(`http://localhost:3000/wines/${id}`, {
      method: "DELETE",
      headers: {
        "Conent-Type": "applkication/json",
      },
    }).then((res) => res.json());
  }
});
