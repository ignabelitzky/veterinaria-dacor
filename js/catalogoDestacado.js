document.addEventListener("DOMContentLoaded", () => {
  const contenedor = document.getElementById("contenedor-destacados");
  const paginacion = document.getElementById("paginacion-destacados");
  const productosPorPagina = 5; // Cambia este valor para ajustar la cantidad de productos por página
  let destacados = [];
  let paginaActual = 1;

  fetch("data/productos.json")
    .then((response) => response.json())
    .then((productos) => {
      destacados = productos.filter((producto) => producto.destacado);
      renderizarPaginaDestacados();
      renderizarControlesPaginacion();
    })
    .catch((error) => {
      console.error("Error cargando el catálogo:", error);
      contenedor.innerHTML = "<p>Error al cargar productos destacados.</p>";
    });

  function renderizarPaginaDestacados() {
    contenedor.innerHTML = "";
    const inicio = (paginaActual - 1) * productosPorPagina;
    const fin = inicio + productosPorPagina;
    const pagina = destacados.slice(inicio, fin);

    if (pagina.length === 0) {
      contenedor.innerHTML = "<p>No hay productos destacados para mostrar.</p>";
      return;
    }

    pagina.forEach((producto) => {
      const card = document.createElement("div");
      card.classList.add("producto");
      card.innerHTML = `
        <img src="img/productos/${producto.imagen}" alt="${producto.nombre}" />
        <h3>${producto.nombre}</h3>
      `;
      contenedor.appendChild(card);
    });
  }

  function renderizarControlesPaginacion() {
    paginacion.innerHTML = "";
    const totalPaginas = Math.ceil(destacados.length / productosPorPagina);

    for (let i = 1; i <= totalPaginas; i++) {
      const btn = document.createElement("button");
      btn.textContent = i;
      btn.classList.add("btn-pagina");
      if (i === paginaActual) {
        btn.classList.add("activo");
      }

      btn.addEventListener("click", () => {
        paginaActual = i;
        renderizarPaginaDestacados();
        renderizarControlesPaginacion();
      });

      paginacion.appendChild(btn);
    }
  }
});
