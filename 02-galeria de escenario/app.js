function aplicarEfectos(elemento, slot, contador) {
    
    if (elemento.dataset.collected === 'true') return;
  
    elemento.dataset.collected = 'true';
    
    elemento.classList.add('saltar');
    
    setTimeout(() => {
        elemento.style.filter = 'grayscale(100%)';
        elemento.style.opacity = '0.7';
    }, 300);
    
    setTimeout(() => {
        elemento.classList.add('desaparecer');
        elemento.style.pointerEvents = 'none';
        elemento.setAttribute('aria-hidden', 'true');
    }, 600);
    
    
    if (slot && contador !== undefined) {
        contador++;
        const spanContador = slot.querySelector('.contador');
        if (spanContador) {
            spanContador.textContent = contador;
            slot.classList.add('activo');
            setTimeout(() => slot.classList.remove('activo'), 500);
        }
    }
    
    return contador;
}

// Escenario Tulipanes
const escenarioTulipanes = document.querySelector('.escenario:has(.slot--tulipan)');
if (escenarioTulipanes) {
    let contadorTulipan = 0;
    const slotTulipan = escenarioTulipanes.querySelector('.slot--tulipan');
    const tulipanes = escenarioTulipanes.querySelectorAll('.asset.clickable[data-item="tulipan"]');
    
    tulipanes.forEach(tulipan => {
        tulipan.addEventListener('click', () => {
            contadorTulipan = aplicarEfectos(tulipan, slotTulipan, contadorTulipan);
        });
    });
}

// Escenario Hongos
const escenarioHongos = document.querySelector('.escenario:has(.slot--hongo)');
if (escenarioHongos) {
    let contadorHongo = 0;
    const slotHongo = escenarioHongos.querySelector('.slot--hongo');
    const hongos = escenarioHongos.querySelectorAll('.asset.clickable[data-item="hongo"]');
    
    hongos.forEach(hongo => {
        hongo.addEventListener('click', () => {
            contadorHongo = aplicarEfectos(hongo, slotHongo, contadorHongo);
        });
    });
}

// Escenario Marcianos
const escenarioMarcianos = document.querySelector('.escenario:has(.slot--marciano)');
if (escenarioMarcianos) {
    let contadorMarciano = 0;
    const slotMarciano = escenarioMarcianos.querySelector('.slot--marciano');
    const marcianos = escenarioMarcianos.querySelectorAll('.asset.clickable[data-item="marciano"]');
    
    marcianos.forEach(marciano => {
        marciano.addEventListener('click', () => {
            contadorMarciano = aplicarEfectos(marciano, slotMarciano, contadorMarciano);
        });
    });
}

if (!document.querySelector('#efectosCSS')) {
    const estilos = document.createElement('style');
    estilos.id = 'efectosCSS';
    estilos.textContent = `
        .saltar {
            animation: salto 0.6s ease-out;
        }
        
        .desaparecer {
            opacity: 0;
            transform: scale(0.8);
            transition: all 0.3s ease-out;
        }
        
        .slot.activo {
            transform: scale(1.1);
            transition: transform 0.3s ease-out;
        }
        
        @keyframes salto {
            0% { transform: translateY(0); }
            50% { transform: translateY(-20px); }
            100% { transform: translateY(0); }
        }
    `;
    document.head.appendChild(estilos);
}scena(0);
