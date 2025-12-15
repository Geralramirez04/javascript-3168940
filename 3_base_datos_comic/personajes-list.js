import {comic} from './bd.js';

const grid = document.getElementById('personajesGrid');
if (!grid) {
  console.warn('personajesGrid no encontrado en DOM');
} else {
  grid.innerHTML = '';

  (Array.isArray(comic.Personajes) ? comic.Personajes : []).forEach(p => {
  const card = document.createElement('article');
  card.className = 'personaje-card';
  card.innerHTML = `
    <a href="./Personaje.html?id=${p.id}">
      <div class="personaje-image-wrap">
        <img src="${p.imagen}" alt="${p.nombre}" class="personaje-card-img">
        <div class="personaje-overlay">
          <div class="overlay-content">
            <h4>${p.nombre}</h4>
            <span class="overlay-role">${p.rol || ''}</span>
            <p>${p.descripcion}</p>
          </div>
        </div>
      </div>
    </a>
  `;
  grid.appendChild(card);
  });
}
