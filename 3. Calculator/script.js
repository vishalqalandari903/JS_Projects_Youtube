const displayScreen = document.querySelector(".displayScreen #displayInput");
const displayButtons = Array.from(document.querySelectorAll(".mathNumber"));
const deleteButton = document.querySelector(".deleteButton");
const equalButton = document.querySelector(".equalOperator");

displayButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    displayScreen.value += button.value;
  });
});

deleteButton.addEventListener("click", (e) => {
  displayScreen.value = "";
});

equalButton.addEventListener("click", (e) => {
  displayScreen.value = eval(displayScreen.value);
});
