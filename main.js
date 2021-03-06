import './style.css';

// DOM Elements
const video = document.querySelector('video');
const backCamera = document.querySelector('.back');
const frontCamera = document.querySelector('.front');
const fullscreen = document.querySelector('.fullscreen');

/**
 *
 * @param {MediaProvider} stream The video stream to render
 */
function render(stream) {
  video.srcObject = stream;
}

/**
 * Gets the corresponding device camera based on a direction.
 *
 * @param {string} camera The device camera to use
 * @returns {ConstrainDOMString} The cross-platform camera `facingMode`
 */
function getFacingMode(camera) {
  switch (camera) {
    case 'front':
      return 'user';
    case 'back':
      return 'environment';
    default:
      return 'environment';
  }
}

/**
 * Captures output of a specified device camera.
 *
 * @param {string} camera The device camera to use
 */
function capture(camera) {
  navigator.mediaDevices
    .getUserMedia({
      video: { facingMode: getFacingMode(camera) },
    })
    .then(render)
    .catch(console.error);
}

/**
 * Cross-platform way to make a video enter fullscreen.
 */
function enterFullScreen() {
  if (video.webkitEnterFullScreen) {
    // Mobile Safari
    video.webkitEnterFullScreen();
  } else if (video.requestFullscreen) {
    video.requestFullscreen();
  } else if (video.webkitRequestFullscreen) {
    // Regular Safari
    video.webkitRequestFullscreen();
  } else if (video.msRequestFullscreen) {
    // IE11 — I sincerely hope you don't own a phone running IE11...
    video.msRequestFullscreen();
  }
}

frontCamera.addEventListener('click', () => capture('front'));
backCamera.addEventListener('click', () => capture('back'));
fullscreen.addEventListener('click', enterFullScreen);
