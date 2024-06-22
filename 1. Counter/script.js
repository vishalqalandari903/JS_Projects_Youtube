// HTML Elements
const incrementBtn = document.querySelector("#increment_btn");
const decrementBtn = document.querySelector("#decrement_btn");
const resetBtn = document.querySelector("#reset_btn");
const count = document.querySelector(".count-value");

incrementBtn.addEventListener("click", increment);
resetBtn.addEventListener("click", reset);
decrementBtn.addEventListener("click", decrement);

function increment() {
  //   const countValue = count.innerHTML;
  //   count.innerHTML = +countValue + 1;
  //   count.innerHTML = Number(countValue) + 1;

  count.innerHTML++;

  checkValue();
}
function reset() {
  //   const countValue = count.innerHTML;
  //   count.innerHTML = +countValue + 1;
  //   count.innerHTML = Number(countValue) + 1;

  count.innerHTML = 0;

  checkValue();
}
function decrement() {
  //   const countValue = count.innerHTML;
  //   count.innerHTML = +countValue - 1;
  //   count.innerHTML = Number(countValue) - 1;

  count.innerHTML--;

  checkValue();
}

function checkValue() {
  //   const countValue = Number(count.innerHTML);
  //   if (countValue === 0) {
  //     count.classList.remove("greater", "smaller");
  //   } else if (countValue > 0) {
  //     count.classList.add("greater");
  //     count.classList.remove("smaller");
  //   } else {
  //     count.classList.remove("greater");
  //     count.classList.add("smaller");
  //   }
  //   countValue == 0
  //     ? count.classList.remove("greater", "smaller")
  //     : countValue > 0
  //     ? (count.classList.add("greater"), count.classList.remove("smaller"))
  //     : (count.classList.add("smaller"), count.classList.remove("greater"));
}
