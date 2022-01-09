function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalBtn = document.querySelectorAll(".modal-btn");
const modalBg = document.querySelector(".bground");
const crossModalBtn = document.querySelector("#cross-close-modal");
const submitBtn = document.querySelectorAll(".btn-submit");
const thanksBg = document.querySelector(".bground-thanks");
const crossThanksBtn = document.querySelector("#cross-close-thanks");
const closeThanksBtn = document.querySelector(".btn-close-thanks");
const formData = document.querySelectorAll(".formData");


// launch modal event for registration
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalBg.style.display = "block";
}

// close modal form event
crossModalBtn.addEventListener("click", closeModal);

// close modal form
function closeModal() {
  modalBg.style.display = "none";
}


// ---


// launch submit event
//submitBtn.forEach((btn) => btn.addEventListener("click", launchThanks));

// launch modal thanks
function launchThanks() {
  modalBg.style.display = "none";
  thanksBg.style.display = "block";
}


// launch close modal event with the cross
crossThanksBtn.addEventListener("click", closeThanks);

// launch close modal event with the button
closeThanksBtn.addEventListener("click", closeThanks);

// close modal thanks
function closeThanks() {
  modalBg.style.display = "none";
  thanksBg.style.display = "none";
}

// ---

// DOM Elements
let firstName = document.getElementById("first");
let lastName = document.getElementById("last");
var email = document.getElementById("email");
let birthDay = document.getElementById("birthdate");
let tournamentQty = document.getElementById("quantity");
let newYork = document.getElementById("location1").checked;
let sanFrancisco = document.getElementById("location2").checked;
let seatle = document.getElementById("location3").checked;
let chicago = document.getElementById("location4").checked;
let boston = document.getElementById("location5").checked;
let porland = document.getElementById("location6").checked;
let checkBox = document.getElementById("checkbox1");
let errorMessage = document.getElementById("errorname");


firstName.addEventListener("blur", function() {
  if (firstName.value == "" || firstName.value.length < 2) {
    errorMessage.style.visibility = "visible";  
    errorMessage.innerHTML = "Veuillez entrez un Prénom valide";  
    firstName.focus(); 
  } else {
    errorMessage.style.visibility = "hidden";  
    errorMessage.innerHTML = ""; 
  }
});

document.getElementById("submit").addEventListener("click", function(e) { 
  if (firstName.value == "" || firstName.value.length < 2) {
    errorMessage.style.visibility = "visible";  
    errorMessage.innerHTML = "Veuillez entrez un Prénom valide";  
    firstName.focus(); 
    e.preventDefault();
  } else {
    launchThanks();
    e.preventDefault();
  }

});


/*
if ((firstName.value == "") || (firstName.value.length < 2)) {
  console.log(firstName.value.length);
  firstName.setCustomValidity("Veuillez entrer 3 caractères ou plus pour le champ du prénom.");
} else {
  firstName.setCustomValidity("");
}
*/

