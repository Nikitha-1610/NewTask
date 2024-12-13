import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaCalendarAlt } from "react-icons/fa";
import { MdBarChart } from "react-icons/md";
import { Line } from "react-chartjs-2";
import { AiOutlineClose } from "react-icons/ai"; // Cross icon
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
import WaveChartWithDateSelector from "./WaveChartWithDateSelector";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip);

const TwoWaveChart = () => {
  const [chartSize, setChartSize] = useState({
    width: window.innerWidth < 750 ? "80%" : "90%",
    height: window.innerWidth < 750 ? "180px" : "350px",
  });
  const [showCalendar, setShowCalendar] = useState(false);

  const [selectedDateRange, setSelectedDateRange] = useState([
    new Date("1970-01-01"),
    new Date("1970-01-01"),
  ]); // Default negligible value
  const [tempDateRange, setTempDateRange] = useState([
    new Date("1970-01-01"),
    new Date("1970-01-01"),
  ]);
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



  

  const [isDateRangeComplete, setIsDateRangeComplete] = useState(false);


  const handleDateChange = (index, date) => {
    const updatedRange = [...selectedDateRange];
    updatedRange[index] = new Date(date);
    setSelectedDateRange(updatedRange);

    // Check if both dates are selected
    if (updatedRange[0].getTime() !== new Date("1970-01-01").getTime() &&
        updatedRange[1].getTime() !== new Date("1970-01-01").getTime()) {
      setIsDateRangeComplete(true);
    }
  };

  const closeCalendarAndApply = () => {
    if (isDateRangeComplete) {
      setShowCalendar(false); // Close calendar only if both dates are selected
    }
  };

  useEffect(() => {
    if (isDateRangeComplete) {
      console.log("Fetching filtered data with date range:", selectedDateRange);
      // Call your data fetching logic here
    }
  }, [isDateRangeComplete, selectedDateRange]);

  const toggleCalendar = () => setShowCalendar((prev) => !prev);

  const resetDateRange = () => {
    setSelectedDateRange([new Date("1970-01-01"), new Date("1970-01-01")]);
    setTempDateRange([new Date("1970-01-01"), new Date("1970-01-01")]);
    setShowCalendar(false);
  };

  const handleTempDateChange = (index, date) => {
    const updatedRange = [...tempDateRange];
    updatedRange[index] = new Date(date);
    setTempDateRange(updatedRange);
  };

  const applyDateRange = () => {
    setSelectedDateRange([...tempDateRange]); // Set the selected range
    setShowCalendar(false); // Close the calendar
  };

  useEffect(() => {
    if (
      selectedDateRange[0].getTime() !== new Date("1970-01-01").getTime() &&
      selectedDateRange[1].getTime() !== new Date("1970-01-01").getTime()
    ) {
      console.log("Fetching filtered data with date range:", selectedDateRange);
      fetchFilteredData(selectedDateRange[0], selectedDateRange[1]);
    }
  }, [selectedDateRange])

  const fetchFilteredData = async (start, end) => {
    setLoading(true);
    try {
      const response = await axios.get("https://3qhglx2bhd.execute-api.us-east-1.amazonaws.com/task/projectDetails");
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
    console.log("Calendar visibility:", showCalendar);
  }, [showCalendar]);
  

  useEffect(() => {
    if (selectedDateRange[0] && selectedDateRange[1]) {
      fetchFilteredData(selectedDateRange[0], selectedDateRange[1]);
    }
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
    plugins: {
      legend: {
        display: true,
        position: isMobile ? "top" : "right",
        align: "start",
      },
      tooltip: {
        enabled: true,
        callbacks: {
          label: (context) => `${context.raw} hrs`,
        },
      },
    },
    scales: {
      x: { grid: { display: false } },
      y: {
        ticks: { callback: (value) => `${value} hrs` },
        grid: { display: false },
      },
    },
  };

  
  // const resetDateRange = () => {
  //   setSelectedDateRange([new Date("1970-01-01"), new Date("1970-01-01")]);
  //   setShowCalendar(false); // Close the calendar
  // };
  
  
  const minDate = new Date("2023-01-01");
  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <ReactLoading type="spin" color="#00bfa6" height={55} width={55} />
      </div>
    );

  return (
    <div className="w-full max-w-screen-lg mx-auto relative flex flex-col pb-0">
      <div className="flex flex-col sm:flex-row justify-between items-center">
      <div className="relative">
          <div
            className="flex items-center text-gray-400 bg-blue-50 p-2 rounded-md cursor-pointer"
            onClick={toggleCalendar}
          >
            <FaCalendarAlt className="text-sm" />
            <span className="ml-2 text-sm sm:text-base md:text-lg">
              {selectedDateRange[0].toISOString() === "1970-01-01T00:00:00.000Z"
                ? "Monthwise Data"
                : `${selectedDateRange[0].toLocaleDateString()} - ${selectedDateRange[1].toLocaleDateString()}`}
            </span>
            {selectedDateRange[0].toISOString() !== "1970-01-01T00:00:00.000Z" && (
              <AiOutlineClose
                className="ml-2 cursor-pointer text-red-500"
                onClick={resetDateRange}
              />
            )}
          </div>
          {showCalendar && (
  <div
    style={{
      position: "absolute",
      top: "100%",
      left: "50%",
      transform: "translateX(-50%)",
      zIndex: 10,
      background: "white",
      boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
      borderRadius: "8px",
      padding: "10px",
      width: "90%", // Responsive width for mobile screens
      maxWidth: "400px", // Maximum width for larger screens
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    }}
  >
    {/* Cross Icon to Close the Calendar */}
    <button
      onClick={() => setShowCalendar(false)}
      style={{
        position: "absolute",
        top: "10px",
        right: "10px",
        background: "transparent",
        border: "none",
        fontSize: "16px",
        cursor: "pointer",
      }}
    >
      ❌
    </button>

    {/* Start Date Input */}
    <div className="mb-4" style={{ width: "100%" }}>
      <label style={{ display: "block", marginBottom: "5px" }}>Start Date:</label>
      <input
        type="date"
        value={tempDateRange[0].toISOString().split("T")[0]}
        min="2020-01-01"
        onChange={(e) => handleTempDateChange(0, e.target.value)}
        style={{
          width: "100%",
          padding: "8px",
          borderRadius: "4px",
          border: "1px solid #ccc",
        }}
      />
    </div>

    {/* End Date Input */}
    <div className="mb-4" style={{ width: "100%" }}>
      <label style={{ display: "block", marginBottom: "5px" }}>End Date:</label>
      <input
        type="date"
        value={tempDateRange[1].toISOString().split("T")[0]}
        min="2020-01-01"
        onChange={(e) => handleTempDateChange(1, e.target.value)}
        style={{
          width: "100%",
          padding: "8px",
          borderRadius: "4px",
          border: "1px solid #ccc",
        }}
      />
    </div>

    {/* Apply Button */}
    <button
      onClick={applyDateRange}
      style={{
        background: "#3b82f6",
        color: "white",
        border: "none",
        borderRadius: "4px",
        padding: "8px 16px",
        cursor: "pointer",
        marginTop: "10px",
        alignSelf: "center",
      }}
    >
      Apply
    </button>
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

      <div className="flex sm:flex-row flex-col mt-8 gap-10">
  <div className="flex flex-col items-start mt-10">
    {/* Display the count only when the Line chart is shown */}
    {selectedDateRange[0].toISOString() === "1970-01-01T00:00:00.000Z" && (
      <div className="text-blue-900 font-bold text-xl sm:text-3xl">
        {`${chartData.datasets.length} Projects`}
      </div>
    )}
  </div>

  {selectedDateRange[0].toISOString() === "1970-01-01T00:00:00.000Z" ? (
    <div className="relative w-full mt-4">
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
  ) : (
    <WaveChartWithDateSelector selectedDateRange={selectedDateRange} />
  )}
</div>

    </div>
  );
};

export default TwoWaveChart;
