const rSlide = document.querySelector(".r_slide");
const gSlide = document.querySelector(".g_slide");
const bSlide = document.querySelector(".b_slide");
const copyButton = document.querySelector(".copy_code_btn");
const codeSpan = document.querySelector(".color_code");
const colorBox = document.querySelector(".color_box");

let rgbValue;

changeColor();


rSlide.addEventListener("input", changeColor);
gSlide.addEventListener("input", changeColor);
bSlide.addEventListener("input", changeColor);

copyButton.addEventListener("click", copyCode);

function changeColor() {
  rgbValue = `rgb(${rSlide.value}, ${gSlide.value}, ${bSlide.value})`;
  codeSpan.innerHTML = rgbValue;
  colorBox.style.backgroundColor = rgbValue;
}

function copyCode() {
  navigator.clipboard.writeText(rgbValue);
}
