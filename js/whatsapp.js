// whasapp.js

document.addEventListener("DOMContentLoaded", function () {
    const botonDiv = document.getElementById("botonWhatsapp");
    const select = document.getElementById("opcionContacto");

    select.addEventListener("change", () => {
        const opcion = select.value;

        let link = "";
        let textoBoton = "";

        if (opcion === "consultorio") {
            link = "https://wa.me/5493512741854?text=Hola%20tengo%20una%20consulta%20para%20la%20veterinaria";
            textoBoton = "Contactar Consultorio Veterinario";
        } else if (opcion === "petshop") {
            link = "https://wa.me/5493516784060?text=Hola%20tengo%20una%20consulta%20para%20el%20pet-shop";
            textoBoton = "Contactar al Pet-Shop";
        } else {
            botonDiv.style.display = "none";
            return;
        }

        botonDiv.innerHTML = `<a href="${link}" target="_blank" rel="noopener">${textoBoton}</a>`;
        botonDiv.style.display = "block";
    })
})