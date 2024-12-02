import { MdBarChart, MdArrowForward, MdArrowBack } from "react-icons/md";
import { useState, useEffect, useRef } from "react";
import WeeklyProduction from "../components/DashboardComp/WeeklyProduction";
import Production from "../components/DashboardComp/Production";
import TwoWaveChart from "../components/DashboardComp/TwoWaveChart";
// import axiosInstance from "../utilities/axios/axiosInstance";
import axiosInstance from "../../common/utils/axios/axiosInstance";
import ReactLoading from "react-loading";

const colors = [
  { vibrant: "text-red-500", faint: "bg-red-100" },
  { vibrant: "text-blue-500", faint: "bg-blue-100" },
  { vibrant: "text-green-500", faint: "bg-green-100" },
  { vibrant: "text-yellow-500", faint: "bg-yellow-100" },
  { vibrant: "text-purple-500", faint: "bg-purple-100" },
  { vibrant: "text-pink-500", faint: "bg-pink-100" },
  { vibrant: "text-teal-500", faint: "bg-teal-100" },
  { vibrant: "text-indigo-500", faint: "bg-indigo-100" },
];

const getRandomColor = () => colors[Math.floor(Math.random() * colors.length)];


const Dashboard = () => {
  const cardContainerRef = useRef(null);
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to scroll the cards horizontally
  const scrollRight = () => {
    if (cardContainerRef.current) {
      cardContainerRef.current.scrollBy({
        left: 220,
        behavior: "smooth",
      });
    }
  };

  const scrollLeft = () => {
    if (cardContainerRef.current) {
      cardContainerRef.current.scrollBy({
        left: -220,
        behavior: "smooth",
      });
    }
  };

  // Fetch API data
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/task/adminDashboard");
      if (response.status === 200) {
        setDashboardData(response.data.message); // Update state with API data
      } else {
        console.error("Failed to fetch data:", response.statusText);
      }
    } catch (err) {
      setError("Failed to load data");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <ReactLoading type="spin" color="#00bfa6" height={55} width={55} />
      </div>
    );

  if (error) return <div>{error}</div>;
  const departmentCounts = dashboardData?.departmentCounts;

  return (
    <div className="flex flex-col items-center pt-0 gap-4 w-full">
      <div className="grid grid-cols-1 gap-4 w-full max-w-screen-xl sm:p-2">
        
        {/* Card Container */}

        <div className="relative">
          {/* Scroll Left button */}
          <div
            className="absolute top-1/2 left-0 transform -translate-y-1/2 cursor-pointer z-10"
            onClick={scrollLeft}
          >
            <MdArrowBack className="text-teal-500 text-3xl font-bold" />
          </div>

          {/* Scroll Right button */}
          <div
            className="absolute top-1/2 right-0 transform -translate-y-1/2 cursor-pointer z-10"
            onClick={scrollRight}
          >
            <MdArrowForward className="text-teal-500 text-3xl font-bold" />
          </div>

        
        <div
          className="overflow-x-auto scrollbar-hide w-full"
          ref={cardContainerRef} // Attach the ref to the card container
        >
         <div className="flex space-x-2">
              {departmentCounts &&
                Object.keys(departmentCounts).map((department, index) => {
                  const { vibrant, faint } = getRandomColor(); // Get random color and background
                  return (
                    <div
                      key={index}
                      className="min-w-[220px] bg-white p-3 rounded-lg border-2 border-gray-100 transform transition-transform duration-300 hover:scale-105"
                    >
                      <div className="flex justify-between items-center space-x-0">
                        <div
                          className={`flex justify-center items-center w-12 h-12 rounded-full ${faint}`}
                        >
                          <MdBarChart size={34} className={vibrant} />
                        </div>
                        <div>
                          <h3 className="text-lg font-medium text-gray-400">{department}</h3>
                          <h1 className="text-gray-800 text-2xl font-bold">
                            {departmentCounts[department]}
                          </h1>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
        </div>
        </div>
        {/* Weekly Production Container */}
        <div className="w-full p-5 md:p-3 rounded-xl border-2 border-gray-100">
          <WeeklyProduction
            weeklyData={dashboardData?.weekly}
            monthlyData={dashboardData?.monthly}
            yearlyData={dashboardData?.yearly}
          />
        </div>

        {/* Production Container */}
        <div className="w-full rounded-xl">
          <Production projectDetails={dashboardData?.projectDetails} />
        </div>

        {/* WaveGraph Container */}
        <div className="w-full sm:p-3 p-2 rounded-xl border-2 border-gray-100">
          <TwoWaveChart />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
