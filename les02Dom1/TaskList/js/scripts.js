const frm = document.querySelector('#frmTask');
const priority = frm.querySelector('#selPriority');
const inpDeadline = frm.querySelector('#datDeadline');
const inpTask = frm.querySelector('#txtTask');
const tasksContent = document.querySelector('#tasks');
const thumbLinks = document.querySelectorAll('#tasks .complete');

thumbLinks.forEach(lnk => {
   lnk.addEventListener('mouseover', function() {
      lnk.innerHTML = 'check';
      lnk.classList.add('kleur-green');
   });
   lnk.addEventListener('mouseout', function() {
      lnk.innerHTML = 'more_horiz';
      lnk.classList.remove('kleur-green');
   });
   lnk.addEventListener('click', function() {
      lnk.parentNode.remove(); // Danzkij parentNode neem je het bovenste element. Zie uitleg -> https://www.w3schools.com/jsref/prop_node_parentnode.asp
   });
});

frm.addEventListener('submit', function(e) {
   e.preventDefault();
   const geschrevenTekst = inpTask.value;
   const deadline = inpDeadline.value;
   let backgroundkleur = '';
   if (priority.value == 'low') backgroundkleur = 'kleur-green';
   else if (priority.value == 'normal') backgroundkleur = 'kleur-orange';
   else if (priority.value == 'high') backgroundkleur = 'kleur-red';
   const nieuweTask = `<div class="task"> 
         <span class="priority material-icons ${backgroundkleur}">assignment</span> 
         <p class="tasktext">${geschrevenTekst} <span class="deadline">(deadline: ${deadline})</span></p> 
         <span class="complete material-icons">more_horiz</span>
      </div>`;
   tasksContent.innerHTML += nieuweTask;
});
