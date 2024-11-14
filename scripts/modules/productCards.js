const renderProductCard = (product) => {
  const div = document.createElement('div');
  div.className = 'content__card';
  div.id = product.id;
  div.dataset.availability = product.availability;
  div.innerHTML = `
    
      <div class="content__card_photo">
        <img class="content__card_photo-start" src="${product.image}" alt="" />
        <img class="content__card_photo-active" src="/images/card-img.png" alt="" />
      </div>
      <h3 class="content__card_title">${product.name}</h3>
      <div class="content__card_footer">
        <p class="content__card_price">${product.price} ₽</p>
        <button class="content__card_btn">+</button>
      </div>
  
  `;
  return div;
};

const appendCard = (products, container) => {
  container.append(products);
};

const renderProductCards = (products, container) => {
  const cardsCounter = document.querySelector('.content__counter');
  container.innerHTML = '';
  products.forEach((product, index) => {
    const card = renderProductCard(product);
    appendCard(card, container);
    cardsCounter.textContent = `${index + 1} товаров`;
  });
};

export { renderProductCards };
