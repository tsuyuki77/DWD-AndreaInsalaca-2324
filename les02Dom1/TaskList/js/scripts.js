const frm = document.querySelector('#frmTask');
const priority = frm.querySelector('#selPriority');
const inpDeadline = frm.querySelector('#datDeadline');
const inpTask = frm.querySelector('#txtTask');
const tasksContent = document.querySelector('#tasks');

tasksContent.addEventListener('click', function(e) {
   if (e.target.classList.contains('complete')) {
      e.target.innerHTML = 'check';
      e.target.classList.add('kleur-green');
   }
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
