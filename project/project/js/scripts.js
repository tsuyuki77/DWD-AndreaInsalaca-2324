// ------------ DEFINITIONS ----------
const inpSearch = document.querySelector('#inpSearch');
const btnSearch = document.querySelector('#btnSearch');
const gegevens = document.querySelector('#gegevens');
const profielFoto = document.querySelector('#profielfoto');

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
let fouten = 0;
let second = 0;
let count = 0;
let timer = false;
let GetijpteKarakters = 0;
let foutPercentage = 0;
const gebruikersNaam = inpSearch.value;

// ------------ EVENT LISTENER ------------
btnSearch.addEventListener('click', async function (e) {
   e.preventDefault();
   if (inpSearch.value != '') {
      const SHA256 = await genereerSHA256Hash(inpSearch.value);
      profielFoto.innerHTML = searchFoto(SHA256);

      // naam.innerHTML = await searchNaam(SHA256);
      // locatie.innerHTML = await searchLocatie(SHA256);
      // spnGebruiker.innerHTML = await searchNaam(SHA256); 

      gegevens.classList.remove('hide'); // tabel gegevens tonen
      formSpel.classList.remove('hide'); // Spel tonen
      randomText(); // random tekst word weergegeven
   }
});

pSchrijf.addEventListener('keydown', function(e) {
   typing = true; // wanneer je begint te typen werkt u code
   if (typing == true) {
      timer = true;
      stopWatch(); // timer start

      if (e.key == quoteText.innerHTML[LetterPositie]) {
         pSchrijf.innerHTML += `<span class='correct'>${e.key}</span>`;
         const correct = new Audio('sound/correct.mp3');
         correct.play();
      } else if (e.key != quoteText.innerHTML[LetterPositie] && e.key != 'Backspace') {
         pSchrijf.innerHTML += `<span class='incorrect'>${e.key}</span>`;
         fouten++;
         spnFouten.innerHTML = fouten;
         const buzz = new Audio('sound/buzz.mp3');
         buzz.play();
      }

      if (e.key == 'Backspace') {
         LetterPositie--;
         const correct = new Audio('sound/correct.mp3');
         correct.play();
      } else {
         LetterPositie++;
      }

      GetijpteKarakters++;

      foutPercentage = (fouten / GetijpteKarakters) * 100;
   }
});

stopKnop.addEventListener('click', function() { // Toevoegen van het resultaat na het Stop-knop
   typing = false; // je stopt het spel dus Eventlistener keydown stopt met werken.
   gebruikerKolom.innerHTML += `<li><p>Gebruiker: ${gebruikersNaam}</p><p> Aantal fouten: ${fouten} </p><p> Foutpercentage: ${foutPercentage}</p><p> Totale tijd: ${spnTimer.innerHTML} seconden</p></li>`;
   ClearVelden();
});

formSpel.addEventListener('keydown', function(e) { // Toevoegen van het resultaat na het Escape-Knop
   if (e.key == 'Escape') {
      typing = false; // je stopt het spel dus Eventlistener keydown stopt met werken.
      gebruikerKolom.innerHTML += `<li><p>Gebruiker: ${gebruikersNaam}</p><p> Aantal fouten: ${fouten} </p><p> Foutpercentage: ${foutPercentage}</p><p> Totale tijd: ${spnTimer.innerHTML} seconden</p></li>`;
      ClearVelden();
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

function ClearVelden() { // leeg maken van alle nodige velden
   quoteText.innerHTML = '';
   pSchrijf.value = '';
   timer = false;
   second = 0;
   spnTimer.innerHTML = '0';
   spnFouten.innerHTML = '0';
   LetterPositie = 0;
   fouten = 0;
   count = 0;
   GetijpteKarakters = 0;
   foutPercentage = 0;
}

function stopWatch() {
   if (timer == true) {
      count++;
      if (count == 100) {
         second++;
         count = 0;
      }
      spnTimer.innerHTML = second;
      setTimeout(stopWatch, 10);
   }
} // logica vanuit deze website: https://www.geeksforgeeks.org/how-to-create-stopwatch-using-html-css-and-javascript/ 
