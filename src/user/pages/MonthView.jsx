import React from "react";
import { useNavigate, useParams } from "react-router-dom";

const MonthView = () => {
  const navigate = useNavigate();
  const { year, month } = useParams(); // Extract year & month from URL

  const selectedYear = Number(year); // Convert to number
  const selectedMonth = Number(month); // Convert to number

  // Mini Calendar should always show the current month
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth(); // 0 = Jan, 1 = Feb...

  const daysOfWeek = ["M", "T", "W", "T", "F", "S", "S"];
  const months = [
    "January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December"
  ];

  const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const startDay = new Date(currentYear, currentMonth, 1).getDay(); // Mini calendar uses current month
  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  return (
    <div className="flex h-screen p-4 bg-gray-100">
      {/* Sidebar (Mini Calendar) */}
      <div className="w-full md:w-1/5 p-3 border-r border-gray-300">
        {/* Back Button */}
        <button 
          onClick={() => navigate(-1)} 
          className="bg-gray-200 px-2 py-1 rounded-lg text-teal-600 hover:bg-teal-300 text-sm mb-3"
        >
          ⬅ 
        </button>

        {/* Mini Calendar: Always Show Current Month */}
        <div className="flex items-center justify-between md:justify-start space-x-2">
          <h1 className="text-xl md:text-3xl font-bold">{currentYear}</h1>
        </div>
        <h2 className="mt-4 text-lg font-bold">{months[currentMonth]}</h2>
        
        {/* Mini Calendar Days */}
        <div className="grid grid-cols-7 gap-1 text-gray-700 text-xs mt-2">
          {daysOfWeek.map((d) => (
            <span key={d} className="font-bold text-center">{d}</span>
          ))}
          {Array.from({ length: startDay }).map((_, i) => (
            <div key={`empty-${i}`} className="text-center"></div>
          ))}
          {daysArray.map((day) => (
            <button
              key={day}
              className={`w-6 h-6 flex items-center justify-center rounded-full text-xs ${
                day === currentDate.getDate() && "bg-teal-500 text-white"
              }`}
            >
              {day}
            </button>
          ))}
        </div>
      </div>

      {/* Main Calendar */}
      <div className="w-4/5 p-6">
        <h1 className="text-3xl font-bold mb-4">{months[selectedMonth]} {selectedYear}</h1> 
        <div className="grid grid-cols-7 gap-4 bg-white p-4 rounded-lg shadow-lg">
          {daysOfWeek.map(day => (
            <div key={day} className="font-bold text-center border-b pb-2">{day}</div>
          ))}

          {Array.from({ length: new Date(selectedYear, selectedMonth, 1).getDay() }).map((_, i) => (
            <div key={`empty-${i}`} className="text-center"></div>
          ))}

          {Array.from({ length: getDaysInMonth(selectedYear, selectedMonth) }, (_, i) => i + 1).map(day => (
            <div key={day} className="h-20 border p-2 relative">
              <span className="absolute top-1 left-1 text-sm font-semibold">{day}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MonthView;
