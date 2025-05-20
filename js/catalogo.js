document.addEventListener("DOMContentLoaded", () => {
  const contenedor = document.getElementById("contenedor-catalogo");
  const buscador = document.getElementById("buscador");
  const selectCategoria = document.getElementById("categoria");
  const mostrarSinStock = document.getElementById("mostrarSinStock");
  const paginacion = document.getElementById("paginacion");
  const productosPorPagina = 9; // Cambia este valor para ajustar la cantidad de productos por página

  let productos = [];
  let productosFiltrados = [];
  let paginaActual = 1;

  // -----------------------
  // 1. Cargar JSON
  // -----------------------
  fetch("data/productos.json")
    .then((res) => res.json())
    .then((data) => {
      productos = data;
      aplicarFiltros(); // Se inicializa con todos los productos
    })
    .catch((error) => {
      console.error("Error cargando productos:", error);
      contenedor.innerHTML = "<p>Error al cargar el catálogo.</p>";
    });

  // -----------------------
  // 2. Eventos de filtros
  // -----------------------
  buscador.addEventListener("input", aplicarFiltros);
  selectCategoria.addEventListener("change", aplicarFiltros);
  mostrarSinStock.addEventListener("change", aplicarFiltros);

  // -----------------------
  // 3. Función para aplicar filtros y reiniciar página
  // -----------------------
  function aplicarFiltros() {
    const texto = buscador.value.toLowerCase();
    const categoria = selectCategoria.value;

    productosFiltrados = productos.filter((p) => {
      const coincideTexto =
        p.nombre.toLowerCase().includes(texto) ||
        p.descripcion.toLowerCase().includes(texto);

      const coincideCategoria =
        categoria === "todas" || p.categoria === categoria;

      const tieneStock = mostrarSinStock.checked || p.stock;

      return coincideTexto && coincideCategoria && tieneStock;
    });

    paginaActual = 1;
    renderizarProductosPaginados();
  }

  // -----------------------
  // 4. Mostrar productos de una página
  // -----------------------
  function renderizarProductosPaginados() {
    const total = productosFiltrados.length;
    const inicio = (paginaActual - 1) * productosPorPagina;
    const fin = inicio + productosPorPagina;
    const productosPagina = productosFiltrados.slice(inicio, fin);

    mostrarProductos(productosPagina);
    renderizarControlesPaginacion(total);
  }

  // -----------------------
  // 5. Renderizar tarjetas de productos
  // -----------------------
  function mostrarProductos(lista) {
    contenedor.innerHTML = "";

    if (lista.length === 0) {
      contenedor.innerHTML = "<p>No se encontraron productos.</p>";
      return;
    }

    lista.forEach((producto) => {
      const div = document.createElement("div");
      div.className = "producto";

      const stockTexto = producto.stock ? "Disponible" : "Sin stock";
      const claseStock = producto.stock ? "stock-disponible" : "stock-agotado";

      div.innerHTML = `
        <img src="img/productos/${producto.imagen}" alt="${producto.nombre}">
        <h2>${producto.nombre}</h2>
        <p>${producto.descripcion}</p>
        <span class="precio">$${producto.precio.toLocaleString("es-AR")}</span>
        <span class="${claseStock}">${stockTexto}</span>
      `;
      contenedor.appendChild(div);
    });
  }

  // -----------------------
  // 6. Controles de paginación
  // -----------------------
  function renderizarControlesPaginacion(total) {
    const totalPaginas = Math.ceil(total / productosPorPagina);
    paginacion.innerHTML = "";

    if (totalPaginas <= 1) return; // No mostrar paginación si hay una sola página

    for (let i = 1; i <= totalPaginas; i++) {
      const btn = document.createElement("button");
      btn.textContent = i;
      btn.classList.add("btn-pagina");
      if (i === paginaActual) btn.classList.add("activo");

      btn.addEventListener("click", () => {
        paginaActual = i;
        renderizarProductosPaginados();
      });

      paginacion.appendChild(btn);
    }
  }
});
