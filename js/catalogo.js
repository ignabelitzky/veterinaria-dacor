document.addEventListener("DOMContentLoaded", () => {
  const contenedor = document.getElementById("contenedor-catalogo");
  const buscador = document.getElementById("buscador");
  const selectCategoria = document.getElementById("categoria");

  let productos = [];

  fetch("data/productos.json")
    .then((response) => response.json())
    .then((data) => {
      productos = data;
      mostrarProductos(productos);
    })
    .catch((error) => {
      console.error("Error cargando productos:", error);
      contenedor.innerHTML = "<p>Error al cargar el catálogo.</p>";
    });

  // Filtrado al escribir en buscador
  buscador.addEventListener("input", aplicarFiltros);

  // Filtrado al cambiar categoría
  selectCategoria.addEventListener("change", aplicarFiltros);

  // Función para aplicar ambos filtros
  function aplicarFiltros() {
    const texto = buscador.value.toLowerCase();
    const categoria = selectCategoria.value;

    const filtrados = productos.filter((producto) => {
      const coincideTexto =
        producto.nombre.toLowerCase().includes(texto) ||
        producto.descripcion.toLowerCase().includes(texto);

      const coincideCategoria =
        categoria === "todas" || producto.categoria === categoria;
      return coincideTexto && coincideCategoria;
    });

    mostrarProductos(filtrados);
  }

  function mostrarProductos(lista) {
    contenedor.innerHTML = "";
    if (lista.length === 0) {
      contenedor.innerHTML = "<p>No se encontraron productos.</p>";
      return;
    }

    lista.forEach((producto) => {
      const div = document.createElement("div");
      div.className = "producto";

      // Determinar estado del stock
      const stockTexto = producto.stock ? "Disponible" : "Sin stock";
      const claseStock = producto.stock ? "stock-disponible" : "stock-agotado";

      div.innerHTML = `
                <img src="img/productos/${producto.imagen}" alt="${
        producto.nombre
      }">
                <h2>${producto.nombre}</h2>
                <p>${producto.descripcion}</p>
                <span class="precio">$${producto.precio.toLocaleString(
                  "es-AR"
                )}</span>
                <span class="${claseStock}">${stockTexto}</span>
                `;
      contenedor.appendChild(div);
    });
  }
});
