/* Function creating cards from template and filling with data */
const displayCharacters = async name => {
  // Check if an id is sent in url or a name by paramerer and use it on getCharacter
  const params = new URLSearchParams(window.location.search);
  const idUrl = params.get("id");
  let nameParam = name ? name : "";
  const characters = idUrl 
    ? await getCharacter(idUrl, null) 
    : nameParam.length > 0 
      ? await getCharacter(null, nameParam) 
      : await getCharacter(null, null);
  const target = document.querySelector("#pool");
  const template = document.getElementById("template");

  // Check if target have already elements, empty it if so
  if(target.children && target.children.length > 0) { 
    while(target.lastChild) { target.removeChild(target.lastChild); }; 
  }

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
        window.open(`./html/edit.html?id=${characters.id}`, '_self');
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
  
  // Handle search bar actions
  const searchBar = document.getElementById("search-bar");
  // Empty bar at load
  searchBar.value = "";
  // When release key on the search bar, check if text is > 2 then launch research on name filter
  // Or is empty then refresh list of characters
  searchBar.addEventListener("keyup", async ()=>{
    if(searchBar.value.length > 2) { displayCharacters(searchBar.value); }
    else if(searchBar.value.length == 0) { displayCharacters(); }
  });
})();