document.addEventListener('DOMContentLoaded', () => {

    const titleElement = document.getElementById('comic-title');
    if (titleElement) {
        titleElement.textContent = comicData.nombreCómic;
    }

   
    const synopsisElement = document.getElementById('comic-synopsis');
    if (synopsisElement) {
        synopsisElement.textContent = comicData.sinopsis;
    }

   
    const authorsElement = document.getElementById('comic-authors');
    if (authorsElement) {
        authorsElement.textContent = `Autores: ${comicData.autores.join(', ')}`;
    }

    
    const heroImg = document.querySelector('.hero-img');
    if (heroImg) {
        heroImg.src = comicData.portadaCómic;
    }


 
    const capImgElements = document.querySelectorAll('.cap-list .cap-item img');
    comicData.capítulos.forEach((capitulo, index) => {
        if (capImgElements[index]) {
            
            capImgElements[index].src = capitulo.portada;
            capImgElements[index].alt = capitulo.nombre;

            
            const capTitle = capImgElements[index].closest('.cap-item').querySelector('h3');
            if(capTitle) {
                capTitle.textContent = `Capítulo ${capitulo.id}: ${capitulo.nombre}`;
            }
        }
    });

   
    const charCards = document.querySelectorAll('.character-row .character-card');
    comicData.Personajes.forEach((personaje, index) => {
        if (charCards[index]) {
            
            const charImg = charCards[index].querySelector('img');
            if (charImg) {
                charImg.src = personaje.imagen;
                charImg.alt = personaje.nombre;
            }

         
            const charTitle = charCards[index].querySelector('h3');
            if(charTitle) {
                charTitle.textContent = personaje.nombre;
            }
        }
    });

});
