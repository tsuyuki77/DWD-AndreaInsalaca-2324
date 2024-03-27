const frmSearch = document.querySelector('#frmSearch');
const selCategory = document.querySelector('#selCategory');
const inpSearch = document.querySelector('#inpSearch');
const btnSearch = document.querySelector('#btnSearch');
const blockQuote = document.querySelector('.quote');
//const API_KEY = '7d589f2c1a83276059993c9123d2426e';

async function fetchCategories() {
   const url = 'https://api.chucknorris.io/jokes/categories';
   const resp = await fetch(url);
   const data = await resp.json();

   data.forEach(ctg => {
      selCategory.innerHTML += `<option value="${ctg}">${ctg}</option>`;
   });
}

async function fetchRandomQuote(category) {
   const url = `https://api.chucknorris.io/jokes/random?category=${category}`;
   const resp = await fetch(url);
   const data = await resp.json();
   return data.value;
}

/*
async function searchQuote(searchvalue) {
   const params = new URLSearchParams();
   params.append('api_key', API_KEY);
   params.append('method', 'flickr.groups.search');
   params.append('text', searchvalue);
   //params.append('format', 'json');
   //params.append('nojsoncallback', 1);
   const url = 'https://api.chucknorris.io/jokes/search?query=' + params.toString();
   const resp = await fetch(url);
   const data = await resp.json();
   console.log(data);
}

btnSearch.addEventListener('click', function(e) {
   e.preventDefault();
   if (inpSearch.value != '') searchQuote(inpSearch.value);
}); */

btnSearch.addEventListener('submit', async function() {
   const keyword = inpSearch.value;
   const quote = await searchQuote(keyword);
   blockQuote.innerHTML = quote;
});

selCategory.addEventListener('change', async function() {
   const selectedCategory = selCategory.value;
   const quote = await fetchRandomQuote(selectedCategory);
   blockQuote.innerHTML = quote + '<p></p><cite> -- Chuck Norris Quotes</cite>';
});

fetchCategories();

async function searchQuote(searchval) {
   const params = new URLSearchParams();
   params.append('query', searchval);
   const url = 'https://api.chucknorris.io/jokes/search?query=' + params.toString();
   const resp = await fetch(url);
   const data = await resp.json();
   
   if (data.result && data.result.length > 0) {
      const randomIndex = Math.floor(Math.random() * data.result.length);
      return data.result[randomIndex].value;
   } 
}

frmSearch.addEventListener('submit', async function(e) {
   e.preventDefault();
   if (inpSearch.value != '') {
      blockQuote.innerHTML = await searchQuote(inpSearch.value);
   }
});
