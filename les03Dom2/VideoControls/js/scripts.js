// DEFINIEERING------------------
const frmVideo = document.querySelector('.main__video');
const vidPlayer = frmVideo.querySelector('#vidPlayer');
const inpSlider = frmVideo.querySelector('#inpVolume');
const spanSlider = frmVideo.querySelector('#lblVolume');
const lnkPlay = frmVideo.querySelector('#lnkPlay');
const lnkRewind = frmVideo.querySelector('#lnkRewind');
const chbFunky = document.querySelectorAll('#chbFunky');
const frmComments = document.querySelector('.main__comments');
const frmCommentForm = frmComments.querySelector('#frmComments');
const inpName = frmComments.querySelector('#inpName');
const inpComment = frmComments.querySelector('#inpComment');
const commentsContainer = frmComments.querySelector('.comments__container');

// MAGIC NUMBERS------------------
const linkerPijl = 37;
const rechterPijl = 39;
const spatieBalk = 32;

// EVENT HANDLERS------------------
frmVideo.addEventListener('keydown', toetsenbordFuncties);
lnkPlay.addEventListener('click', playPauseKnop);
lnkRewind.addEventListener('click', rewindKnop);
inpSlider.addEventListener('input', slideBar);

// FUNCTIONS------------------
function slideBar() { // slidebar + volume
   const sizeValue = inpSlider.value * 1;
   spanSlider.textContent = sizeValue.toFixed(0);
   vidPlayer.volume = sizeValue / 100;
}

function funkyVersion(checkbox) { // funky effect (rotate + slagschaduw)
   if (checkbox.checked) {
      vidPlayer.style.transform = 'rotate(10deg)';
      vidPlayer.style.boxShadow = '0 10px 10px rgba(0, 0, 0, 0.5)';
   } else {
      vidPlayer.style.transform = 'none';
      vidPlayer.style.boxShadow = 'none';
   }
}

chbFunky.forEach(checkbox => {
   checkbox.addEventListener('change', function() {
      funkyVersion(checkbox);
   });
});

function rewindKnop() { // spoelt terug naar het begin
   vidPlayer.currentTime = 0;
}

function playPauseKnop() {
   if (vidPlayer.paused) {
      vidPlayer.play();
      lnkPlay.textContent = 'pause';
   } else {
      vidPlayer.pause();
      lnkPlay.textContent = 'play';
   }
}

function toetsenbordFuncties(e) {
   if (e.keyCode == spatieBalk) { // spatiebalk
      if (vidPlayer.paused) {
         vidPlayer.play();
         lnkPlay.textContent = 'pause';
      } else {
         vidPlayer.pause();
         lnkPlay.textContent = 'play';
      }
   }
   if (e.keyCode == linkerPijl) { // linker pijl - 10
      vidPlayer.currentTime -= 10;
   }
   if (e.keyCode == rechterPijl) { // rechter pijl + 10
      vidPlayer.currentTime += 10;
   }
}

frmCommentForm.addEventListener('submit', function(e) {
   e.preventDefault();
   const nameTekst = inpName.value;
   const commentTekst = inpComment.value;

   // ChatGpt code
   const datum = new Date();
   const options = { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric' };
   const formattedDateTime = datum.toLocaleString('nl-BE', options);

   const nieuweComment = `<div class="comments__post">
   <p class="post__who">${nameTekst} <span class="who__datetime">${formattedDateTime}</span></p>
   <p class="post__text">${commentTekst}</p>
</div>`;
   commentsContainer.innerHTML += nieuweComment;
});
