const createElement = (tag, className = '', attributes = {}) => {
  const element = document.createElement(tag);
  if (className) {
    element.className = className;
  }
  Object.keys(attributes).forEach(key => {
    element.setAttribute(key, attributes[key]);
  });
  return element;
};

const appendChildren = (parent, children) => {
  children.forEach(child => {
    parent.appendChild(child);
  });
};

const removeElement = (element) => {
  if (element && element.parentNode) {
    element.parentNode.removeChild(element);
  }
};

const toggleClass = (element, className) => {
  if (element) {
    element.classList.toggle(className);
  }
};

const setAttribute = (element, attribute, value) => {
  if (element) {
    element.setAttribute(attribute, value);
  }
};

const removeAttribute = (element, attribute) => {
  if (element) {
    element.removeAttribute(attribute);
  }
};

export { createElement, appendChildren, removeElement, toggleClass, setAttribute, removeAttribute };