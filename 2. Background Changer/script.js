const colors = Array.from(document.querySelectorAll(".color"));
const colorSelectInput = document.querySelector("#color_select_input");
const hexCodeButton = document.querySelector("#hex_code_button");
const hexCodeSpan = hexCodeButton.querySelector(".code");
const copyCodeIcon = hexCodeButton.querySelector(".copy_hex_icon");

// Feature 1
colors.forEach((color) => {
  color.addEventListener("click", (e) => {
    let bgColor = window.getComputedStyle(color).backgroundColor;
    document.body.style.backgroundColor = bgColor;
  });
});

// Feature 2
colorSelectInput.addEventListener("input", (e) => {
  let colorValue = colorSelectInput.value;
  document.body.style.backgroundColor = colorValue;
  hexCodeSpan.innerHTML = colorValue;
});

// Feature 3
hexCodeButton.addEventListener("click", (e) => {
  let colorCode = hexCodeSpan.innerHTML;
  navigator.clipboard.writeText(colorCode);

  copyCodeIcon.classList.remove("fa-regular");
  copyCodeIcon.classList.add("fa-solid");

  setTimeout(() => {
    copyCodeIcon.classList.add("fa-regular");
    copyCodeIcon.classList.remove("fa-solid");
  }, 1000);
});
