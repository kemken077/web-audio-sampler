function isMobile() {
  return /Mobi/.test(navigator.userAgent);
}

const audioContext = new (window.AudioContext || window.webkitAudioContext)();
const clickEventTypeByDevice = isMobile() ? 'click' : 'touchstart';
const playUIButton = document.getElementById('play');

function playSample(buffer) {
  const source = audioContext.createBufferSource();
  source.buffer = buffer;
  source.connect(audioContext.destination);
  source.start();
}

const samples = {};

function loadSample(name, url) {
  fetch(url)
    .then(response => response.arrayBuffer())
    .then(arrayBuffer => audioContext.decodeAudioData(arrayBuffer))
    .then(audioBuffer => {
      samples[name] = audioBuffer;
    });
}

loadSample('amen', './public/audio/amen.wav');


playUIButton.addEventListener(clickEventTypeByDevice, () => {
  // Later, you can play a sample like this:
  playSample(samples['amen']);
});
