let base64 = "";
function previewFile() {
  const preview = document.querySelector("img");
  const file = document.querySelector("input[type=file]").files[0];
  const reader = new FileReader();

  reader.addEventListener(
    "load",
    function () {
      // convert image file to base64 string

      preview.src = reader.result;
      base64 = reader.result.split(",")[1];
    },
    false
  );

  if (file) {
    reader.readAsDataURL(file);
  }
}
countChecker = "";
const txt = document.querySelectorAll(".editor-input");
const nameChecker = (value) => {
  document.getElementById(
    "name-count"
  ).innerHTML = `${value.length} on max 20 char.`;
  if (value.length > 20) {
    document.getElementById("name-count").style.color = "red";
    countChecker = true;
  } else {
    document.getElementById("name-count").style.color = "white";
    countChecker = false;
  }
};

const shortchecker = (value) => {
  document.getElementById(
    "short-count"
  ).innerHTML = `${value.length} on max 70 char.`;
  if (value.length > 70) {
    document.getElementById("short-count").style.color = "red";
    countChecker = true;
  } else {
    document.getElementById("short-count").style.color = "white";
    countChecker = false;
  }
};
const descriptionChecker = (value) => {
  document.getElementById(
    "desc-count"
  ).innerHTML = `${value.length} on max 350 char.`;
  if (value.length > 350) {
    document.getElementById("desc-count").style.color = "red";
    countChecker = true;
  } else {
    document.getElementById("desc-count").style.color = "white";
    countChecker = false;
  }
};

txt.forEach((input) => {
  input.addEventListener("input", (e) => {
    switch (e.target.id) {
      case "editor-character-name":
        nameChecker(e.target.value);
        break;
      case "editor-character-short":
        shortchecker(e.target.value);
        break;
      case "editor-character-description":
        descriptionChecker(e.target.value);
        break;
    }
  });
});
document.getElementById("save").addEventListener("click", async () => {
  const inputs = Array.from(document.querySelectorAll(".editor-input"));

  const inputvalues = inputs.map(({ value }) => value.trim());
  const values = inputvalues.unshift(base64);

  if (inputvalues.some((value) => value === "")) {
    console.log(`you must fill all the forms!`);
    alert("you must fill all the forms!");
    return;
  }
  if ((countChecker = true)) {
    alert("veuillez ne pas dépasser le nombre de caractères autorisés");
    return;
  }
  const [image, name, shortDescription, description] = inputvalues;

  const response = await fetch(
    "https://character-database.becode.xyz/characters",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        description,
        shortDescription,
        name,
        image,
      }),
    }
  );
  const newcharacter = await response.json;

  console.log(newcharacter);

  alert(
    "Votre Personnage a bien été enrgistré, vous allez être dirigé vers la page d'accueil"
  );
  window.open("index.html", "_self");
});
