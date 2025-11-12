function aplicarEfectos(elemento, slot, contador) {
  if (!elemento || elemento.dataset.collected === 'true') return contador;

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
      spanContador.textContent = String(contador);
      slot.classList.add('activo');
      setTimeout(() => slot.classList.remove('activo'), 500);
    }
  }

  return contador;
}

/* Inyectar estilos mínimos si no existen (mantener animaciones) */
if (!document.querySelector('#efectosCSS')) {
  const estilos = document.createElement('style');
  estilos.id = 'efectosCSS';
  estilos.textContent = `
    .saltar { animation: salto 0.6s ease-out; }
    .desaparecer { opacity: 0; transform: scale(0.8); transition: all 0.3s ease-out; }
    .slot.activo { transform: scale(1.1); transition: transform 0.3s ease-out; }
    @keyframes salto { 0%{transform:translateY(0)}50%{transform:translateY(-20px)}100%{transform:translateY(0)} }
  `;
  document.head.appendChild(estilos);
}

/**
 * Añade listeners de recolección para un tipo de item en cada escena que tenga el slot.
 * itemName: 'tulipan' | 'hongo' | 'marciano' (coincide con .slot--{itemName} y data-item)
 */
function configurarRecoleccion(itemName) {
  const slides = Array.from(document.querySelectorAll('.gallery__slide.escena'));
  slides.forEach(slide => {
    const slotElem = slide.querySelector(`.slot--${itemName}`);
    if (!slotElem) return;
    const contadorSpan = slotElem.querySelector('.contador');
    let contador = parseInt(contadorSpan?.textContent || '0', 10) || 0;

    const assets = slide.querySelectorAll(`.asset.clickable[data-item="${itemName}"]`);
    assets.forEach(asset => {
      // evitar múltiples bindings
      asset.removeEventListener('click', asset._recolectHandler);
      const handler = () => {
        contador = aplicarEfectos(asset, slotElem, contador);
      };
      asset.addEventListener('click', handler);
      // guardar referencia para poder eliminar si se vuelve a configurar
      asset._recolectHandler = handler;
      // accesibilidad: permitir teclado (Enter / Space)
      asset.tabIndex = 0;
      asset.removeEventListener('keydown', asset._keyHandler);
      const keyHandler = (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handler();
        }
      };
      asset.addEventListener('keydown', keyHandler);
      asset._keyHandler = keyHandler;
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  configurarRecoleccion('tulipan');
  configurarRecoleccion('hongo');
  configurarRecoleccion('marciano');

  /* Navegación de slides / miniaturas (efecto slide) */
  const slides = Array.from(document.querySelectorAll('.gallery__slide.escena'));
  const track = document.querySelector('.gallery__track');
  const prevBtn = document.querySelector('.gallery__prev');
  const nextBtn = document.querySelector('.gallery__next');
  const miniaturas = slides.map(s => s.querySelector('.miniatura'));

  let indice = slides.findIndex(s => s.classList.contains('activo'));
  if (indice === -1) indice = 0;

  function actualizarTrack(index) {
    if (!track) return;
    track.style.transform = `translateX(-${index * 100}%)`;
  }

  function mostrar(index) {
    if (!slides.length) return;
    if (index < 0) index = slides.length - 1;
    if (index >= slides.length) index = 0;

    slides.forEach((s, i) => {
      const mini = miniaturas[i];
      const activo = i === index;
      s.classList.toggle('activo', activo);
      s.setAttribute('aria-hidden', activo ? 'false' : 'true');
      s.style.pointerEvents = activo ? 'auto' : 'none';
      s.tabIndex = activo ? 0 : -1;

      if (mini) {
        mini.classList.toggle('activo', activo);
        mini.setAttribute('aria-hidden', activo ? 'false' : 'true');
        if (activo) mini.setAttribute('aria-modal', 'true');
        else mini.removeAttribute('aria-modal');
      }
    });

    actualizarTrack(index);

    // mover foco a la slide activa para accesibilidad
    const activoSlide = slides[index];
    try { activoSlide && activoSlide.focus(); } catch (e) { /* no crítico */ }

    indice = index;
  }

  // inicializar posición del track y estado
  actualizarTrack(indice);
  mostrar(indice);

  if (prevBtn) prevBtn.addEventListener('click', () => mostrar(indice - 1));
  if (nextBtn) nextBtn.addEventListener('click', () => mostrar(indice + 1));

  // click en miniaturas para mostrar su escena
  miniaturas.forEach((mini, i) => {
    if (!mini) return;
    mini.addEventListener('click', (e) => {
      e.stopPropagation();
      mostrar(i);
    });
  });

  // navegación por teclado global
  document.addEventListener('keydown', (e) => {
    if (['ArrowRight', 'Right'].includes(e.key)) { mostrar(indice + 1); }
    if (['ArrowLeft', 'Left'].includes(e.key)) { mostrar(indice - 1); }
  });
});

const miniaturas = slides.map(s => s.querySelector('.miniatura'));

  // --- nuevo: construir barra de miniaturas visuales debajo de la galería ---
  let thumbs = [];
  (function buildThumbnails() {
    const gallery = document.querySelector('.escenarios-gallery');
    if (!gallery) return;
    let container = gallery.querySelector('.thumbnails');
    if (!container) {
      container = document.createElement('div');
      container.className = 'thumbnails';
      // insertar después del track; antes del botón next si existe
      const track = gallery.querySelector('.gallery__track');
      if (track && track.parentNode) track.parentNode.insertBefore(container, track.nextSibling);
      else gallery.appendChild(container);
    }
    container.innerHTML = '';
    thumbs = [];

    slides.forEach((s, i) => {
      const ariaLabel = s.getAttribute('aria-label') || `Escena ${i+1}`;
      const fondo = s.querySelector('.fondo')?.getAttribute('src') || '';
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'thumbnail';
      btn.setAttribute('aria-label', `Mostrar ${ariaLabel}`);
      btn.setAttribute('data-index', String(i));
      btn.innerHTML = fondo
        ? `<img src="${fondo}" alt="${ariaLabel}">`
        : `<span class="thumb-title">${ariaLabel}</span>`;

      btn.addEventListener('click', (e) => {
        e.preventDefault();
        mostrar(i);
      });
      btn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); mostrar(i); }
      });

      container.appendChild(btn);
      thumbs.push(btn);
    });
  })();