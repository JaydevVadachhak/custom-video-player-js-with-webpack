const mainContainer = document.querySelector('.video-container');
const customControlsContainer = document.querySelector(
  '.custom-video-controls'
);
const mainVideo = document.querySelector('#video-element');
const progressBar = document.querySelector('.progress-bar');
const playPauseIcon = document.querySelector('.play-pause');
const currentTimeElem = document.querySelector('.current-time');
const videoDuration = document.querySelector('.video-duration');
const volumeBar = document.querySelector('.volume-bar');
const volumeButton = document.querySelector('.volume');
const playBackSpeed = document.querySelector('.playback-speed');
const playBackOptionsContainer = document.querySelector('.playback-options');
const speedOptions = document.querySelectorAll('.playback-options li');
const picInPicIcon = document.querySelector('.pic-in-pic-icon');
const expandIcon = document.querySelector('.expand-icon');
const backwardIcon = document.querySelector('.backward');
const forwardIcon = document.querySelector('.forward');
// TODO uncomment
// const loader = document.querySelector('.loader');

let timer;
hideControls();
mainContainer.addEventListener('mousemove', () => {
  customControlsContainer.classList.remove('hid-visible');
  clearTimeout(timer);
  hideControls();
});
mainVideo.addEventListener('click', handlePlayPause);
playPauseIcon.addEventListener('click', handlePlayPause);
mainVideo.addEventListener('timeupdate', updateProgressBar);
progressBar.addEventListener('input', seekVideo);
mainVideo.addEventListener('loadeddata', () => {
  videoDuration.innerText = formatTime(mainVideo.duration);
});
volumeButton.addEventListener('click', (e) => {
  if (!volumeButton.classList.contains('fa-volume-high')) {
    mainVideo.volume = 1.0;
    volumeButton.classList.add('fa-volume-high');
    volumeButton.classList.remove('fa-volume-xmark');
  } else {
    mainVideo.volume = 0;
    volumeButton.classList.remove('fa-volume-high');
    volumeButton.classList.add('fa-volume-xmark');
  }
  volumeBar.value = mainVideo.volume;
});
volumeBar.addEventListener('input', (e) => {
  mainVideo.volume = e.target.value;
});
playBackSpeed.addEventListener('click', () => {
  playBackOptionsContainer.classList.toggle('d-block');
});
speedOptions.forEach((option) => {
  option.addEventListener('click', () => {
    mainVideo.playbackRate = option.dataset.speed;
    document.querySelector('.active').classList.remove('active');
    option.classList.add('active');
  });
});
picInPicIcon.addEventListener('click', () => {
  mainVideo.requestPictureInPicture();
});
mainVideo.addEventListener('play', () => {
  playPauseIcon.classList.remove('fa-play');
  playPauseIcon.classList.add('fa-pause');
});
mainVideo.addEventListener('pause', () => {
  playPauseIcon.classList.add('fa-play');
  playPauseIcon.classList.remove('fa-pause');
});
backwardIcon.addEventListener('click', () => {
  mainVideo.currentTime -= 5;
  currentTimeElem.innerText = formatTime(mainVideo.currentTime);
});
forwardIcon.addEventListener('click', () => {
  mainVideo.currentTime += 5;
  currentTimeElem.innerText = formatTime(mainVideo.currentTime);
});

function updateProgressBar(e) {
  // TODO uncomment
  // loader.classList.add('hide-loader');
  // loader.classList.remove('show-loader');
  const { currentTime } = e.target;
  progressBar.value = (currentTime / mainVideo.duration) * 100;
  currentTimeElem.innerText = formatTime(currentTime);
}

function seekVideo() {
  // TODO uncomment
  // loader.classList.remove('hide-loader');
  // loader.classList.add('show-loader');
  const seekTime = (progressBar.value / 100) * mainVideo.duration;
  mainVideo.currentTime = seekTime;
  currentTimeElem.innerText = formatTime(mainVideo.currentTime);
}

function handlePlayPause() {
  mainVideo.paused ? mainVideo.play() : mainVideo.pause();
}

function formatTime(time) {
  let seconds = Math.floor(time % 60);
  let minutes = Math.floor(time / 60) % 60;
  let hours = Math.floor(time / 3600);

  seconds = seconds < 10 ? `0${seconds}` : seconds;
  minutes = minutes < 10 ? `0${minutes}` : minutes;
  hours = hours < 10 ? `0${hours}` : hours;

  if (hours == 0) {
    return `${minutes}:${seconds}`;
  }
  return `${hours}:${minutes}:${seconds}`;
}

function hideControls() {
  if (mainVideo.paused) return;
  timer = setTimeout(() => {
    customControlsContainer.classList.remove('vis-visible');
    customControlsContainer.classList.add('hid-visible');
  }, 3000);
}
