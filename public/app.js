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

const printList = document.querySelector("#print-list");
const form = document.querySelector("#submit-rsvp");

var thisId;

// creates elements and render answers
function renderList (doc) {
  let name = document.createElement('li');
  let plusOne = document.createElement('li');
  let li = document.createElement('li');

  let attendingWords = document.createElement('span');
  let attendingMuseum = document.createElement('span');
  let attendingDrinks = document.createElement('span');
  let notAttending = document.createElement('span');

  printList.setAttribute('data-id', doc.id);
  name.textContent = doc.data().name;
  plusOne.textContent = doc.data().plusOne;
  attendingWords.textContent = doc.data().wordsBit;
  attendingMuseum.textContent = doc.data().museumBit;
  attendingDrinks.textContent = doc.data().drinksBit;
  notAttending.textContent = doc.data().cantCome;

  li.appendChild(attendingWords);
  li.appendChild(attendingMuseum);
  li.appendChild(attendingDrinks);
  li.appendChild(notAttending);

  printList.appendChild(name);
  printList.appendChild(plusOne);
  printList.appendChild(li);
}

// getting data
firestore.collection('rsvps').get().then((snapshot) => {
  snapshot.docs.forEach(doc => {
    renderList(doc);
  })
})

// adding data
form.addEventListener('submit', (e) => {
  e.preventDefault();
  firestore.collection('rsvps').add({
    name: form.name.value,
    plusOne: form.plusOne.value,
    wordsBit: form.wordsBit.checked,
    museumBit: form.museumBit.checked,
    drinksBit: form.drinksBit.checked,
    cantCome: form.cantCome.checked
  }).then(function() {
    alert("Thanks! We've received your reply.");
  });
  form.name.value = '';
  form.plusOne.value = '';
  form.wordsBit.checked = false;
  form.museumBit.checked = false;
  form.drinksBit.checked = false;
  form.cantCome.checked = false;
})
