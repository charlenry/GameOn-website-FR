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
const submitBtn = document.querySelector(".btn-submit");
const thanksBg = document.querySelector(".bground-thanks");
const crossThanksBtn = document.querySelector("#cross-close-thanks");
const closeThanksBtn = document.querySelector(".btn-close-thanks");
const reserveForm = document.getElementById("reserve-form");
const formData = document.querySelectorAll(".formData");


// launch modal event for registration
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));
//modalBtn.addEventListener("click", launchModal);

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
 // modalBg.style.display = "none";
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
let email = document.getElementById("email");
let birthDay = document.getElementById("birthdate");
let tournamentQty = document.getElementById("quantity");
const newYork = document.getElementById("location1").checked;
const sanFrancisco = document.getElementById("location2").checked;
const seatle = document.getElementById("location3").checked;
const chicago = document.getElementById("location4").checked;
const boston = document.getElementById("location5").checked;
const porland = document.getElementById("location6").checked;
let checkBox = document.getElementById("checkbox1");
let errorFirstName = document.getElementById("error-fname");
let errorLastName = document.getElementById("error-lname");
let errorEmail = document.getElementById("error-email");
let errorBirthday = document.getElementById("error-birthday");
let errorTournament = document.getElementById("error-tournament");
let errorLocation = document.getElementById("error-location");
let errorAgreement = document.getElementById("error-agreement");


/* Caractères unicode: À, É, Ä, Ç, È, É, Ê, Ë, Î, Ï, Ô, Ö, Ù, Û, Ü, à, á, â, ä, æ, ç, è, é, ê, ë, ï, ô, ö, ù, û */
/* unicodeCars = \u00c0-\u00c2\u00c4\u00c6-\u00cf\u00d4\u00d6\u00d9-\u00dc\u00e0-\u00f6\u00f9-\u00fc; */

patternText = /^[a-zA-Z\u00c0-\u00c2\u00c4\u00c6-\u00cf\u00d4\u00d6\u00d9-\u00dc\u00e0-\u00f6\u00f9-\u00fc\s-]+$/g;
patternEmail = /([\w\.-]+)@([\w\.-]+)(\.[\w\.]+)/g;
patternDate = new RegExp("^\d{2}/\d{2}/\d{4}$", "g");
patternNumber = /^\d{1,2}$/g;

//  firstName.setCustomValidity("Gestion des messages d'erreur");

/*** Control functions ***/
function ControlNameSeizure(field, error) {
  if (field.value == "" || field.value.length < 2 || field.value.length > 30) {  //if empty string or characters are between 2 and 30
    error.style.visibility = "visible";  
    error.innerHTML = "Veuillez entrer au moins 2 caractères pour le champ du prénom et jusqu'à 30 caractères.";
    field.focus();
    return false;
  }  else {
    error.style.visibility = "hidden";  
    error.innerHTML = ""; 
  }
}

function validateName(field, error, event) {
  if (event === undefined) {
    if (field.value == "" || field.value.length < 2 || field.value.length > 30) { //if empty string or characters are between 2 and 30
    error.style.visibility = "visible";  
    error.innerHTML = "Veuillez entrer au moins 2 caractères pour le champ du prénom et jusqu'à 30 caractères.";
    field.focus();
    return false;
    }
  
    if (!patternText.test(field.value)) {  //if the user types a wrong character
      error.style.visibility = "visible";  
      error.innerHTML = "Seuls les caractères alphabétiques, les traits d'union et les espaces sont autorisés.";
      field.focus(); 
      return false;
    } 
    
    if (!(field.value == "" || field.value.length < 2) && patternText.test(field.value)) {
      error.style.visibility = "hidden";  
      error.innerHTML = "";   //cancel error message
    }
  } else {
    if (field.value == "" || field.value.length < 2 || field.value.length > 30) { //if empty string or characters are not between 2 and 30
    error.style.visibility = "visible";  
    error.innerHTML = "Veuillez entrer au moins 2 caractères pour le champ du prénom et jusqu'à 30 caractères.";
    field.focus();
    event.preventDefault();
    return false;
    }
  
    if (!patternText.test(field.value)) {  //if the user types a wrong character
      error.style.visibility = "visible";  
      error.innerHTML = "Seuls les caractères alphabétiques, les traits d'union et les espaces sont autorisés.";
      field.focus();
      event.preventDefault();
      return false;
    }
    
    if (!(field.value == "" || field.value.length < 2) && patternText.test(field.value)) {
      error.style.visibility = "hidden";  
      error.innerHTML = "";   //cancel error message
    }
  }
  return true;
}

/*** Controls the inputs in the first name field in real time ***/
firstName.addEventListener("input", function() {
  ControlNameSeizure(firstName, errorFirstName);
});

/*** Controls the inputs in the first name field when focus out ***/
firstName.addEventListener("blur", function() {
  validateName(firstName, errorFirstName);
});


/*** Controls the inputs in the last name field in real time ***/
lastName.addEventListener("input", function() {
  ControlNameSeizure(lastName, errorLastName);
});

/*** Controls the inputs in the last name field when focus out ***/
lastName.addEventListener("blur", function() {
  validateName(lastName, errorLastName);
});


/*** Controls the submit button ***/
submitBtn.addEventListener("click", function(e) { 
  if (validateName(firstName, errorFirstName, e) && validateName(lastName, errorLastName, e)) {
    //   validateForm();
     launchThanks();  //display the modal thanks
    reserveForm.reset();  //reset the form
    e.preventDefault();   //prevent the modal thank to close automatically
  }
   
});

function validateForm() {
  const prenom = firstName.value;
  const nom = lastName.value;
  const adrEmail = email.value;
  console.log(prenom);
  console.log(nom);
  console.log(adrEmail);
}


