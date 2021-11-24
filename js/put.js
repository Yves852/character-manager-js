// When called from action Update character, fill the form with data of the selected character
// Add event on button for put http method to the API
const preparePut = async (id) => {
    const inputs = Array.from(document.querySelectorAll("input"));
    const image = document.getElementById("editor-character-name");

    if (id == "undefined") {
        throw new Error(`Cannot get id`);
    }

    // Refresh data from the character and fill inputs with its data
    characterInput = await getCharacter(id, null);

    if (characterInput) {
        inputs.forEach((input) => {
            switch (input.id) {
                case "editor-character-name":
                    input.value = characterInput.name;
                    break;
                case "editor-character-short":
                    input.value = characterInput.shortDescription;
                    break;
                case "editor-character-description":
                    input.value = characterInput.description;
                    break;
                case "editor-character-name":
                    image.src = `data:image/png;base64,${characterInput.image}`;
                    break;
            }
        });
    }

    // Http request to update remote character
    document.getElementById("save").addEventListener("click", async () => {
        let dataCharacter = { image: base64, ...getDataInputs(inputs) };
        try {
            const response = await fetch(
                `https://character-database.becode.xyz/characters/${id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(dataCharacter),
                }
            );
            window.open(`../index.html?id=${id}`, "_self");
        } catch (error) {
            console.error(error);
        }
    });
};
