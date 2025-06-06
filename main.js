let URL = "https://v6.exchangerate-api.com/v6/247f0d6636627ce8d157677c/latest/USD"; //Base URL

const dropList = document.querySelectorAll(".converter select");
const btn = document.querySelector("button");
const fromcurr = document.querySelector(".from-container select");
const tocurr = document.querySelector(".to-container select");
const value = document.querySelector(".value");
const change = document.querySelector("#change-logo");

for (let select of dropList) {
  for (let currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    if (select.name === "from" && currCode === "USD") {
      newOption.selected = true;
    } else if (select.name === "to" && currCode === "INR") {
      newOption.selected = true;
    }
    select.append(newOption);
  }
  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}

const updateFlag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};

btn.addEventListener("click", (e) => {
  e.preventDefault();
  getExchangeRate();
});

async function getExchangeRate() {
  const amount = document.querySelector("input");
  let amountVal = amount.value;
  if (amountVal === "" || amountVal === "0") {
    amount.value = 1;
    amountVal = 1;
  }
  let url = `https://v6.exchangerate-api.com/v6/247f0d6636627ce8d157677c/latest/${fromcurr.value}`;
  fetch(url)
    .then((response) => response.json())
    .then((result) => {
      let conversionRate = result.conversion_rates[tocurr.value];
      let finalVal = amountVal * conversionRate;
      value.innerText = `${amountVal} ${fromcurr.value} = ${finalVal} ${tocurr.value}`;
    });
}

change.addEventListener("click", () => {
  let temp = fromcurr.value;
  fromcurr.value = tocurr.value;
  tocurr.value = temp;
  updateFlag(fromcurr);
  updateFlag(tocurr);
  getExchangeRate();
});
