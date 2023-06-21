document.addEventListener("DOMContentLoaded", () => {
  getAllWines();


 const page = document.getElementById("wineList");
  const form = document.getElementById("form");
  const addWine = document.querySelector(".addWine");

  addWine.addEventListener("click", () => {
    if (form.className === "hidden") {
      form.className = "addWineForm";
    } else {
      form.className = "hidden";
    }
  });

  function updateRatings(wine) {
    fetch(`http://localhost:3000/wines/${wine.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(wine),
    }).then((res) => res.json());
  }

  function getAllWines() {
    fetch("http://localhost:3000/wines")
      .then((res) => res.json())
      .then((wineData) => wineData.forEach((wine) => wineHandler(wine)));
  }

  function getFilteredWines(value) {
    fetch("http://localhost:3000/wines")
      .then((res) => res.json())
      .then((wineData) => {
        page.innerHTML = "";
        let filteredWines = wineData.filter((wine) => wine.origin === value);
        filteredWines.forEach(wineHandler);
      });
  }

  function updateNewWine(wineObj) {
    fetch("http://localhost:3000/wines", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(wineObj),
    })
      .then((res) => res.json())
      .then(wineHandler(wineObj));
      page.innerHTML = "";
      getAllWines();
};

  


   const inputName = document.getElementById("inputName");
  const inputUrl = document.getElementById("inputURL");
  const inputOrigin = document.getElementById("inputOrigin");
  const inputYear = document.getElementById("inputYear");
  const addWineForm =  document.querySelector("#submitNew");
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



  function wineHandler(wine) {
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
    let img = card.querySelector(".wine-photo");
    img.addEventListener("mouseover", () => {
      if (img.className !== "changed") {
        img.src = wine.backImageURL;
        img.className = "changed";
      } else {
        img.src = wine.frontImageURL;
        img.className = "wine-photo"
      }});

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

    function removeWine(id) {
           fetch(`http://localhost:3000/wines/${id}`, {
             method: "DELETE",
             headers: {
               "Conent-Type": "applkication/json",
             },
           }).then((res) => res.json());
         }
         card.querySelector("#removeWine").addEventListener("click", () => {
           card.remove();
           removeWine(wine.id);
         });

    collection.appendChild(card);

    document
      .getElementById("regions")
      .addEventListener("change", (event) =>
        getFilteredWines(event.target.value)
      );
  };


});
