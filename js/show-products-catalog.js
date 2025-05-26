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
  const categorySelector = document.getElementById("catalog-content__categorySelector");
  const subcategorySelector = document.getElementById("catalog-content__subcategorySelector");
  const checkboxStock = document.getElementById("catalog-content__checkboxStock");
  const sortSelector = document.getElementById("catalog-content__sortSelector");
  const pages = document.getElementById("catalog-content__pages");

  const maxCards = 24;
  let products = [];
  let filteredProducts = [];
  let currentPage = 1;
  let subcategoriesByCategory = {};

  // Convierte texto a slug para comparación
  function toSlug(text) {
    return text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\s+/g, "_")
      .replace(/\//g, "_")
      .replace(/[^a-z0-9_]/g, "");
  }

  // Convierte slug en texto legible
  function prettifySlug(slug) {
    return slug
      .replace(/[_-]/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
  }

  function buildSubcategoryMap(products) {
    const map = {};
    products.forEach((p) => {
      if (!p.categoria || !p.subcategoria) return;
      const cat = p.categoria;
      const sub = p.subcategoria;
      if (!map[cat]) map[cat] = new Set();
      map[cat].add(sub);
    });
    for (const cat in map) {
      map[cat] = Array.from(map[cat]);
    }
    return map;
  }

  function updateSubcategoryDropdown(category) {
    subcategorySelector.innerHTML = "";

    const defaultOption = document.createElement("option");
    defaultOption.value = "todas";
    defaultOption.textContent = "Todas las subcategorías";
    subcategorySelector.appendChild(defaultOption);

    if (category === "todas" || !subcategoriesByCategory[category]) return;

    subcategoriesByCategory[category].forEach((sub) => {
      const option = document.createElement("option");
      option.value = toSlug(sub);
      option.textContent = prettifySlug(sub);
      subcategorySelector.appendChild(option);
    });
  }

  function applyFilters() {
    const searchQuery = searchBox.value.toLowerCase();
    const selectedCategory = categorySelector.value;
    const selectedSubcategory = subcategorySelector.value;

    filteredProducts = products.filter((product) => {
      const matchesSearchText =
        product.nombre.toLowerCase().includes(searchQuery) ||
        product.descripcion.toLowerCase().includes(searchQuery);

      const matchesCategory =
        selectedCategory === "todas" || product.categoria === selectedCategory;

      const matchesSubcategory =
        selectedSubcategory === "todas" ||
        toSlug(product.subcategoria) === selectedSubcategory;

      const hasStock = checkboxStock.checked || product.stock;

      return matchesSearchText && matchesCategory && matchesSubcategory && hasStock;
    });

    sortProducts();
    currentPage = 1;
    renderCurrentPageProducts();
  }

  function sortProducts() {
    const sortOption = sortSelector.value;
    filteredProducts.sort((a, b) => {
      if (sortOption === "az") return a.nombre.localeCompare(b.nombre);
      if (sortOption === "za") return b.nombre.localeCompare(a.nombre);
      if (sortOption === "category") return a.categoria.localeCompare(b.categoria);
      return 0;
    });
  }

  function renderCurrentPageProducts() {
    const total = filteredProducts.length;
    const startIndex = (currentPage - 1) * maxCards;
    const endIndex = startIndex + maxCards;
    const productsOnPage = filteredProducts.slice(startIndex, endIndex);

    showProducts(productsOnPage);
    renderPaginationControls(total);
  }

  function renderPaginationControls(totalProducts) {
    const totalPages = Math.ceil(totalProducts / maxCards);
    pages.innerHTML = "";

    if (totalPages <= 1) return;

    for (let i = 1; i <= totalPages; i++) {
      const button = document.createElement("button");
      button.textContent = i;
      button.classList.add("catalog-content__pages-btn");
      if (i === currentPage) button.classList.add("catalog-content__pages-btn--active");

      button.addEventListener("click", () => {
        currentPage = i;
        renderCurrentPageProducts();
      });

      pages.appendChild(button);
    }
  }

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
          <img src="img/productos/${product.imagenes[0]}" class="catalog-content__card-main-image" alt="${product.nombre}">
          <div class="catalog-content__card-thumbnails">
            ${product.imagenes.map(img => `
              <img src="img/productos/${img}" class="catalog-content__card-thumbnail" alt="${product.nombre}">
            `).join("")}
          </div>
        </div>
        <h2 class="catalog-content__card-title">${product.nombre}</h2>
        <p class="catalog-content__card-description">${product.descripcion}</p>
        <div class="catalog-content__card-price">
          ${product.variantes.map(v => `
            <p>${v.tamaño}: <span class="catalog-content__card-price--purple">$${v.precio.toLocaleString("es-AR")}</span></p>
          `).join("")}
        </div>
      `;

      card.querySelectorAll(".catalog-content__card-thumbnail").forEach((thumb) => {
        thumb.addEventListener("click", (e) => {
          const gallery = e.target.closest(".catalog-content__card-image");
          gallery.querySelector(".catalog-content__card-main-image").src = e.target.src;
        });
      });

      productCards.appendChild(card);
    });
  }

  // Cargar productos
  fetch("data/list-products.json")
    .then((res) => res.json())
    .then((data) => {
      products = data;
      subcategoriesByCategory = buildSubcategoryMap(products);
      updateSubcategoryDropdown(categorySelector.value);
      applyFilters();
    })
    .catch((err) => {
      console.error("Error cargando productos:", err);
      productCards.innerHTML = "<p>Error al cargar el catálogo.</p>";
    });

  // Eventos
  searchBox.addEventListener("input", applyFilters);
  categorySelector.addEventListener("change", (e) => {
    updateSubcategoryDropdown(e.target.value);
    applyFilters();
  });
  subcategorySelector.addEventListener("change", applyFilters);
  checkboxStock.addEventListener("change", applyFilters);
  sortSelector.addEventListener("change", applyFilters);
});
