 const del = () => {
     const r = confirm('Etes vous sur de vouloir supprimer ce personnage?');
            if (r == true){
                const del = await fetch(`https://character-database.becode.xyz/characters/${idUrl}`, {method: 'DELETE',
            headers:{
                "Content-Type":"application/json",
                
            }})
            window.open('http://127.0.0.1:5500/index.html', '_self')
            }else return 
        }