let tipPercentage = 0;

function setTipPercentage(percentage) {
  tipPercentage = percentage;
  calculateTip();
}

function calculateTip() {
  const billAmount = parseFloat(document.getElementById("bill").value);
  const billAmountInput = document.getElementById("bill");
  const numberOfPeople = parseInt(document.getElementById("numberOfPeople").value);
  const numberOfPeopleInput = document.getElementById("numberOfPeople");
  const errorElement = document.getElementById("error-message");
  const errorBillElement = document.getElementById("error-bill-message")

  if (isNaN(numberOfPeople) || numberOfPeople < 1) {
    billAmountInput.style.outline = "2px solid #e80000a0";
    numberOfPeopleInput.style.outline = "2px solid #e80000a0";
    errorElement.textContent = "Can't be zero";
    errorBillElement.textContent = "Can't be zero";
  } else {
    billAmountInput.style.outline = "none";
    numberOfPeopleInput.style.outline = "none";
    errorElement.textContent = "";
    errorBillElement.textContent = "";
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
  document.getElementById('tipAmount').textContent = '$0.00';
  document.getElementById('amountPerPerson').textContent = '$0.00';
  document.getElementById('numberOfPeople').style.outline = ("");
  document.getElementById('bill').style.outline = ("");
  document.getElementById('error-message').textContent = ("");
  document.getElementById('error-bill-message').textContent = ("");
  document.getElementById("customInput").value = '';
}

function restrictNegativeInput(input) {
  input.addEventListener("keydown", function(e) {
    if (e.key === "-" || e.key === "-") {
      e.preventDefault();
    }
  });
}

const billInput = document.getElementById("bill");
restrictNegativeInput(billInput);

const numberOfPeopleInput = document.getElementById("numberOfPeople");
restrictNegativeInput(numberOfPeopleInput);

const customInput = document.getElementById("customInput");
restrictNegativeInput(customInput);

window.addEventListener("load", function () {
  const tipButtons = document.querySelectorAll(".tip-btn button");
  const customInput = document.getElementById("customInput");

  const inputFields = document.querySelectorAll("input[type='number]");
  inputFields.forEach(function (inputField){
    inputField.addEventListener("keydown", function (event){
      if (event.key === "+" || event.key === "-" || event.keyCode === 187 || event.keyCode === 189) {
        event.preventDefault();
      }
    });

  });

  customInput.addEventListener("keyup", function (){
    customInput.style.outline = "none";
  })
  this.document.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
      const customPercentage = parseInt(customInput.value);
      if (!isNaN(customPercentage)) {
        setTipPercentage(customPercentage);
        customInput.value = "";
      } 
    } else {
      customInput.style.outline = "none"
    }
  });

  tipButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      const percentage = parseInt(this.getAttribute("data-percentage"));
      setTipPercentage(percentage);

      tipButtons.forEach(function(btn){
        btn.classList.remove("active");
      });
      this.classList.add("active");


    });
  });

  const resetButton = document.getElementById("resetButton");
  resetButton.addEventListener("click", function(){
    tipButtons.forEach(function(btn){
      btn.classList.remove("active");
    });

    resetCalculator();
  });


});