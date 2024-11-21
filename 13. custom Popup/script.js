const customPopup = document.querySelector(".custom-popup");
const openButtom = document.querySelector(".open-btn");
const closeButtom = document.querySelector(".close-btn");

openButtom.addEventListener("click", openPopup);
closeButtom.addEventListener("click", closePopup);

function openPopup(e) {
  customPopup.classList.add("show");
}

function closePopup() {
  customPopup.classList.remove("show");
}
