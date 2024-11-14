const cartData = () => {
  const card = document.querySelector('.shopping-card__container');
  const productsList = document.querySelector('.content__container-body');
  const cartList = document.querySelector('.shopping-card__body_cards');
  const cartEmpty = document.querySelector('.shopping-card-empty');
  const cartOrder = document.querySelector('.shopping-card-order');
  const cartEmptyBtn = document.querySelector('.shopping-card__body_info-btn');
  const cartTotalCountHeader = document.querySelector('.header__user-info_btn-card');

  const formatter = new Intl.NumberFormat('ru');

  const productInfo = {};

  const updateCartItemCount = () => {
    card.addEventListener('click', (e) => {
      if (
        !e.target.matches(
          '.shopping-card__body_card-counter-minus, .shopping-card__body_card-counter-plus'
        )
      ) {
        return;
      }

      let currentItems, minusBtn;
      const target = e.target;
      if (
        target.matches('.shopping-card__body_card-counter-minus') ||
        target.matches('.shopping-card__body_card-counter-plus')
      ) {
        const counter = target.closest('.shopping-card__body_card-counter');
        currentItems = counter.querySelector('.shopping-card__body_card-counter-text');
        minusBtn = counter.querySelector('.shopping-card__body_card-counter-minus');
      }

      if (target.matches('.shopping-card__body_card-counter-minus')) {
        if (parseInt(currentItems.textContent) > 2) {
          currentItems.textContent = parseInt(currentItems.textContent) - 1;
        } else {
          currentItems.textContent = parseInt(currentItems.textContent) - 1;
          minusBtn.setAttribute('disabled', true);
        }
        calculateTotalCartValue();
      }
      if (target.matches('.shopping-card__body_card-counter-plus')) {
        currentItems.textContent = parseInt(currentItems.textContent) + 1;
        minusBtn.removeAttribute('disabled');
        calculateTotalCartValue();
      }
    });
  };
  updateCartItemCount();

  const addProductToCart = () => {
    productsList.addEventListener('click', (e) => {
      if (!e.target.classList.contains('content__card_btn')) {
        return;
      }
      if (e.target.classList.contains('content__card_btn')) {
        const product = e.target.closest('.content__card');

        const imgCard = product.querySelector('.content__card_photo-start');
        const titleCard = product.querySelector('.content__card_title');
        const priceCard = product.querySelector('.content__card_price');
        const availabilityCard = product.dataset.availability;

        productInfo.id = product.getAttribute('id');
        productInfo.title = titleCard.textContent;
        productInfo.price = priceCard.textContent;
        productInfo.photo = imgCard.src;
        product.availability = availabilityCard;

        const productInCart = cartList.querySelector(`#${productInfo.id}`);

        if (productInCart) {
          const currentItemsProducts = productInCart.querySelector(
            '.shopping-card__body_card-counter-text'
          );
          const minusBtn = productInCart.querySelector('.shopping-card__body_card-counter-minus');

          currentItemsProducts.textContent = parseInt(currentItemsProducts.textContent) + 1;
          minusBtn.removeAttribute('disabled');
        } else {
          renderProductInCart(availabilityCard);
        }
        toggleCartStatus();
        calculateTotalCartValue();
      }
    });
  };
  addProductToCart();

  const renderProductInCart = (availabilityCard) => {
    const div = document.createElement('div');
    div.classList.add('shopping-card__body_card');
    if (availabilityCard <= 0) {
      div.classList.add('shopping-card__body_card-none');
    }
    div.setAttribute('id', productInfo.id);
    div.innerHTML = `
			<img src="${productInfo.photo}" alt="" class="shopping-card__body_card-img" />
			<div class="shopping-card__body_card-info">
			  <p class="shopping-card__body_card-title">${productInfo.title}</p>
        <p class="shopping-card__body_card-price" data-price="${productInfo.price}">${productInfo.price}</p>
      </div>
      <div class="shopping-card__body_card-counter">
        <button class="shopping-card__body_card-counter-minus" disable>-</button>
        <p class="shopping-card__body_card-counter-text">1</p>
        <button class="shopping-card__body_card-counter-plus">+</button>
      </div>
      <button class="shopping-card__body_card-delete-btn">
				<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
					<g opacity="0.2">
						<path d="M18 6L6 18" stroke="#1F2020" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
						<path d="M6 6L18 18" stroke="#1F2020" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
					</g>
				</svg>
      </button>
			<button class="shopping-card__body_card-none-delete-btn">
				<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M17 1L21 5L17 9" stroke="black" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
					<path d="M3 11V9C3 7.93913 3.42143 6.92172 4.17157 6.17157C4.92172 5.42143 5.93913 5 7 5H21" stroke="black" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" />
					<path d="M7 23L3 19L7 15" stroke="black" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" />
					<path d="M21 13V15C21 16.0609 20.5786 17.0783 19.8284 17.8284C19.0783 18.5786 18.0609 19 17 19H3" stroke="black" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" />
				</svg>
      </button>
		`;
    cartList.append(div);
  };

  const removeProductFromCart = () => {
    cartList.addEventListener('click', (e) => {
      if (
        e.target.closest('.shopping-card__body_card-delete-btn') ||
        e.target.closest('.shopping-card__body_card-none-delete-btn')
      ) {
        const cartItem = e.target.closest('.shopping-card__body_card');
        cartItem.remove();
        toggleCartStatus();
        calculateTotalCartValue();
      }
    });
  };

  removeProductFromCart();

  const toggleCartStatus = () => {
    if (card.querySelector('.shopping-card__body_card')) {
      cartEmpty.classList.add('shopping-card_hidden');
      cartOrder.classList.remove('shopping-card_hidden');
    } else {
      cartEmpty.classList.remove('shopping-card_hidden');
      cartOrder.classList.add('shopping-card_hidden');
    }
  };

  toggleCartStatus();

  const calculateTotalCartValue = () => {
    const cartItems = document.querySelectorAll('.shopping-card__body_card');
    const cartTotalPrice = document.querySelector('.shopping-card__footer_price');
    const cartTotalCount = document.querySelector('.shopping-card__body_info-title');
    let totalCartValue = 0;
    let totalCartCount = 0;
    cartItems.forEach((item, index) => {
      const itemCount = item.querySelector('.shopping-card__body_card-counter-text');

      const itemPrice = item.querySelector('.shopping-card__body_card-price');
      if (!itemCount.closest('.shopping-card__body_card-none')) {
        const itemTotalPrice =
          parseInt(itemCount.textContent) * parseInt(itemPrice.dataset.price.split(' ')[0]);
        itemPrice.textContent = `${formatter.format(itemTotalPrice)} ₽`;
        totalCartValue += itemTotalPrice;
        totalCartCount += parseInt(itemCount.textContent);
      }
    });

    cartTotalPrice.textContent = `${formatter.format(totalCartValue)} ₽`;
    cartTotalCount.textContent = `${totalCartCount} товара`;
    cartTotalCountHeader.textContent = totalCartCount;
  };

  calculateTotalCartValue();

  const clearCard = () => {
    cartEmptyBtn.addEventListener('click', () => {
      const cards = card.querySelectorAll('.shopping-card__body_card');
      cards.forEach((el) => {
        el.remove();
      });
      cartTotalCountHeader.textContent = 0;
      toggleCartStatus();
    });
  };
  clearCard();
};

export { cartData };
