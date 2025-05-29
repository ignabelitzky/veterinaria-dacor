/*
  This file is part of the Dacor Vet Website.
  Copyright (C) 2025 Dacor Vet Web Team

  This program is free software: you can redistribute it and/or modify
  it under the terms of the GNU General Public License as published by
  the Free Software Foundation, either version 3 of the License, or
  (at your option) any later version.
*/


const toggleButton = document.getElementById('menu-toggle');
const pagesMenu = document.querySelector('.pages');

if (toggleButton && pagesMenu) {
  // When the toggle button is clicked, toggle the 'active' class on the menu
  toggleButton.addEventListener('click', () => {
    pagesMenu.classList.toggle('active');
  });
}
