// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAVYHek3vg7ct5MCjFutM49WF8IksebUq4",
  authDomain: "wedding-75973.firebaseapp.com",
  databaseURL: "https://wedding-75973.firebaseio.com",
  projectId: "wedding-75973",
  storageBucket: "wedding-75973.appspot.com",
  messagingSenderId: "173726024374",
  appId: "1:173726024374:web:6e82f646b42a8d30"
};
firebase.initializeApp(firebaseConfig);
var firestore = firebase.firestore();

const docRef = firestore.collection("rsvps").doc();
const nameField = document.querySelector("#name");
const plusOneField = document.querySelector("#plusOne");
const wordsBitField = document.querySelector("#wordsBit");
const museumBitField = document.querySelector("#museumBit");
const drinksBitField = document.querySelector("#drinksBit");
const cantComeField = document.querySelector("#cantCome");
const errorField = document.querySelector("#error");
const form = document.querySelector("#submit-rsvp");

var allError = "Please fill in the form.";
var almostError = "There's still things we need to know.";
var nameError = "We need to know who you are.";
var plusOneError = "Tell us if you are or aren't bringing someone.";
var checkboxError = "Tell us if you are coming.";

// checkbox can't come remove other checks
function uncheckOthers(obj) {
  if (obj.checked == true) {
    wordsBitField.checked = false;
    museumBitField.checked = false;
    drinksBitField.checked = false;
  }
}

// checkboxes selected remove can't come
function uncheckCant(obj) {
  if (obj.checked == true) {
    cantComeField.checked = false;
  }
}

// Adds Element BEFORE NeighborElement
Element.prototype.appendBefore = function(element) {
  element.parentNode.insertBefore(this, element);
}, false;
// Adds Element AFTER NeighborElement
Element.prototype.appendAfter = function(element) {
  element.parentNode.insertBefore(this, element.nextSibling);
}, false;
// Remove error hints from DOM
Element.prototype.remove = function() {
  this.parentElement.removeChild(this);
}
NodeList.prototype.remove = HTMLCollection.prototype.remove = function() {
  for(var i = this.length - 1; i >= 0; i--) {
    if(this[i] && this[i].parentElement) {
      this[i].parentElement.removeChild(this[i]);
    }
  }
}

function errorHint(field, message, id) {
  field.classList.add('error')
  // create new error hint before input
  let text = document.createElement('span');
  text.setAttribute('class', 'app-body app-error--message error-hint');
  text.setAttribute('id', 'error-hint');
  text.textContent = message;
  text.appendBefore(document.getElementById(id))
}

function checkboxErrorHint(message, id) {
  // create new error hint after hint text
  let text = document.createElement('span');
  text.setAttribute('class', 'app-body app-error--message error-hint');
  text.setAttribute('id', 'error-hint');
  text.textContent = message;
  text.appendAfter(document.getElementById(id))
}

function errorMessage(message) {
  // add red border if name empty
  if (nameField.value == "") {
    document.getElementById("nameDiv").classList.add('error--border')
    errorHint(nameField, nameError, 'name')
  }
  // add red border if plus one empty
  if (plusOneField.value == "") {
    document.getElementById("plusOneDiv").classList.add('error--border')
    errorHint(plusOneField, plusOneError, 'plusOne')
  }
  // add red border if no checkbox selected
  if (wordsBitField.checked == false && museumBitField.checked == false && drinksBitField.checked == false && cantComeField.checked == false) {
    document.getElementById("checkboxes").classList.add('error--border')
    checkboxErrorHint(checkboxError, 'option-hint')
  }
  // add error class to error div
  errorField.setAttribute('class', 'app-error--true');
  // create error message
  let error = document.createElement('p');
  error.setAttribute('class', 'app-body app-error--message app-margin-bottom--0');
  error.textContent = message;
  // add error message to error div
  errorField.appendChild(error);
}

// adding data
form.addEventListener('submit', (e) => {
  e.preventDefault();
  // reset error div to be empty and hidden
  errorField.innerHTML = "";
  errorField.classList.remove('error')
  // remove any error classes from input fields
  nameField.classList.remove('error')
  document.getElementById("nameDiv").classList.remove('error--border')
  plusOneField.classList.remove('error')
  document.getElementById("plusOneDiv").classList.remove('error--border')
  // checkboxes remove error class
  document.getElementById("checkboxes").classList.remove('error--border')
  // remove error hints
  document.getElementsByClassName("error-hint").remove()

  if (nameField.value == "" && plusOneField.value == "" && wordsBitField.checked == false && museumBitField.checked == false && drinksBitField.checked == false && cantComeField.checked == false) {
    errorMessage(allError);
  } else if (plusOneField.value == "" && wordsBitField.checked == false && museumBitField.checked == false && drinksBitField.checked == false && cantComeField.checked == false) {
    errorMessage(almostError);
  } else if (nameField.value == "") {
    errorMessage(nameError);
  } else if (plusOneField.value == "") {
    errorMessage(plusOneError);
  } else if (wordsBitField.checked == false && museumBitField.checked == false && drinksBitField.checked == false && cantComeField.checked == false) {
    errorMessage(checkboxError);
  } else {
    firestore.collection('rsvps').add({
      name: form.name.value,
      plusOne: form.plusOne.value,
      wordsBit: form.wordsBit.checked,
      museumBit: form.museumBit.checked,
      drinksBit: form.drinksBit.checked,
      cantCome: form.cantCome.checked
    }).then(function() {
      alert("Thanks! We've received your reply.");
    }).catch(function(error) {
      console.error("Error writing document: ", error);
    });
    form.name.value = '';
    form.plusOne.value = '';
    form.wordsBit.checked = false;
    form.museumBit.checked = false;
    form.drinksBit.checked = false;
    form.cantCome.checked = false;
  }
})
