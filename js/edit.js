let characterInput;

// Retrieve inut with image and transform it to an base 64 url
const imgFileToBase64 = function (e) {    
  const preview = document.querySelector('.preview');
  const input = e.target;
  //const file = document.querySelector('#editor-character-name');
  const reader = new FileReader();
  let imgUrl64 = "";

  reader.addEventListener("load", function () {
    // convert image file to base64 string
    imgUrl64 = reader.result;    
    preview.src = imgUrl64;
    // Add into character
    characterInput.image = imgUrl64.slice(21, imgUrl64.length);
  });

  if (input.files[0]) {
    reader.readAsDataURL(input.files[0]);     
  }
}

const getDataInputs = inputs => {
  let data = {};
  inputs.forEach(input => {
    switch(input.id){
      case "editor-character-name":
        data.name = input.value;
        break;
      case "editor-character-short":
        data.shortDescription = input.value;
        break;
      case "editor-character-description":
        data.description = input.value;
        break;
    }
  });
  // data.image is handled in put.js and post.js
  return data;
}

// 
let idUrl;

(() => {
  // Check if an id is sent in url and use it
  const params = new URLSearchParams(window.location.search);
  idUrl = params.get("id");

  // If an id is retrieved, use put to update character
  // Else post to create a new character
  if(idUrl){
    preparePut(idUrl);   // post.js
  }
  else {
    preparePost();  // put.js
  }
})();