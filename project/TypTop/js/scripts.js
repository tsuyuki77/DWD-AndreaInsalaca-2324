// ------------ DEFINITIONS ----------
const inpSearch = document.querySelector('#inpSearch');
const btnSearch = document.querySelector('#btnSearch');
const gegevens = document.querySelector('#gegevens');
const profielFoto = document.querySelector('#profielfoto');
const divLogin = document.querySelector('#login');

// const naam = document.querySelector('#naam');

// const locatie = document.querySelector('#locatie');
const formSpel = document.querySelector('#formSpel');
const quoteText = document.querySelector('#randomText');
const pSchrijf = document.querySelector('#schrijf');
const spnFouten = document.querySelector('#fouten');
const spnTimer = document.querySelector('#sec');
const stopKnop = document.querySelector('#stopKnop');
const gebruikerKolom = document.querySelector('.resultaten');

// ------------ DECLARATIES ----------
const MAGIC_16 = 16;
let typing = false; // deze methode zorgt ervoor dat je weet wanneer je tijpt, en dus de eventListener 'keydown' moogt desable.
let LetterPositie = 0;
let correct = 0;
let fouten = 0;
let second = 0;
let milliseconden = 0;
let timer = false;
let GetijpteKarakters = 0;
let prestatieScore = 0;
const gebruikersNaam = inpSearch.value;
let timerStart = false;
const drukKnop = new Audio('sound/correct.mp3');
const buzz = new Audio('sound/buzz.mp3');

// ------------ EVENT LISTENER ------------
btnSearch.addEventListener('click', async function(e) {
   e.preventDefault();
   if (inpSearch.value != '') {
      const SHA256 = await genereerSHA256Hash(inpSearch.value);
      profielFoto.innerHTML = searchFoto(SHA256);

      // naam.innerHTML = await searchNaam(SHA256);
      // locatie.innerHTML = await searchLocatie(SHA256);
      // spnGebruiker.innerHTML = await searchNaam(SHA256); 
      divLogin.classList.add('hide');
      gegevens.classList.remove('hide'); // tabel gegevens tonen
      formSpel.classList.remove('hide'); // Spel tonen
      randomText(); // random tekst word weergegeven
      typing = true; // wanneer je begint te typen werkt u code
      timerStart = true;
      inpSearch.value = '';
   }
});

pSchrijf.addEventListener('keydown', function(e) {
   if (typing == true) {
      timer = true;

      if (timerStart == true) { // dit zorgt ervoor dat stopWatch() maar 1x wordt aangeroepen.
         stopWatch(); // timer start
         timerStart = false;
      }

      if (e.key == quoteText.innerHTML[LetterPositie]) { // Geeft true terug als het ingevoerde letter overeenkomt met de oorspronkelijke letter in de zin.
         pSchrijf.innerHTML += `<span class='correct'>${e.key}</span>`;
         drukKnop.play();
         correct++;
      } else if (e.key != quoteText.innerHTML[LetterPositie] && e.key != 'Backspace') {
         pSchrijf.innerHTML += `<span class='incorrect'>${e.key}</span>`;
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
});

stopKnop.addEventListener('click', function() { // Toevoegen van het resultaat na het Stop-knop
   stopTimer(); // timer wordt gestopt
   vullingVelden();
});

formSpel.addEventListener('keydown', function(e) { // Toevoegen van het resultaat na het Escape-Knop
   if (e.key == 'Escape') {
      vullingVelden();
   }
});

// ------------ FUNCTIONS ------------

async function genereerSHA256Hash(email) { // online code voor het genereren van SHA256
   email = email.trim().toLowerCase();
   const sha256Hash = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(email));
   const hexHash = Array.from(new Uint8Array(sha256Hash))
      .map(b => b.toString(MAGIC_16).padStart(2, '0'))
      .join('');
   return hexHash;
}

function searchFoto(email) {
   const params = new URLSearchParams();
   params.append('email', email);
   const url = 'https://gravatar.com/avatar/' + email + '?' + params.toString();
   return `<img src='${url}' alt='profielfoto'>`;
}

/*
async function searchNaam(email) {
   const params = new URLSearchParams();
   params.append('query', email);
   const url = 'https://gravatar.com/profile/' + email + '.json';
   const resp = await fetch(url);
   const data = await resp.json();
   return data.entry[0].displayName;
}

async function searchLocatie(email) {
   const params = new URLSearchParams();
   params.append('query', email);
   const url = 'https://gravatar.com/profile/' + params.toString();
   const resp = await fetch(url);
   const data = await resp.json();
   return data.location;
} */

async function randomText() { // online random text API
   const url = 'https://api.quotable.io/random';
   const resp = await fetch(url);
   const data = await resp.json();
   quoteText.innerHTML = data.content.toLowerCase();
}

function ClearVelden() { // leeg maken van alle nodige velden & declaraties
   quoteText.innerHTML = '';
   pSchrijf.value = '';
   timer = false;
   second = 0;
   spnTimer.innerHTML = '0';
   spnFouten.innerHTML = '0';
   LetterPositie = 0;
   fouten = 0;
   correct = 0;
   milliseconden = 0;
   GetijpteKarakters = 0;
}

let timerInterval; // Voeg een variabele toe om de interval bij te houden

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
   spnTimer.innerHTML = second;
}

function stopTimer() {
   clearInterval(timerInterval); // timer te stoppen
} // logica vanuit deze website: https://www.geeksforgeeks.org/how-to-create-stopwatch-using-html-css-and-javascript/ 

function vullingVelden() {
   if (quoteText.innerHTML != '') {
      stopTimer(); // je stopt de timer
      typing = false; // je stopt het spel dus Eventlistener keydown stopt met werken.
      const typsnelheid = correct / parseInt(spnTimer.innerHTML); // (Aantal correct getypte karakters) / (Tijd in seconden)
      const foutPercentage = (fouten / GetijpteKarakters) * 100; // Foutenpercentage berekenen

      if (correct > parseInt(spnTimer.innerHTML)) { // Je bent sneller dan het voorziene tijd
         prestatieScore = 10 - (foutPercentage / 10);
      } else { // Je bent trager dan het voorziene tijd
         prestatieScore = 10 - (foutPercentage / 10) - typsnelheid;
      }

      if (prestatieScore < 0) prestatieScore = 0; // als het kleiner dan nul is dan is u score 0

      console.log(`typsnelheid: ${typsnelheid.toFixed(2)}
      GetijpteKarakters: ${GetijpteKarakters}
      correct: ${correct}`);

      gebruikerKolom.innerHTML += `<li>
    <p><strong>Gebruiker:</strong>${gebruikersNaam}</p>
    <p><strong>Aantal fouten:</strong> ${fouten}</p>
    <p><strong>Foutpercentage:</strong> ${foutPercentage.toFixed(2)}%</p>
    <p><strong>Totale tijd:</strong> ${spnTimer.innerHTML} seconden</p>
    <p><strong>Prestatiescore:</strong> ${prestatieScore.toFixed(2)} / 10</p>
 </li>`;

     // localStorage(); // toevoegen van gegevens in localStorage
   }
   ClearVelden();
}

/* function localStorage() {
   const person = {
      name: naam,
      score: prestatieScore
   };
   localStorage.setItem('person', JSON.stringify(person));
} */

