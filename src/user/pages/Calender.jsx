import React from "react";
import "tailwindcss/tailwind.css";

const CalendarPage = () => {
  return (
    <div className="flex min-h-screen bg-white p-5">
      {/* Sidebar */}
      <div className="w-1/4 border-r p-4">
        <h1 className="text-3xl font-semibold">January</h1>
        <div className="grid grid-cols-7 gap-1 text-gray-500 mt-2">
          {["m", "t", "w", "t", "f", "s", "s"].map((day, index) => (
            <div key={index} className="text-center font-medium uppercase">
              {day}
            </div>
          ))}
          {Array.from({ length: 31 }, (_, i) => i + 1).map((date) => (
            <div
              key={date}
              className={`text-center py-1 rounded-full ${
                date === 2 ? "bg-green-500 text-white" : "text-black"
              }`}
            >
              {date.toString().padStart(2, "0")}
            </div>
          ))}
        </div>
        {/* Events */}
        <h2 className="mt-4 font-semibold">📅 Today</h2>
        <ul className="mt-2 space-y-2">
          <li className="text-sm text-green-500">● Daily Standup - 08:00</li>
          <li className="text-sm text-red-500">● Discussion Call - 09:00</li>
          <li className="text-sm text-blue-500">● Web Team Progress Update - 12:00</li>
          <li className="text-sm text-green-500">● EOD Meeting - 05:30</li>
        </ul>
      </div>
      {/* Main Calendar */}
      <div className="flex-1 px-6">
        <h1 className="text-3xl font-semibold">Calendar</h1>
        <div className="grid grid-cols-4 gap-8 mt-4">
          {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map(
            (month) => (
              <div key={month} className="text-left">
                <h2 className="font-semibold text-lg">{month}</h2>
                <div className="grid grid-cols-7 text-gray-500 text-xs mt-1">
                  {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, index) => (
                    <div key={index} className="text-center font-medium">
                      {day}
                    </div>
                  ))}
                  {Array.from({ length: 31 }, (_, i) => i + 1).map((date) => (
                    <div key={date} className="text-center py-1 text-black text-sm">
                      {date.toString().padStart(2, "0")}
                    </div>
                  ))}
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;
