const toggleButton = document.querySelector(".toggleBtn");
const toggleIcon = toggleButton.querySelector(".icon");

toggleButton.addEventListener("click", (e) => {
  const htmlElement = document.querySelector("html");
  if (htmlElement.classList.contains("light")) {
    htmlElement.classList.add("dark");
    htmlElement.classList.remove("light");

    toggleIcon.classList.remove("fa-sun");
    toggleIcon.classList.add("fa-moon");
  } else {
    htmlElement.classList.add("light");
    htmlElement.classList.remove("dark");

    toggleIcon.classList.add("fa-sun");
    toggleIcon.classList.remove("fa-moon");
  }
});
