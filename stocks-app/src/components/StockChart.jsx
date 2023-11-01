import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function StockChart({ data }) {
  if (!data || !data.results || data.results.length === 0) {
    
    return <span></span>;
  }

  const stockData = data.results[0];
  console.log(stockData)
  const labels = ['VW', 'Open', 'Close', 'High', 'Low'];
  const chartData = {
    labels,
    datasets: [
      {
        label: 'Stock Data',
        data: [
         
          stockData.vw,
          stockData.o,
          stockData.c,
          stockData.h,
          stockData.l,
         
          
        ],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Stock Chart',
      },
    },
  };

  return (
    <div>
      <Line data={chartData} options={chartOptions} />
    </div>
  );
}

export default StockChart;
