import { createElement } from '../utils/dom.js';

class Slide {
  constructor(sceneData) {
    this.sceneData = sceneData;
    this.element = this.createSlideElement();
  }

  createSlideElement() {
    const slide = createElement('div', 'gallery__slide escena');
    slide.setAttribute('aria-hidden', 'true');

    const img = createElement('img', 'slide__image');
    img.src = this.sceneData.imagePath;
    img.alt = this.sceneData.title;

    const title = createElement('h2', 'slide__title');
    title.textContent = this.sceneData.title;

    const description = createElement('p', 'slide__description');
    description.textContent = this.sceneData.description;

    slide.appendChild(img);
    slide.appendChild(title);
    slide.appendChild(description);

    return slide;
  }

  show() {
    this.element.classList.add('activo');
    this.element.setAttribute('aria-hidden', 'false');
  }

  hide() {
    this.element.classList.remove('activo');
    this.element.setAttribute('aria-hidden', 'true');
  }

  getElement() {
    return this.element;
  }
}

export default Slide;