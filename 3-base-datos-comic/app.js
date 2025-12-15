  import { comic } from './bd.js';

    // NAV TOGGLE (accesible)
    (function(){
      const navToggle = document.getElementById('nav-toggle');
      const primaryNav = document.getElementById('primary-nav');
      if (navToggle && primaryNav) {
        navToggle.addEventListener('click', () => {
          const open = primaryNav.classList.toggle('open');
          navToggle.setAttribute('aria-expanded', String(open));
        });
        document.querySelectorAll('.nav__item').forEach(a=>{
          a.addEventListener('click', ()=> {
            if (primaryNav.classList.contains('open')) {
              primaryNav.classList.remove('open');
              navToggle.setAttribute('aria-expanded','false');
            }
          });
        });
      }
    })();

    // RENDER HERO
    const heroRoot = document.getElementById('hero-container');
    function renderHero(data){
      const bg = data.portadaComic || 'https://placehold.co/1200x500';
      heroRoot.innerHTML = `
        <div class="hero__bg" style="background-image:url('${bg}');"></div>
        <div class="hero-text animate-in">
          <h1>${data.nombreComic}</h1>
          <span class="age">16+</span>
          <p class="description">${data.sinopsis}</p>
          <div class="hero-buttons">
            <a class="btn play" href="#capitulos">▶ Ver capítulos</a>
            <button class="watchlist">+ Añadir</button>
          </div>
          <div class="hero-meta">
            <span class="tag">${data.genero}</span>
            <span class="tag">${data.year}</span>
            <p class="authors">Autores: ${Array.isArray(data.autores) ? data.autores.join(', ') : data.autores}</p>
          </div>
        </div>
      `;
      // actualizar footer
      document.getElementById('comic-title').textContent = data.nombreComic;
      document.getElementById('comic-year').textContent = data.year || '';
      document.getElementById('comic-authors').textContent = 'Autores: ' + (Array.isArray(data.autores) ? data.autores.join(', ') : data.autores);
    }

    // RENDER PERSONAJES
    const charsRoot = document.getElementById('scroller-personajes');
    function renderPersonajes(list){
      charsRoot.innerHTML = '';
      list.forEach(p => {
        const a = document.createElement('a');
        a.className = 'character-card';
        a.href = `./Personaje.html?id=${p.id}`;
        a.setAttribute('role','listitem');
        const img = p.imagen || 'https://placehold.co/200x260';
        a.innerHTML = `
          <img src="${img}" alt="${p.nombre}">
          <h3>${p.nombre}</h3>
          <p>${p.descripcion}</p>
        `;
        charsRoot.appendChild(a);
      });
    }

    // RENDER CAPÍTULOS
    const capsRoot = document.getElementById('scroller-capitulos');
    function renderCapitulos(list){
      capsRoot.innerHTML = '';
      list.forEach(c => {
        const a = document.createElement('a');
        a.className = 'card cap-item';
        a.href = `./Capitulo.html?id=${c.id}`;
        a.setAttribute('role','listitem');
        const portada = c.portada ? c.portada : 'https://placehold.co/350x200';
        a.innerHTML = `
          <div class="card__thumb"><img src="${portada}" alt="${c.nombre}"></div>
          <div class="card__body">
            <h3 class="card__title">${c.id}. ${c.nombre}</h3>
            <p class="card__text">${c.descripcion}</p>
          </div>
        `;
        capsRoot.appendChild(a);
      });
    }

    // Inicializar desde bd.js
    renderHero(comic);
    renderPersonajes(comic.Personajes || []);
    renderCapitulos(comic.capitulos || []);


  (function(){
    const navToggle = document.getElementById('nav-toggle');
    const primaryNav = document.getElementById('primary-nav');
    if (!navToggle || !primaryNav) return;
    navToggle.addEventListener('click', () => {
      const open = primaryNav.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(open));
    });

    // Cerrar menú al hacer click en un item (mobile)
    document.querySelectorAll('.nav__item').forEach(a => {
      a.addEventListener('click', () => {
        if (primaryNav.classList.contains('open')) {
          primaryNav.classList.remove('open');
          navToggle.setAttribute('aria-expanded', 'false');
        }
      });
    });
  })();