const slides = document.querySelectorAll(".slider .slide");
const nextBtn = document.querySelector(".btn-slide.next");
const prevBtn = document.querySelector(".btn-slide.prev");

let currentSlide = 0;

nextBtn.addEventListener("click", nextSlide);
prevBtn.addEventListener("click", prevSlide);

function nextSlide() {
  currentSlide++;
  if (currentSlide > slides.length - 1) {
    currentSlide = 0;
  }
  changeSlide();
}

function prevSlide() {
  currentSlide--;
  if (currentSlide < 0) {
    currentSlide = slides.length - 1;
  }
  changeSlide();
}

function changeSlide() {
  slides.forEach((slide, index) => {
    slide.style.transform = `translateX(${(index - currentSlide) * 100}%)`;
  });
}
