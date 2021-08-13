let  base64 = ""
function previewFile() {
    
    const preview = document.querySelector('img');
    const file = document.querySelector('input[type=file]').files[0];
    const reader = new FileReader();
  
    reader.addEventListener("load", function () {
      // convert image file to base64 string
      
      preview.src = reader.result;
      base64 = reader.result
    
      console.log(base64);
    }, false);
  
    if (file) {
      reader.readAsDataURL(file); 
    
    }

  }





    document.getElementById('save').addEventListener('click', async() =>{
        
        
        const inputs = Array.from(document.querySelectorAll(".editor-input"));
        
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



