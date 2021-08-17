
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