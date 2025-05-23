document.addEventListener("DOMContentLoaded", () => {
  fetch("data/servicios.json")
    .then((response) => response.json())
    .then((servicios) => mostrarServicios(servicios))
    .catch((error) => console.error("Error al cargar los servicios:", error));
});

function mostrarServicios(servicios) {
  const contenedor = document.getElementById("lista-servicios");
  servicios.forEach((servicio) => {
    const div = document.createElement("div");
    div.classList.add("servicio");
    div.innerHTML = `
      <img src="${servicio.imagen}" alt="${servicio.nombre}">
      <h3>${servicio.nombre}</h3>
      <p>${servicio.descripcion}</p>
      `;
    contenedor.appendChild(div);
  });
}
