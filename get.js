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
    // Check if an id is sent in url and use it on getCharacter
    const searchParams = new URLSearchParams(document.URL);
    const idUrl = searchParams.get("file:///home/yves/Documents/Travail/Becode - webdev/Projects/character-manager-js/index.html?id");
    const characters = idUrl ? await getCharacter(idUrl) : await getCharacter();
    const target = document.querySelector(".cardPool");
    const template = document.getElementById("template");
    // If receive an array of multiple characters, loop on it and display and prepare button
    // Else display the unique character card with adapted style
    if( characters[0] != undefined && characters.length > 0){
        characters.forEach((character) => {
            let clone = template.content.cloneNode(true);
            clone.querySelector(".card__button").addEventListener("click", async ()=>{
                let char = await getCharacter(character.id);
                window.open(`index.html?id=${character.id}`, '_blank');
            });
            clone.querySelector(".card__h3").innerHTML = character.name;
            clone.querySelector(".card__p").innerHTML = character.shortDescription;
            target.appendChild(clone);
        });
    }
    else {
        let clone = template.content.cloneNode(true);
        clone.querySelector(".card__h3").innerHTML = characters.name;
        clone.querySelectorAll(".card__p")[0].innerHTML = characters.shortDescription;
        clone.querySelectorAll(".card__p")[1].innerHTML = characters.description;
        target.appendChild(clone);
        target.children[1].classList.remove("card--pool");
        target.children[1].parentElement.classList.remove("cardPool");
        document.body.removeChild(document.getElementsByClassName("card__button--addnew")[0]);
    }
}

(() => {
    // On load, fill the pool section with cards from characters
    displayCharacters();
})();