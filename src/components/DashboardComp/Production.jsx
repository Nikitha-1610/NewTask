import { FaCheckCircle, FaExclamationCircle } from "react-icons/fa";
import React, { useState,useRef } from "react";


const SemiCircularProgressBar = ({ value1, value2 }) => {
  const isMobile = window.innerWidth <= 768; // Example breakpoint for mobile screens
  const radius = isMobile ? 70 : 130; 
  const strokeWidth = 17; // Thickness of the stroke
  const circumference = 2 * Math.PI * radius; // Full circle circumference
  const semicircle = circumference / 2; // Only the semicircle part

  // Calculate stroke offsets for the values
  const offset1 = semicircle - (value1 / 100) * semicircle; // For faint color
  const offset2 = semicircle - (value2 / 100) * semicircle; // For darker color

  const [tooltip, setTooltip] = useState(null);
  const containerRef = useRef(null);

  const handleMouseMove = (event) => {
    const container = containerRef.current;
    if (!container) return;

    const { left, top, width, height } = container.getBoundingClientRect();
    const mouseX = event.clientX - left; // Position relative to the container
    const mouseY = event.clientY - top;

    // Calculate tooltip position ensuring it stays within the container
    const tooltipWidth = 100; // Estimated tooltip width
    const tooltipHeight = 40; // Estimated tooltip height
    const constrainedLeft = Math.max(0, Math.min(mouseX, width - tooltipWidth));
    const constrainedTop = Math.max(0, Math.min(mouseY, height - tooltipHeight));

    setTooltip({
      top: constrainedTop,
      left: constrainedLeft,
      value: `${value1}% and ${value2}%`,
    });
  };

  const handleMouseLeave = () => {
    setTooltip(null);
  };

  return (
    <div
      ref={containerRef}
      className="relative flex justify-center items-center overflow-hidden" // Ensure overflow is hidden
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <svg
        width={radius * 2 + strokeWidth}
        height={radius + strokeWidth}
        viewBox={`0 0 ${radius * 2 + strokeWidth} ${radius + strokeWidth}`}
      >
        {/* Background circle (gray semicircle) */}
        <path
          d={`M ${strokeWidth / 2},${radius + strokeWidth / 2} 
              A ${radius},${radius} 0 0,1 ${radius * 2 + strokeWidth / 2},${
            radius + strokeWidth / 2
          }`}
          fill="none"
          stroke="#FCC590"
          strokeWidth={strokeWidth}
        />

        {/* Faint color for value1 */}
        <path
          d={`M ${strokeWidth / 2},${radius + strokeWidth / 2} 
              A ${radius},${radius} 0 0,1 ${radius * 2 + strokeWidth / 2},${
            radius + strokeWidth / 2
          }`}
          fill="none"
          stroke="#FCC590"
          strokeWidth={strokeWidth}
          strokeDasharray={semicircle}
          strokeDashoffset={offset1}
        />

        {/* Darker color for value2 */}
        <path
          d={`M ${strokeWidth / 2},${radius + strokeWidth / 2} 
              A ${radius},${radius} 0 0,1 ${radius * 2 + strokeWidth / 2},${
            radius + strokeWidth / 2
          }`}
          fill="none"
          stroke="#C25F01"
          strokeWidth={strokeWidth}
          strokeDasharray={semicircle}
          strokeDashoffset={offset2}
        />
      </svg>

      {/* Tooltip */}
      {tooltip && (
        <div
          className="absolute bg-gray-800 text-white text-xs px-2 py-1 rounded"
          style={{
            top: `${tooltip.top}px`,
            left: `${tooltip.left}px`,
            transform: "translate(-50%, -50%)",
            pointerEvents: "none",
          }}
        >
          {tooltip.value}
        </div>
      )}
    </div>
  );
};

