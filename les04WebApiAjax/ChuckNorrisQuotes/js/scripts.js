// ------------ DEFINITIONS ----------
const selCategory = document.querySelector('#selCategory');
const inpSearch = document.querySelector('#inpSearch');
const btnSearch = document.querySelector('#btnSearch');
const blockQuote = document.querySelector('.quote');

// ------------ FUNCTIONS ------------
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

async function searchQuote(searchval) {
   const params = new URLSearchParams();
   params.append('query', searchval);
   const url = 'https://api.chucknorris.io/jokes/search?' + params.toString();
   const resp = await fetch(url);
   const data = await resp.json();
   if (data.result.length > 0) {
      const random = Math.floor(Math.random() * data.result.length);
      return data.result[random].value;
   } 
}

async function SearchBewerking(e) {
   e.preventDefault();
   if (inpSearch.value != '') {
      blockQuote.innerHTML = await searchQuote(inpSearch.value);
   }
}

// ------------ EVENT LISTENER ------------

selCategory.addEventListener('change', async function() {
   const selectedCategory = selCategory.value;
   const quote = await fetchRandomQuote(selectedCategory);
   blockQuote.innerHTML = quote + '<p></p><cite> -- Chuck Norris Quotes</cite>';
});

btnSearch.addEventListener('click', function(e) {
   e.preventDefault();
   SearchBewerking(e);
});

inpSearch.addEventListener('keypress', function(e) {
   if (e.key === 'Enter') {
      SearchBewerking(e);
   }
});

fetchCategories();
