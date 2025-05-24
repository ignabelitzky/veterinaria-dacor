fetch('/data/productos.json')
  .then(res => res.json())
  .then(data => mostrarDestacados(data.filter(p => p.destacado)));

function mostrarDestacados(productos) {
  const contenedor = document.getElementById('contenedor-destacados');
  contenedor.innerHTML = '';

  productos.forEach(producto => {
    const card = document.createElement('div');
    card.className = 'card-producto';

    const imagen = document.createElement('img');
    imagen.src = `img/productos/${producto.imagenes[0]}`;
    imagen.alt = producto.nombre;

    const nombre = document.createElement('h3');
    nombre.textContent = producto.nombre;

    const precio = document.createElement('p');
    const precios = producto.variantes.map(v => v.precio);
    const menorPrecio = Math.min(...precios);
    precio.className = 'precios';
    precio.innerHTML = `Desde <span class="precio-verde">$${menorPrecio}</span>`;

    card.appendChild(imagen);
    card.appendChild(nombre);
    card.appendChild(precio);

    contenedor.appendChild(card);
  });
}
