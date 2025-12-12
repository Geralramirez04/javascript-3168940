import {comic} from './bd.js';

const params = new URLSearchParams(location.search);
const id = params.get('id');

const root = document.getElementById('capitulo-content');
if (!root) {
  console.warn('capitulo-content no encontrado en DOM');
}

if (!id) {
  location.href = 'index.html';
} else if (!root) {
  console.warn('Cancelando render: contenedor de capítulo ausente');
} else {
  const cap = comic.capitulos.find(c => String(c.id) === String(id));
  if (!cap) {
    root.innerHTML = '<p>Capítulo no encontrado.</p>';
  } else {

    root.innerHTML = `
      <section class="player">
        <div class="player__stage">
          <img class="stage-poster" src="${cap.portada}" alt="Portada ${cap.nombre}">
          <div class="play-overlay">
            <button class="play-button" aria-label="Reproducir capítulo"></button>
          </div>
        </div>
        <aside class="player__info">
          <h2>${cap.id}. ${cap.nombre}</h2>
          <div class="player__meta">${comic.genero} · ${comic.year} · Capítulo ${cap.id}</div>
          <div class="player__synopsis">${cap.descripcion}</div>
          <p style="margin-top:12px"><strong>Personajes:</strong> ${cap.personajes}</p>
          <div style="margin-top:16px">
            <button id="inlinePlay" class="btn btn--primary">Play</button>
          </div>
        </aside>
      </section>

      <section class="panel" style="max-width:1100px;margin:16px auto 60px;padding:0 18px">
        <h3>Video</h3>
        <div id="videoArea" class="player__stage" style="min-height:220px;">
          <!-- Aquí se inserta el elemento video cuando se reproduce -->
        </div>
      </section>

      <section class="panel" style="max-width:1100px;margin:16px auto 60px;padding:0 18px">
        <h3>Otros capítulos</h3>
        <div class="scroller" id="relatedCaps"></div>
      </section>
      
        <!-- Transcripción -->
        <section class="transcript" id="transcript">
          <h3>Transcripción</h3>
          <div id="transcriptContent">${cap.transcript ? cap.transcript : '<em>Transcripción no disponible para este capítulo.</em>'}</div>
        </section>

        <!-- Escenas relacionadas -->
        <section class="scenes" id="scenesSection">
          <h3>Escenas Relacionadas</h3>
          <div class="scenes-list" id="scenesList">
            ${cap.scenes ? cap.scenes.map(s => `<div class="scene-item"><h4>${s.title}</h4><p>${s.desc}</p></div>`).join('') : '<div class="scene-item">No hay escenas registradas.</div>'}
          </div>
        </section>

        <!-- Comentarios -->
        <section class="comments" id="commentsSection">
          <h3>Comentarios</h3>
          <form id="commentForm">
            <input type="text" id="commentAuthor" placeholder="Tu nombre" />
            <textarea id="commentText" placeholder="Escribe un comentario..."></textarea>
            <button type="submit" class="btn btn--primary">Enviar</button>
          </form>
          <div id="commentsList"></div>
        </section>
    `;

    // Handler para reproducir: inserta <video> en #videoArea y reproduce
    const insertAndPlay = () => {
      const videoArea = document.getElementById('videoArea');
      videoArea.innerHTML = '';
      const video = document.createElement('video');
      video.className = 'video-element';
      video.controls = true;
      video.src = cap.video || '';
      video.setAttribute('playsinline', '');
      video.autoplay = true;
      videoArea.appendChild(video);
      video.play().catch(()=>{});
    };

    // Botón play del hero y botón inline
    const heroPlay = document.querySelector('.play-button');
    const inlinePlay = document.getElementById('inlinePlay');
    heroPlay && heroPlay.addEventListener('click', insertAndPlay);
    inlinePlay && inlinePlay.addEventListener('click', insertAndPlay);

    // Related chapters
    const related = document.getElementById('relatedCaps');
    comic.capitulos.filter(c=>c.id !== cap.id).forEach(c=>{
      const a = document.createElement('article');
      a.className = 'card';
      a.innerHTML = `
        <a href="./Capitulo.html?id=${c.id}">
          <div class="card__thumb"><img src="${c.portada}" alt="${c.nombre}"></div>
          <div class="card__body"><h4 class="card__title">${c.id}. ${c.nombre}</h4></div>
        </a>
      `;
      related.appendChild(a);
    });

    // Comments: simple localStorage per chapter
    const commentsKey = `comments-cap-${cap.id}`;
    const commentsListEl = document.getElementById('commentsList');
    const commentForm = document.getElementById('commentForm');
    const loadComments = ()=>{
      const raw = localStorage.getItem(commentsKey);
      const arr = raw ? JSON.parse(raw) : [];
      commentsListEl.innerHTML = arr.map(c=>`<div class="comment"><strong>${c.author}</strong><p>${c.text}</p></div>`).join('') || '<p>No hay comentarios aún.</p>';
    };
    loadComments();

    commentForm.addEventListener('submit', (e)=>{
      e.preventDefault();
      const author = document.getElementById('commentAuthor').value || 'Anónimo';
      const text = document.getElementById('commentText').value || '';
      if(!text.trim()) return;
      const raw = localStorage.getItem(commentsKey);
      const arr = raw ? JSON.parse(raw) : [];
      arr.unshift({author, text, date: Date.now()});
      localStorage.setItem(commentsKey, JSON.stringify(arr));
      document.getElementById('commentText').value = '';
      document.getElementById('commentAuthor').value = '';
      loadComments();
    });

  }
}

const backBtn = document.getElementById('backBtn');
if (backBtn) backBtn.addEventListener('click', ()=>{ history.back(); });
