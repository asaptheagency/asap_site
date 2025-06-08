import domElements from '/src/javascript/dom-elements.js';
import functions from '/src/javascript/functions.js';

document.getElementById('current-year').textContent = new Date().getFullYear();

domElements.scroll.forEach((el) => functions.observer.observe(el));
