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
        barPercentage: 0.5,
        categoryPercentage: 1.5,
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
    <div className="w-[90%] mx-auto p-5">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-xl font-semibold">Production</h2>
        <select
          value={period}
          onChange={handleSelectorChange}
          className="px-4 py-1 text-base border border-gray-300 rounded-md"
        >
          <option value="Weekly">Weekly</option>
          <option value="Monthly">Monthly</option>
          <option value="Yearly">Yearly</option>
        </select>
      </div>
      <div className="relative h-[300px] flex justify-center">
        <Bar data={getChartData()} options={options} />
      </div>
    </div>
  );
};

export default WeeklyProduction;
