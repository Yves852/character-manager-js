

// When called from Update character, fill data from selected character and http method is PUT

const preparePut = async id => {
    const inputs = Array.from(document.querySelectorAll("input"));

    if(id == "undefined") { throw new Error(`Cannot get id`); }

    // Refresh data from the character and fill inputs with its data
    const result = await fetch(`http://localhost:3000/characters/${id}`,{ method: "GET" });
    const character = await result.json();
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
        }
    });

    document.getElementById('save').addEventListener('click', async () => {        
        const values = inputs.map(({value}) => value.trim());
        // Check if any input is empty
        if (values.some((value) => value === "")){
            console.log(`you must fill all the forms!`);
            return;
        }
        const [image,name,shortdesc,description] = values;
        const response = await fetch(`http://localhost:3000/characters/${id}`,{
            method: "PUT",
            headers:{
                "Content-Type":"application/json",
            },
            body: JSON.stringify({
                description,
                shortDescription,
                name,
                image,
            })
        });
        const newcharacter = await response.json();
        console.log(newcharacter);
    });
}