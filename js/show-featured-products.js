/*
  This file is part of the Dacor Vet Website.
  Copyright (C) 2025 Dacor Vet Web Team

  This program is free software: you can redistribute it and/or modify
  it under the terms of the GNU General Public License as published by
  the Free Software Foundation, either version 3 of the License, or
  (at your option) any later version.
*/

// Fetch product data from a Google Sheet using the OpenSheet API
fetch("https://opensheet.elk.sh/1iYANfdzcN3VeahzJe-HtJNIkthPgfCPg4ZHVgD9t6a0/1")
  .then((response) => response.json())
  .then((data) => {
    const products = data
      .map((product) => {
        try {
          // Normalize and convert product properties to usable JS types
          return {
            ...product,
            stock: product.stock.toLowerCase() === "true",
            destacado: product.destacado.toLowerCase() === "true",
            imagenes: JSON.parse(product.imagenes),   // Parse stringified array
            variantes: JSON.parse(product.variantes), // Parse stringified array
          };
        } catch (error) {
          console.warn("Error parsing JSON fields for product:", product, error);
          return null;
        }
      })
      .filter((p) => p && p.destacado && p.stock);  // Keep only featured products in stock

    showProductData(products);
  })
  .catch((error) => {
    console.error("Error loading featured products:", error);
    const container = document.getElementById("featured-list");
    if (container) {
      container.innerHTML = "<p>Error loading featured products.</p>";
    }
  });

/**
 * Dynamically adds product cards to the featured products section.
 * @param {Array} products - Array of featured, in-stock product objects
 */
function showProductData(products) {
  const featuredContainer = document.getElementById("featured-list");
  if (!featuredContainer) return;

  products.forEach((product) => {
    const lowPrice = Math.min(...product.variantes.map((v) => v.precio));
    const imagePath = product.imagenes[0].startsWith("http")
      ? product.imagenes[0]
      : `img/productos/${product.imagenes[0]}`;

    const card = document.createElement("div");
    card.className = "featured-products__card";

    card.innerHTML = `
      <img src="${imagePath}" class="featured-products__card-image" alt="${product.nombre}">
      <div class="featured-products__card-info">
        <h3 class="featured-products__card-title">${product.nombre}</h3>
        <p class="featured-products__card-low-price">Desde $${lowPrice.toLocaleString("es-AR")}</p>
      </div>
    `;
    featuredContainer.appendChild(card);
  });
}
