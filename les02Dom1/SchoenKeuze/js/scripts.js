const frm = document.querySelector('#frmOrder');
const inpEmail = frm.querySelector('#inpEmail');
const inpMeasure = frm.querySelector('#selMeasure');
const msgEmail = frm.querySelector('#msgEmail');
const msgMeasure = frm.querySelector('#msgMeasure');
const lblMessage = document.querySelector('#lblMessage');
const thumbLinks = document.querySelectorAll('#model a');

// const figBig = document.querySelector('#figShoe');
const imgBig = document.querySelector('#figShoe img');
const captBig = document.querySelector('#figShoe figcaption');
const checkboxes = document.querySelectorAll('input[type="checkbox"]');


frm.setAttribute('novalidate', 'novalidate');

thumbLinks.forEach(lnk => {
   lnk.addEventListener('click', function(e) {
      e.preventDefault();
      imgBig.src = lnk.href;
      captBig.innerHTML = 'JORDAN 1 MID ' + lnk.innerHTML;

      document.querySelector('#model .selected').classList.remove('selected');
      lnk.classList.add('selected');
   });
});

frm.addEventListener('submit', function(e) {
   e.preventDefault();
   let numErrors = 0;

   msgEmail.innerHTML = '';
   msgMeasure.innerHTML = '';

   if (inpEmail.value == '') {
      msgEmail.innerHTML = 'email mag niet leeg zijn';
      numErrors++;
   }
   else if (inpMeasure.value == '') {
      msgMeasure.innerHTML = 'Maat mag niet leeg zijn';
      numErrors++;
   }
   else if (numErrors != 0) {
      lblMessage.innerHTML = 'Het formulier is correct ingevuld';
   } 
   else {
      const checkboxnamen = [];
      const TotalePrijs = [];
      let winstTotaal = 0;

      checkboxes.forEach(checkbox => {
         if (checkbox.checked) {
            checkboxnamen.push(checkbox.name);
            TotalePrijs.push(parseFloat(checkbox.value));
         }
      });

      for (let i = 0; i < TotalePrijs.length; i++) {
         winstTotaal += TotalePrijs[i];
      }
      const prijs = 54.99;
      winstTotaal += prijs;

      lblMessage.innerHTML = `Je keuze: ${captBig.innerHTML} maat ${inpMeasure.value}, ${checkboxnamen.join(', ')} (totaalprijs: €${winstTotaal.toFixed(2)} )`;
   }
});
