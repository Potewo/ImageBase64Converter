function onFileSelected(input) {
  var file = input.files[0];
  var reader = new FileReader();
  reader.onload = onFileLoaded;
  reader.readAsDataURL(file);
}

function onFileLoaded(e) {
  var src_data = e.target.result;
  var img = new Image();
  img.onload = onImageSetted;
  img.src = src_data;
}

function onImageSetted(e) {
  var data = createImageData(e.target);
  document.getElementById('canvas').getContext('2d').putImageData(data, 0, 0,);
}

function createImageData(img) {
  var cv = document.createElement('canvas');
  cv.width = 0;
  cv.height = 0;
  var ct = cv.getContext('2d');
  ct.drawImage(img, 0, 0);
  var data = ct.getImageData(0, 0, cv.width, cv.height);
  return data;
}


