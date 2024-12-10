import React, { useState, useEffect } from "react";
import axios from "axios";


import { FaCalendarAlt } from "react-icons/fa";
import { MdBarChart } from "react-icons/md";
import { Line } from "react-chartjs-2";
import "react-calendar/dist/Calendar.css";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
} from "chart.js";
import Calendar from "react-calendar";
import ReactLoading from "react-loading";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip);

const TwoWaveChart = () => {
  const [chartSize, setChartSize] = useState({
    width: window.innerWidth < 768 ? "100%" : "90%",
    height: window.innerWidth < 768 ? "200px" : "350px",
  });
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });


  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setChartSize({
        width: window.innerWidth < 768 ? "100%" : "90%",
        height: window.innerWidth < 768 ? "200px" : "350px",
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
  };

  const onDateChange = (date) => {
    setSelectedDate(date);
    setShowCalendar(false);
  };

// Fetch data from API
const axiosInstance = axios.create({
  baseURL: "https://3qhglx2bhd.execute-api.us-east-1.amazonaws.com/task",
});

// Fetch data from API
useEffect(() => {
  const fetchData = async () => {
    setLoading(true); // Show loader
    try {
      const response = await axiosInstance.get("/projectDetails");
      const data = response.data;

      // Ensure the 'message' and 'projectwise' keys exist
      if (data.message && data.message.projectwise) {
        const processedData = processApiData(data.message.projectwise);
        setChartData(processedData);
      } else {
        console.error("API response does not include 'projectwise' key inside 'message'.");
        setChartData({ labels: [], datasets: [] }); // Fallback empty chart
      }
    } catch (error) {
      console.error("Error fetching API data:", error);
      setChartData({ labels: [], datasets: [] }); // Fallback empty chart
    } finally {
      setLoading(false); // Hide loader
    }
  };

  fetchData();
}, []);

// Process API data
const processApiData = (apiData) => {
  const months = ["nov", "dec", "jan", "feb", "mar"];
  const labels = months.map((month) => month.toUpperCase());

  const datasets = Object.entries(apiData)
    .map(([project, data]) => {
      const values = months.map((month) => data[month] || 0);
      return {
        label: project,
        data: values,
        backgroundColor: "transparent",
        borderColor: getColor(project),
        pointBorderColor: "transparent",
        pointBorderWidth: 4,
        tension: 0.3,
        spanGaps: true,
      };
    })
    .filter((dataset) => dataset.data.some((value) => value > 0));

  return { labels, datasets };
};

 

const getColor = (project) => {
  const predefinedColors = {
    "Task M": "#6AD2FF",
    Textaile: "#01C2B5",
    others: "#FFA500",
  };

  if (predefinedColors[project]) {
    return predefinedColors[project];
  }

  // Generate random dark color
  const randomDarkColor = `#${Math.floor(Math.random() * 128).toString(16).padStart(2, '0')}${Math.floor(Math.random() * 128).toString(16).padStart(2, '0')}${Math.floor(Math.random() * 128).toString(16).padStart(2, '0')}`;
  return randomDarkColor;
};

const options = {
  responsive: true,
  aspectRatio: window.innerWidth < 768 ? 2 : 3,
  plugins: {
    legend: { display: true ,
      labels: {
        font: { size: 16 }, // Increase font size of wave headings
        color: "#000", // Optional: Adjust color if needed
      },
    },
    tooltip: {
      enabled: true,
      backgroundColor: "#05CD99",
      titleColor: "#fff",
      bodyColor: "#fff",
      borderColor: "#fff",
      borderWidth: 1,
      displayColors: false,
      padding: 10,
      bodyFont: { size: 14, weight: "bold" },
      cornerRadius: 8,
      callbacks: {
        title: () => "",
        label: (context) => `${context.raw} hrs`, // Tooltip label in hours
      },
    },
  },
  maintainAspectRatio: false,
  scales: {
    x: {
      grid: { display: false },
      ticks: { padding: 10, maxTicksLimit: 6 },
    },
    y: {
      display: true,
      ticks: {
        stepSize: 10,
        callback: (value) => `${value} hrs`,
        font: { size: 14 }, // Show values in hours
      },
      grid: { display: false },
    },
  },
};

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <ReactLoading type="spin" color="#00bfa6" height={55} width={55} />
      </div>
    );

  return (
    <div className="w-full max-w-screen-lg mx-auto relative flex flex-col pb-0">
      <div
        className="absolute top-0 left-0 flex items-center text-gray-400 bg-blue-50 p-2 rounded-md cursor-pointer"
        onClick={toggleCalendar}
      >
        <FaCalendarAlt className="text-sm" />
        <span className="ml-2 text-sm sm:text-base md:text-lg">This Month</span>
      </div>

      {showCalendar && (
        <div className="absolute top-12 left-0 z-10 bg-white shadow-lg p-4 rounded-lg">
          <Calendar onChange={onDateChange} value={selectedDate} />
        </div>
      )}

      <div className="absolute top-0 right-0 flex items-center justify-center text-teal-500 text-2xl sm:text-3xl rounded-full bg-blue-50 w-12 h-12">
        <MdBarChart className="text-4xl" />
      </div>

      <div className="flex sm:flex-row flex-col">
        <div className="flex flex-col items-start mt-16">
          <div className="text-blue-900 font-bold text-2xl sm:text-3xl">3 Projects</div>
          <div className="flex items-center text-green-600 text-lg mt-2">
            <span className="text-lg font-bold text-teal-500">On Track</span>
          </div>
        </div>
     

        <div className="relative w-full mt-16 flex justify-end mr-12">
        <div
        style={{
          width: chartSize.width,
          height: chartSize.height,
          maxWidth: "700px",
        }}
      >
        <Line data={chartData} options={options} />
      </div>
      </div>
    
        
       
        </div>
      
    </div>
  );
};

export default TwoWaveChart;
