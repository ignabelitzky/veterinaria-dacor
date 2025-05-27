/*
  This file is part of the Dacor Vet Website.
  Copyright (C) 2025 Dacor Vet Web Team

  This program is free software: you can redistribute it and/or modify
  it under the terms of the GNU General Public License as published by
  the Free Software Foundation, either version 3 of the License, or
  (at your option) any later version.
*/

fetch("https://opensheet.elk.sh/1iYANfdzcN3VeahzJe-HtJNIkthPgfCPg4ZHVgD9t6a0/1")
  .then((response) => response.json())
  .then((data) => {
    const products = data.map((product) => ({
      ...product,
      stock: product.stock.toLowerCase() === "true",
      destacado: product.destacado.toLowerCase() === "true",
      imagenes: JSON.parse(product.imagenes),
      variantes: JSON.parse(product.variantes),
    }));
    showProductData(products.filter((product) => product.destacado && product.stock));
  })
  .catch((error) => {
    console.error("Error cargando productos destacados:", error);
    document.getElementById("featured-list").innerHTML = "<p>Error al cargar los productos destacados.</p>";
  });

function showProductData(products) {
  const featuredContainer = document.getElementById("featured-list");
  products.forEach((product) => {
    const lowPrice = Math.min(...product.variantes.map((v) => v.precio));
    const card = document.createElement("div");
    card.className = "featured-products__card";
    card.innerHTML = `
      <img src="img/productos/${
        product.imagenes[0]
      }" class="featured-products__card-image" alt="${product.nombre}">
      <div class="featured-products__card-info">
        <h3 class="featured-products__card-title">${product.nombre}</h3>
        <p class="featured-products__card-low-price">Desde $${lowPrice.toLocaleString(
          "es-AR"
        )}</p>
      </div>
    `;
    featuredContainer.appendChild(card);
  });
}
