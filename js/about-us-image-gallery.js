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
