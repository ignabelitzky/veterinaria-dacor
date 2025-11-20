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
          const destacadoRaw = product.destacado ?? "";
          const destacado = destacadoRaw.toString().toLowerCase() === "true";

          const imagenes = safeJsonArray(product.imagenes);
          const variantes = safeJsonArray(product.variantes);

          return {
            ...product,
            destacado,
            imagenes,
            variantes
          };
        } catch (error) {
          console.warn("Error processing product:", product, error);
          return null;
        }
      })
      .filter((p) => p && p.destacado);

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
 * Safely parse a JSON array, returns [] if invalid.
 */
function safeJsonArray(value) {
  if (!value) return [];

  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

/**
 * Dynamically adds product cards to the featured products section.
 */
function showProductData(products) {
  const featuredContainer = document.getElementById("featured-list");
  if (!featuredContainer) return;

  products.forEach((product) => {
    // Extract price list safely
    const prices = product.variantes
      .map((v) => Number(v.precio))
      .filter((n) => !isNaN(n) && n > 0);

    // If no valid price is found, skip product entirely
    if (prices.length === 0) return;

    const lowPrice = Math.min(...prices);

    // Choose main image or fallback
    const mainImage = product.imagenes[0] ?? "default.png";

    const imagePath = mainImage.startsWith("http")
      ? mainImage
      : `img/productos/${mainImage}`;

    const card = document.createElement("div");
    card.className = "featured-products__card";

    card.innerHTML = `
      <img src="${imagePath}"
           class="featured-products__card-image"
           alt="${product.nombre || "Producto"}">

      <div class="featured-products__card-info">
        <h3 class="featured-products__card-title">${product.nombre || "Producto sin nombre"}</h3>
        <p class="featured-products__card-low-price">Desde $${lowPrice.toLocaleString("es-AR")}</p>
      </div>
    `;

    featuredContainer.appendChild(card);
  });
}
