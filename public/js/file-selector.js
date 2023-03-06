const fileSelector = document.getElementById('file-selector');
const handleFileSelection = (event) => {
  const fileList = event.target.files;
  console.log(fileList);
}; 


fileSelector.addEventListener('change', handleFileSelection);
