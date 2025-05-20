document.addEventListener("DOMContentLoaded", () => {
    const contenedor = document.getElementById("contenedor-catalogo");
    const buscador = document.getElementById("buscador");

    let productos = [];

    fetch("data/productos.json")
        .then(response => response.json())
        .then(data => {
            productos = data;
            mostrarProductos(productos);
        });
    
    buscador.addEventListener("input", () => {
        const texto = buscador.value.toLowerCase();
        const filtrados = productos.filter(producto =>
            producto.nombre.toLowerCase().includes(texto) ||
            producto.descripcion.toLowerCase().includes(texto)
        );
        mostrarProductos(filtrados);
    });

    function mostrarProductos(lista) {
        contenedor.innerHTML = "";
        if (lista.length === 0) {
            contenedor.innerHTML = "<p>No se encontraron productos.</p>";
            return;
        }

        lista.forEach(producto => {
            const div = document.createElement("div");
            div.className = "producto";
            div.innerHTML = `
                <img src="img/productos/${producto.imagen}" alt="${producto.nombre}">
                <h2>${producto.nombre}</h2>
                <p>${producto.descripcion}</p>
                <span class="precio">$${producto.precio.toLocaleString()}</span>
            `;
            contenedor.appendChild(div);
        });
    }
});