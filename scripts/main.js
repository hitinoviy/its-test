import { renderProductCards } from './modules/productCards.js';
import getData from './products.js';
import { toggleMenu } from './modules/menu.js';
import { openCart, closeCart } from './modules/cartPopup.js';
import { cartData } from './modules/cardData.js';
import { filter } from './modules/productFilters.js';

window.addEventListener('DOMContentLoaded', async () => {
  const productCards = document.querySelector('.content__container-body');
  const data = await getData();
  renderProductCards(data, productCards);

  const openMenuBtn = document.querySelector('.header__burger');
  const mobileNav = document.querySelector('.header__mobile-nav');

  openMenuBtn.addEventListener('touchstart', () => toggleMenu(openMenuBtn, mobileNav));

  openCart();
  closeCart();
  cartData();
  filter(data, productCards);
});
