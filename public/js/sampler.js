
const playButton = document.getElementById('play');
const pauseButton = document.getElementById('pause');
const stopButton = document.getElementById('stop');
const clickEventTypeByDevice = isMobile() ? 'touchstart' : 'click';

function isMobile() {
  return /Mobi/.test(navigator.userAgent);
}

const sampleURL = '../public/audio/amen.wav';
var wavesurfer = WaveSurfer.create({
  container: '#waveform',
  waveColor: 'violet',
  scrollParent: true,
  progressColor: 'purple',
});
wavesurfer.load(sampleURL);

const handlePlay = () => {
  wavesurfer.play();
};

const handleStop = () => {
  wavesurfer.stop();
};

const handlePauseToggle = () => {
  wavesurfer.playPause();
};

wavesurfer.on('ready', function() {
  stopButton.addEventListener(clickEventTypeByDevice, handleStop);
  playButton.addEventListener(clickEventTypeByDevice, handlePlay);
  pauseButton.addEventListener(clickEventTypeByDevice, handlePauseToggle);
});
