// ------------ DEFINITIONS ----------
const inpSearch = document.querySelector('#inpSearch');
const btnSearch = document.querySelector('#btnSearch');

const profielFoto = document.querySelector('#profielfoto');
const gegevens = document.querySelector('#gegevens');

// const naam = document.querySelector('#naam');
// const locatie = document.querySelector('#locatie');
const MAGIC_16 = 16;
const API_KEY = '7d589f2c1a83276059993c9123d2426e';

// ------------ EVENT LISTENER ------------
btnSearch.addEventListener('click', async function(e) {
   e.preventDefault();

   const SHA256 = await genereerSHA256Hash(inpSearch.value);
  const fotoUrl = await searchFoto(SHA256); // Zoekt profielfoto
   profielFoto.innerHTML = fotoUrl;

 //   await searchNaam(SHA256); // Zoekt naam
 //   await searchLocatie(SHA256); // Zoekt locatie
   gegevens.classList.remove('hide');
});

// ------------ FUNCTIONS ------------

async function genereerSHA256Hash(email) {
   email = email.trim().toLowerCase();
   const sha256Hash = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(email));
   const hexHash = Array.from(new Uint8Array(sha256Hash))
      .map(b => b.toString(MAGIC_16).padStart(2, '0'))
      .join('');
   return hexHash;
}

async function searchFoto(email) {
   const params = new URLSearchParams();
   params.append('api_key', API_KEY);
   params.append('method', 'flickr.photos.search');
   params.append('text', email);
   params.append('format', 'json');
   params.append('nojsoncallback', 1);
   params.append('extras', 'url_m');
   const url = 'https://gravatar.com/avatar/' + params.toString();
   const resp = await fetch(url);
   const data = await resp.json();
   console.log('data: ' + data);
}


/*
async function searchNaam(email) {
   const params = new URLSearchParams();
   params.append('query', email);
   const url = 'https://gravatar.com/profile/' + params.toString();
   const resp = await fetch(url);
   const data = await resp.json();
   console.log(data.name);
  //  naam.innerHTML = data.name;
}


async function searchLocatie(email) {
   const params = new URLSearchParams();
   params.append('query', email);
   const url = 'https://gravatar.com/profile/' + params.toString();
   const resp = await fetch(url);
   const data = await resp.json();
   locatie.innerHTML = data.location;
}
*/
