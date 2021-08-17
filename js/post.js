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

const preparePost = ()=>{
  document.getElementById('save').addEventListener('click', async() =>{
    const inputs = Array.from(document.querySelectorAll(".editor-input"));        
    const values = inputs.map(({value}) => value.trim())
    if (values.some((value) => value === "")){
        console.log(`you must fill all the forms!`);
        return;
    }
    let dataCharacter = { ...character, ...getDataInputs(inputs) };
    /* const [name,shortDescription,description] =values;
    const image = previewFile();
    alert(JSON.stringify({
      description,
      shortDescription,
      name,
      image,
    })); */
    const response = await fetch('https://character-database.becode.xyz/characters/',{
        method: "POST",
        headers:{
            "Content-Type":"application/json",
        },
        body: JSON.stringify({
          description: dataCharacter.description,
          shortDescription: dataCharacter.shortDescription,
          name: dataCharacter.name,
          image: dataCharacter.image,
        })
    });
    const newcharacter = await response.json();
    console.log(newcharacter);
  });
}