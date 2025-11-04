// filepath: /galeria-escenarios/galeria-escenarios/src/app.js
import { crearThumbnail } from './components/thumbnail.js';
import { crearSlide } from './components/slide.js';
import escenas from './data/scenes.json';

document.addEventListener('DOMContentLoaded', () => {
  const galeria = document.querySelector('.gallery');
  const miniaturasContainer = document.querySelector('.miniaturas');

  escenas.forEach((escena, index) => {
    const slide = crearSlide(escena);
    galeria.appendChild(slide);

    const thumbnail = crearThumbnail(escena, index);
    miniaturasContainer.appendChild(thumbnail);
  });

  // Lógica para la navegación entre slides y miniaturas
  const miniaturas = Array.from(miniaturasContainer.children);
  miniaturas.forEach((miniatura, index) => {
    miniatura.addEventListener('click', () => {
      mostrarSlide(index);
    });
  });

  function mostrarSlide(index) {
    const slides = Array.from(galeria.children);
    slides.forEach((slide, i) => {
      slide.classList.toggle('activo', i === index);
      slide.setAttribute('aria-hidden', i !== index);
    });
  }
});