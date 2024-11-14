import { getScrollBarWidth } from '../utils.js';
import { renderProductCards } from './productCards.js';
const filter = (products, productContainer) => {
  const customSelect = document.querySelector('.content__select__body');
  const selectedOption = document.querySelector('.content__select-option');
  const optionsContainer = document.querySelector('.content__select__body_options');
  const selectOverlay = document.querySelector('.content__select__overlay');
  const asideItemsContainer = document.querySelector('.content__aside-items');
  const asideItems = document.querySelectorAll('.content__aside-item');
  const asideContainer = document.querySelector('.content__aside');
  const asideOpenBtn = document.querySelector('.content_filter-btn');
  const asideCloseBtn = document.querySelector('.content__aside_close-btn');
  const asideOverlay = document.querySelector('.content__aside_overlay');
  let currentAsideFilter = null;
  let currentPriceFilterSelect = 'default';

  const toggleAsideShow = () => {
    asideContainer.classList.toggle('content__aside_show');
  };

  asideOpenBtn.addEventListener('click', () => toggleAsideShow());
  asideCloseBtn.addEventListener('click', () => toggleAsideShow());
  asideOverlay.addEventListener('click', () => toggleAsideShow());
  const createFilter = () => {
    const scroll = getScrollBarWidth();

    const toggleSelected = (isActive) => {
      optionsContainer.classList.toggle('content__select_show', isActive);
      selectOverlay.classList.toggle('content__select_show', isActive);
      document.body.style.overflow = isActive ? 'hidden' : '';
      document.body.style.marginRight = isActive ? `${scroll}px` : '0px';
    };

    selectedOption.addEventListener('click', () => {
      toggleSelected(true);
    });

    const options = document.querySelectorAll('.content__select__body_option');
    options.forEach((option) => {
      option.addEventListener('click', function () {
        selectedOption.innerHTML = `${this.textContent}
				<svg width="8" height="5" viewBox="0 0 8 5" fill="none" xmlns="http://www.w3.org/2000/svg" >
					<path d="M4 4.5L7.4641 0L0.535898 0L4 4.5Z" fill="#202020" />
        </svg>`;
        toggleSelected(false);
      });
    });
    document.addEventListener('click', function (event) {
      if (!customSelect.contains(event.target)) {
        toggleSelected(false);
      }
    });
  };
  createFilter();

  const filterProducts = (filterAside) => {
    let filteredProducts;
    switch (filterAside) {
      case 'new':
        filteredProducts = products.filter((product) => product.new);
        break;
      case 'availability':
        filteredProducts = products.filter((product) => product.availability > 0);
        break;
      case 'contract':
        filteredProducts = products.filter((product) => product.contract);
        break;
      case 'exclusive':
        filteredProducts = products.filter((product) => product.exclusive);
        break;
      case 'sale':
        filteredProducts = products.filter((product) => product.sale);
        break;
      default:
        filteredProducts = products.filter((product) => true);
        break;
    }
    if (currentPriceFilterSelect === 'lowPrice') {
      filteredProducts.sort((a, b) => a.price - b.price);
    } else if (currentPriceFilterSelect === 'highPrice') {
      filteredProducts.sort((a, b) => b.price - a.price);
    }

    return filteredProducts;
  };

  const handleAsideFilterClick = () => {
    asideItemsContainer.addEventListener('click', (e) => {
      if (!e.target.matches('.content__aside-item input')) {
        return;
      }

      asideItems.forEach((el) => {
        const asideItem = el.querySelector('input');
        asideItem.checked = false;
      });
      e.target.checked = true;
      currentAsideFilter = e.target.dataset.value;

      const filteredProducts = filterProducts(currentAsideFilter);

      renderProductCards(filteredProducts, productContainer);
    });
  };

  handleAsideFilterClick();

  const handlePriceFilterChange = () => {
    optionsContainer.addEventListener('click', (e) => {
      currentPriceFilterSelect = e.target.dataset.value;
      const filteredProducts = filterProducts(currentAsideFilter);

      renderProductCards(filteredProducts, productContainer);
    });
  };
  handlePriceFilterChange();
};

export { filter };
