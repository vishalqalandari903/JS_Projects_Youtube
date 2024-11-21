const tipForm = document.querySelector(".tipForm");
const tipPercentageInput = document.querySelector(".tip_percentage");
const realPriceInput = document.querySelector(".real_price");
const totalPriceSpan = document.querySelector(".total_price span");

tipForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let tipPercentage = Number(tipPercentageInput.value);
  let realPrice = Number(realPriceInput.value);

  if (!tipPercentage || !realPrice)
    return alert("Please put numbers to get totalCost");

  let totalCost = (((tipPercentage + 100) / 100) * realPrice).toFixed(2);
  totalPriceSpan.innerHTML = totalCost;
});

// $105.245: 100% + 5% = (105% / 100%) * $120
