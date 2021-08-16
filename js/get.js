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
    const params = new URLSearchParams(window.location.search);
    const idUrl = params.get("id");
    const characters = idUrl ? await getCharacter(idUrl) : await getCharacter();
    const target = document.querySelector(".cardPool");
    const template = document.getElementById("template");
    // If receive an array of multiple characters, loop on it and display and prepare button
    // Else display the unique character card with adapted style
    if( characters[0] != undefined && characters.length > 0){
        characters.forEach((character) => {
            let clone = template.content.cloneNode(true);
            clone.querySelector(".card__button").addEventListener("click", ()=>{
                // Open a new tab of index.html with the character id as parameter
                window.open(`index.html?id=${character.id}`, '_blank');
            });
            clone.querySelector(".card__h3").innerHTML = character.name;
            clone.querySelector(".card__p").innerHTML = character.shortDescription;
            target.appendChild(clone);
        });
    }
    else {
        // Create card from template
        let clone = template.content.cloneNode(true);
        clone.children[0].appendChild(document.createElement("p")); 
        clone.querySelectorAll("p")[1].classList.add("card__p");
        clone.querySelector(".card__h3").innerHTML = characters.name;
        clone.querySelectorAll(".card__p")[0].innerHTML = characters.shortDescription;
        clone.querySelectorAll(".card__p")[1].innerHTML = characters.description;

        // Switch class for one card render
        clone.children[0].classList.remove("card--pool");
        clone.children[0].classList.add("card--alone");
        clone.children[0].classList.add("centerContent");

        // Create new buttons
        let btnUpdate = document.createElement("button");
        let btnDelete = document.createElement("button");
        btnUpdate.innerText = "Upgrade character";
        btnDelete.innerText = "Delete character";

        // Add click events, update open new tab and delete handle deletion
        btnUpdate.addEventListener("click", ()=>{
          // replace actual page with edit.html
          window.open(`edit.html?id=${character.id}`, '_self');
        });
        btnDelete.addEventListener("click", ()=>{

        });

        // TODO apply sass updates when style.css is updated
        btnUpdate.classList.add("btn", "edit-btn");
        btnDelete.classList.add("btn", "edit-btn");
        btnDelete.id = "delete";

        // Remove Add character button, add update and delete buttons
        document.body.removeChild(document.getElementsByClassName("card__button--addnew")[0]);
        let btnSee = clone.children[0].getElementsByClassName("card__button")[0];
        clone.children[0].appendChild(btnUpdate);
        clone.children[0].appendChild(btnDelete);
        clone.children[0].removeChild(btnSee);

        // Add to target
        target.appendChild(clone);
        target.classList.remove("cardPool");
    }
}

(() => {
    // On load, fill the pool section with cards from characters
    displayCharacters();
})();