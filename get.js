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
        return await result.json();
    }
    catch(error) {
        console.error(error);
    }
}

(() => {
    console.log(getCharacter());
})();