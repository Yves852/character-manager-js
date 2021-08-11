/* Get character from ID */
const getCharacter = async id => {
    try {
        const myHeaders = new Headers();
        //if(typeof(id) == "string") { throw new Error(`${id} is not a valid id`); }
        let result = await window.fetch(`https://character-database.becode.xyz/characters/${id ? id : ""}`, { 
            method: "GET",
            headers: myHeaders
        });
        if(!result.ok){ throw new Error( `${result.status} ${result.statusText}`); }
        let characters = await result.json();
        return  characters;
    }
    catch(error) {
        console.error(error);
    }
}
/* Function creating cards from template and filling with data */
const displayCharacters = async () => {
    const characters = await getCharacter();
    const target = document.querySelector(".cardPool");
    const template = document.getElementById("template");
    if(characters.length > 0){
        characters.forEach((character) => {
            let clone = template.content.cloneNode(true);
            // Reduce description for pool to maximum 500 letters
            let description = String(character.description);
            if (description.length > 500) { 
                description = description.slice(0, 500); 
                description = description.concat("[...]");
            }
            clone.querySelector(".card__h3").innerHTML = character.name;
            clone.querySelector(".card__p").innerHTML = description;
            target.appendChild(clone);
        });
    }
}

(() => {
    // On load, fill the pool section with cards from characters
    displayCharacters();
})();