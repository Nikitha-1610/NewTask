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
    width: window.innerWidth < 750 ? "80%" : "90%",
    height: window.innerWidth < 750 ? "180px" : "350px",
  });
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDateRange, setSelectedDateRange] = useState([new Date(), new Date()]);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });
  const [loading, setLoading] = useState(false);

  const isMobile = window.innerWidth < 750;

  useEffect(() => {
    const handleResize = () => {
      setChartSize({
        width: window.innerWidth < 750 ? "90%" : "90%",
        height: window.innerWidth < 750 ? "180px" : "350px",
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
  };

  const axiosInstance = axios.create({
    baseURL: "https://3qhglx2bhd.execute-api.us-east-1.amazonaws.com/task",
  });

  const fetchFilteredData = async (start, end) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/projectDetails");
      const data = response.data;

      if (data.message && data.message.projectwise) {
        const filteredData = processApiData(data.message.projectwise, start, end);
        setChartData(filteredData);
      } else {
        console.error(
          "API response does not include 'projectwise' key inside 'message'."
        );
        setChartData({ labels: [], datasets: [] });
      }
    } catch (error) {
      console.error("Error fetching API data:", error);
      setChartData({ labels: [], datasets: [] });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFilteredData(selectedDateRange[0], selectedDateRange[1]);
  }, [selectedDateRange]);

  const processApiData = (apiData, start, end) => {
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
          tension: 0.4,
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

    const randomDarkColor = `#${Math.floor(Math.random() * 128)
      .toString(16)
      .padStart(2, "0")}${Math.floor(Math.random() * 128)
      .toString(16)
      .padStart(2, "0")}${Math.floor(Math.random() * 128)
      .toString(16)
      .padStart(2, "0")}`;
    return randomDarkColor;
  };

  const options = {
    responsive: true,
    aspectRatio: window.innerWidth < 768 ? 2 : 3,
    plugins: {
      legend: {
        display: true,
        position: isMobile ? "top" : "right",
        align: "start",
        labels: {
          font: isMobile ? { size: 12 } : { size: 16 },
          color: "#000",
          boxWidth: 10,
          boxHeight: 10,
          padding: 5,
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
          label: (context) => `${context.raw} hrs`,
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
          font: { size: 14 },
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
    <div className="w-full max-w-screen-lg mx-auto relative flex flex-col pb-0 overflow-x-hidden">
      <div className="flex flex-col sm:flex-row justify-between items-center">
      <div className="relative">
  <div
    className="flex items-center text-gray-400 bg-blue-50 p-2 rounded-md cursor-pointer"
    onClick={toggleCalendar}
  >
    <FaCalendarAlt className="text-sm" />
    <span className="ml-2 text-sm sm:text-base md:text-lg">
      {`${selectedDateRange[0].toLocaleDateString()} - ${selectedDateRange[1].toLocaleDateString()}`}
    </span>
  </div>

  {showCalendar && (
    <div
      style={{
        position: "absolute",
        top: "100%",
        left: "0",
        zIndex: 10,
        background: "white", // Background color for calendar
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        borderRadius: "8px",
        overflow: "hidden",
      }}
    >
      <Calendar
        selectRange
        onChange={setSelectedDateRange}
        value={selectedDateRange}
      />
    </div>
  )}
</div>



        <div
          className={`flex items-center justify-center text-teal-500 text-2xl sm:text-3xl rounded-full bg-blue-50 w-12 h-12 ${
            isMobile ? "mt-4" : ""
          }`}
        >
          <MdBarChart className="text-4xl" />
        </div>
      </div>

      {showCalendar && (
        <Calendar
          selectRange
          onChange={setSelectedDateRange}
          value={selectedDateRange}
        />
      )}

      <div className="flex sm:flex-row flex-col mt-16">
        <div className="flex flex-col items-start">
          <div className="text-blue-900 font-bold text-xl sm:text-3xl">
            {`${chartData.datasets.length} Waves`}
          </div>
        </div>

        <div className="relative w-full mt-4 sm:mt-0 sm:ml-10">
          <div
            style={{
              width: chartSize.width,
              height: chartSize.height,
              maxWidth: "750px",
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
