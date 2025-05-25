/*
  This file is part of the Dacor Vet Website.
  Copyright (C) 2025 Dacor Vet Web Team

  This program is free software: you can redistribute it and/or modify
  it under the terms of the GNU General Public License as published by
  the Free Software Foundation, either version 3 of the License, or
  (at your option) any later version.
*/

document.addEventListener("DOMContentLoaded", () => {
  const productCards = document.getElementById("catalog-content__cards");
  const searchBox = document.getElementById("catalog-content__searchBox");
  const categorySelector = document.getElementById(
    "catalog-content__categorySelector"
  );
  const checkboxStock = document.getElementById(
    "catalog-content__checkboxStock"
  );
  const sortSelector = document.getElementById("catalog-content__sortSelector");
  const pages = document.getElementById("catalog-content__pages");
  const maxCards = 28;

  let products = [];
  let filteredProducts = [];
  let currentPage = 1;

  // -----------------------
  // 1. Load JSON data
  // -----------------------
  fetch("data/list-products.json")
    .then((response) => response.json())
    .then((data) => {
      products = data;
      applyFilters();
    })
    .catch((error) => {
      console.error("Error cargando productos:", error);
      productCards.innerHTML = "<p>Error al cargar el catálogo.</p>";
    });

  // -----------------------
  // 2. Filter events
  // -----------------------
  searchBox.addEventListener("input", applyFilters);
  categorySelector.addEventListener("change", applyFilters);
  checkboxStock.addEventListener("change", applyFilters);
  sortSelector.addEventListener("change", applyFilters);

  // -----------------------
  // 3. Function to apply filters
  // -----------------------
  function applyFilters() {
    const searchQuery = searchBox.value.toLowerCase();
    const selectedCategory = categorySelector.value;

    filteredProducts = products.filter((product) => {
      const matchesSearchText =
        product.nombre.toLowerCase().includes(searchQuery) ||
        product.descripcion.toLowerCase().includes(searchQuery);

      const matchesCategory =
        selectedCategory === "todas" || product.categoria === selectedCategory;

      const hasStock = checkboxStock.checked || product.stock;

      return matchesSearchText && matchesCategory && hasStock;
    });

    sortProducts();
    currentPage = 1;
    renderCurrentPageProducts();
  }

  // Ordenar según opción seleccionada
  function sortProducts() {
    const sortOption = sortSelector.value;

    filteredProducts.sort((a, b) => {
      if (sortOption === "az") {
        return a.nombre.localeCompare(b.nombre);
      } else if (sortOption === "za") {
        return b.nombre.localeCompare(a.nombre);
      } else if (sortOption === "category") {
        return a.categoria.localeCompare(b.categoria);
      }
      return 0; // "default"
    });
  }

  // -----------------------
  // 4. Render products of the current page
  // -----------------------
  function renderCurrentPageProducts() {
    const total = filteredProducts.length;
    const startIndex = (currentPage - 1) * maxCards;
    const endIndex = startIndex + maxCards;
    const productsOnPage = filteredProducts.slice(startIndex, endIndex);

    showProducts(productsOnPage);
    renderPaginationControls(total);
  }

  // -----------------------
  // 5. Show products card
  // -----------------------
  function showProducts(products) {
    productCards.innerHTML = "";

    if (products.length === 0) {
      productCards.textContent = "No se encontraron productos.";
      return;
    }

    products.forEach((product) => {
      const card = document.createElement("article");
      card.className = "catalog-content__card";

      const stockText = product.stock ? "Disponible" : "Agotado";
      const typeStock = product.stock ? "stock-available" : "stock-unavailable";

      card.innerHTML = `
        <p class="catalog-content__card-${typeStock}">${stockText}</p>
        <div class="catalog-content__card-image">
          <img src="img/productos/${
            product.imagenes[0]
          }" class="catalog-content__card-main-image" alt="${product.nombre}">
          <div class="catalog-content__card-thumbnails">
            ${product.imagenes
              .map(
                (img) => `
              <img src="img/productos/${img}" class="catalog-content__card-thumbnail" alt="${product.nombre}">`
              )
              .join("")}
              </div>
              </div>
              <h2 class="catalog-content__card-title">${product.nombre}</h2>
              <p class="catalog-content__card-description">${
                product.descripcion
              }</p>
              <div class="catalog-content__card-price">
                ${product.variantes
                  .map(
                    (v) => `
                  <p>${v.tamaño}: <span class="catalog-content__card-price--green">$${v.precio}</span></p>`
                  )
                  .join("")}</div>
                  `;

      productCards.appendChild(card);

      // Add event listeners to thumbnail images
      card
        .querySelectorAll(".catalog-content__card-thumbnail")
        .forEach((thumbnail) => {
          thumbnail.addEventListener("click", (e) => {
            const gallery = e.target.closest(".catalog-content__card-image");
            gallery.querySelector(".catalog-content__card-main-image").src =
              e.target.src;
          });
        });
    });
  }

  // -----------------------
  // 6. Pagination controls
  // -----------------------
  function renderPaginationControls(totalProducts) {
    const totalPages = Math.ceil(totalProducts / maxCards);
    pages.innerHTML = "";

    if (totalPages <= 1) return;

    for (let pageNumber = 1; pageNumber <= totalPages; pageNumber++) {
      const button = document.createElement("button");
      button.textContent = pageNumber;

      // Always add base class
      button.classList.add("catalog-content__pages-btn");

      // Add modifier class if this is the current page
      if (pageNumber === currentPage) {
        button.classList.add("catalog-content__pages-btn--active");
      }

      button.addEventListener("click", () => {
        currentPage = pageNumber;
        renderCurrentPageProducts();
      });

      pages.appendChild(button);
    }
  }
});
