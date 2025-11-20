const hero = document.querySelector(".hero");

if (!hero) {
  console.error("No se encontró el elemento .hero en el DOM");
} else {
  hero.innerHTML = `
    <section class="hero__section" aria-labelledby="titulo-comic">
      <div class="hero__bg" style="background-image: url('portada_principal.jpg');"></div>
      <div class="hero__overlay"></div>

      <div class="hero__content">
        <div class="hero__meta">
          <span class="tag">Drama musical</span>
          <span class="dot">•</span>
          <span class="tag">2025</span>
          <span class="dot">•</span>
          <span class="tag">3 capítulos</span>
        </div>

        <h1 id="titulo-comic" class="hero__title">La Princesa Ronca de Oro</h1>

        <p class="hero__desc">
          Helena, una princesa nacida bajo una tormenta, desafía las normas de su reino para seguir su verdadera pasión: el canto.
          A través de su voz enfrenta prejuicios, amores y traiciones; su legado trascenderá el tiempo como símbolo de libertad y
          empoderamiento femenino.
        </p>

        <div class="hero__actions">
          <button class="btn btn--primary">Reproducir</button>
        </div>

        <div class="hero__meta-low">
          <span><strong>Autores:</strong> Juan, Caleb y Geraldine</span>
        </div>
      </div>
    </section>`;
}

const infoComic = document.querySelector(".info-Comic")

console.log(infoComic)

infoComic.innerHTML = `
<small>${comic.year}</small>
    <h1>${comic.nombreComic}</h1>
    <p>${comic.sinopsis}</p>
    <p>${comic.genero}</p>
    `
const personajes = document.querySelector(".card")

console.log(persoanjes)

personajes.innerHTML = 
`
    <section id="personajes" class="personajes" aria-labelledby="personajes-title">
  <h2 id="personajes-title">Personajes</h2>

  <div class="personajes-grid">

    <article class="personaje" data-character="helena">
      <picture>
        <img src="image/helena.png" width="200" height="200" alt="Helena" loading="lazy">
      </picture>
      <div class="personaje-info">
        <h3>Helena</h3>
        <p class="mini-desc">La protagonista: voz que inspira libertad.</p>
        <div class="actions">
          <button class="btn naranja" data-character="helena">Ver ficha</button>
        </div>
      </div>
    </article>

    <article class="personaje" data-character="mentor">
      <picture>
        <img src="image/conde.png" alt="Conde Melódico" loading="lazy">
      </picture>
      <div class="personaje-info">
        <h3>Conde Melódico</h3>
        <p class="mini-desc">Mentor y guardián del legado.</p>
        <div class="actions">
          <button class="btn naranja" data-character="mentor">Ver ficha</button>
        </div>
      </div>
    </article>

    <article class="personaje" data-character="antagonista">
      <picture>
        <img src="image/trovador (2).png" alt="Joven trovador" loading="lazy">
      </picture>
      <div class="personaje-info">
        <h3>Joven Trovador</h3>
        <p class="mini-desc">Antagonista: poder y traición.</p>
        <div class="actions">
          <button class="btn naranja" data-character="antagonista">Ver ficha</button>
        </div>
      </div>
    </article>

  </div>
</section>

    `
    comic.Personajes.forEach( char => {
        //crear elementos dinamicamente con js
        const div = document.createElement("div")
        div.classList.add("personaje")  
        div.innerHTML `
         <img scr= "${char.imagen}" alt="Helena"
         <p>${char.nombre}</p>  
         <p>${char.personaje}</p>       
        `
        cardpersonajes.appendChild(div)
    });