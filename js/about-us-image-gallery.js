/*
  This file is part of the Dacor Vet Website.
  Copyright (C) 2025 Dacor Vet Web Team

  This program is free software: you can redistribute it and/or modify
  it under the terms of the GNU General Public License as published by
  the Free Software Foundation, either version 3 of the License, or
  (at your option) any later version.
*/

const images = [
  { src: 'img/about-us-images/mascotas1.webp', title: "Nuestras Mascotas" },
  { src: 'img/about-us-images/mascotas1.webp', title: "Nuestras Mascotas 2" }
];

let currentIndex = 0;
const imageElement = document.getElementById("about-us__image");
const titleElement = document.getElementById("about-us__image-title");

function updateGallery() {
  imageElement.classList.add("fade-out");
  titleElement.classList.add("fade-out");

  setTimeout(() => {
    imageElement.src = images[currentIndex].src;
    titleElement.textContent = images[currentIndex].title;
    imageElement.classList.remove("fade-out");
    titleElement.classList.remove("fade-out");
  }, 300);
}

document.querySelector(".prev").addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  updateGallery();
});

document.querySelector(".next").addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % images.length;
  updateGallery();
});

// Avance automático cada 5 segundos
setInterval(() => {
  currentIndex = (currentIndex + 1) % images.length;
  updateGallery();
}, 5000);

// Inicializar
updateGallery();
