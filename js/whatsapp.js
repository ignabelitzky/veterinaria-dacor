// whasapp.js

document.addEventListener("DOMContentLoaded", function () {
    const buttonDiv = document.getElementById("contact-content__whatsapp-cta");
    const selector = document.getElementById("contact-content__selector");

    selector.addEventListener("change", () => {
        const option = selector.value;

        let link = "";
        let buttonText = "";

        if (option === "consultorio") {
            link = "https://wa.me/+5493513142528?text=Hola%20tengo%20una%20consulta%20para%20la%20veterinaria";
            buttonText = "Contactar Consultorio Veterinario";
        } else if (option === "petshop") {
            link = "https://wa.me/+5493516784060?text=Hola%20tengo%20una%20consulta%20para%20el%20pet-shop";
            buttonText = "Contactar al Pet-Shop";
        } else {
            buttonDiv.style.display = "none";
            return;
        }

        buttonDiv.innerHTML = `<a href="${link}" target="_blank" rel="noopener">${buttonText}</a>`;
        buttonDiv.style.display = "block";
    })
})