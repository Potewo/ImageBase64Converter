var base64ImgTag = "empty";
function insertImgTag() {
  var markdownArea = document.getElementById('markdown-area');
  markdownArea.value = markdownArea.value.substr(0, markdownArea.selectionStart) + base64ImgTag + markdownArea.value.substr(markdownArea.selectionStart);
  reloadMarked();
}

function loadMarkdown(obj) {
  var markdownReader = new FileReader();
  markdownReader.onload = (function() {
    document.getElementById("markdown-area").value = markdownReader.result;
    reloadMarked();
  });
  markdownReader.readAsText(obj.files[0]);
}

function loadImage(obj) {
  var base64ImageTagsContainer = document.getElementById("base64ImageTagsContainer");
  var fileReader = new FileReader();
  fileReader.onload = (function() {
    resized(fileReader.result, function(base64) {
      base64ImgTag = "<img src='" + base64 + "'>";
    });
  });
  fileReader.readAsDataURL(obj.files[0]);
}

function resized(base64data, callback) {
  var b64data;
  ImgB64Resize(base64data, 
    function(img_b64) {
      b64data = img_b64;
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
    if(img.width > img.height && img.width > 700) {
      resizedWidth = 700;
      resizedHeight = 700 * img.height / img.width;
    } else if(img.height > img.width && img.height > 700) {
      resizedHeight = 700;
      resizedWidth = 700 + img.width / img.height;
    } else {
      resizedWidth = img.width;
      resizedHeight = img.height;
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

function downloadMarkdown() {
  var markdownText = document.getElementById('markdown-area').value;
  var blob = new Blob(
    [markdownText],
    { "type": "text/plain" });
  var url = window.URL.createObjectURL(blob);
  document.getElementById('download-link').href = url;
}

function reloadMarked() {
  marked.setOptions({breaks : true});
  document.getElementById("marked-content").innerHTML = marked(document.getElementById('markdown-area').value);
}
