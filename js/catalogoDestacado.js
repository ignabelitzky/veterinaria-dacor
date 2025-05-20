document.addEventListener("DOMContentLoaded", () => {
  fetch("data/productos.json")
    .then((response) => response.json())
    .then((productos) => {
      const contenedor = document.getElementById("contenedor-destacados");
      const destacados = productos.filter((producto) => producto.destacado);
      destacados.forEach((producto) => {
        const card = document.createElement("div");
        card.classList.add("producto");
        card.innerHTML = `
                    <img src="img/productos/${producto.imagen}" alt="${
          producto.nombre
        }" />
                    <h3>${producto.nombre}</h3>
                    <p class="precio">$${producto.precio.toLocaleString(
                      "es-AR"
                    )}</p>
                `;

        contenedor.appendChild(card);
      });
    })
    .catch((error) => {
      console.error("Error cargando el catálogo:", error);
    });
});
