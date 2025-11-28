import {comic} from "./bd.js"

const heroContainer = document.querySelector("#hero-container");

heroContainer.innerHTML = `
    <div class="hero__bg" style="background-image: url('${comic.portadaComic}');"></div>
    <div class="hero__overlay"></div>

    <div class="hero__content">
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

         <span class="age">16+</span>

        <div class="hero__actions">
            <button class="btn btn--primary">Reproducir</button>
        </div>

        <div <p class="autores:" id="comic-authors">Autores:Geraldine Ramirez, Juan jose quintero, Caleb Olaya</p>
       
        </div>

        <div class="rating">★★★★★ <span>votes</span></div>
    </div>

        <div class="hero__meta-low">
         <div <p class="autores:" id="comic-authors">Autores:Geraldine Ramirez, Juan jose quintero, Caleb Olaya</p>${comic.autores.join(', ')}
        </div>
    
`;


const scrollerPersonajes = document.querySelector("#scroller-personajes"); 
scrollerPersonajes.innerHTML = '';

comic.Personajes.forEach(char => {
    const card = document.createElement("article");
    card.classList.add("card");

    card.innerHTML = ` <a href="./Personaje.html?id=${char.id}">
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


const scrollerCapitulos = document.querySelector("#scroller-capitulos");
scrollerCapitulos.innerHTML = ''; 

comic.capitulos.forEach(capitulo => {
    const card = document.createElement("article");
    card.classList.add("card");

    card.innerHTML = ` <a href="./Capitulo.html?id=${char.id}">
        <div class="card__thumb" style="background-image: url('${capitulo.portada}');"></div>
        <div class="card__body">
            <h3 class="card__title">${capitulo.id}. ${capitulo.nombre}</h3>
            <p class="card__text">${capitulo.descripcion}</p>
            <button class="mini">Ver capítulo</button>
        </div>
        </a>
    `;

    scrollerCapitulos.appendChild(card);
});