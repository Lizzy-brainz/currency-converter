const currencyDropdown = document.getElementById("from_currency");
var exchangeBtn = document.querySelector("#exchangeBtn");
const amountInput = document.getElementById("original-currency-amount");
const exchangeRateInput = document.getElementById("exchange-rate");
const newCurrencyUnit = document.getElementById("new-currency-unit");
const originalCurrencyInput = document.getElementById("original-currency-unit");
const message = document.getElementById("message");
const feedback = document.getElementById("feedback");

let rates = {};
let response;

function validateBtn(){
    try {
        if (amountInput.value && Number.isInteger(Number(amountInput.value))) {
            return true; } else { return false;
        }
    } catch (error) {
        console.log(error);
    }
}

exchangeBtn.addEventListener("click", () => {
    try {
        if (validateBtn()) {
            let selectedCurrency = currencyDropdown.value;
            let exchangeRate     = rates[selectedCurrency];
            let amount           = parseInt(amountInput.value);
            let newAmount        = exchangeRate * amount;

            feedback.innerHTML = `Your <span class="amount">${amount} Dollar${
                amount > 1 ? "s" : ""
            }💰</span> will buy you <span class="amount">${newAmount} ${selectedCurrency}${
                newAmount > 1 ? "s" : ""
            }</span>`;
        } else {
            response = 'Input a number digit';
            if (response) message.innerHTML += `Error: ${response}`;
        };
    } catch (err) {
        console.log(err);
    }
});

fetch(
  "https://api.currencyfreaks.com/latest?apikey=ae7ca2aed4b045bea84fd65f7a5bbc2b&format=json"
)
  .then((res) => res.json())
  .then((data) => {
    for (rate in data.rates) {
      currencyDropdown.innerHTML += `<option value=${rate}>${rate}</option>`;
    }
    rates = data.rates;
    console.log(rates);
    console.log(data);
  })
  .catch((err) => {
    console.log(err);
  });

(function () {
  let oldVal;
  const originalCurrency = "Dollar💰";
  originalCurrencyInput.value = `${originalCurrency}`;
  amountInput.addEventListener("input", function () {
      console.log(this.value)
    if (oldVal !== this.value) {
      oldVal = this.value;
      const amount = parseInt(amountInput.value);
      originalCurrencyInput.value = `Dollar${amount > 1 ? "s" : ""}`+ "" +"💰";
    }
  });
})();

function changeExchangeRate() {
  const selectedCurrency = currencyDropdown.value;
  const exchangeRate = rates[selectedCurrency];
  exchangeRateInput.value = exchangeRate;
  newCurrencyUnit.value = selectedCurrency;
}
