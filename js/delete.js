const del = async (id) => {
    const r = confirm("Etes vous sur de vouloir supprimer ce personnage?");
    if (r) {
        try {
            const del = await fetch(
                `https://character-database.becode.xyz/characters/${id}`,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            window.open("index.html", "_self");
        } catch (error) {
            // TODO replace console
            console.log(error);
        }
    } else return;
};
