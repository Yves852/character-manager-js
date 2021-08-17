const preparePost = ()=>{
  document.getElementById('save').addEventListener('click', async() =>{
    const inputs = Array.from(document.querySelectorAll(".editor-input"));        
    const values = inputs.map(({value}) => value.trim())
    if (values.some((value) => value === "")){
        console.log(`you must fill all the forms!`);
        return;
    }
    let dataCharacter = { ...characterInput, ...getDataInputs(inputs) };
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