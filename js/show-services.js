/*
  This file is part of the Dacor Vet Website.
  Copyright (C) 2025 Dacor Vet Web Team

  This program is free software: you can redistribute it and/or modify
  it under the terms of the GNU General Public License as published by
  the Free Software Foundation, either version 3 of the License, or
  (at your option) any later version.
*/

document.addEventListener("DOMContentLoaded", () => {
  fetch("data/list-services.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(showServices)
    .catch((error) => {
      console.error("Error al cargar los servicios:", error);
      const container = document.getElementById("services-content__cards");
      container.innerHTML = `<p class="services-content__error">No se pudieron cargar los servicios.</p>`;
    });
});

function createServiceCard(service) {
  const card = document.createElement("article");
  card.classList.add("services-content__card");
  card.innerHTML = `
    <img class="services-content__card-image" src="${service.imagen}" alt="${service.nombre}">
    <h3 class="services-content__card-title">${service.nombre}</h3>
    <p class="services-content__card-description">${service.descripcion}</p>
  `;
  return card;
}

function showServices(services) {
  const container = document.getElementById("services-content__cards");
  services.forEach((service) => {
    const card = createServiceCard(service);
    container.appendChild(card);
  });
}

