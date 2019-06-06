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
const submitButton = document.querySelector("#submitButton");

submitButton.addEventListener("click", function() {
  const saveName = nameField.value;
  const savePlusOne = plusOneField.value;
  const saveWordsBit = wordsBitField.checked;
  const saveMuseumBit = museumBitField.checked;
  const saveDrinksBit = drinksBitField.checked;
  const saveCantCome = cantComeField.checked;
  console.log("I am going to save "+saveName+"'s answer");
  docRef.set({
    name: saveName,
    plusOne: savePlusOne,
    wordsBit: saveWordsBit,
    museumBit: saveMuseumBit,
    drinksBit: saveDrinksBit,
    cantCome: saveCantCome
  }).then(function() {
    console.log("Status saved!");
  }).catch(function(error) {
    console.log("Got an error: ", error);
  });
})
