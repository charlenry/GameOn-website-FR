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

const firstName = document.getElementById("first");
const lastName = document.getElementById("last");
const email = document.getElementById("email");
const birthday = document.getElementById("birthdate");
const tournamentQty = document.getElementById("quantity");
const locationArray = document.getElementsByName('location');
const newYork = document.getElementById("location1");
const sanFrancisco = document.getElementById("location2");
const seatle = document.getElementById("location3");
const chicago = document.getElementById("location4");
const boston = document.getElementById("location5");
const porland = document.getElementById("location6");
const agree = document.getElementById("checkbox1");
const errorFirstName = document.getElementById("error-fname");
const errorLastName = document.getElementById("error-lname");
const errorEmail = document.getElementById("error-email");
const errorBirthday = document.getElementById("error-birthday");
const errorTournament = document.getElementById("error-tournament");
const errorLocation = document.getElementById("error-location");
const errorAgreement = document.getElementById("error-agreement");

/* Caractères unicode: À, É, Ä, Ç, È, É, Ê, Ë, Î, Ï, Ô, Ö, Ù, Û, Ü, à, á, â, ä, æ, ç, è, é, ê, ë, ï, ô, ö, ù, û */
/* unicodeCars = \u00c0-\u00c2\u00c4\u00c6-\u00cf\u00d4\u00d6\u00d9-\u00dc\u00e0-\u00f6\u00f9-\u00fc; */

