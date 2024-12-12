import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactLoading from 'react-loading';
import 'react-calendar/dist/Calendar.css';

import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip
} from 'chart.js';

// Import the Bar chart component from react-chartjs-2
import { Bar } from 'react-chartjs-2';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip);

const WaveChartWithDateSelector = () => {
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });
  const [loading, setLoading] = useState(false);

  // Fetch project data based on the default date range (2024-12-11)
  const fetchProjectData = async () => {
    setLoading(true);
    try {
      const response = await axios.post('https://3qhglx2bhd.execute-api.us-east-1.amazonaws.com/task/getProjectData', {
        startDate: "2024-12-11",  // Default date range
        endDate: "2024-12-11"
      });

      const data = response.data;
      if (data.status === 200) {
        processDataForChart(data.message.projectwise);
      }
    } catch (error) {
      console.error('Error fetching project data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Process API data and format it for the chart
  const processDataForChart = (projectwiseData) => {
    const projects = Object.keys(projectwiseData);
    const labels = projects;  // Set project names as labels on the X-axis

    // Create datasets for each project, each bar with a random color
    const datasets = [
      {
        label: 'Project Hours',
        data: projects.map((project) => projectwiseData[project] || 0),  // Set project hours as Y-values
        backgroundColor: projects.map(() => getRandomColor()),  // Random color for each bar
        borderColor: 'transparent',  // No border for bars
        borderWidth: 1,
        barThickness: 60,  // Reduce bar width
      }
    ];

    setChartData({ labels, datasets });
  };

  // Function to generate random color
  const getRandomColor = () => {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  };

  // Fetch project data when the component mounts
  useEffect(() => {
    fetchProjectData();
  }, []);

  // Chart options
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          generateLabels: (chart) => {
            const labels = chart.data.labels;
            const datasets = chart.data.datasets;
            
            // Check if datasets are available and if the backgroundColor exists
            if (datasets && datasets[0] && datasets[0].backgroundColor) {
              const colors = datasets[0].backgroundColor;
              return labels.map((label, i) => ({
                text: `${label}`,  // Display project name
                fillStyle: colors[i] || 'rgba(0, 0, 0, 0.1)',  // Use the corresponding color for each label or a fallback
              }));
            } else {
              // Return default labels if no dataset or color is available
              return labels.map(label => ({
                text: label,
                fillStyle: 'rgba(0, 0, 0, 0.1)',  // Fallback color
              }));
            }
          },
          boxWidth: 20,
          padding: 15
        }
      },
      tooltip: {
        callbacks: {
          label: (context) => `${context.raw} hrs`  // Tooltip showing hours
        }
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        },
        ticks: {
          // Ensure project names are shown on the X-axis
          callback: (value) => value
        }
      },
      y: {
        grid: { display: false },
        ticks: {
          stepSize: 1,  // Set stepSize to 1 for hours increments
          callback: (value) => `${value} hrs`
        }
      }
    }
  };
  

  return (
    <div className="w-full max-w-screen-lg mx-auto">
      {/* Loading Spinner */}
      {loading ? (
        <div className="flex justify-center items-center min-h-screen">
          <ReactLoading type="spin" color="#00bfa6" height={55} width={55} />
        </div>
      ) : (
        <div className="flex flex-col ">
          <div className="flex flex-row gap-9">
            <div className="flex flex-col gap-3"><div className="text-blue-900 font-bold text-xl sm:text-3xl mt-16">{`${chartData.labels.length} Projects`}

            </div>
            <div className="text-blue-900 font-bold text-xl sm:text-2xl ">December </div>
            <div className="text-green-900 font-bold">On Track</div>
            
            </div>
          
          <div style={{ width: '100%', height: '350px', maxWidth: '750px' }}>
            <Bar data={chartData} options={options} />
          </div>
          </div>
        
        </div>
      )}
    </div>
  );
};

export default WaveChartWithDateSelector;
