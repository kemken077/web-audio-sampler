let _audioContext;
const samples = {};
const playUIButton = document.getElementById('play');
const clickEventTypeByDevice = isMobile() ? 'touchstart' : 'click';
console.log({clickEventTypeByDevice});

function isMobile() {
  return /Mobi/.test(navigator.userAgent);
}

function playDevice() {
  console.log('PLAYING...');
  loadSample('amen', './public/audio/amen.wav');
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  _audioContext = audioContext;
  // Later, you can play a sample like this:
  playSample(samples['amen']);
}

function playSample(buffer) {
  const source = _audioContext.createBufferSource();
  source.buffer = buffer;
  source.connect(_audioContext.destination);
  source.start();
}


function loadSample(name, url) {
  fetch(url)
    .then(response => response.arrayBuffer())
    .then(arrayBuffer => _audioContext.decodeAudioData(arrayBuffer))
    .then(audioBuffer => {
      samples[name] = audioBuffer;
    });
}


playUIButton.addEventListener(clickEventTypeByDevice, () => {
  playDevice();
});
