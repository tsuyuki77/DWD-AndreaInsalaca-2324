const frm = document.querySelector('.filter-wrapper');
const imgFilter = frm.querySelector('.filter-wrapper img');
const ulFilters = frm.querySelector('.filters');
const btnFilters = ulFilters.querySelectorAll('.filters button');
const inpSlider = frm.querySelector('#slider-label input');
const spanSlider = frm.querySelector('#slider-label span:nth-child(3)');
ulFilters.addEventListener('click', function(e) {
   e.preventDefault();
   btnFilters.forEach(btn => // alle active verwijderen
      btn.classList.remove('active')
   );
   imgFilter.classList.remove('normal', 'grayscale', 'sepia', 'hue', 'blur'); // alle filters verwijderen
   const filter = e.target.innerHTML;
   imgFilter.classList.add(filter);
   e.target.classList.add('active');
});
inpSlider.addEventListener('input', function() {
   const opacityValue = inpSlider.value;  
   imgFilter.style.opacity = opacityValue; 
   const berekening = (opacityValue * 100).toFixed(0); // toFixed(0) zodat geen kommagetal
   spanSlider.textContent = `${berekening}%`; 
});
