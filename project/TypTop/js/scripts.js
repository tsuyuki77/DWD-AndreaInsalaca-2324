// ------------ DEFINITIONS ----------
const inpSearch = document.querySelector('#inpSearch');
const btnSearch = document.querySelector('#btnSearch');
const gegevens = document.querySelector('#gegevens');
const divLogin = document.querySelector('#login');
const profielFoto = document.querySelector('#profielfoto');
const naam = document.querySelector('#naam');
const locatie = document.querySelector('#locatie');
const formSpel = document.querySelector('#formSpel');
const quoteText = document.querySelector('#randomText');
const inputInvul = document.querySelector('#schrijf');
const spnFouten = document.querySelector('#fouten');
const spnTimer = document.querySelector('#sec');
const stopKnop = document.querySelector('#stopKnop');
const gebruikerKolom = document.querySelector('.resultaten');
const lnkNotify = document.querySelector('#lnkNotify');

// ------------ DECLARATIES ----------
let typing = false; // deze methode zorgt ervoor dat je weet wanneer je tijpt, en dus de eventListener 'keydown' moogt desable.
let LetterPositie = 0;
let correct = 0;
let fouten = 0;
let second = 0;
let milliseconden = 0;
let timer = false;
let timerInterval;
let GetijpteKarakters = 0;
let prestatieScore = 0;
let timerStart = false;
let dataAfb;

// ------------ FUNCTIONS ------------

async function handleNotificatie(title, msg, icon) {
   if (Notification.permission == 'granted') {
      new Notification(title, { body: msg, icon: icon });
   } else if (Notification.permission != 'denied') {
      const permission = await Notification.requestPermission();
      if (permission == 'granted') {
         new Notification(title, { body: msg, icon: icon });
      }
   }
}

function showNotificatie() {
   if (prestatieScore < 5) handleNotificatie('Jammer!', `Spijtig voor u ${prestatieScore} / 10, volgende keer beter!`, `${dataAfb}`);
   if (prestatieScore > 5) handleNotificatie('Proficiat!', `Goed gespeelt, je behaalde ${prestatieScore} / 10, probeer meer!`, `${dataAfb}`);
   if (prestatieScore == 10) handleNotificatie('Gefeliciteerd !!', `Je zit op het podium met u ${prestatieScore} / 10 !`, `${dataAfb}`);
}

async function handleZoekKnop(e) {
   e.preventDefault();
   naam.innerHTML = '';
   locatie.innerHTML = '';
   profielFoto.innerHTML = '';

   const SHA256 = await genereerSHA256Hash(inpSearch.value);
   await searchGegevens(SHA256); // Wacht tot de zoekactie is voltooid

   if (naam.innerHTML != '' && locatie.innerHTML != '' && profielFoto.innerHTML != '') {
      randomText();
      divLogin.classList.add('hide');
      gegevens.classList.remove('hide');
      formSpel.classList.remove('hide');
      typing = true;
      timerStart = true;
      inpSearch.value = '';
      inputInvul.disabled = false; // enable de input om in te vullen
   } else if (naam.innerHTML == '' && locatie.innerHTML == '' && profielFoto.innerHTML == '') {
      divLogin.classList.remove('hide');
      divLogin.innerHTML = '<h1>Verkeerde mail!<br>Probeer Opnieuw!</h1>';
   }
}

function handleInputInvul(e) {
   const drukKnop = new Audio('sound/correct.mp3');
   const buzz = new Audio('sound/buzz.mp3');

   if (LetterPositie == quoteText.innerHTML.length - 1) handleStopKnop();

   if (typing == true) {
      timer = true;
      if (timerStart == true) { // dit zorgt ervoor dat stopWatch() maar 1x wordt aangeroepen.
         stopWatch(); // timer start
         timerStart = false;
      }

      if (e.key == quoteText.innerHTML[LetterPositie]) { // Geeft true terug als het ingevoerde letter overeenkomt met de oorspronkelijke letter in de zin.
         inputInvul.innerHTML += `<span class="correct">${e.key}</span>`;
         drukKnop.play();
         correct++;
      } else if (e.key != quoteText.innerHTML[LetterPositie] && e.key != 'Backspace') {
         inputInvul.innerHTML += `<span class="incorrect">${e.key}</span>`;
         fouten++;
         spnFouten.innerHTML = fouten;
         buzz.play();
      }

      if (e.key == 'Backspace' || e.key == 'Shift') {
         LetterPositie--;
         drukKnop.play();
      } else {
         LetterPositie++;
      }

      GetijpteKarakters++;
   }
}

function handleStopKnop() { // Toevoegen van het resultaat na het Stop-knop
   vullingVelden();
   ClearVelden();
}

function handleResult(e) { // Toevoegen van het resultaat na het Escape-Knop
   if (e.key == 'Escape') {
      vullingVelden();
      ClearVelden();
   }
}


