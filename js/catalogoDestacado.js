document.addEventListener("DOMContentLoaded", () => {
    fetch('data/productos.json')
        .then(response => response.json())
        .then(productos => {
            const contenedor = document.getElementById('contenedor-destacados');
            const destacados = productos.filter(producto => producto.destacado);
            destacados.forEach(producto => {
                const card = document.createElement('div');
                card.classList.add('product');

                card.innerHTML = `
                    <img src="img/productos/${producto.imagen}" alt="${producto.nombre}" />
                    <h3>${producto.nombre}</h3>
                    <p>$${producto.precio.toLocaleString('es-AR')}</p>
                `;

                contenedor.appendChild(card);
            });
        })
        .catch(error => {
            console.error('Error cargando el catálogo:', error);
        });
});