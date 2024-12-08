import React, { useState, useEffect } from "react";
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
// Register chart components
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip);

const TwoWaveChart = () => {
  const [chartSize, setChartSize] = useState({
    width: window.innerWidth < 768 ? "100%" : "90%",
    height: window.innerWidth < 768 ? "200px" : "350px",
  });

  // Update chart size on window resize
  useEffect(() => {
    const handleResize = () => {
      setChartSize({
        width: window.innerWidth < 768 ? "100%" : "90%",
        height: window.innerWidth < 768 ? "200px" : "350px",
      });
    };

    window.addEventListener("resize", handleResize);

   

    // Cleanup the event listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());


  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
  };

  const onDateChange = (date) => {
    setSelectedDate(date);
    setShowCalendar(false); // Close calendar after date selection
  };

  
  // Data for the chart
  const data = {
    labels: ["SEP", " ", "OCT", " ", "NOV", " ", "DEC", " ", "JAN", " ", "FEB"],
    datasets: [
      {
        label: "Blue Waves",
        data: [3, 4, 2, null, 4.5, null, 1.5, null, 4, 3.5, 4],
        backgroundColor: "transparent",
        borderColor: "#6AD2FF",
        pointBorderColor: "transparent",
        pointBorderWidth: 4,
        tension: 0.3,
        spanGaps: true,
      },
      {
        label: "Green Waves",
        data: [6, 6.5, 4.1, null, 7.3, null, 3.8, null, 7.4, 7.3, 7.4],
        backgroundColor: "transparent",
        borderColor: "#01C2B5",
        pointBorderColor: "transparent",
        pointBorderWidth: 4,
        tension: 0.3,
        spanGaps: true,
      },
    ],
  };

  // Chart options
  const options = {
    responsive: true,
    aspectRatio: window.innerWidth < 768 ? 2 : 3,
    plugins: {
      legend: { display: false },
      tooltip: {
        enabled: true,
        backgroundColor: "#05CD99",
        titleColor: "#fff",
        bodyColor: "#fff",
        borderColor: "#fff",
        borderWidth: 1,
        displayColors: false,
        padding: 10,
        bodyFont: { size: 16, weight: "bold" },
        cornerRadius: 8,
        callbacks: {
          title: () => "",
          label: (context) => `${context.raw}K`,
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
        display: false,
        min: 0,
        max: 8,
        ticks: { stepSize: 2, callback: (value) => `${value}K` },
        grid: { display: false },
      },
    },
  };

  return (
    <div className="w-full max-w-screen-lg mx-auto relative flex flex-col pb-0">
     {/* Calendar Icon on the Top Left */}
     <div
        className="absolute top-0 left-0 flex items-center text-gray-400 bg-blue-50 p-2 rounded-md cursor-pointer"
        onClick={toggleCalendar}
      >
        <FaCalendarAlt className="text-sm" />
        <span className="ml-2 text-sm sm:text-base md:text-lg">This Month</span>
      </div>

      {/* Calendar Popup */}
      {showCalendar && (
        <div className="absolute top-12 left-0 z-10 bg-white shadow-lg p-4 rounded-lg">
          <Calendar onChange={onDateChange} value={selectedDate} />
        </div>
      )}


      {/* Bar Graph Icon on the Top Right */}
      <div className="absolute top-0 right-0 flex items-center justify-center text-teal-500 text-2xl sm:text-3xl rounded-full bg-blue-50 w-12 h-12">
        <MdBarChart className="text-4xl" />
      </div>

      {/* Heading Section */}
      <div className="flex sm:flex-row flex-col ">
        <div className=" flex flex-col items-start mt-16 top-28">
          <div className="text-blue-900 font-bold text-2xl sm:text-3xl">3 Projects</div>
          <div className="flex items-center text-green-600 text-lg mt-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 23 23"
            >
              <path
                d="M11.5166 2.41797C6.52434 2.41797 2.47266 6.46965 2.47266 11.4619C2.47266 16.4541 6.52434 20.5058 11.5166 20.5058C16.5088 20.5058 20.5605 16.4541 20.5605 11.4619C20.5605 6.46965 16.5088 2.41797 11.5166 2.41797ZM9.06568 15.3417L5.81891 12.095C5.4662 11.7423 5.4662 11.1725 5.81891 10.8198C6.17162 10.4671 6.74139 10.4671 7.0941 10.8198L9.7078 13.4244L15.93 7.20221C16.2827 6.84949 16.8525 6.84949 17.2052 7.20221C17.5579 7.55492 17.5579 8.12469 17.2052 8.4774L10.3409 15.3417C9.9972 15.6945 9.41839 15.6945 9.06568 15.3417Z"
                fill="#05CD99"
              />
            </svg>
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
            <Line data={data} options={options} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TwoWaveChart;
