/*
  This file is part of the Dacor Vet Website.
  Copyright (C) 2025 Dacor Vet Web Team

  This program is free software: you can redistribute it and/or modify
  it under the terms of the GNU General Public License as published by
  the Free Software Foundation, either version 3 of the License, or
  (at your option) any later version.
*/

fetch('/data/list-products.json')
  .then(response => response.json())
  .then(data => showProductData(data.filter(product => product.destacado)));

function showProductData(products) {
  const container = document.getElementById('featured-products__container');
  container.innerHTML = '';

  products.forEach(product => {
    const productCard = document.createElement('div');
    productCard.className = 'featured-products__card';

    const image = document.createElement('img');
    image.className = 'featured-products__cardImage';
    image.src = `img/productos/${product.imagenes[0]}`;
    image.alt = product.nombre;

    const productTitle = document.createElement('h3');
    productTitle.className = 'featured-products__cardName';
    productTitle.textContent = product.nombre;

    const price = document.createElement('p');
    const prices = product.variantes.map(v => v.precio);
    const lowPrice = Math.min(...prices);
    price.className = 'featured-products__price';
    price.innerHTML = `Desde <span class="precio-verde">$${lowPrice}</span>`;

    productCard.appendChild(image);
    productCard.appendChild(productTitle);
    productCard.appendChild(price);

    container.appendChild(productCard);
  });
}
