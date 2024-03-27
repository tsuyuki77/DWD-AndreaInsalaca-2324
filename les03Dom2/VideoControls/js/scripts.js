// Definities
const frmVideo = document.querySelector('.main__video');
const vidPlayer = frmVideo.querySelector('#vidPlayer');
const inpSlider = frmVideo.querySelector('#inpVolume');
const spanSlider = frmVideo.querySelector('#lblVolume');
const lnkPlay = frmVideo.querySelector('#lnkPlay');
const lnkRewind = frmVideo.querySelector('#lnkRewind');
const chbFunky = frmVideo.querySelector('#chbFunky');
const frmComments = document.querySelector('.main__comments');
const frmCommentForm = frmComments.querySelector('#frmComments');
const inpName = frmComments.querySelector('#inpName');
const inpComment = frmComments.querySelector('#inpComment');
const commentsContainer = frmComments.querySelector('.comments__container');
const videoControls = frmVideo.querySelector('.video__controls');

// Functies
function handleSlideBar() {
   const sizeValue = inpSlider.value;
   spanSlider.textContent = sizeValue;
   vidPlayer.volume = sizeValue / 100;
}

function handleFunky() {
   if (chbFunky.checked) {
      vidPlayer.classList.add('funcky');
   } else {
      vidPlayer.classList.remove('funcky');
   }
}

function handleRewind() {
   vidPlayer.currentTime = 0;
}

function pauze(e) {
   if (e.target.nodeName == 'CHECKBOX' || e.target.nodeName == 'LABEL' || e.target.nodeName == 'TEXTAREA' || e.target.nodeName == 'BUTTON') return;
   if (e.target.closest('.video__controls') || !e.target.closest('#frmComments')) { handleKeyDown(e); }
   if (e.code == 'Space') {
      if (e.target.innerHTML == 'rewind') {
         handleRewind();
         return;
      }
      playVideo();
   }
}

function playVideo() {
   if (vidPlayer.paused) {
      vidPlayer.play();
      lnkPlay.textContent = 'pause';
   } else {
      vidPlayer.pause();
      lnkPlay.textContent = 'play';
   }
}

function handleKeyDown(e) {
   if (!e.target.closest('.video__controls') && !e.target.closest('#frmComments')) {
      if (e.code === 'ArrowRight') vidPlayer.currentTime += 10;
      if (e.code === 'ArrowLeft') vidPlayer.currentTime -= 10;
      if (e.code === 'Space') playVideo();
   }
}

function handleCommentSubmit(e) {
   e.preventDefault();
   const nameTekst = inpName.value;
   const commentTekst = inpComment.value;

   const months = ['januari', 'februari', 'maart', 'april', 'mei', 'juni', 'juli', 'augustus', 'september', 'oktober', 'november', 'december'];

   const currentDate = new Date();
   const day = currentDate.getDate();
   const month = months[currentDate.getMonth()];
   const year = currentDate.getFullYear();
   let hours = currentDate.getHours();
   let minutes = currentDate.getMinutes();

   hours = (hours < 10 ? '0' : '') + hours;
   minutes = (minutes < 10 ? '0' : '') + minutes;
   const formattedDateTime = `${day} ${month} ${year} ${hours}:${minutes}`;

   const nieuweComment = `<div class="comments__post">
   <p class="post__who">${nameTekst} <span class="who__datetime">${formattedDateTime}</span></p>
   <p class="post__text">${commentTekst}</p>
</div>`;

   commentsContainer.innerHTML = nieuweComment + commentsContainer.innerHTML;

   inpName.value = '';
   inpComment.value = '';
}

// Event listeners
document.addEventListener('keydown', handleKeyDown);
lnkPlay.addEventListener('click', playVideo);
lnkRewind.addEventListener('click', handleRewind);
inpSlider.addEventListener('input', handleSlideBar);
chbFunky.addEventListener('change', handleFunky);
frmCommentForm.addEventListener('submit', handleCommentSubmit);
videoControls.addEventListener('keydown', pauze);
