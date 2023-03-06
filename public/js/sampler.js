// File selection
const fileSelector = document.getElementById('file-selector');
const handleFileSelection = (event) => {
  const fileList = event.target.files;
  console.log(fileList);
};


fileSelector.addEventListener('change', handleFileSelection);



// Sample
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
  waveColor: 'aquamarine',
  scrollParent: true,
  progressColor: 'mediumaquamarine',
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
