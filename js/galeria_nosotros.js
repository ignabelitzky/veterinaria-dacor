const images = [
  { src: 'img/galeria_nosotros/local1.png', title: "Dacor Veterinaria" },
  { src: 'img/galeria_nosotros/personal1.png', title: "Medica Veterinaria" },
  { src: 'img/galeria_nosotros/mascotas1.png', title: "Nuestras Mascotas" }
];

let currentIndex = 0;

const imageElement = document.getElementById("imagen-galeria");
const titleElement = document.getElementById("titulo-galeria");

function updateGallery(){
  imageElement.src = images[currentIndex].src;
  titleElement.textContent = images[currentIndex].title;
}

document.querySelector(".prev").addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  updateGallery();
});

document.querySelector(".next").addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % images.length;
  updateGallery();
});

// Inicializar la galería
updateGallery();