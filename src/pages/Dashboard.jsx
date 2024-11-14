import React from 'react';
import { MdBarChart } from 'react-icons/md';
import WeeklyProduction from './DashboardComp/WeeklyProduction';
import Production from './DashboardComp/Production';
import TwoWaveChart from './DashboardComp/TwoWaveChart';

const Dashboard = () => {
  return (
    <div className="flex flex-col items-center p-5 font-montserrat">
      <div className="grid grid-cols-1 gap-4 w-full max-w-screen-xl">
        {/* First Container with 4 inner containers */}
        <div className="bg-gray-100 p-5 rounded-lg shadow-lg flex justify-between flex-wrap gap-4">
          {[
            { title: 'Design Team', color: '#FD1EDF', count: 35,  bgColor: '#FEE7FB'},
            { title: 'Development', color: '#03B3A7', count: 35,  bgColor: '#E2FCFA' },
            { title: 'AI/ ML', color: '#EB4904', count: 35, bgColor: '#FEDECF' },
            { title: 'Marketing', color: '#03BC56', count: 35, bgColor: '#E2FEEF' },
          ].map((card, index) => (
            <div
              key={index}
              className="w-[22%] min-w-[220px] bg-white p-4 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105"
            >
              <div className="flex justify-between items-center">
              <div
                  className="flex justify-center items-center w-14 h-14 rounded-full"
                  style={{ backgroundColor: card.bgColor }}
                >
                  <MdBarChart size={36} color={card.color} />
                </div>
                <div>
                  <h3 className="text-gray-600 text-lg font-semibold">{card.title}</h3>
                  <h1 className="text-gray-800 text-2xl font-bold">{card.count}</h1>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Remaining containers as placeholders */}
        <div className="bg-gray-100 p-5 rounded-lg shadow-lg">
          <WeeklyProduction />
        </div>
        <div className="bg-gray-100 p-5 rounded-lg shadow-lg">
          <Production />
        </div>
        <div className="bg-gray-100 p-5 rounded-lg shadow-lg">
          <TwoWaveChart />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

