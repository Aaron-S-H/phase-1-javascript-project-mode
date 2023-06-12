
const input = document.querySelector("input");
const form = document.getElementById("form");
const addWine = document.querySelector(".addWine");
const addWineForm = document.querySelector(".addWineForm");
addWine.addEventListener("click",()=>  { if(form.className === "hidden"){form.className = "addWineForm"; }
else{form.className = "hidden";}});
