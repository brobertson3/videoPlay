// /*** Submitted by Brent Robertson ***/

var video = document.getElementById('our-video');
var play = document.getElementById('play-btn');
var pause = document.getElementById('pause-btn');
var restart = document.getElementById('restart-btn');
var main = document.getElementById('video-section');
var videoProgress = document.getElementById('video-progress');
var myBar = document.getElementById('my-bar');
var progressBarWidth = (main.clientWidth - play.clientWidth - pause.clientWidth - restart.clientWidth) - 15;
var isPlayListener = false;
var isPauseListener = false;

videoProgress.style.width = progressBarWidth + 'px';

// Setup event listeners and flags
play.addEventListener('click', playVideo);
isPlayListener = true;
pause.addEventListener('click', pauseVideo);
isPauseListener = true;
video.addEventListener('ended', videoEnded);
restart.addEventListener('click', restartVideo);

video.addEventListener("timeupdate", function() {
   // if the video is loaded and duration is known
   if(!isNaN(this.duration)) {
        var percent_complete = this.currentTime / this.duration;
        // use percent_complete to draw a progress bar
        myBar.style.width = Math.floor(progressBarWidth * percent_complete) + 'px';
    }
});

function playVideo () { 
	video.play();
	play.removeEventListener('click', playVideo);
	isPlayListener = false;
	pause.addEventListener('click', pauseVideo);
	isPauseListener = true;
	play.style.backgroundColor = '#D18DEC';
	pause.style.backgroundColor = '#F0F0F0';
}

function pauseVideo () {
	video.pause();
	pause.removeEventListener('click', pauseVideo);
	isPauseListener = false;
	play.addEventListener('click', playVideo);
	isPlayListener = true;
	pause.style.backgroundColor = '#D18DEC';
	play.style.backgroundColor = '#F0F0F0';
}

function restartVideo () {
	video.currentTime = 0;
	console.log('Restarting');
	if (isPlayListener) {
		play.removeEventListener('click', playVideo);
	}
	if (!isPauseListener) {
		pause.addEventListener('click', pauseVideo);
	}
	video.play();
	document.getElementById('message').classList.add('hidden');
	play.style.backgroundColor = '#D18DEC';
	pause.style.backgroundColor = '#F0F0F0';
}

function videoEnded () {
	document.getElementById('message').classList.remove('hidden');
}
