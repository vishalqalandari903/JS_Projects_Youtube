const accordians = document.querySelectorAll(".accordian");

accordians.forEach((accordian) => {
  const question = accordian.querySelector(".question");
  const answer = accordian.querySelector(".answer");

  question.addEventListener("click", () => {
    if (accordian.classList.contains("active")) {
      accordian.classList.remove("active");
      answer.style.maxHeight = "0";
    } else {
      accordians.forEach((innerAccordian) => {
        innerAccordian.classList.remove("active");
        innerAccordian.querySelector(".answer").style.maxHeight = "0";
      });

      answer.style.maxHeight = `${answer.scrollHeight}px`;
      accordian.classList.add("active");
    }
  });

  window.addEventListener("resize", () => {
    if (accordian.classList.contains("active")) {
      answer.style.maxHeight = `${answer.scrollHeight}px`;
    }
  });
});
