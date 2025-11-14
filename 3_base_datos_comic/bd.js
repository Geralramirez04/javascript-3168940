const infoComic = document.querySelector(".info-comic")

console.log(infoComic)

infoComic.innerHTML = `
 <small> ${infoComic.year}</small>
 <h1>${infoComic.nombreComic}</h1>
 <p>${infoComic.sipnosis}</p>
 <p>${infoComic.genero}</p> 
 
`
let comic = {
  "nombreComic": "La princesa de oro",
  "numeroCapitulo": 3,
  "Genero": "Fantacia, superacion, drama",
  "sipnosis": "En una noche de tormenta, nació la princesa Helena en el castillo de Puerta Tejada. Desde pequeña, su fuerte carácter y voz no eran aceptados. Tenía un medallón de plata de su abuela. Helena anhelaba libertad y comenzó a cantar en el mercado, causando admiración y escándalo. Un conde la llevó al Teatro de las Mil Estrellas, donde la llamaron sLa Ronca de Oro. Un joven trovador la traicionó robándole partituras. A pesar del dolor, Helena renació y continuó creando música. Su voz se volvió un grito de libertad y se convirtió en leyenda, enseñando a nuevas generaciones. Su canto se desvaneció en el viento, dejando un legado inmortal.",
  "autores": ["Geraldine, Juan jose, Caleb"],
  "portadaComic": "./image/portada.jpg",
  "year": 2025,
  
  
  "capitulos": 
  
  [ 
    { "id": 1,
      "name": "el surgimiento de la gran voz",
      "personajes": "Helena, Conde trovador",
      "portada": "/image/partada.jpg",
      "descripción": ["En una tormentosa noche, nace Helena, una bebé cuya voz retumbante sorprende a todos. Crece bajok cde una educación estricta, sintiéndose diferente y soñando con libertad."],
    },
    { "id": 2,
      "name": "Romance, rebelión y traición",
      "personajes": "Helena, Joven trovador",
      "portada": "/image/portada.jpg",
      "descripción": ["Helena cantó en el Teatro de las Mil Estrellas y se ganó el apodo La Ronca de Oro. Viajó y se enamoró . Decidió renacer y crear nuevas canciones, cantando himnos que representaron la libertad de las mujeres."]
    },
    { "id": 3,
      "name": "El legado del eco dorado",
      "Personajes": "Helena, dicipulas",
      "portada": "/image/portada.jpg",
      "descripción": ["Los años hicieron de Helena una leyenda en el Bosque de Ébano.  Enseñó a jóvenes cantoras en el Jardín de las Voces Eternas. En una noche de equinoccio, su voz resonó hasta desvanecerse. Su legado se volvió inmortal."]
    }
 ]
}