// ------------ DEFINITIONS ----------
const inpSearch = document.querySelector('#inpSearch');
const btnSearch = document.querySelector('#btnSearch');

const profielFoto = document.querySelector('#profielfoto');
const gegevens = document.querySelector('#gegevens');
const quoteText = document.querySelector('#randomText');

// ------------ DECLARATIES ----------
const MAGIC_16 = 16;


// const naam = document.querySelector('#naam');
// const locatie = document.querySelector('#locatie');

// ------------ EVENT LISTENER ------------
btnSearch.addEventListener('click', async function(e) {
   e.preventDefault();

   const SHA256 = await genereerSHA256Hash(inpSearch.value);
   profielFoto.innerHTML = searchFoto(SHA256);
   // naam.innerHTML = await searchNaam(SHA256);
   // locatie.innerHTML = await searchLocatie(SHA256);
   gegevens.classList.remove('hide');

   randomText();
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
   return `<img src="${url}" alt="profielfoto">`;
}

/*
async function searchNaam(email) {
   const params = new URLSearchParams();
   params.append('query', email);
   const url = 'https://gravatar.com/profile/' + email + '.json';
   const resp = await fetch(url);
   const data = await resp.json();
   console.log(data);
}

/*
async function searchLocatie(email) {
   const params = new URLSearchParams();
   params.append('query', email);
   const url = 'https://gravatar.com/profile/' + params.toString();
   const resp = await fetch(url);
   const data = await resp.json();
   return data.location;
}
*/

async function randomText() { // online random text API
   const url = 'https://api.quotable.io/random';
   const resp = await fetch(url);
   const data = await resp.json();
   quoteText.innerHTML = data.content;
}
