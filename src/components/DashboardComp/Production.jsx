import { FaCheckCircle, FaExclamationCircle } from "react-icons/fa";

const Production = () => {
  return (
    <div className="flex flex-col md:flex-row justify-between gap-3 items-stretch">
      {/* Left Section */}
      <div className="flex flex-col gap-4 border-2  border-gray-200 p-4 rounded-xl sm:basis-[40%] w-full ">
        <h2 className="text-lg sm:text-2xl font-bold text-gray-800 mb-4">
          Production (Overall)
        </h2>

        {/* SVG Display as a Progress Representation */}
        <div className="flex items-center justify-center mt-0 sm:mt-0 w-full h-[200px]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-full max-w-[200px]"
            viewBox="0 0 245 128"
            fill="none"
          >
            {/* SVG Content */}
            <mask id="path-1-inside-1_102_17964" fill="white">
              <path d="M4.73691 125.919C2.13835 125.979 -0.0254685 123.919 0.015233 121.32C0.294616 103.48 4.41132 85.8992 12.0975 69.8246C20.459 52.3376 32.8026 37.1398 48.0995 25.4977C63.3963 13.8556 81.2033 6.10664 100.036 2.89651C117.34 -0.0529379 135.049 0.9078 151.916 5.68684C154.396 6.38964 155.744 9.023 154.971 11.4822L152.323 19.8988C151.538 22.3957 148.868 23.7598 146.344 23.0663C132.232 19.1886 117.447 18.4444 102.995 20.9078C86.98 23.6376 71.8375 30.2271 58.8296 40.1271C45.8216 50.0271 35.325 62.9509 28.2147 77.8213C21.7786 91.2814 18.2857 105.984 17.9535 120.915C17.8957 123.51 15.8505 125.663 13.255 125.722L4.73691 125.919Z" />
            </mask>
            <path
              d="M4.73691 125.919C2.13835 125.979 -0.0254685 123.919 0.015233 121.32C0.294616 103.48 4.41132 85.8992 12.0975 69.8246C20.459 52.3376 32.8026 37.1398 48.0995 25.4977C63.3963 13.8556 81.2033 6.10664 100.036 2.89651C117.34 -0.0529379 135.049 0.9078 151.916 5.68684C154.396 6.38964 155.744 9.023 154.971 11.4822L152.323 19.8988C151.538 22.3957 148.868 23.7598 146.344 23.0663C132.232 19.1886 117.447 18.4444 102.995 20.9078C86.98 23.6376 71.8375 30.2271 58.8296 40.1271C45.8216 50.0271 35.325 62.9509 28.2147 77.8213C21.7786 91.2814 18.2857 105.984 17.9535 120.915C17.8957 123.51 15.8505 125.663 13.255 125.722L4.73691 125.919Z"
              stroke="#C25F01"
              stroke-width="35.2768"
              stroke-linecap="round"
              stroke-linejoin="round"
              mask="url(#path-1-inside-1_102_17964)"
            />
            <mask id="path-2-inside-2_102_17964" fill="white">
              <path d="M154.6 10.5592C155.27 8.03161 157.876 6.52635 160.368 7.32018C183.955 14.8359 204.724 29.6146 219.781 49.6775C234.862 69.7735 243.418 94.1137 244.327 119.315C244.42 121.911 242.301 124.015 239.703 124.01L231.183 123.994C228.586 123.989 226.495 121.878 226.384 119.283C225.479 98.1032 218.223 77.6705 205.539 60.7683C192.861 43.8758 175.421 31.3886 155.608 24.94C153.154 24.1413 151.678 21.5908 152.338 19.0963L154.6 10.5592Z" />
            </mask>
            <path
              d="M154.6 10.5592C155.27 8.03161 157.876 6.52635 160.368 7.32018C183.955 14.8359 204.724 29.6146 219.781 49.6775C234.862 69.7735 243.418 94.1137 244.327 119.315C244.42 121.911 242.301 124.015 239.703 124.01L231.183 123.994C228.586 123.989 226.495 121.878 226.384 119.283C225.479 98.1032 218.223 77.6705 205.539 60.7683C192.861 43.8758 175.421 31.3886 155.608 24.94C153.154 24.1413 151.678 21.5908 152.338 19.0963L154.6 10.5592Z"
              stroke="#FCC590"
              stroke-width="35.2768"
              stroke-linecap="round"
              stroke-linejoin="round"
              mask="url(#path-2-inside-2_102_17964)"
            />
            <g filter="url(#filter0_d_102_17964)">
              <circle cx="151.927" cy="15.5055" r="15.5055" fill="#C25F01" />
              <circle
                cx="151.927"
                cy="15.5055"
                r="14.0356"
                stroke="white"
                stroke-width="2.93974"
              />
            </g>
            <defs>
              <filter
                id="filter0_d_102_17964"
                x="131.718"
                y="0"
                width="40.4189"
                height="40.4189"
                filterUnits="userSpaceOnUse"
                color-interpolation-filters="sRGB"
              >
                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                <feColorMatrix
                  in="SourceAlpha"
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  result="hardAlpha"
                />
                <feOffset dy="4.70358" />
                <feGaussianBlur stdDeviation="2.35179" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix
                  type="matrix"
                  values="0 0 0 0 0.0509804 0 0 0 0 0.0392157 0 0 0 0 0.172549 0 0 0 0.08 0"
                />
                <feBlend
                  mode="normal"
                  in2="BackgroundImageFix"
                  result="effect1_dropShadow_102_17964"
                />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="effect1_dropShadow_102_17964"
                  result="shape"
                />
              </filter>
            </defs>
          </svg>
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
              <circle cx="10" cy="10.5" r="10" fill="#FCC590" />
            </svg>
            <div>
              <div className="text-sm sm:text-sm font-bold text-gray-800">
                46%
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
                50%
              </div>
              <div className="text-sm sm:text-sm text-gray-500">November</div>
            </div>
          </div>
        </div>
      </div>

      {/* right section */}

      {/* <div className="border-2 border-black-2 p-3 lg:p-4 rounded-xl flex flex-col sm:w-full md:w-full lg:w-[62.5%] xl:w-[62.5%] h-[400px]"> */}
      <div className="border-2 p-3 lg:p-4 rounded-xl flex flex-col w-full lg:w-3/5  m-0">
        <h3 className="text-xl font-bold text-blue-800 leading-tight mb-3">
          Complex Table
        </h3>
        <div className="overflow-auto h-full">
          <table className="w-full border-collapse text-base">
            <thead>
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
                <th className="font-medium text-gray-400 px-2 py-3 text-left">
                  PROGRESS
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, index) => (
                <tr key={index} className="border-b border-gray-100">
                  {/* Name */}
                  <td className="px-2 py-3 text-[#2B3674]  text-sm md:text-base font-bold">
                    {row.name}
                  </td>
                  {/* Status */}
                  <td className="px-2 py-3 text-[#2B3674] text-sm md:text-base font-bold flex ">
                    {row.status === "Assigned" ? (
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
                    {row.status}
                  </td>
                  {/* Date */}
                  <td className="px-2 py-3 text-[#2B3674] text-xs sm:text-sm md:text-base font-bold text-center whitespace-nowrap overflow-hidden text-ellipsis">
                    {row.date}
                  </td>
                  {/* Progress */}
                  <td className="px-2 py-3 text-center">
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
                        width={`${(row.progress / 100) * 97.6744}`}
                        height="7.23514"
                        rx="3.61757"
                        fill="#01C2B5"
                      />
                    </svg>
                  </td>
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
const data = [
  {
    name: "Design Website",
    status: "Assigned",
    date: "18-Apr-12",
    progress: 60,
  },
  {
    name: "Website Development",
    status: "Assigned",
    date: "18-Apr-12",
    progress: 20,
  },
  {
    name: "Website Testing",
    status: "Pending",
    date: "20-May-21",
    progress: 40,
  },
  { name: "Debugging", status: "Assigned", date: "22-May-21", progress: 70 },
];

export default Production;
