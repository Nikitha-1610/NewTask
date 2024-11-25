import { MdBarChart, MdArrowForward, MdArrowBack } from "react-icons/md";
import {React, useRef} from 'react';
import WeeklyProduction from "../components/DashboardComp/WeeklyProduction";
import Production from "../components/DashboardComp/Production";
import TwoWaveChart from "../components/DashboardComp/TwoWaveChart";

const Dashboard = () => {

  const cardContainerRef = useRef(null);

  // Function to scroll the cards horizontally
  const scrollRight = () => {
    if (cardContainerRef.current) {
      cardContainerRef.current.scrollBy({
        left: 220, // Adjust this value to control the scroll distance
        behavior: 'smooth', // Smooth scroll
      });
    }
  };
  const scrollLeft = () => {
    if (cardContainerRef.current) {
      cardContainerRef.current.scrollBy({
        left: -220, // Negative value to scroll left
        behavior: 'smooth', // Smooth scroll
      });
    }
  };
  return (
    <div className="flex flex-col items-center pt-0 font-montserrat">
      <div className="grid grid-cols-1 gap-4 w-9/10 max-w-screen-xl">
        {/* First Container with 4 inner containers */}
        {/* First Container with 5 inner containers */}
        <div className="flex justify-between top-16 left-4 right-4 z-10 lg:hidden">
          {/* Scroll Left button */}
          <div
            className="cursor-pointer"
            onClick={scrollLeft} // Add the onClick event to trigger scrollLeft
          >
            <MdArrowBack className="text-teal-500 text-3xl font-bold" />
          </div>

          {/* Scroll Right button */}
          <div
            className="cursor-pointer"
            onClick={scrollRight} // Add the onClick event to trigger scrollRight
          >
            <MdArrowForward className="text-teal-500 text-3xl font-bold" />
          </div>
        </div>
     

        {/* Card container with overflow-x-auto to enable horizontal scrolling */}
        <div
          className="p-1 rounded-lg overflow-x-auto scrollbar-hide sm:mt-0 "
          ref={cardContainerRef} // Attach the ref to the card container
        >
          <div className="flex space-x-2 ">
            {[
              {
                title: "Design Team",
                color: "text-pink-500",
                count: 35,
                bgColor: "bg-pink-100",
              },
              {
                title: "Development",
                color: "text-teal-600",
                count: 35,
                bgColor: "bg-teal-100",
              },
              {
                title: "AI/ ML",
                color: "text-orange-500",
                count: 35,
                bgColor: "bg-orange-100",
              },
              {
                title: "Marketing",
                color: "text-green-600",
                count: 35,
                bgColor: "bg-green-100",
              },
              {
                title: "Advertising",
                color: "text-orange-700",
                count: 35,
                bgColor: "bg-orange-200",
              },
            ].map((card, index) => (
              <div
                key={index}
                className="min-w-[220px] bg-white p-3 rounded-xl border-2 border-black-2   transform transition-transform duration-300 hover:scale-105"
              >
                <div className="flex justify-between items-center space-x-0">
                  <div
                    className={`flex justify-center items-center w-12 h-12 rounded-full ${card.bgColor}`}
                  >
                    <MdBarChart size={34} className={card.color} />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-400">
                      {card.title}
                    </h3>
                    <h1 className="text-gray-800 text-2xl font-bold">
                      {card.count}
                    </h1>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Remaining containers as placeholders */}
        <div className=" sm:p-5 p-3 rounded-xl border-2 border-black-2 sm:w-full w-auto mt-0">
          <WeeklyProduction />
        </div>
        <div className="sm:py-1 p-0 rounded-xl  sm:w-full w-auto ">
          <Production />
        </div>
        <div className="sm:p-4 p-3 rounded-xl border-2 border-black-2  sm:w-full w-auto">
          <TwoWaveChart />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

