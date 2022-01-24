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
const nextEvents = document.getElementById("checkbox2");
const errorFirstName = document.getElementById("error-fname");
const errorLastName = document.getElementById("error-lname");
const errorEmail = document.getElementById("error-email");
const errorBirthday = document.getElementById("error-birthday");
const errorTournament = document.getElementById("error-tournament");
const errorLocation = document.getElementById("error-location");
const errorAgreement = document.getElementById("error-agreement");

let chosenLocation = "";

/* Caractères unicode: À, É, Ä, Ç, È, É, Ê, Ë, Î, Ï, Ô, Ö, Ù, Û, Ü, à, á, â, ä, æ, ç, è, é, ê, ë, ï, ô, ö, ù, û */
/* unicodeCars = \u00c0-\u00c2\u00c4\u00c6-\u00cf\u00d4\u00d6\u00d9-\u00dc\u00e0-\u00f6\u00f9-\u00fc; */

const patternText = /^[^<>()[\]\\,.;:\s@"'`_0-9]+$/;
const patternEmail = /^(([^<>()[\]\\,.;:\s@"'`]+)(\.[^<>()[\]\\,.;:\s@"'`]+)*)@(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,})$/;
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

// launch thanks
function launchThanks() {
  modalBg.style.display = "none";
  thanksBg.style.display = "block";
}

// thanks closure event with the cross
crossThanksBtn.addEventListener("click", closeThanks);

// thanks closure event with the button
closeThanksBtn.addEventListener("click", closeThanks);

// close thanks
function closeThanks() {
  modalBg.style.display = "none";
  thanksBg.style.display = "none";
}


/*** Fonction de contrôle des champs prénom ou nom à la saisie ***/
ControlNameSeizure = (field, error) => {
  if (field.value != "" || field.value.length >= 2 || field.value.length <= 30) {  //if empty string or characters are between 2 and 30
    error.style.visibility = "hidden";  
    error.innerHTML = "";
    field.style.border = "";
  }
}

/*** Contrôle du champ prénom à la saisie ***/
firstName.addEventListener("input", () => {
  ControlNameSeizure(firstName, errorFirstName);
});

/*** Contrôle du champ nom à la saisie ***/
lastName.addEventListener("input", () => {
  ControlNameSeizure(lastName, errorLastName);
});


/*** Fonction de validation du prénom ou du nom ***/
validateName = (field, error, event) => {
  const patternTextResult = patternText.test(field.value.toString());
  
  if (field.value == "" || field.value.length < 2 || field.value.length > 30) { //if empty string or characters are not between 2 and 30
    error.style.visibility = "visible";  
    error.innerHTML = "Veuillez saisir entre 2 et 30 caractères.";
    field.style.border = "2px solid #FF4E60";
    field.focus();
    event.preventDefault();  // prevents the modal form closure 
    return false;  // prevents the form validation at the level of this field & stops the propagation of the error messages
  } else if (patternTextResult == false) {  //if the user types a wrong character
    error.style.visibility = "visible";  
    error.innerHTML = "Seuls les caractères alphabétiques, les traits d'union et les espaces sont autorisés.";
    field.style.border = "2px solid #FF4E60";
    field.focus();
    event.preventDefault();  // prevents the modal form closure 
    return false;  //prevents the form validation at the level of this field & stops the propagation of the error messages
  } else {
    error.style.visibility = "hidden";  
    error.innerHTML = "";   //cancels error message
    field.style.border = "2px solid #279e7a";
  }
  return true;  //allows to control each field of the form
}

/*** Contrôle du champ prénom en sortie du champ ***/
firstName.addEventListener("blur", () => {
  validateNameOnBlur(firstName);
});

/*** Contrôle du champ nom en sortie du champ ***/
lastName.addEventListener("blur", () => {
  validateNameOnBlur(lastName);
});

/*** Fonction de contrôle du prénom ou du nom en sortie du champ respectif ***/
validateNameOnBlur = (field) => {
  const patternTextResult = patternText.test(field.value.toString());

  if (field.value != "" && field.value.length >= 2 && field.value.length <= 30 && patternTextResult == true) {
    field.style.border = "2px solid #279e7a";
  }
}


/*** Fonction de contrôle à la saisie des champs E-mail, Date de naiss., Nombre de tournois ***/
ControlSeizure = (field, error) => {
  if (!(field.value == "")) {  //if not empty string 
    error.style.visibility = "hidden";  
    error.innerHTML = ""; 
    field.style.border = "";
  }
}

/*** Contrôle du champ Email à la saisie ***/
email.addEventListener("input", () => {
  ControlSeizure(email, errorEmail);
});

/*** Fonction de validation du champ Email ***/
validateEmail = (field, error, event) => {
  const patternEmailResult = patternEmail.test(String(field.value).toLowerCase());
  
  if (field.value == "" || patternEmailResult == false) { 
    error.style.visibility = "visible";  
    error.innerHTML = "Veuillez entrer une adresse email valide.";
    field.style.border = "2px solid #FF4E60";
    field.focus();
    event.preventDefault();
    return false;
  } else {
    error.style.visibility = "hidden";  
    error.innerHTML = "";   //cancels error message
    field.style.border = "2px solid #279e7a";
  }
  return true;
}

/*** Contrôle du champ E-mail en sortie du champ ***/
email.addEventListener("blur", () => {
  validateEmailOnBlur(email);
});

/*** Fonction de contrôle de l'email en sortie du champ ***/
validateEmailOnBlur = (field) => {
  const patternEmailResult = patternEmail.test(String(field.value).toLowerCase());

  if (field.value != "" && patternEmailResult == true) {
    field.style.border = "2px solid #279e7a";
  }
}


/*** Contrôle de la date de naissance ***/
/*** Contrôle de la date de naissance à la saisie ***/
birthday.addEventListener("input", () => {
  ControlSeizure(birthday, errorBirthday);
});

/*** Fonction de validation de la date de naissance ***/
validateBirthday = (field, error, event) => {
 // const patternBirthdayResult = patternBirthday.test(field.value.toString());
  
  if (field.value == "" || field.value.length != 10) { 
  error.style.visibility = "visible";  
  error.innerHTML = "Veuillez entrer votre date de naissance au format JJ/MM/AAAA.";
  field.style.border = "2px solid #FF4E60";
  field.focus();
  event.preventDefault();
  return false;
  } else {
    error.style.visibility = "hidden";  
    error.innerHTML = "";   //cancels error message
    field.style.border = "2px solid #279e7a";
  }
  return true;
}

/*** Contrôle du champ Date de naissance en sortie du champ ***/
birthday.addEventListener("blur", () => {
  validateBirthdayOnBlur(birthday);
});

/*** Fonction de contrôle de la date de naissance en sortie du champ ***/
validateBirthdayOnBlur = (field) => {
  if (field.value != "" && field.value.length == 10) {
    field.style.border = "2px solid #279e7a";
  }
}


/*** Contrôle du nombre de tournois à la saisie ***/
tournamentQty.addEventListener("input", () => {
  ControlSeizure(tournamentQty, errorTournament);
});

/*** Fonction de validation du nombre de tournois ***/
validateTournamentQty = (field, error, event) => {
  const patternNumberResult = patternNumber.test(field.value.toString());
  
  if (field.value == "") { 
    error.style.visibility = "visible";  
    error.innerHTML = "Veuillez entrer votre nombre de tournois passés (entre 0 et 99).";
    field.style.border = "2px solid #FF4E60";
    field.focus();
    event.preventDefault();
    return false;
  } else if (patternNumberResult == false) {
    error.style.visibility = "visible";  
    error.innerHTML = "Veuillez entrer un nombre entre 0 et 99.";
    field.style.border = "2px solid #FF4E60";
    field.focus();
    event.preventDefault();
    return false;
  } else {
    error.style.visibility = "hidden";  
    error.innerHTML = "";   //cancels error message
    field.style.border = "2px solid #279e7a";
  }
  return true;
}

/*** Contrôle du nombre de tournois en sortie du champ ***/
tournamentQty.addEventListener("blur", () => {
  validateTournamentQtyOnBlur(tournamentQty);
});

/*** Fonction de contrôle du nombre de tournois en sortie du champ ***/
validateTournamentQtyOnBlur = (field) => {
  const patternNumberResult = patternNumber.test(field.value.toString());

  if (field.value != "" && patternNumberResult == true) {
    field.style.border = "2px solid #279e7a";
  }
}


/*** Validation du choix du lieu ***/
validateLocation = (_field, error, event) => {
  for(let i = 0; i < locationArray.length; i++){
    if(locationArray[i].checked) {
      chosenLocation = locationArray[i].value;
    }
  }

  if (chosenLocation == "") {
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

/*** Efface le message d'erreur sous les boutons de check et radio ***/
/* function clearErrorMessage(btn) {
  if(btn.checked) {
    errorLocation.style.visibility = "hidden";  
    errorLocation.innerHTML = "";
  }
}

locationArray.forEach((btn) => btn.addEventListener("click", clearErrorMessage)); */

clearErrorMessage = (btn, error) => {
  if(btn.checked) {
    error.style.display = "inline";
    error.style.visibility = "hidden";  
    error.innerHTML = "";
  }
}

/*** Ecoute des boutons radio des lieux ***/
newYork.addEventListener("click", () => {
  clearErrorMessage(newYork, errorLocation);
});

sanFrancisco.addEventListener("click", () => {
  clearErrorMessage(sanFrancisco, errorLocation);
});

seatle.addEventListener("click", () => {
  clearErrorMessage(seatle, errorLocation);
});

chicago.addEventListener("click", () => {
  clearErrorMessage(chicago, errorLocation);
});

boston.addEventListener("click", () => {
  clearErrorMessage(boston, errorLocation);
});

porland.addEventListener("click", () => {
  clearErrorMessage(porland, errorLocation);
});


/*** Validation de l'accord des conditions ***/
validateAgreement = (_field, error, event) => {
  if (agree.checked == false) {
    error.style.display = "block";
    error.style.visibility = "visible";  
    error.innerHTML = "Vous devez vérifier que vous acceptez les termes et conditions.";
    event.preventDefault();
    return false;
  } else {
    error.style.display = "inline";
    error.style.visibility = "hidden";  
    error.innerHTML = "";
  }
  return true;
}

/**Ecoute du check d'accord des conditions ***/
agree.addEventListener("click", () => {
  clearErrorMessage(agree, errorAgreement);
});

clearGreenBorder = () => {
  firstName.style.border = "";
  lastName.style.border = "";
  email.style.border = "";
  birthday.style.border = "";
  tournamentQty.style.border = "";
}


/*** Contrôle du bouton submit ***/
submitBtn.addEventListener("click", (e) => { 
  if (validateName(firstName, errorFirstName, e) && 
      validateName(lastName, errorLastName, e) && 
      validateEmail(email, errorEmail, e) && 
      validateBirthday(birthday, errorBirthday, e) && 
      validateTournamentQty(tournamentQty, errorTournament, e) && 
      validateLocation(locationArray, errorLocation, e) && 
      validateAgreement(agree, errorAgreement, e)) {
    collectData();
    launchThanks();  //display the modal thanks
    clearGreenBorder();
    reserveForm.reset();  //reset the form
    e.preventDefault();   //prevent the modal thanks to close automatically
  }
   
});


/*** Test de récupération des données ***/
collectData = () => {
  const prenom = firstName.value;
  const nom = lastName.value;
  const adrEmail = email.value;
  const anniversaire = birthday.value;
  const nbreTournois = tournamentQty.value;
  const lieu = chosenLocation;
  const accord = agree.checked;
  const prochainsEvts = nextEvents.checked;

  console.log("Prénom: "+prenom);
  console.log("Nom: "+nom);
  console.log("E-mail: "+adrEmail);
  console.log("Anniversaire: "+anniversaire);
  console.log("Nombre de tournois: "+nbreTournois);
  console.log("Lieu choisi: "+lieu);
  console.log("Accord: "+accord);
  console.log("Prochains évènements: "+prochainsEvts);
}


