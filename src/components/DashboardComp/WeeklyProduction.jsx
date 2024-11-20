import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register necessary components for Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const WeeklyProduction = () => {
  // Set initial selector state
  const [period, setPeriod] = useState("Weekly");

  // Data for the Bar chart
  const weeklyData = {
    labels: ['Des', 'Dev', 'AI ML', 'Mar', 'Adm', 'HR', 'Soo', 'Sun', 'Sun', 'Sun', 'Sun'],
    datasets: [
      {
        label: 'Weekly Production',
        data: [6, 1, 2, 1, 6, 2, 5, 1, 4, 5, 3], // Weekly data
        backgroundColor: [
          '#01C2B5', '#C7F1EF', '#01C2B5', '#C7F1EF', '#01C2B5', '#C7F1EF', '#01C2B5', '#C7F1EF',
          '#01C2B5', '#01C2B5', '#01C2B5',
        ],
        borderColor: 'rgba(0, 0, 0, 0.1)',
        borderWidth: 1,
        borderRadius: 5,
      },
    ],
  };

  const monthlyData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'Monthly Production',
        data: [22, 15, 30, 25], // Monthly data
        backgroundColor: [
          '#01C2B5', '#C7F1EF', '#01C2B5', '#C7F1EF',
        ],
        borderColor: 'rgba(0, 0, 0, 0.1)',
        borderWidth: 1,
        borderRadius: 5,
      },
    ],
  };

  const yearlyData = {
    labels: ['Q1', 'Q2', 'Q3', 'Q4'],
    datasets: [
      {
        label: 'Yearly Production',
        data: [100, 120, 140, 110], // Yearly data
        backgroundColor: [
          '#01C2B5', '#C7F1EF', '#01C2B5', '#C7F1EF',
        ],
        borderColor: 'rgba(0, 0, 0, 0.1)',
        borderWidth: 1,
        borderRadius: 5,
      },
    ],
  };

  // Determine the data based on the selected period
  const getChartData = () => {
    if (period === "Weekly") {
      return weeklyData;
    } else if (period === "Monthly") {
      return monthlyData;
    } else {
      return yearlyData;
    }
  };

  // Options for the bar chart
  const options = {
    responsive: true,
    plugins: {
      title: {
        display: false,
      },
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        ticks: {
          display: true,
          color: 'grey',
          font: {
            size: 12,
          },
        },
        grid: {
          display: false,
        },
        barPercentage: 0.3, // Decrease this to increase the space between bars
        categoryPercentage: 0.9, // Increase this to reduce the gap between categories
      },
      y: {
        beginAtZero: true,
        ticks: {
          display: false,
        },
        grid: {
          display: false,
        },
      },
    },
  };
  

  // Handle selector box change
  const handleSelectorChange = (e) => {
    setPeriod(e.target.value);
  };

  return (
 <div className="w-11/12 mx-auto p-0">
  <div className="flex justify-between items-center mb-3">
    <h2 className="sm:text-2xl text-lg font-medium font-sans text-gray-800 self-auto sm:relative sm:left-0 sm:top-0 sm:mb-0 -left-14 -top-5 mb-20">
      Weekly Production
    </h2>

    <div className="relative flex items-center gap-1 sm:-right-12 -top-2">
      {/* Select Dropdown */}
      <select
        value={period}
        onChange={handleSelectorChange}
        className="appearance-none sm:px-7 px-3 py-1 text-sm sm:text-base border border-gray-200 rounded-2xl cursor-pointer font-sans font-medium"
      >
        <option value="Weekly">Weekly</option>
        <option value="Monthly">Monthly</option>
        <option value="Yearly">Yearly</option>
      </select>
      {/* SVG Icon */}
      <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
        <svg xmlns="http://www.w3.org/2000/svg" width="13" height="8" viewBox="0 0 13 8" fill="none">
          <path d="M0.895102 1.68394C0.296353 1.04528 0.749199 0 1.62464 0H12.0082C12.8836 0 13.3365 1.04528 12.7377 1.68394L7.54594 7.22183C7.15087 7.64324 6.48194 7.64324 6.08687 7.22183L0.895102 1.68394Z" fill="#01C2B5"/>
        </svg>
      </div>
    </div>
  </div>
  <div className="relative h-72 flex justify-center">
    <Bar data={getChartData()} options={options} />
  </div>
</div>

  );
};

export default WeeklyProduction;