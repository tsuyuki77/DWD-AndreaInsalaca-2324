   const frm = document.querySelector('#frmTask');
   const priority = frm.querySelector('#selPriority');
   const inpDeadline = frm.querySelector('#datDeadline');
   const inpTask = frm.querySelector('#txtTask');
   const tasksContent = document.querySelector('#tasks');
   frm.addEventListener('submit', function(e) {
      e.preventDefault();
      const icon = 'more_horiz';
      const geschrevenTekst = inpTask.value;
      const deadline = inpDeadline.value;

      let backgroundkleur = '';
      if (priority.value == 'low') {backgroundkleur = 'green';
      } else if (priority.value == 'normal') { backgroundkleur = 'orange';
      } else if (priority.value == 'high') { backgroundkleur = 'red'; }

      const nieuweTask = `<div class="task"> 
         <span class="priority material-icons" style="color: ${backgroundkleur}">assignment</span> 
         <p class="tasktext">${geschrevenTekst} <span class="deadline">(${deadline})</span></p> 
         <span class="complete material-icons">${icon}</span>
      </div>`;
      tasksContent.innerHTML += nieuweTask;
   });

