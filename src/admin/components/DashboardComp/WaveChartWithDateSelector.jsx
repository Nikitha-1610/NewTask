import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactLoading from 'react-loading';
import 'react-calendar/dist/Calendar.css';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip);

const WaveChartWithDateSelector = ({ selectedDateRange }) => {
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });
  const [loading, setLoading] = useState(false);
  const [chartOptions, setChartOptions] = useState({});
  const [containerStyle, setContainerStyle] = useState({});
  const startDate = selectedDateRange[0].toISOString();
  const endDate = selectedDateRange[1].toISOString();

  const defaultStartDate = "2024-12-01";
  const defaultEndDate = "2024-12-31";

  const effectiveStartDate = startDate || defaultStartDate;
  const effectiveEndDate = endDate || defaultEndDate;

  const getMonthName = (startDate) => {
    if (!startDate) return '';
    const options = { month: 'long' };
    return new Date(startDate).toLocaleDateString('en-US', options);
  };

  const monthName = getMonthName(effectiveStartDate);

  const updateChartStyles = () => {
    const width = window.innerWidth;
    const barThickness = width > 1024 ? 50 : width > 768 ? 40 : 25;
    const containerWidth = width > 850 ? '80%' : '95%';
    const containerHeight = width > 850 ? '400px' : '300px';
    const barPercentage = width < 850 ? 0.6 : 0.8; // Reduce gap on mobile

    setChartOptions({
      responsive: true,
      plugins: {
        legend: {
          position: width < 850 ? 'top' : 'right',
          labels: {
            generateLabels: (chart) => {
              const labels = chart.data.labels;
              const datasets = chart.data.datasets;
              if (datasets && datasets[0]?.backgroundColor) {
                const colors = datasets[0].backgroundColor;
                return labels.map((label, i) => ({
                  text: label,
                  fillStyle: colors[i] || 'rgba(0, 0, 0, 0.1)',
                }));
              }
              return labels.map((label) => ({
                text: label,
                fillStyle: 'rgba(0, 0, 0, 0.1)',
              }));
            },
          },
        },
        tooltip: {
          callbacks: {
            label: (context) => `${context.raw} hrs`,
          },
        },
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: { callback: (value) => value },
        },
        y: {
          grid: { display: false },
          ticks: {
            stepSize: 1,
            callback: (value) => `${value} hrs`,
          },
        },
      },
      barThickness, // Dynamic bar thickness
      barPercentage, // Reduce the gap between the bars
    });

    setContainerStyle({ width: containerWidth, height: containerHeight });
  };

  useEffect(() => {
    const handleResize = () => updateChartStyles();
    window.addEventListener('resize', handleResize);

    // Initial chart style setup
    updateChartStyles();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const fetchProjectData = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        'https://3qhglx2bhd.execute-api.us-east-1.amazonaws.com/task/getProjectData',
        { startDate: effectiveStartDate, endDate: effectiveEndDate }
      );

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

  const processDataForChart = (projectwiseData) => {
    const projects = Object.keys(projectwiseData);
    const labels = projects;

    const datasets = [
      {
        label: 'Project Hours',
        data: projects.map((project) => projectwiseData[project] || 0),
        backgroundColor: projects.map(() => getRandomColor()),
        borderColor: 'transparent',
        borderWidth: 1,
      },
    ];

    setChartData({ labels, datasets });
  };

  const getRandomColor = () => {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  };

  useEffect(() => {
    fetchProjectData();
  }, [effectiveStartDate, effectiveEndDate]);

  return (
    <div className="w-full max-w-screen-lg mx-auto">
      {loading ? (
        <div className="flex justify-center items-center min-h-screen">
          <ReactLoading type="spin" color="#00bfa6" height={55} width={55} />
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row lg:gap-3 items-center">
          <div className="flex flex-col"> <div className="text-blue-900 font-bold sm:text-3xl text-2xl mb-4">
            {`${chartData.labels.length} Projects`}
          </div>
          <div className="text-green-900 font-bold text-xl">{monthName}</div>
          <div className="text-green-900 font-bold text-base mb-6">On Track</div></div>
         
          <div style={containerStyle}>
            <Bar data={chartData} options={chartOptions} />
          </div>
        </div>
      )}
    </div>
  );
};

export default WaveChartWithDateSelector;
