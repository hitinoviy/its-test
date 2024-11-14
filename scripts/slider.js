const slides = document.querySelectorAll('.slider__slide');
const pagination = document.querySelector('.pagination');
let currentIndex = 0;
const slideInterval = 5000;
let intervalId;

slides.forEach((slide, index) => {
  const button = document.createElement('button');
  button.addEventListener('click', () => goToSlide(index));
  pagination.appendChild(button);
});

const updatePagination = () => {
  const buttons = pagination.querySelectorAll('button');
  buttons.forEach((button, index) => {
    button.classList.toggle('active', index === currentIndex);
  });
};

const goToSlide = (index) => {
  currentIndex = index;
  const slidesContainer = document.querySelector('.slider__slides');
  slidesContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
  resetInterval();
  updatePagination();
};

const startSlideInterval = () => {
  intervalId = setInterval(nextSlide, slideInterval);
};

const resetInterval = () => {
  clearInterval(intervalId);
  startSlideInterval();
};

const nextSlide = () => {
  currentIndex = (currentIndex + 1) % slides.length;
  goToSlide(currentIndex);
};

const prevSlide = () => {
  currentIndex = (currentIndex - 1 + slides.length) % slides.length;
  goToSlide(currentIndex);
};

document.querySelector('.slider__next').addEventListener('click', () => {
  nextSlide();
  resetInterval();
});

document.querySelector('.slider__prev').addEventListener('click', () => {
  prevSlide();
  resetInterval();
});

updatePagination();
startSlideInterval();
