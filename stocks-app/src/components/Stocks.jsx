import React, { useEffect, useState } from 'react';
import axios from 'axios';
import StockChart from './StockChart';
import './assets/css/Stocks.css';

const tickerSymbols = ['AAPL', 'MSFT', 'TSLA', 'AMZN', 'META'];

function Stocks() {
  const [stockData, setStockData] = useState([]);
  const [selectedTicker, setSelectedTicker] = useState(tickerSymbols[0]);
  const [selectedStartDate, setStartSelectedStartDate] = useState('');
  const [selectedEndDate, setEndSelectedDate] = useState('');

  useEffect(() => {
    fetchData(selectedTicker, selectedStartDate, selectedEndDate);
  }, [selectedTicker, selectedStartDate, selectedEndDate]);

  const fetchData = async (stockName, startDate, endDate) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/stock/${stockName}?startDate=${startDate}&endDate=${endDate}`);
      if (response.status === 200) {
        const data = response.data;
        setStockData(data);
      } else {
        console.error('Error fetching data:', response.status);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleStockChange = (event) => {
    setSelectedTicker(event.target.value);
  };

  const handleStartDateChange = (event) => {
    setStartSelectedStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndSelectedDate(event.target.value);
  };

  return (
    <div className="Stocks">
      <h1>Select Stocks</h1>
      <div className="name">
        <label htmlFor="stockSelect">Select Stock:</label>
        <select
          id="stockSelect"
          onChange={handleStockChange}
          value={selectedTicker}
        >
          {tickerSymbols.map((ticker) => (
            <option key={ticker} value={ticker}>
              {ticker}
            </option>
          ))}
        </select>
      </div>
      <h1>Date Range</h1>
      <div className="options">
        <label htmlFor="startDatePicker">Select Start Date:</label>
        <input
          type="date"
          id="startDatePicker"
          name="startDatePicker"
          onChange={handleStartDateChange}
          value={selectedStartDate}
        />
        <label htmlFor="endDatePicker">Select End Date:</label>
        <input
          type="date"
          id="endDatePicker"
          name="endDatePicker"
          onChange={handleEndDateChange}
          value={selectedEndDate}
        />
      </div>
      <h1>Stock Data for {selectedTicker}</h1>
      <StockChart data={stockData} />
    </div>
  );
}

export default Stocks;
