const frm = document.querySelector('#frmBieden');
const inpBieder = frm.querySelector('#inpBieder');
const inpBod = frm.querySelector('#inpBod');
const msgBod = frm.querySelector('#msgBod');
let hoogsteNaam = '';
let hoogsteBod = 0;
frm.addEventListener('submit', function(e) {
   e.preventDefault();
   const Bod = parseFloat(inpBod.value);
   if (Bod > hoogsteBod) {
      hoogsteBod = Bod;
      hoogsteNaam = inpBieder.value;
      msgBod.innerHTML = 'gefeliciteerd! Je hebt momenteel het hoogste bod';
   } else msgBod.innerHTML = `Jammer! ${hoogsteNaam} heeft een hoger bod`;
});
