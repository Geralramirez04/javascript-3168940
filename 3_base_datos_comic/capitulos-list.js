import {comic} from './bd.js';

const grid = document.getElementById('capitulosGrid');
if (!grid) {
  console.warn('capitulosGrid no encontrado en DOM');
} else {
  grid.innerHTML = '';
  (Array.isArray(comic.capitulos) ? comic.capitulos : []).forEach(cap => {
  const card = document.createElement('article');
    card.className = 'capitulo-card';
  card.innerHTML = `
    <a href="./Capitulo.html?id=${cap.id}">
      <div class="capitulo-thumb"><img src="${cap.portada}" alt="${cap.nombre}"></div>
      <div class="capitulo-body">
        <h3 class="capitulo-title">${cap.id}. ${cap.nombre}</h3>
        <p class="capitulo-desc">${cap.descripcion}</p>
        <div class="capitulo-meta">${cap.personajes}</div>
        ${cap.video ? `<div style="margin-top:8px"><a href="./Capitulo.html?id=${cap.id}#videoArea" class="btn-link" style="font-size:0.85rem">▶ Ver video</a></div>` : ''}
      </div>
    </a>
  `;
  grid.appendChild(card);
  });
}
