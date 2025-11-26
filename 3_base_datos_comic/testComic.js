const infoComic = document.querySelector(".info-Comic")

console.log(infoComic)

infoComic.innerHTML = `
<small>${comic.year}</small>
    <h1>${comic.nombreComic}</h1>
    <p>${comic.sinopsis}</p>
    <p>${comic.genero}</p>
    `
const card = document.querySelector(".card")

console.log(card)

cardpersonajes.innerHTML = `
    <section class="panel">
      <div class="panel__header">
        <h2>Personajes</h2>
      </div>

      <div class="scroller">
        <article class="card">
          <div class="card__thumb" style="background-image: url('Helena.png');"></div>
          <div class="card__body">
            <h3 class="card__title">Helena</h3>
            <p class="card__text">Princesa de voz poderosa que desafía las reglas para cantar libremente. Su medallón simboliza su fuerza y legado eterno.</p>
          </div>
        </article>

        <article class="card">
          <div class="card__thumb" style="background-image: url('conde.png');"></div>
          <div class="card__body">
            <h3 class="card__title">Conde Melódico</h3>
            <p class="card__text">Noble apasionado por la música que descubre el talento de Helena y la impulsa a brillar en los grandes escenarios.</p>
          </div>
        </article>

        <article class="card">
          <div class="card__thumb" style="background-image: url('trovador.png');"></div>
          <div class="card__body">
            <h3 class="card__title">Joven Trovador</h3>
            <p class="card__text">Músico carismático que enamora y traiciona a Helena, encendiendo el fuego que convierte su voz en leyenda.</p>
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