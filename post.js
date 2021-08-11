const inputs = Array.from(document.querySelectorAll("input"));

(() =>{
    document.getElementById('save').addEventListener('click', async() =>{
        const values = inputs.map(({value}) => value.trim())

        if (values.some((value) => value === "")){
            console.log(`you must fill all the forms!`);
            return;
        }
        const [image,name,shortdesc,description] =values;
        const response = await fetch('http://localhost:3000/character',{
            method: "POST",
            headers:{
                "Content-Type":"application/json",
            },
            body: JSON.stringify({
                description,
                shortdesc,
                name,
                image,
            })
        });
        const newcharacter = await response.json

        console.log(newcharacter);

    });
})();


