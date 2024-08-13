import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CurrencyConverter = () => {
  const [currencies, setCurrencies] = useState([]);
  const [amount, setAmount] = useState('');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [convertedAmount, setConvertedAmount] = useState(null);

  const API_KEY = '7381410d11fc460f5787b040'; // Replace with your valid API key

  useEffect(() => {
    axios.get('https://openexchangerates.org/api/currencies.json', { timeout: 10000 })
      .then(response => {
        setCurrencies(Object.keys(response.data));
      })
      .catch(error => {
        console.error('Error fetching currency list:', error);
        if (error.code === 'ECONNABORTED') {
          alert('The request took too long - please try again.');
        } else if (error.response && error.response.status === 401) {
          alert('Unauthorized access - please check your API key.');
        } else {
          alert('An error occurred while fetching the currency list.');
        }
      });
  }, []);

  const handleConvert = () => {
    if (amount === '' || isNaN(amount)) {
      alert('Please enter a valid amount');
      return;
    }

    axios.get(`https://v6.exchangerate-api.com/v6/${API_KEY}/pair/${fromCurrency}/${toCurrency}/${amount}`, { timeout: 10000 })
      .then(response => {
        if (response.data.conversion_result) {
          setConvertedAmount(response.data.conversion_result.toFixed(2));
        } else {
          alert('An error occurred while converting the currency.');
        }
      })
      .catch(error => {
        console.error('Error fetching exchange rates:', error);
        if (error.code === 'ECONNABORTED') {
          alert('The request took too long - please try again.');
        } else if (error.response && error.response.status === 401) {
          alert('Unauthorized access - please check your API key.');
        } else {
          alert('An error occurred while fetching the exchange rates.');
        }
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-800">
      <div className="p-6 bg-white dark:bg-gray-700 shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-900 dark:text-gray-100">Currency Converter</h2>

        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-200">Amount:</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full p-2 border rounded text-gray-900 dark:text-gray-100 bg-gray-100 dark:bg-gray-800"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-200">From:</label>
          <select
            value={fromCurrency}
            onChange={(e) => setFromCurrency(e.target.value)}
            className="w-full p-2 border rounded text-gray-900 dark:text-gray-100 bg-gray-100 dark:bg-gray-800"
          >
            {currencies.map(currency => (
              <option key={currency} value={currency}>{currency}</option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-200">To:</label>
          <select
            value={toCurrency}
            onChange={(e) => setToCurrency(e.target.value)}
            className="w-full p-2 border rounded text-gray-900 dark:text-gray-100 bg-gray-100 dark:bg-gray-800"
          >
            {currencies.map(currency => (
              <option key={currency} value={currency}>{currency}</option>
            ))}
          </select>
        </div>

        <button
          onClick={handleConvert}
          className="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition-colors"
        >
          Convert
        </button>

        {convertedAmount !== null && (
          <div className="mt-4 text-center">
            <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              {amount} {fromCurrency} = {convertedAmount} {toCurrency}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CurrencyConverter;
