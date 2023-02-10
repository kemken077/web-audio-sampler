let _audioContext;
let _currentBuffer;
let _currentSource;
const samples = {};
const playStopUIButton = document.getElementById('playstop');
const clickEventTypeByDevice = isMobile() ? 'touchstart' : 'click';
const STATE = {
  isPlaying: false,
};
const UITexts = {
  buttons: {
    play: 'PLAY SOUND',
    stop: 'STOP SOUND',
    pause: 'PAUSE SOUND',
  }
};

function isMobile() {
  return /Mobi/.test(navigator.userAgent);
}

function playDevice() {
  loadSample('amen', './public/audio/amen.wav');
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  _audioContext = audioContext;
  // Later, you can play a sample like this:
  const currentBuffer = samples['amen'];
  playSample(currentBuffer);
  _currentBuffer = currentBuffer;
}

function playSample(buffer) {
  const source = _audioContext.createBufferSource();
  _currentSource = source;
  source.buffer = buffer;
  source.connect(_audioContext.destination);
  source.start();
}

function stopDevice() {
  const source = _currentSource;
  source.stop();
}

function loadSample(name, url) {
  fetch(url)
    .then(response => response.arrayBuffer())
    .then(arrayBuffer => _audioContext.decodeAudioData(arrayBuffer))
    .then(audioBuffer => {
      samples[name] = audioBuffer;
    });
}

function isPlaying() {
  return STATE.isPlaying;
}

function setIsPlayingState(newState) {
  STATE.isPlaying = newState;
}

function updateInnerText(el, text) {
  el.innerText = text;
}

function handlePlayToggle() {
  if (isPlaying()) {
    stopDevice();
    setIsPlayingState(false);
    updateInnerText(playStopUIButton, UITexts.buttons.play);
  } else {
    playDevice();
    setIsPlayingState(true);
    updateInnerText(playStopUIButton, UITexts.buttons.stop);
  }
}


playStopUIButton.addEventListener(clickEventTypeByDevice, () => {
  handlePlayToggle();
});
