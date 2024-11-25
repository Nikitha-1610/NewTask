import React from 'react';
import { FaCalendarAlt } from 'react-icons/fa';
import { MdBarChart } from 'react-icons/md';

const TwoWaveChart = () => {
  return (
    <div className="s:w-full  h-80 max-w-screen-lg mx-auto relative flex flex-col sm:items-center font-sans">
    {/* Calendar Icon on the Top Left */} 
    <div className="sm:absolute absolute top-0 left-0 flex items-center text-gray-400 bg-blue-50 sm:p-1 p-0.5 rounded-md">
      <FaCalendarAlt className="text-sm" />
      <span className="ml-0 text-sm sm:text-base md:text-lg">This Month</span>
    </div>

      {/* Bar Graph Icon on the Top Right */}
      <div className="absolute top-0 right-0 flex items-center justify-center text-teal-500 text-2xl sm:text-3xl rounded-full bg-blue-50 w-12 h-12">
    <MdBarChart className="text-4xl" />
  </div>
      {/* Heading */}
      <div className="sm:absolute sm:top-16 sm:left-0 sm:mt-2 mt-12 top-24 text-blue-900 font-bold text-2xl sm:text-3xl">
    3 Projects
  </div>
  
  {/* On Track Word */}
  <div className="sm:absolute sm:top-24 sm:left-0 sm:mt-4 mt-0 flex items-center text-green-600 text-lg">
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
    <span className="ml-2 text-lg font-bold text-teal-500">On Track</span>
  </div>

      {/* Wave Section */}  
      <div className="relative  sm:mt-36 w-full flex flex-col items-center">
  {/* Green SVG with white dot */}
  <div className="relative w-full  sm:max-w-2xl ">
    {/* Green SVG */}
    <svg
      className="absolute top-1/2 left-1/2"
      xmlns="http://www.w3.org/2000/svg"
      width="13"
      height="13"
      viewBox="0 0 15 15"
      fill="none"
      style={{
        top: "25%", // Approximate vertical placement (adjust based on wave path)
        left: "48%", // Approximate horizontal placement (adjust based on wave path)
        transform: "translate(-50%, -50%)",
        position: "absolute",
      }}
    >
      <circle cx="7.5" cy="7.5" r="7" fill="white" stroke="#01C2B5" strokeWidth="1" />
    </svg>
    <svg
      className="w-full"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 727 115"
      fill="none"
    >
      <path
        d="M23.6152 48.2823C45.6353 43.9727 97.1716 36.6463 127.156 41.8179C164.637 48.2823 176.35 73.1452 205.866 65.6863C235.383 58.2274 299.569 5.51769 344.078 26.9C388.586 48.2823 403.11 104.473 458.394 65.6863C513.679 26.9 508.994 6.51232 554.908 10.4904C600.822 14.4685 676.253 27.8945 703.426 10.4904"
        stroke="#01C2B5"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>

    <svg
      className="absolute"
      xmlns="http://www.w3.org/2000/svg"
      width="85"
      height="50"
      viewBox="0 0 96 52"
      fill="none"
      style={{
        top: "-10%", // Slightly above the white dot
        left: "48%", // Same horizontal alignment as the dot
        transform: "translate(-50%, -50%)",
        zIndex: 10, // Ensure it appears above other elements
      }}
    >
      <path
        d="M0 6.24218C0 2.92848 2.68629 0.242188 6 0.242188H90C93.3137 0.242188 96 2.92848 96 6.24219V38.6705C96 41.9842 93.3137 44.6705 90 44.6705H63.6693C58.2079 44.6705 53.023 47.073 49.4923 51.2397C48.711 52.1617 47.289 52.1617 46.5077 51.2397C42.977 47.073 37.7921 44.6705 32.3307 44.6705H6C2.68629 44.6705 0 41.9842 0 38.6705V6.24218Z"
        fill="#01C2B5"
      />
         <text
        x="50%"
        y="50%"
        textAnchor="middle"
        fill="white"
        fontSize="15"
        fontFamily="Arial, sans-serif"
        dominantBaseline="middle"
      >
        On 
        going
      </text>
    </svg>
    {/* White Dot SVG */}
   
  </div>

  {/* Blue SVG */}
  <svg
     className="w-full max-w-xs sm:max-w-2xl"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 727 115"
    fill="none"
  >
    <path
      d="M2.61523 39.7558C24.6353 35.4503 53.6831 13.2273 83.6678 18.3939C121.149 24.8521 137.078 67.5826 166.594 60.1308C196.111 52.679 274.94 9.54623 323.078 18.3939C382.579 29.3301 374.145 78.5051 429.43 39.7558C484.714 1.00643 518.447 24.3622 564.361 28.3365C610.275 32.3108 655.253 19.3875 682.426 2"
      stroke="#6AD2FF"
      strokeWidth="4"
      strokeLinecap="round"
    />
  </svg>
</div>


     
<div className="w-full max-w-xs sm:max-w-2xl flex justify-between text-sm text-gray-500 mt-2 relative overflow-hidden px-2 sm:px-4">

  <span className="truncate">SEP</span>
  <span className="truncate">OCT</span>
  <span className="truncate">NOV</span>
  <span className="truncate">DEC</span>
  <span className="truncate">JAN</span>
  <span className="truncate">FEB</span>
</div>

    </div>
  );
};

export default TwoWaveChart;

