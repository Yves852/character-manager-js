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
            // TODO open character page
            clone.querySelector(".card__button").addEventListener("click", async ()=>{
                let char = await getCharacter(character.id);
                console.log({name: char.name, descr: char.shortDescription});
            });
            clone.querySelector(".card__h3").innerHTML = character.name;
            clone.querySelector(".card__p").innerHTML = character.shortDescription;
            target.appendChild(clone);
        });
    }
}

(() => {
    // On load, fill the pool section with cards from characters
    displayCharacters();
})();