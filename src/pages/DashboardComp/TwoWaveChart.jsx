import React from 'react';
import { FaChartBar, FaCalendarAlt } from 'react-icons/fa';
import { MdBarChart } from 'react-icons/md';

const TwoWaveChart = () => {
  return (
    <div className="p-5 bg-gray-100 rounded-lg w-full max-w-[1037px] h-auto mx-auto relative flex justify-center items-center flex-col font-[sans-serif] md:h-[400px]">
      {/* Calendar Icon on the Top Left */}
      <div className="absolute top-2 left-2 flex items-center text-[#A3AED0] bg-[#F4F7FE] p-1.5 rounded-md font-bold">
        <FaCalendarAlt size={17} />
        <span className="ml-2 text-sm md:text-base">This Month</span>
      </div>

      {/* Bar Graph Icon on the Top Right */}
      <div className="absolute top-2 right-2 text-[#01C2B5] text-2xl md:text-3xl">
        <MdBarChart size={35} />
      </div>

      {/* Heading and onTrack */}
      <div className="absolute top-16 left-2 text-[#2B3674] font-bold text-3xl font-[sans-serif] md:text-2xl">
        3 Projects
      </div>
      
      {/* onTrack Word */}
      <div className="absolute top-28 left-2 flex items-center text-darkgreen text-lg text-sm md:text-lg">
      <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 23 23" fill="none">
  <g clip-path="url(#clip0_102_18016)">
    <path d="M11.5166 2.41797C6.52434 2.41797 2.47266 6.46965 2.47266 11.4619C2.47266 16.4541 6.52434 20.5058 11.5166 20.5058C16.5088 20.5058 20.5605 16.4541 20.5605 11.4619C20.5605 6.46965 16.5088 2.41797 11.5166 2.41797ZM9.06568 15.3417L5.81891 12.095C5.4662 11.7423 5.4662 11.1725 5.81891 10.8198C6.17162 10.4671 6.74139 10.4671 7.0941 10.8198L9.7078 13.4244L15.93 7.20221C16.2827 6.84949 16.8525 6.84949 17.2052 7.20221C17.5579 7.55492 17.5579 8.12469 17.2052 8.4774L10.3409 15.3417C9.9972 15.6945 9.41839 15.6945 9.06568 15.3417Z" fill="#05CD99"/>
  </g>
  <defs>
    <clipPath id="clip0_102_18016">
      <rect width="21.7054" height="21.7054" fill="white" transform="translate(0.664062 0.609375)"/>
    </clipPath>
  </defs>
</svg>
        <span className="ml-2 text-l font-[sans-serif] text-[#01C2B5] font-bold">On Track</span>
      </div>
      
      {/* Centered Wave SVG Section with Green and Blue Waves */}
      <div className="absolute top-[120px] left-1/2 transform -translate-x-1/2 flex flex-col items-center">
        {/* Green SVG */}
        <svg xmlns="http://www.w3.org/2000/svg" width="727" height="115" viewBox="0 0 727 115" fill="none" className="-mb-5">
          <g filter="url(#filter0_d_110_17783)">
            <path d="M23.6152 48.2823C45.6353 43.9727 97.1716 36.6463 127.156 41.8179C164.637 48.2823 176.35 73.1452 205.866 65.6863C235.383 58.2274 299.569 5.51769 344.078 26.9C388.586 48.2823 403.11 104.473 458.394 65.6863C513.679 26.9 508.994 6.51232 554.908 10.4904C600.822 14.4685 676.253 27.8945 703.426 10.4904" stroke="#01C2B5" strokeWidth="4" strokeLinecap="round"/>
          </g>
          <defs>
            <filter id="filter0_d_110_17783" x="0.615234" y="0" width="725.812" height="115" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
              <feFlood floodOpacity="0" result="BackgroundImageFix"/>
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
              <feOffset dy="13"/>
              <feGaussianBlur stdDeviation="10.5"/>
              <feColorMatrix type="matrix" values="0 0 0 0 0.262745 0 0 0 0 0.0941176 0 0 0 0 1 0 0 0 0.25 0"/>
              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_110_17783"/>
              <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_110_17783" result="shape"/>
            </filter>
          </defs>
        </svg>

        {/* Blue SVG */}
        <svg xmlns="http://www.w3.org/2000/svg" width="727" height="115" viewBox="0 0 727 115" fill="none">
          <g filter="url(#filter0_d_110_17783)">
            <path d="M23.6152 48.2823C45.6353 43.9727 97.1716 36.6463 127.156 41.8179C164.637 48.2823 176.35 73.1452 205.866 65.6863C235.383 58.2274 299.569 5.51769 344.078 26.9C388.586 48.2823 403.11 104.473 458.394 65.6863C513.679 26.9 508.994 6.51232 554.908 10.4904C600.822 14.4685 676.253 27.8945 703.426 10.4904" stroke="#4C78A8" strokeWidth="4" strokeLinecap="round"/>
          </g>
        </svg>

        {/* Green Text Box on the First SVG Wave */}
       {/* Replacing Green Text Box with SVG */}
       <div className="absolute left-[46%] top-[-10%] transform -translate-x-1/2 flex items-center justify-center mb-4">
  <svg xmlns="http://www.w3.org/2000/svg" width="96" height="52" viewBox="0 0 96 52" fill="none">
    <path d="M0 6.24218C0 2.92848 2.68629 0.242188 6 0.242188H90C93.3137 0.242188 96 2.92848 96 6.24219V38.6705C96 41.9842 93.3137 44.6705 90 44.6705H63.6693C58.2079 44.6705 53.023 47.073 49.4923 51.2397C48.711 52.1617 47.289 52.1617 46.5077 51.2397C42.977 47.073 37.7921 44.6705 32.3307 44.6705H6C2.68629 44.6705 0 41.9842 0 38.6705V6.24218Z" fill="#01C2B5"/>
  </svg>
  <span className="absolute text-white font-bold text-sm font-[sans-serif] top-[-8]">On Going</span>
</div>




      </div>

      {/* Grey Line for Months */}
      <div className="absolute bottom-[80px] left-1/2 transform -translate-x-1/2 w-[727px] h-0 bg-[#A3AED0]"></div>

      {/* Bottom Months Section Below the Wave */}
      <div className="absolute bottom-[80px] left-1/2 transform -translate-x-1/2 w-[727px] flex justify-between text-sm text-[#A3AED0]">
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
