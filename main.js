function loadImage(obj) {
  var base64ImageTagsContainer = document.getElementById("base64ImageTagsContainer");
  var fileReader = new FileReader();
  fileReader.onload = (function() {
    console.log(fileReader.result.width);
    resized(fileReader.result, function(base64) {
      base64ImageTagsContainer.insertAdjacentHTML("beforeend", "<a onclick='copyText(this.innerHTML)' ><img src='" + base64 + "'></a>")
    });
  });
  fileReader.readAsDataURL(obj.files[0]);
}

function resized(base64data, callback) {
  var b64data;
  ImgB64Resize(base64data, 
    function(img_b64) {
      b64data = img_b64;
      console.log(b64data);
      callback(b64data);
    }
  );
}

function ImgB64Resize(imgB64_src, callback) {
  var img_type = imgB64_src.substring(5, imgB64_src.indexOf(";"));
  // Source Image
  var img = new Image();
  var resizedWidth = 0;
  var resizedHeight = 0;
  img.onload = function() {
    // New Canvas
    var canvas = document.createElement('canvas');
    if(img.width > img.height) {
      resizedWidth = 700;
      resizedHeight = 700 * img.height / img.width;
    } else {
      resizedHeight = 700;
      resizedWidth = 700 + img.width / img.height;
    }
    canvas.width = resizedWidth;
    canvas.height = resizedHeight;
    // Draw (Resize)
    var ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0, resizedWidth, resizedHeight);
    // Destination Image
    var imgB64_dst = canvas.toDataURL(img_type);
    // console.log(imgB64_dst);
    callback(imgB64_dst);
  };
  img.src = imgB64_src;
}

function copyText(text) {
  var copyForm = document.createElement("textarea");
  copyForm.textContent = text;
  var bodyElm = document.getElementsByTagName("body")[0];
  bodyElm.appendChild(copyForm);
  copyForm.select();
  document.execCommand("copy");
  bodyElm.removeChild(copyForm);
}
