import { getScrollBarWidth } from '../utils.js';

const cart = document.querySelector('.shopping-card__container');
const overlay = document.querySelector('.shopping-card__overlay');
const openCartButton = document.querySelector('.header__user-info_btn-card');
const closeCartButton = document.querySelector('.shopping-card__header_close-btn');
const scroll = getScrollBarWidth();

const toggleCart = (isActive) => {
  document.body.style.overflow = isActive ? 'hidden' : '';
  document.body.style.marginRight = isActive ? `${scroll}px` : '0px';
  cart.classList.toggle('container__active', isActive);
  overlay.classList.toggle('overlay__active', isActive);
};

const openCart = () => {
  openCartButton.addEventListener('click', () => {
    toggleCart(true);
  });
};

const closeCart = () => {
  closeCartButton.addEventListener('click', () => {
    toggleCart(false);
  });
  overlay.addEventListener('click', () => {
    toggleCart(false);
  });
};

export { openCart, closeCart };
