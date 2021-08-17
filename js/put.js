let character;

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
    character.image = imgUrl64.slice(21, imgUrl64.length);
  });

  if (input.files[0]) {
    reader.readAsDataURL(input.files[0]);     
  }
}
// When called from Update character, fill data from selected character and http method is PUT

const preparePut = async id => {
    const inputs = Array.from(document.querySelectorAll("input"));
    const image = document.getElementById("editor-character-name");
    
    if(id == "undefined") { throw new Error(`Cannot get id`); }

    // Refresh data from the character and fill inputs with its data
    
    character = await getCharacter(id, null);
    
    if (character){
      inputs.forEach(input => {
        switch(input.id){
          case "editor-character-name":
            input.value = character.name;
            break;
          case "editor-character-short":
            input.value = character.shortDescription;
            break;
          case "editor-character-description":
            input.value = character.description;
            break;
          // TODO image
          case "editor-character-name":
            image.src = `data:image/png;base64,${character.image}`
            break;
        }
      });
    }
    // imgFileToBase64(); // Prepare event to get url image from file when input file trigger
    document.getElementById('save').addEventListener('click', async () => {
        let dataCharacter = { ...character, ...await getCharacter(id, null) };
        alert(JSON.stringify(dataCharacter));
        const response = await fetch(`https://character-database.becode.xyz/characters/${id}`,{
            method: "PUT",
            headers:{
                "Content-Type":"application/json",
            },
            body: JSON.stringify(dataCharacter)
        });
        window.open(`../index.html?id=${id}`, '_self');
    });
}