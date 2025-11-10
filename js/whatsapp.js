document.addEventListener("DOMContentLoaded", function () {
  const buttonDiv = document.getElementById("contact-content__whatsapp-cta");
  const buttons = document.querySelectorAll(".contact-options button");

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const area = btn.dataset.area;
      let link = "";
      let buttonText = "";
      let infoText = "";

      if (area === "consultorio") {
        link = "https://wa.me/+5493513142528?text=Hola%20tengo%20una%20consulta%20para%20la%20veterinaria";
        buttonText = "Contactar Consultorio Veterinario";
        infoText = "Consultas sobre atención médica, turnos y urgencias.";
      } else if (area === "petshop") {
        link = "https://wa.me/+5493516784060?text=Hola%20tengo%20una%20consulta%20para%20el%20pet-shop";
        buttonText = "Contactar al Pet-Shop";
        infoText = "Consultas sobre productos, stock y ventas.";
      }

      buttonDiv.innerHTML = `
        <p class="contact-content__whatsapp-info">${infoText}</p>
        <a href="${link}" target="_blank" rel="noopener" class="contact-content__whatsapp-btn">
          ${buttonText}
        </a>
      `;
      buttonDiv.style.display = "flex";
    });
  });
});
