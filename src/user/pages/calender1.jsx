import React from "react";
import { FaCalendarAlt, FaCog, FaChartPie, FaUsers, FaVideo } from "react-icons/fa";

const Calender1 = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-20 bg-white shadow-lg flex flex-col items-center py-6">
        <FaUsers className="text-gray-500 text-2xl mb-6 cursor-pointer" />
        <FaChartPie className="text-gray-500 text-2xl mb-6 cursor-pointer" />
        <FaCalendarAlt className="text-teal-500 text-2xl mb-6 cursor-pointer" />
        <FaCog className="text-gray-500 text-2xl cursor-pointer" />
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">2024</h1>
          <div>
            <button className="border px-4 py-2 rounded-lg text-teal-500 border-teal-500 mr-4">
              Year ▼
            </button>
            <button className="bg-teal-500 text-white px-4 py-2 rounded-lg flex items-center">
              <FaVideo className="mr-2" />
              Start Now
            </button>
            <button className="bg-green-500 text-white px-4 py-2 rounded-lg ml-2">
              + Add Meeting
            </button>
          </div>
        </div>

        {/* Calendar Section */}
        <div className="flex mt-6">
          {/* Left Sidebar (Mini Calendar & Events) */}
          <div className="w-1/4 pr-6">
            <div className="bg-white p-4 shadow-lg rounded-lg">
              <h2 className="text-lg font-semibold mb-2">January</h2>
              <div className="grid grid-cols-7 gap-1 text-center text-gray-600 text-sm">
                {["M", "T", "W", "T", "F", "S", "S"].map((day) => (
                  <div key={day} className="font-bold">
                    {day}
                  </div>
                ))}
                {[...Array(31).keys()].map((date) => (
                  <div
                    key={date}
                    className={`p-2 ${
                      date + 1 === 2
                        ? "bg-teal-500 text-white rounded-full"
                        : ""
                    }`}
                  >
                    {date + 1}
                  </div>
                ))}
              </div>
            </div>

            {/* Today's Schedule */}
            <div className="mt-6 bg-white p-4 shadow-lg rounded-lg">
              <h2 className="text-lg font-semibold mb-2">Today</h2>
              <div className="text-gray-600">
                <p className="flex items-center">
                  <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
                  Daily Standup - 08:00
                </p>
                <p className="flex items-center mt-2">
                  <span className="w-3 h-3 bg-red-500 rounded-full mr-2"></span>
                  Discussion Call - 09:00
                </p>
                <p className="flex items-center mt-2">
                  <span className="w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
                  Web Team Progress Update - 12:00
                </p>
                <p className="flex items-center mt-2">
                  <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
                  EOD Meeting - 17:30
                </p>
              </div>
            </div>
          </div>

          {/* Full Year Calendar */}
          <div className="w-3/4 bg-white p-6 shadow-lg rounded-lg">
            <h2 className="text-xl font-bold mb-4">Calendar</h2>
            <div className="grid grid-cols-3 gap-6">
              {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map((month) => (
                <div key={month} className="text-center">
                  <h3 className="font-semibold mb-2">{month}</h3>
                  <div className="grid grid-cols-7 gap-1 text-xs text-gray-500">
                    {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
                      <div key={d} className="font-bold">{d}</div>
                    ))}
                    {[...Array(31).keys()].map((day) => (
                      <div key={day} className="p-1">
                        {day + 1}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calender1;
