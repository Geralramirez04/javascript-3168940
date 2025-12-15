import {comic} from "./bd.js"

const heroContainer = document.querySelector("#hero-container");

// Carrusel
let carouselIndex = 0;
function renderHero() {
  if (!heroContainer || !comic.carousel || comic.carousel.length === 0) return;
  const img = comic.carousel[carouselIndex % comic.carousel.length];
  heroContainer.innerHTML = `
    <div class="hero__bg" style="background-image: url('${img}');"></div>
    <div class="hero__overlay"></div>

    <div class="hero__content animate-in">
        <div class="hero__meta">
            <span class="tag">${comic.genero}</span>
            <span class="dot">•</span>
            <span class="tag">${comic.year}</span>
            <span class="dot">•</span>
            <span class="tag">${comic.numeroEpisodeos} capítulos</span>
        </div>

        <h1 id="titulo-comic" class="hero__title">${comic.nombreComic}</h1>

        <p class="hero__desc">
            ${comic.sinopsis}
        </p>

        <div class="autores" id="comic-authors">Autores: ${Array.isArray(comic.autores) ? comic.autores.join(', ') : comic.autores}</div>

        <div class="rating">★★★★★ <span>votes</span></div>
    </div>
  `;
}

renderHero();
setInterval(()=>{ carouselIndex++; renderHero(); }, 4000);

// personajes 
const scrollerPersonajes = document.querySelector("#scroller-personajes"); 
if (scrollerPersonajes && Array.isArray(comic.Personajes)){
  scrollerPersonajes.innerHTML = '';
  comic.Personajes.forEach(char => {
      const card = document.createElement("article");
      card.classList.add("card","animate-in-up");

      card.innerHTML = `
        <a href="./Personaje.html?id=${char.id}">
          <div class="card__thumb">
              <img src="${char.imagen}" alt="Imagen de ${char.nombre}" class="personaje-img">
          </div>
          <div class="card__body">
              <h3 class="card__title">${char.nombre}</h3>
              <p class="card__text">${char.descripcion}</p>
          </div>
        </a>
      `;

      scrollerPersonajes.appendChild(card);
  });
}


//capítulos 
const scrollerCapitulos = document.querySelector("#scroller-capitulos");
if (scrollerCapitulos && Array.isArray(comic.capitulos)){
  scrollerCapitulos.innerHTML = ''; 
  comic.capitulos.forEach(capitulo => {
      const card = document.createElement("article");
      card.classList.add("card","animate-in-up");

      card.innerHTML = `
      <a href="./Capitulo.html?id=${capitulo.id}">
        <div class="card__thumb" style="background-image: url('${capitulo.portada}'); background-size:cover; background-position:center"></div>
        <div class="card__body">
            <h3 class="card__title">${capitulo.id}. ${capitulo.nombre}</h3>
            <p class="card__text">${capitulo.descripcion}</p>
            <button class="mini">Ver capítulo</button>
        </div>
      </a>
    `;

      scrollerCapitulos.appendChild(card);
  });
}

