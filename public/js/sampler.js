let _audioContext;
let _currentBuffer;
let _currentSource;
const samples = {};
const playButton = document.getElementById('play');
const pauseButton = document.getElementById('pause');
const stopButton = document.getElementById('stop');
const clickEventTypeByDevice = isMobile() ? 'touchstart' : 'click';
const AUDIO_CONTEXT_STATE_VALUES = {
  RUNNING: 'running',
  SUSPENDED: 'suspeneded',
  CLOSED: 'closed',
};
const UITexts = {
  buttons: {
    play: 'PLAY SOUND',
    stop: 'STOP SOUND',
    pause: 'PAUSE SOUND',
    resume: 'RESUME SOUND',
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

function getAudioContextState() {
  if (_audioContext) {
    return _audioContext.state;
  } else {
    console.warn('No AudioContext yet...');
  }
}

function updateInnerText(el, text) {
  el.innerText = text;
}

function handlePlayPauseToggle() {
  console.log(_audioContext);
  const audioContextState = getAudioContextState();
  if (audioContextState === AUDIO_CONTEXT_STATE_VALUES.RUNNING) {
    _audioContext.suspend().then(() => {
      console.log('Audio suspended...');
      updateInnerText(pauseButton, UITexts.buttons.resume);
    });
  } else if (audioContextState === AUDIO_CONTEXT_STATE_VALUES.SUSPENDED) {
    _audioContext.resume().then(() => {
      console.log('Audio resumed...');
      updateInnerText(pauseButton, UITexts.buttons.pause);
    });
  }
}

// document.addEventListener("DOMContentLoaded", () => {
  stopButton.addEventListener(clickEventTypeByDevice, () => {
    stopDevice();
  });

  playButton.addEventListener(clickEventTypeByDevice, () => {
    const isAudioContextSuspended = getAudioContextState() === AUDIO_CONTEXT_STATE_VALUES.SUSPENDED;
    const isAudioContextClosed = getAudioContextState() === AUDIO_CONTEXT_STATE_VALUES.CLOSED;
    const isAudioContextRunning = getAudioContextState() === AUDIO_CONTEXT_STATE_VALUES.RUNNING;
    if (_audioContext && isAudioContextRunning) {
      console.info('AudioContext is running...');
      playDevice(); // TODO: fix play on first click
      return;
    } else if (!_audioContext || isAudioContextSuspended || isAudioContextClosed) {
      playDevice();
    }
  });

  pauseButton.addEventListener(clickEventTypeByDevice, () => {
    handlePlayPauseToggle();
  });
// });