const patternText = /^[^<>()[\]\\,.;:\s@"'_0-9]+$/;
const patternEmail = /^(([^<>()[\]\\,.;:\s@"']+)(\.[^<>()[\]\\,.;:\s@"']+)*)@(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,})$/;
const patternBirthday = new RegExp("^\d{2}/\d{2}/\d{4}$", "");
const patternNumber = /^\d{1,2}$/;


// launch modal event for registration
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));
//modalBtn.addEventListener("click", launchModal);

// launch modal form
function launchModal() {
  modalBg.style.display = "block";
}

// modal form closure event
crossModalBtn.addEventListener("click", closeModal);

// close modal form
function closeModal() {
  modalBg.style.display = "none";
}

// launch modal thanks
function launchThanks() {
  modalBg.style.display = "none";
  thanksBg.style.display = "block";
}

// modal closure event with the cross
crossThanksBtn.addEventListener("click", closeThanks);

// modal closure event with the button
closeThanksBtn.addEventListener("click", closeThanks);

// close modal thanks
function closeThanks() {
  modalBg.style.display = "none";
  thanksBg.style.display = "none";
}


/*** Contrôles des champs prénom ou nom à la saisie ***/
function ControlNameSeizure(field, error) {
  if (field.value != "" || field.value.length >= 2 || field.value.length <= 30) {  //if empty string or characters are between 2 and 30
    error.style.visibility = "hidden";  
    error.innerHTML = ""; 
  }
}

/*** Contrôle du champ prénom à la saisie ***/
firstName.addEventListener("input", function() {
  ControlNameSeizure(firstName, errorFirstName);
});

/*** Contrôle du champ nom à la saisie ***/
lastName.addEventListener("input", function() {
  ControlNameSeizure(lastName, errorLastName);
});

/*** Validation du prénom ou du nom ***/
function validateName(field, error, event) {
  const patternTextResult = patternText.test(field.value.toString());
  
  if (field.value == "" || field.value.length < 2 || field.value.length > 30) { //if empty string or characters are not between 2 and 30
    error.style.visibility = "visible";  
    error.innerHTML = "Veuillez saisir entre 2 et 30 caractères.";
    field.focus();
    event.preventDefault();
    return false;
  } else if (patternTextResult == false) {  //if the user types a wrong character
    error.style.visibility = "visible";  
    error.innerHTML = "Seuls les caractères alphabétiques, les traits d'union et les espaces sont autorisés.";
    field.focus();
    event.preventDefault();
    return false;
  } else {
    error.style.visibility = "hidden";  
    error.innerHTML = "";   //cancel error message
  }
  
  return true;
}


/*** Contrôle à la saisie ***/
function ControlSeizure(field, error) {
  if (!(field.value == "")) {  //if not empty string 
    error.style.visibility = "hidden";  
    error.innerHTML = ""; 
  }
}

/*** Contrôle du champ Email à la saisie ***/
email.addEventListener("input", function() {
  ControlSeizure(email, errorEmail);
});

/*** Validation du champ Email ***/
function validateEmail(field, error, event) {
  const patternEmailResult = patternEmail.test(String(field.value).toLowerCase());
  
  if (field.value == "" || patternEmailResult == false) { 
    error.style.visibility = "visible";  
    error.innerHTML = "Veuillez entrer une adresse email valide.";
    field.focus();
    event.preventDefault();
    return false;
  } else {
    error.style.visibility = "hidden";  
    error.innerHTML = "";   //cancel error message
  }
  
  return true;
}


/*** Contrôle de la date de naissance ***/
/*** Contrôle de la date de naissance à la saisie ***/
birthday.addEventListener("input", function() {
  ControlSeizure(birthday, errorBirthday);
});

/*** Validation de la date de naissance ***/
function validateBirthday(field, error, event) {
 // const patternBirthdayResult = patternBirthday.test(field.value.toString());
  
  if (field.value == "" || field.value.length != 10) { 
  error.style.visibility = "visible";  
  error.innerHTML = "Veuillez entrer votre date de naissance au format JJ/MM/AAAA.";
  field.focus();
  event.preventDefault();
  return false;
  } else {
    error.style.visibility = "hidden";  
    error.innerHTML = "";   //cancel error message
  }

  return true;
}


/*** Contrôle du nombre de tournois à la saisie ***/
tournamentQty.addEventListener("input", function() {
  ControlSeizure(tournamentQty, errorTournament);
});

/*** Validation du nombre de tournois ***/
function validateTournamentQty(field, error, event) {
  const patternNumberResult = patternNumber.test(field.value.toString());
  
  if (field.value == "") { 
    error.style.visibility = "visible";  
    error.innerHTML = "Veuillez entrer votre nombre de tournois passés (entre 0 et 99).";
    field.focus();
    event.preventDefault();
    return false;
  } else if (patternNumberResult == false) {
    error.style.visibility = "visible";  
    error.innerHTML = "Veuillez entrer un nombre entre 0 et 99.";
    field.focus();
    event.preventDefault();
    return false;
  } else {
    error.style.visibility = "hidden";  
    error.innerHTML = "";   //cancel error message
  }

  return true;
}


/*** Validation du choix du lieu ***/
function validateLocation(_field, error, event){
  let valeur="";

  for(let i = 0; i < locationArray.length; i++){
    if(locationArray[i].checked) {
      valeur = locationArray[i].value;
    }
  }

  if (valeur == "") {
    error.style.visibility = "visible";  
    error.innerHTML = "Veuillez choisir un lieu.";
    event.preventDefault();
    return false;
  } else {
    error.style.visibility = "hidden";  
    error.innerHTML = "";
  }
  return true;
}

/*** Ecoute des boutons radio des lieux ***/
newYork.addEventListener("click", function() {
  if(newYork.checked) {
    errorLocation.style.visibility = "hidden";  
    errorLocation.innerHTML = "";
  }
});

sanFrancisco.addEventListener("click", function() {
  if(sanFrancisco.checked) {
    errorLocation.style.visibility = "hidden";  
    errorLocation.innerHTML = "";
  }
});

seatle.addEventListener("click", function() {
  if(seatle.checked) {
    errorLocation.style.visibility = "hidden";  
    errorLocation.innerHTML = "";
  }
});

chicago.addEventListener("click", function() {
  if(chicago.checked) {
    errorLocation.style.visibility = "hidden";  
    errorLocation.innerHTML = "";
  }
});

boston.addEventListener("click", function() {
  if(boston.checked) {
    errorLocation.style.visibility = "hidden";  
    errorLocation.innerHTML = "";
  }
});

porland.addEventListener("click", function() {
  if(porland.checked) {
    errorLocation.style.visibility = "hidden";  
    errorLocation.innerHTML = "";
  }
});


/*** Validation de l'accord des conditions ***/
function validateAgreement(_field, error, event){
  if (agree.checked == false) {
    error.style.visibility = "visible";  
    error.innerHTML = "Vous devez vérifier que vous acceptez les termes et conditions.";
    event.preventDefault();
    return false;
  } else {
    error.style.visibility = "hidden";  
    error.innerHTML = "";
  }
  return true;
}

/**Ecoute du check d'accord des conditions ***/
agree.addEventListener("click", function() {
  if(agree.checked) {
    errorAgreement.style.visibility = "hidden";  
    errorAgreement.innerHTML = "";
  }
});


/*** Contrôle du bouton submit ***/
submitBtn.addEventListener("click", function(e) { 
  if (validateName(firstName, errorFirstName, e) && 
      validateName(lastName, errorLastName, e) && 
      validateEmail(email, errorEmail, e) && 
      validateBirthday(birthday, errorBirthday, e) && 
      validateTournamentQty(tournamentQty, errorTournament, e) && 
      validateLocation(locationArray, errorLocation, e) && 
      validateAgreement(agree, errorAgreement, e)) {
    //   validateForm();
     launchThanks();  //display the modal thanks
    reserveForm.reset();  //reset the form
    e.preventDefault();   //prevent the modal thank to close automatically
  }
   
});


/*** Test de récupération des données ***/
function validateForm() {
  const prenom = firstName.value;
  const nom = lastName.value;
  const adrEmail = email.value;
  console.log(prenom);
  console.log(nom);
  console.log(adrEmail);
}