async function genereerSHA256Hash(email) { // online code voor het genereren van SHA256
   const MAGIC_16 = 16;
   email = email.trim().toLowerCase();
   const sha256Hash = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(email));
   const hexHash = Array.from(new Uint8Array(sha256Hash))
      .map(b => b.toString(MAGIC_16).padStart(2, '0'))
      .join('');
   return hexHash;
}

async function searchGegevens(sha256Email) {
   const url = 'https://gravatar.com/' + sha256Email + '.json';
   const resp = await fetch(url);
   const data = await resp.json();
   naam.innerHTML = data.entry[0].preferredUsername;
   locatie.innerHTML = data.entry[0].currentLocation;
   profielFoto.innerHTML = `<img src='${data.entry[0].photos[0].value}' alt='profielfoto'>`;
   dataAfb = data.entry[0].photos[0].value;
}

async function randomText() { // online random text API
   const url = 'https://api.quotable.io/random';
   const resp = await fetch(url);
   const data = await resp.json();
   quoteText.innerHTML = data.content.toLowerCase();
}

function ClearVelden() { // leeg maken van alle nodige velden & declaraties
   timer = false;
   second = 0;
   spnTimer.innerHTML = '0';
   spnFouten.innerHTML = '0';
   LetterPositie = 0;
   fouten = 0;
   correct = 0;
   milliseconden = 0;
   GetijpteKarakters = 0;
   quoteText.innerHTML = 'Log weer in om verder te spelen!'; // haal de quote weg en zeg dat je weer moet inloggen
   inputInvul.disabled = true;
   inputInvul.value = null;
}

function stopWatch() {
   if (timer == true) {
      timerInterval = setInterval(updateTimer, 10); // timer wordt om de 10 ms bijgewerkt.
   }
}
function updateTimer() {
   milliseconden++;
   if (milliseconden == 100) {
      second++;
      milliseconden = 0;
   }
   spnTimer.innerHTML = second; // logica vanuit deze website: https://www.geeksforgeeks.org/how-to-create-stopwatch-using-html-css-and-javascript/
}

function stopTimer() {
   clearInterval(timerInterval); // timer te stoppen
}

function vullingVelden() {
   if (quoteText.innerHTML != '') {
      stopTimer(); // je stopt de timer
      typing = false; // je stopt het spel dus Eventlistener keydown stopt met werken.
      const typsnelheid = correct / parseInt(spnTimer.innerHTML); // (Aantal correct getypte karakters) / (Tijd in seconden)
      const foutPercentage = (fouten / GetijpteKarakters) * 100; // Foutenpercentage berekenen

      if (correct > parseInt(spnTimer.innerHTML)) prestatieScore = 10 - (foutPercentage / 10); // Je bent sneller dan het voorziene tijd
      else prestatieScore = 10 - (foutPercentage / 10) - typsnelheid; // Je bent trager dan het voorziene tijd

      if (prestatieScore < 0) prestatieScore = 0; // als het kleiner dan nul is dan is u score 0

      gebruikerKolom.innerHTML += `<li>
    <p><strong>Gebruiker:</strong> ${naam.innerHTML}</p>
    <p><strong>Aantal fouten:</strong> ${fouten}</p>
    <p><strong>Foutpercentage:</strong> ${foutPercentage.toFixed(2)}%</p>
    <p><strong>Totale tijd:</strong> ${spnTimer.innerHTML} seconden</p>
    <p><strong>Prestatiescore:</strong> ${prestatieScore.toFixed(2)} / 10</p>
 </li>`;

      showNotificatie();
      localStorageInvul(); // toevoegen van gegevens in localStorage
   }
}

function localStorageInvul() {
   const VorigeData = localStorage.getItem('persons');
   let personen = [];

   if (VorigeData != null) personen = JSON.parse(VorigeData); // checkt als er data was, en voegt het dan toe aan de array

   const datum = new Date(); // Huidige datum/tijd

   const person = {
      name: naam.innerHTML,
      score: prestatieScore.toFixed(2),
      datum: datum.getDate() + '/' + (datum.getMonth() + 1) + '/' + datum.getFullYear(), // Datum in dd/mm/jjjj 
      tijd: datum.getHours() + ':' + (datum.getMinutes() < 10 ? '0' : '') + datum.getMinutes() // Tijd in hh:mm
   };

   personen.push(person);

   personen.sort((a, b) => {
      return parseFloat(b.score) - parseFloat(a.score); // stukje logica vanuit: https://stackoverflow.com/questions/1069666/sorting-object-property-by-values 
   });

   localStorage.setItem('persons', JSON.stringify(personen));
}

// ------------ EVENT LISTENER ------------

btnSearch.addEventListener('click', handleZoekKnop);
inputInvul.addEventListener('keydown', handleInputInvul);
stopKnop.addEventListener('click', handleStopKnop);
formSpel.addEventListener('keydown', handleResult);
lnkNotify.addEventListener('click', handleNotificatie);

