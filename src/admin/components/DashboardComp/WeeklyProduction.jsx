import { useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register necessary components for Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const WeeklyProduction = ({ weeklyData, monthlyData, yearlyData }) => {
  // Set initial selector state
  const [period, setPeriod] = useState("Yearly");

  // Function to handle dynamic colors based on comparison of adjacent bars
  const getBarColors = (data) => {
    return data.map((value, index) => {
      if (index === 0) return "#01C2B5"; // No previous bar to compare with
      const prevValue = data[index - 1];
      return value > prevValue ? "#01C2B5" : "#C7F1EF"; // Darker if value is higher than the previous one
    });
  };

  // Function to get the appropriate data based on the selected period
  const getChartData = () => {
    let data = [];
    let labels = [];
    let title = "";

    if (period === "Weekly") {
      labels = Object.keys(weeklyData.taskHoursByDepartment);
      data = Object.values(weeklyData.taskHoursByDepartment);
      title = "Weekly Production";
    } else if (period === "Monthly") {
      labels = Object.keys(monthlyData.taskHoursByDepartment);
      data = Object.values(monthlyData.taskHoursByDepartment);
      title = "Monthly Production";
    } else {
      labels = Object.keys(yearlyData.taskHoursByDepartment);
      data = Object.values(yearlyData.taskHoursByDepartment);
      title = "Yearly Production";
    }

    return {
      labels: labels,
      datasets: [
        {
          label: title,
          data: data,
          backgroundColor: getBarColors(data),
          borderColor: "rgba(0, 0, 0, 0.1)",
          borderWidth: 1,
          borderRadius: 5,
        },
      ],
    };
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
          color: "gray",
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
          stepSize: 20,
          callback: (value) => `${value} hrs`,
          display: true,
          font: { size: 13 },
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
    <div className="w-11/12 mx-auto my-0 p-2">
      <div className="flex justify-between items-center">
        <h2 className="md:text-2xl text-lg font-medium text-gray-800 self-auto sm:relative left-0 top-0 mb-0">
          {period} Production
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="13"
              height="10"
              viewBox="0 0 13 8"
              fill="none"
            >
              <path
                d="M0.895102 1.68394C0.296353 1.04528 0.749199 0 1.62464 0H12.0082C12.8836 0 13.3365 1.04528 12.7377 1.68394L7.54594 7.22183C7.15087 7.64324 6.48194 7.64324 6.08687 7.22183L0.895102 1.68394Z"
                fill="#01C2B5"
              />
            </svg>
          </div>
        </div>
      </div>
      <div className="relative h-52 flex justify-center">
        <Bar data={getChartData()} options={options} />
      </div>
    </div>
  );
};

export default WeeklyProduction;
