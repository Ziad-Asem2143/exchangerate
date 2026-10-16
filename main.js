let amount = document.querySelector("input");
let swap = document.querySelector("i");
let Currency = document.querySelector("#Currency");
let convertedTo = document.querySelector("#convertedTo");
let convert = document.querySelector("#convert");
let print = document.querySelector("#print");
let image1 = document.querySelector(".image1");
let image2 = document.querySelector(".image2");

import COUNTRY_NAMES from "/currency-exchange-data.js";

Currency.value = "AE";
convertedTo.value = "AE";
image1.src = `https://flagsapi.com/AE/shiny/32.png`;
image2.src = `https://flagsapi.com/AE/shiny/32.png`;
Object.entries(COUNTRY_NAMES).map(([key, value]) => {
  Currency.innerHTML += `  <option value="${key}"> ${key}||${value}</option>`;
  convertedTo.innerHTML += `  <option value="${key}">${key}||${value}</option>`;
});

swap.addEventListener("click", () => {
  let a = Currency.value;
  console.log(a, Currency.value, convertedTo.value);
  Currency.value = convertedTo.value;
  console.log(a, Currency.value, convertedTo.value);
  convertedTo.value = a;
  console.log(a, Currency.value, convertedTo.value);
});

Currency.addEventListener("change", () => {
  image1.src = `https://flagsapi.com/${Currency.value.slice(0, 2)}/shiny/32.png`;
});

convertedTo.addEventListener("change", () => {
  image2.src = `https://flagsapi.com/${convertedTo.value.slice(0, 2)}/shiny/32.png`;
});

convert.addEventListener("click", async () => {
  let data = await fetch(
    `https://v6.exchangerate-api.com/v6/6fe9224e081a9f5661c599cc/latest/${Currency.value}`,
  );
  data = await data.json();
  data = data.conversion_rates;
  if (amount.value == "" || typeof amount.value != "number") {
    amount.value = 1;
  }
  let distCur = Object.keys(data).find((key) => key == convertedTo.value);

  print.innerHTML = `${amount.value} ${Currency.value} = ${amount.value * data[distCur]} ${convertedTo.value}`;
  amount.value = "";
});
