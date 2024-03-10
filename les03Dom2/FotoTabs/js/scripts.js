const navFilters = document.querySelectorAll('.nav__filters a');
const gridFig = document.querySelectorAll('figure');
const lnkView = document.querySelectorAll('.header__view a');
const gridView = document.querySelector('#grid');
navFilters.forEach(thn => {
   thn.addEventListener('click', function(e) {
      e.preventDefault();
      document.querySelector('.active').classList.remove('active'); // active verwijderen
      thn.classList.add('active');

      // geselecteerde kader tonen
      gridFig.forEach(fig => {
         const datafilter = thn.getAttribute('data-filter'); // om het leesbaarder te maken
         if (fig.getAttribute('data-filters').includes(datafilter) || datafilter == 'alle') {
            fig.classList.remove('hidden');
         } else {
            fig.classList.add('hidden');
         }
      });
   });
});
lnkView.forEach(act => {
   act.addEventListener('click', function(e) {
      e.preventDefault();
      document.querySelector('.active').classList.remove('active');
      act.classList.add('active');

      if (e.target.innerHTML == 'view_module') {
         document.querySelector('#grid').classList.remove('viewList');
         gridView.classList.add('viewGrid');
      }
      if (e.target.innerHTML == 'view_list') {
         document.querySelector('#grid').classList.remove('viewGrid');
         gridView.classList.add('viewList');
      }
   });
});
