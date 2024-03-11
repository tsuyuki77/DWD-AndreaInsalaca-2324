const frm = document.querySelector('.txt-wrapper');
const inpSlider = frm.querySelector('#slider-label input');
const spanSlider = frm.querySelector('#slider-label span:nth-child(3)');
const inpKleur = frm.querySelector('#kleur-label input');
const ulFilters = frm.querySelector('.filters');
const checkboxes = frm.querySelectorAll('.checkboxes input');
const outpTxt = frm.querySelector('.zin');

inpSlider.addEventListener('input', function() {
   const sizeValue = inpSlider.value * 100;
   outpTxt.style.fontSize = `${sizeValue}px`;
   spanSlider.textContent = `${sizeValue.toFixed(0)}px`;
});

inpKleur.addEventListener('input', function() {
   outpTxt.style.color = inpKleur.value;
});

checkboxes.forEach(checkbox => {
   checkbox.addEventListener('change', function() {
      const label = checkbox.parentNode.querySelector('label'); 

      if (checkbox.checked == true) {
         if (label.innerHTML == 'vet') {
            outpTxt.style.fontWeight = 'bold';
         } else if (label.innerHTML == 'schuin') {
            outpTxt.style.fontStyle = 'italic';
         } else if (label.innerHTML == 'hoofdletters') {
            outpTxt.style.textTransform = 'uppercase';
         }
      } else {
         outpTxt.style.fontWeight = 'normal';
         outpTxt.style.fontStyle = 'normal';
         outpTxt.style.textTransform = 'none';
      }
   });
});

ulFilters.addEventListener('click', function(e) {
   e.preventDefault();
   outpTxt.classList.remove('txtshdw', 'rainbow', 'reverse'); // alle filters verwijderen
   if (e.target.innerHTML == 'stijl 1') outpTxt.classList.add('txtshdw');
   if (e.target.innerHTML == 'stijl 2') outpTxt.classList.add('rainbow');
   if (e.target.innerHTML == 'stijl 3') outpTxt.classList.add('reverse');
});
