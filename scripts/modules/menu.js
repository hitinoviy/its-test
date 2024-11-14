const toggleMenu = (target, container) => {
  if (container.classList.contains('header__mobile-nav-active')) {
    container.classList.remove('header__mobile-nav-active');
    target.classList.remove('header__burger_active');
  } else {
    container.classList.add('header__mobile-nav-active');
    target.classList.add('header__burger_active');
  }
};

const closeMenu = (container) => {
  container.classList.remove('header__mobile-nav-active');
};

export { toggleMenu };
