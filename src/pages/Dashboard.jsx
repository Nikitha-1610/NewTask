import { MdBarChart, MdArrowForward } from "react-icons/md"; 
import WeeklyProduction from "../components/DashboardComp/WeeklyProduction";
import Production from "../components/DashboardComp/Production";
import TwoWaveChart from "../components/DashboardComp/TwoWaveChart";

const Dashboard = () => {
  return (
    <div className="flex flex-col items-center p-2 pt-0 font-montserrat">
      <div className="grid grid-cols-1 gap-4 w-full max-w-screen-xl">
        {/* First Container with 4 inner containers */}
     {/* First Container with 5 inner containers */}
     <div className="flex justify-center mb-1 lg:hidden right-0">
    <MdArrowForward size={32} color="#01C2B5" />
  </div>
     <div className="p-1 rounded-lg overflow-x-auto scrollbar-hide">
  

          <div className="flex space-x-2">
            {[
              {
                title: "Design Team",
                color: "#FD1EDF",
                count: 35,
                bgColor: "#FEE7FB",
              },
              {
                title: "Development",
                color: "#03B3A7",
                count: 35,
                bgColor: "#E2FCFA",
              },
              {
                title: "AI/ ML",
                
                color: "#FFA500",
                count: 35,
                
                bgColor: "#FFF5E6",
              },
              {
                title: "Marketing",
                color: "#03BC56",
                count: 35,
                bgColor: "#E2FEEF",
              },
              {
                title: "Advertising",
                color: "#EB4904",
                count: 35,
                bgColor: "#FEDECF",
              },
            ].map((card, index) => (
              <div
                key={index}
                className="min-w-[220px] bg-white p-3 rounded-lg border-[3px] border-gray-200 transform transition-transform duration-300 hover:scale-105"
              >
                <div className="flex justify-between items-center space-x-0">
                  <div
                    className="flex justify-center items-center w-12 h-12 rounded-full"
                    style={{ backgroundColor: card.bgColor }}
                  >
                    <MdBarChart size={34} color={card.color} />
                  </div>
                  <div>
                    <h3 className=" text-lg font-[500] text-[#828385]">
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
        <div className=" p-5 rounded-xl border-[3px] border-gray-200">
          <WeeklyProduction />
        </div>
        <div className="">
          <Production />
        </div>
        <div className="p-5 rounded-xl border-[3px] border-gray-200">
          <TwoWaveChart />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
