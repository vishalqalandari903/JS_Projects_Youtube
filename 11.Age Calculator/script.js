const ageForm = document.querySelector(".ageForm");
const birthDateInput = document.querySelector(".birth_date");
const realAge = document.querySelector(".real_age");

birthDateInput.max = new Date().toISOString().split("T")[0];

ageForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const birthDate = new Date(birthDateInput.value);

  const birthYear = birthDate.getFullYear();
  const birthMonth = birthDate.getMonth() + 1;
  const birthDay = birthDate.getDate();

  const todatDate = new Date();

  const todayYear = todatDate.getFullYear();
  const todayMonth = todatDate.getMonth() + 1;
  const todayDay = todatDate.getDate();

  let ageYear = todayYear - birthYear;
  let ageMonth = todayMonth - birthMonth;
  let ageDay = todayDay - birthDay;

  if (ageMonth < 0) {
    ageMonth += 12;
    ageYear--;
  }
  if (ageDay < 0) {
    ageDay += 30;
    ageMonth++;
  }

  realAge.innerHTML = `Your are ${ageYear} years, ${ageMonth} months, ${ageDay} days old`;
});
