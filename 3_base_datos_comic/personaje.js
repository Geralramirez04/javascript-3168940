import {comic} from './bd.js';

const params = new URLSearchParams(location.search);
const id = params.get('id');
const root = document.getElementById('personaje-content');
if (!root) {
  console.warn('personaje-content no encontrado en DOM');
}

if (!id) {
  location.href = 'index.html';
} else if (!root) {
  // No hay contenedor donde renderizar
  console.warn('Cancelando render: contenedor de personaje ausente');
} else {
  const personaje = comic.Personajes.find(p => String(p.id) === String(id));
  if (!personaje) {
    root.innerHTML = '<p>Personaje no encontrado.</p>';
  } else {
    root.innerHTML = `
      <!-- Hero Section -->
      <section class="personaje-hero">
        <div class="personaje-visual">
          <img src="${personaje.imagen}" alt="${personaje.nombre}" class="personaje-img-full">
        </div>
        <div class="personaje-header-info">
          <div class="personaje-badge">${personaje.rol}</div>
          <h1 class="personaje-title">${personaje.nombre}</h1>
          <p class="personaje-desc">${personaje.descripcion}</p>
          <div class="personaje-stats">
            <div class="stat"><span class="stat-label">Apariciones:</span> ${personaje.capitulos.length} capítulos</div>
            <div class="stat"><span class="stat-label">Rol:</span> ${personaje.rol}</div>
          </div>
        </div>
      </section>

      <!-- About Section -->
      <section class="personaje-about">
        <h2>Características</h2>
        <p class="personaje-traits">${personaje.caracteristicas}</p>
      </section>

      <!-- Story Arc -->
      <section class="personaje-arc">
        <h2>Arco Narrativo</h2>
        <div class="arc-content">
          <p>${personaje.arco}</p>
        </div>
      </section>

      <!-- Appearances Section -->
      <section class="personaje-appearances">
        <h2>Apariciones en Capítulos</h2>
        <div class="capitulos-list">
          ${personaje.capitulos.map(capId => {
            const cap = comic.capitulos.find(c => c.id === capId);
            return cap ? `
              <div class="cap-item">
                <div class="cap-thumb">
                  <img src="${cap.portada}" alt="${cap.nombre}">
                </div>
                <div class="cap-info">
                  <h4>${cap.id}. ${cap.nombre}</h4>
                  <p>${cap.descripcion.substring(0, 80)}...</p>
                  <a href="./Capitulo.html?id=${cap.id}" class="btn-link">Ver capítulo →</a>
                </div>
              </div>
            ` : '';
          }).join('')}
        </div>
      </section>

      <!-- Related Characters -->
      <section class="personajes-gallery">
        <h2>Otros Personajes</h2>
        <div class="personajes-grid">
          ${comic.Personajes.filter(p => p.id !== personaje.id).map(p => `
            <article class="personaje-card" data-id="${p.id}" tabindex="0">
              <div class="personaje-image-wrap">
                <img src="${p.imagen}" alt="${p.nombre}" class="personaje-card-img">
                <div class="personaje-overlay">
                  <div class="overlay-content">
                    <h4>${p.nombre}</h4>
                    <span class="overlay-role">${p.rol}</span>
                    <p>${p.descripcion}</p>
                  </div>
                </div>
              </div>
            </article>
          `).join('')}
        </div>
      </section>
    `;
    document.querySelectorAll('.personaje-card').forEach(card => {
      card.addEventListener('click', ()=>{ location.href = `./Personaje.html?id=${card.dataset.id}`; });
      card.addEventListener('keydown', (e)=>{ if (e.key === 'Enter' || e.key === ' ') location.href = `./Personaje.html?id=${card.dataset.id}`; });
    });
  }
}

const backBtn = document.getElementById('backBtn');
if (backBtn) backBtn.addEventListener('click', ()=>{ history.back(); });
