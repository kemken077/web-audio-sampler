function isMobile() {
  return /Mobi/.test(navigator.userAgent);
}

// Sample
const playButton = document.getElementById('play');
const pauseButton = document.getElementById('pause');
const stopButton = document.getElementById('stop');
const clickEventTypeByDevice = isMobile() ? 'touchstart' : 'click';

var wavesurfer = WaveSurfer.create({
  container: '#waveform',
  waveColor: 'aquamarine',
  scrollParent: true,
  progressColor: 'mediumaquamarine',
});

// File selection
document.getElementById('file-selector').addEventListener('change', function(event) {
  const file = this.files[0];
  if (file) {
    const reader = new FileReader();
    reader.addEventListener('load', (event) => {
      const blob = new window.Blob([new Uint8Array(event.target.result)]);
      wavesurfer.loadBlob(blob);
    });
    reader.addEventListener('progress', (event) => {
      if (event.loaded && event.total) {
        const percent = (event.loaded / event.total) * 100;
        console.log(`Progress: ${Math.round(percent)}`);
      }
    });
    reader.addEventListener('error', (event) => {
      console.error('An Error ocurr reading the file', event);
    });
    reader.readAsArrayBuffer(file);
  }
});

function fileSelection() {
  const fileSelector = document.getElementById('file-selector');
  const handleFileSelection = (event) => {
    const fileList = event.target.files;
    console.log(fileList);
  };
  fileSelector.addEventListener('change', handleFileSelection);
}


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
