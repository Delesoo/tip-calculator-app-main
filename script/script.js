let tipPercentage = 0;

function setTipPercentage(percentage) {
  tipPercentage = percentage;
  calculateTip();
}

function calculateTip() {
  const billAmount = parseFloat(document.getElementById("bill").value);
  const numberOfPeople = parseInt(document.getElementById("numberOfPeople").value);
  const numberOfPeopleInput = document.getElementById("numberOfPeople");
  const errorElement = document.getElementById("error-message");

  if (isNaN(numberOfPeople) || numberOfPeople < 1) {
    numberOfPeopleInput.style.outline = "2px solid #e80000a0";
    errorElement.textContent = "Can't be zero"
  } else {
    numberOfPeopleInput.style.outline = "none";
    errorElement.textContent = "";
  }

  if (isNaN(billAmount) || isNaN(numberOfPeople) || numberOfPeople < 1){
    document.getElementById('tipAmount').textContent = "$0.00";
    document.getElementById('amountPerPerson').textContent = "$0.00";
  } else {
    const tipAmount = billAmount * (tipPercentage / 100);
    const amountPerPerson = (billAmount + tipAmount) / numberOfPeople;

    document.getElementById('tipAmount').textContent = "$" + tipAmount.toFixed(2);
    document.getElementById('amountPerPerson').textContent = "$" + amountPerPerson.toFixed(2);
  }
}

function resetCalculator() {
  document.getElementById('bill').value = '';
  document.getElementById('numberOfPeople').value = '';
  document.getElementById('tipAmount').textContent = '';
  document.getElementById('amountPerPerson').textContent = '';
  document.getElementById('numberOfPeople').style.outline = ("");
  document.getElementById('error-message').textContent = ("");
}

window.addEventListener("load", function () {
  const tipButtons = document.querySelectorAll(".tip-btn button");

  tipButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      const percentage = parseInt(this.getAttribute("data-percentage"));
      setTipPercentage(percentage);
    });
  });

  const resetButton = document.getElementById("resetButton");
  resetButton.addEventListener("click", resetCalculator);

});