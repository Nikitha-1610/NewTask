import React from "react";

const Calendar = () => {
  return (
    <div className="flex h-screen p-4">
      {/* Sidebar */}
      <div className="w-1/4 p-6">
        <div className="flex items-center space-x-2">
          <h1 className="text-4xl font-bold">2024</h1>
          <button className="border border-teal-500 px-4 py-2 rounded-lg text-teal-500 hover:bg-teal-200">Year ▼</button>
        </div>
        <h2 className="mt-6 text-xl font-bold">January</h2>
        <div className="grid grid-cols-7 gap-2 mt-2 text-gray-700">
          <span className="font-bold">m</span>
          <span className="font-bold">t</span>
          <span className="font-bold">w</span>
          <span className="font-bold">t</span>
          <span className="font-bold">f</span>
          <span className="font-bold">s</span>
          <span className="font-bold">s</span>
          {[...Array(31)].map((_, i) => (
            <button
              key={i}
              className={`w-8 h-8 flex items-center justify-center rounded-full ${i === 1 ? "bg-teal-500 text-white" : "hover:bg-gray-200"}`}
            >
              {String(i + 1).padStart(2, "0")}
            </button>
          ))}
        </div>
        <h2 className="mt-6 font-bold">📅Today</h2>
        <ul className="mt-2 space-y-2">
          <li className="text-green-600">● Daily Standup - <strong>08:00</strong></li>
          <li className="text-red-600">● Discussion Call - <strong>09:00</strong></li>
          <li className="text-blue-600">● Web Team Progress Update - <strong>12:00</strong></li>
          <li className="text-yellow-600">● EOD Meeting - <strong>05:30</strong></li>
        </ul>
      </div>

      {/* Main Calendar */}
      <div className="w-3/4 p-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Calendar</h1>
          <div className="flex space-x-4">
            <button className="border border-teal-500 text-teal-500 px-4 py-2 rounded-lg hover:bg-teal-100">Start Now 📅</button>
            <button className="bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-600">Add Meeting ➕</button>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-8 mt-4">
          {[
            "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
          ].map((month, index) => (
            <div 
              key={month} 
              className={`text-sm relative p-4 border rounded-lg ${index === 0 ? "border-gray-400" : "border-gray-200"}`}
            >
              <h2 className="text-lg font-bold mb-1">{month}</h2>
              <div className="grid grid-cols-7 gap-1 text-gray-500 text-xs">
                <span className="font-bold">Mon</span>
                <span className="font-bold">Tue</span>
                <span className="font-bold">Wed</span>
                <span className="font-bold">Thu</span>
                <span className="font-bold">Fri</span>
                <span className="font-bold">Sat</span>
                <span className="font-bold">Sun</span>
                {[...Array(31)].map((_, i) => (
                  <span key={i} className="text-black text-center block w-6 h-6 flex items-center justify-center">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
