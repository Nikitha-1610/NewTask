import React from 'react';
import { FaCalendarAlt } from 'react-icons/fa';
import { MdBarChart } from 'react-icons/md';

const TwoWaveChart = () => {
  return (
    <div className="p-5 bg-gray-100 rounded-lg w-full max-w-[1037px] mx-auto relative flex flex-col sm: items-center font-[sans-serif]">
      {/* Calendar Icon on the Top Left */}
      <div className="absolute top-2 left-2 flex items-center text-[#A3AED0] bg-[#F4F7FE] p-1.5 rounded-md">
        <FaCalendarAlt size={17} />
        <span className="ml-2 text-sm md:text-base">This Month</span>
      </div>

      {/* Bar Graph Icon on the Top Right */}
      <div className="absolute top-2 right-2 text-[#01C2B5] text-2xl sm:text-3xl">
        <MdBarChart size={35} />
      </div>

      {/* Heading */}
      <div className="mt-10 text-[#2B3674] font-bold text-2xl sm:text-3xl sm:align start">
        3 Projects
      </div>

      {/* On Track Word */}
      <div className="mt-4 flex items-center text-darkgreen text-lg">
        <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 23 23" fill="none">
          <path
            d="M11.5166 2.41797C6.52434 2.41797 2.47266 6.46965 2.47266 11.4619C2.47266 16.4541 6.52434 20.5058 11.5166 20.5058C16.5088 20.5058 20.5605 16.4541 20.5605 11.4619C20.5605 6.46965 16.5088 2.41797 11.5166 2.41797ZM9.06568 15.3417L5.81891 12.095C5.4662 11.7423 5.4662 11.1725 5.81891 10.8198C6.17162 10.4671 6.74139 10.4671 7.0941 10.8198L9.7078 13.4244L15.93 7.20221C16.2827 6.84949 16.8525 6.84949 17.2052 7.20221C17.5579 7.55492 17.5579 8.12469 17.2052 8.4774L10.3409 15.3417C9.9972 15.6945 9.41839 15.6945 9.06568 15.3417Z"
            fill="#05CD99"
          />
        </svg>
        <span className="ml-2 text-lg text-[#01C2B5] font-bold">On Track</span>
      </div>

      {/* Wave Section */}
      <div className="relative mt-8 w-full flex flex-col items-center">
        <svg className="w-full max-w-[300px] sm:max-w-[600px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 727 115" fill="none">
          <path
            d="M23.6152 48.2823C45.6353 43.9727 97.1716 36.6463 127.156 41.8179C164.637 48.2823 176.35 73.1452 205.866 65.6863C235.383 58.2274 299.569 5.51769 344.078 26.9C388.586 48.2823 403.11 104.473 458.394 65.6863C513.679 26.9 508.994 6.51232 554.908 10.4904C600.822 14.4685 676.253 27.8945 703.426 10.4904"
            stroke="#01C2B5"
            strokeWidth="4"
            strokeLinecap="round"
          />
        </svg>
        <svg className="w-full max-w-[300px] sm:max-w-[600px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 727 115" fill="none">
          <path
            d="M23.6152 48.2823C45.6353 43.9727 97.1716 36.6463 127.156 41.8179C164.637 48.2823 176.35 73.1452 205.866 65.6863C235.383 58.2274 299.569 5.51769 344.078 26.9C388.586 48.2823 403.11 104.473 458.394 65.6863C513.679 26.9 508.994 6.51232 554.908 10.4904C600.822 14.4685 676.253 27.8945 703.426 10.4904"
            stroke="#4C78A8"
            strokeWidth="4"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Month Labels */}
      <div className="w-full max-w-[727px] sm:max-w[600px] mt-4 flex justify-between text-sm text-[#A3AED0]">
        <span>SEP</span>
        <span>OCT</span>
        <span>NOV</span>
        <span>DEC</span>
        <span>JAN</span>
        <span>FEB</span>
      </div>
    </div>
  );
};

export default TwoWaveChart;
