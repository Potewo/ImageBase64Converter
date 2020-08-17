function loadImage(obj) {
  var base64ImageTagsContainer = document.getElementById("base64ImageTagsContainer");
  var fileReader = new FileReader();
  var base64 = "";
  fileReader.onload = (function() {
    base64 = fileReader.result;
    base64ImageTagsContainer.insertAdjacentHTML("beforeend", "<a onclick='copyText(this.innerHTML)' ><img src='" + base64 + "'></a>")
  });
  fileReader.readAsDataURL(obj.files[0]);
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
