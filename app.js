const apiKey = 'fca_live_VF8DtTpaBcHhQvahC4UorMbVkhUWlGIeUB3qTZkx';
const apiUrl = `https://api.freecurrencyapi.com/v1/latest?apikey=${apiKey}`;

let currencyData = {};

async function loadCurrencies() {
  try {
    const res = await fetch(apiUrl);
    const data = await res.json();
    currencyData = data.data;

    const currencyList = Object.keys(currencyData);
    const fromSelect = document.getElementById('fromCurrency');
    const toSelect = document.getElementById('toCurrency');

    fromSelect.innerHTML = '';
    toSelect.innerHTML = '';

    currencyList.forEach(code => {
      const option1 = document.createElement('option');
      const option2 = document.createElement('option');
      option1.value = option2.value = code;
      option1.text = option2.text = code;
      fromSelect.appendChild(option1);
      toSelect.appendChild(option2);
    });

    fromSelect.value = 'USD';
    toSelect.value = 'INR';

  } catch (err) {
    console.error('Failed to load currencies:', err);
    alert('Error fetching currency data.');
  }
}

function convertCurrency() {
  const amount = parseFloat(document.getElementById('amount').value);
  const from = document.getElementById('fromCurrency').value;
  const to = document.getElementById('toCurrency').value;

  if (isNaN(amount)) {
    alert("Please enter a valid number");
    return;
  }

  const fromRate = currencyData[from];
  const toRate = currencyData[to];
  const usdAmount = amount / fromRate;
  const converted = (usdAmount * toRate).toFixed(2);

  document.getElementById('result').innerText = `${amount} ${from} = ${converted} ${to}`;
}

window.onload = loadCurrencies;
