import React, { useState } from 'react';
import './assets/css/Main.css';
import StockChart from './StockChart';
import axios from 'axios';

const tickerSymbols = ['AAPL', 'MSFT', 'TSLA', 'AMZN', 'META'];

function Main() {
  const [selectedTicker, setSelectedTicker] = useState(tickerSymbols[0]);
  const [selectedStartDate, setSelectedStartDate] = useState('');
  const [selectedEndDate, setSelectedEndDate] = useState('');
  const [stockData, setStockData] = useState([]);
  const [showChart, setShowChart] = useState(false);

  const handleStartDateChange = (event) => {
    setSelectedStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setSelectedEndDate(event.target.value);
  };

  const handleStockChange = (stockName) => {
    setSelectedTicker(stockName);
  };

  const handleShowChart = () => {
    // Toggle the showChart state
    setShowChart(!showChart);
    if (!showChart) {
      // Fetch data when showing the chart
      fetchData(selectedTicker, selectedStartDate, selectedEndDate);
    }
  };

  const fetchData = async (stockName, startDate, endDate) => {
    try {
      const response = await axios.get(`https://gen-flowly-kfrp.vercel.app/api/stock/${stockName}?startDate=${startDate}&endDate=${endDate}`);
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

  return (
    <div className="stock_container">
      <div className="options">
        <h2>Select Stock: {selectedTicker}</h2>
        <div className="name">
          {tickerSymbols.map((ticker) => (
            <button
              key={ticker}
              className={`btn ${selectedTicker === ticker ? 'active' : ''}`}
              onClick={() => handleStockChange(ticker)}
            >
              {ticker}
            </button>
          ))
          }
        </div>
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
        <button className='btn' onClick={handleShowChart}>
          {showChart ? 'Hide Chart' : 'Show Chart'}
        </button>
      </div>
      <div className="chart">
        {showChart && <StockChart data={stockData} />}
      </div>
    </div>
  );
}

export default Main;
