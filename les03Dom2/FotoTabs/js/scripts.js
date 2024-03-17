const lnksTabs = document.querySelectorAll('.nav__filters a');
const figsPhotos = document.querySelectorAll('figure');
const lnkView = document.querySelectorAll('.header__view a');
const grdPhotos = document.querySelector('#grid');
const numfound = document.querySelector('#numFound');
lnksTabs.forEach(thn => {
   thn.addEventListener('click', function(e) {
      e.preventDefault();
      document.querySelector('.nav__filters a.active').classList.remove('active'); // active verwijderen
      thn.classList.add('active');

      // geselecteerde kader tonen
      figsPhotos.forEach(fig => {
         const datafilter = thn.dataset.filter; // om het leesbaarder te maken
         fig.classList.toggle('hidden', !fig.dataset.filters.includes(datafilter) && datafilter != 'alle');
      });

      // toon aantal
      numfound.innerHTML = figsPhotos.length - grdPhotos.querySelectorAll('figure.hidden').length;
   });
});
lnkView.forEach(act => {
   act.addEventListener('click', function(e) {
      e.preventDefault();
      document.querySelector('.active').classList.remove('active');
      act.classList.add('active');

      if (e.target.innerHTML == 'view_module') {
         document.querySelector('#grid').classList.remove('viewList');
         grdPhotos.classList.add('viewGrid');
      }
      if (e.target.innerHTML == 'view_list') {
         document.querySelector('#grid').classList.remove('viewGrid');
         grdPhotos.classList.add('viewList');
      }
   });
});