const Production = ({ projectDetails }) => {
  return (
    <div className="flex flex-col md:flex-row justify-between gap-4 items-stretch p-0 sm:h-auto h-auto mt-0">
      {/* Left Section */}
      <div className="flex flex-col gap-4 border-2 border-gray-100 p-4 rounded-xl sm:basis-[40%] w-full h-[300px] sm:h-[350px] md:h-[400px] lg:h-[350px] overflow-hidden">
        <h2 className="text-lg sm:text-2xl font-bold text-gray-800 mb-4">
          Production (Overall)
        </h2>

        {/* SVG Display as a Progress Representation */}
        <div className="flex items-center justify-center mt-0 sm:mt-0 w-full h-[200px]">
          <SemiCircularProgressBar value1={35} value2={45} />
        </div>

        {/* Stats Section */}
        <div className="flex justify-between items-center mt-4">
          {/* Left Stats */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-3 h-3 sm:w-5 sm:h-5"
              viewBox="0 0 20 21"
              fill="none"
            >
              <circle cx="10" cy="10.5" r="10" fill="#C25F01" />
            </svg>
            <div>
              <div className="text-sm sm:text-sm font-bold text-gray-800">
                35%
              </div>
              <div className="text-sm sm:text-sm text-gray-500">October</div>
            </div>
          </div>

          {/* Right Stats */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-3 h-3 sm:w-5 sm:h-5"
              viewBox="0 0 20 21"
              fill="none"
            >
              <circle cx="10" cy="10.5" r="10" fill="#FCC590" />
            </svg>
            <div>
              <div className="text-sm sm:text-sm font-bold text-gray-800">
                46%
              </div>
              <div className="text-sm sm:text-sm text-gray-500">This Month</div>
            </div>
          </div>
        </div>
      </div>
      

      {/* right section */}

      {/* <div className="border-2 border-black-2 p-3 lg:p-4 rounded-xl flex flex-col sm:w-full md:w-full lg:w-[62.5%] xl:w-[62.5%] h-[400px]"> */}
      <div className=" border-2 border-gray-100 p-3 lg:p-4 rounded-xl flex flex-col w-full lg:w-3/5 h-[300px] sm:h-[350px] md:h-[400px] lg:h-[350px] m-0">
        <h3 className="text-2xl font-bold text-blue-800 leading-tight mb-3">
          Complex Table
        </h3>
        <div className="overflow-auto h-full">
          <table className="w-full border-collapse text-base">
          <thead className="sticky top-0 bg-white z-10 border-b-2 border-gray-200">
              <tr className="border-b-2 border-gray-200">
                <th className="font-medium text-gray-400 px-2 py-3 text-left">
                  NAME
                </th>
                <th className="font-medium text-gray-400 px-2 py-3 text-left">
                  STATUS
                </th>
                <th className="font-medium text-gray-400 px-2 py-3 text-left">
                  DATE
                </th>
                {/* <th className="font-medium text-gray-400 px-2 py-3 text-left">
                  PROGRESS
                </th> */}
              </tr>
            </thead>
            <tbody className="overflow-y-auto">
        {projectDetails?.map((row, index) => (
          <tr key={index} className="border-b border-gray-100">
            <td className="px-2 py-3 text-[#2B3674] text-sm md:text-base font-bold">
              {row.projectName}
            </td>
            <td className="px-2 py-3 text-[#2B3674] text-sm md:text-base font-bold flex">
              {row.projectStatus === "Assigned" ? (
                <FaCheckCircle
                  className="text-[#05CD99] mr-2"
                  size={20}
                />
              ) : (
                <FaExclamationCircle
                  className="text-[#FFCE20] mr-2"
                  size={20}
                />
              )}
              {row.projectStatus}
            </td>
            <td className="px-2 py-3 text-[#2B3674] text-xs sm:text-sm md:text-base font-bold text-center">
              {row.projectEndDate}
            </td>
            {/* <td className="px-2 py-3 text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-full max-w-[97px] h-3"
                viewBox="0 0 99 9"
                fill="none"
              >
                <rect
                  x="0.966797"
                  y="0.958984"
                  width="97.6744"
                  height="7.23514"
                  rx="3.61757"
                  fill="#E4F8F6"
                />
                <rect
                  x="0.966797"
                  y="0.958984"
                  width={`${
                    row.progress ? (row.progress / 100) * 97.6744 : 50 * 97.6744 / 100 // default to 50% if no progress
                  }`}
                  height="7.23514"
                  rx="3.61757"
                  fill="#01C2B5"
                />
              </svg>
            </td> */}
          </tr>
        ))}
      </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// Data for Table Rows
// const data = [
//   {
//     name: "Design Website",
//     status: "Assigned",
//     date: "18-Apr-12",
//     progress: 60,
//   },
//   {
//     name: "Website Development",
//     status: "Assigned",
//     date: "18-Apr-12",
//     progress: 20,
//   },
//   {
//     name: "Website Testing",
//     status: "Pending",
//     date: "20-May-21",
//     progress: 40,
//   },
//   { name: "Debugging", status: "Assigned", date: "22-May-21", progress: 70 },
// ];

export default Production;
