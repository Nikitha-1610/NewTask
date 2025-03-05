import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Calendar = () => {
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "June",
    "July", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];
  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]; // Monday first
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();
  const currentDate = new Date().getDate();

  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [leaveDays, setLeaveDays] = useState({});
  const [events, setEvents] = useState({});
  const years = Array.from({ length: 21 }, (_, i) => currentYear - 10 + i);
  const navigate = useNavigate();

  useEffect(() => {
    const savedLeaves = JSON.parse(localStorage.getItem("leaveDays")) || {};
    const savedEvents = JSON.parse(localStorage.getItem("events")) || {};
    setLeaveDays(savedLeaves);
    setEvents(savedEvents);
  }, []);

  const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();

  const getStartDayOfMonth = (year, month) => {
    let startDay = new Date(year, month, 1).getDay();
    return startDay === 0 ? 6 : startDay - 1; // Shift Sunday (0) to last position
  };

  const isSunday = (year, month, day) => {
    const date = new Date(year, month, day);
    return date.getDay() === 0; // Sunday
  };

  const isLeaveDay = (year, month, day) => {
    return leaveDays[`${year}-${month}-${day}`];
  };

  const getEventsForMonth = (year, month) => {
    return events[`${year}-${month}`] || [];
  };

  return (
    <div className="flex flex-col md:flex-row h-screen p-4">
      {/* Sidebar */}
      <div className="w-full md:w-1/5 p-3 border-r border-gray-300">
        <div className="flex items-center justify-between md:justify-start space-x-2">
          <h1 className="text-xl md:text-3xl font-bold">{selectedYear}</h1>
          <select
            className="border border-teal-500 px-3 py-1 rounded-lg text-teal-500 text-sm"
            value={selectedYear}
            onChange={(e) => setSelectedYear(Number(e.target.value))}
          >
            {years.map((year) => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>
        <h2 className="mt-4 text-lg font-bold">{months[currentMonth]}</h2>

        {/* Mini Calendar */}
        <div className="grid grid-cols-7 gap-1 text-gray-700 text-xs mt-2">
          {daysOfWeek.map((d) => (
            <span key={d} className="font-bold text-center">{d}</span>
          ))}
          {Array.from({ length: getStartDayOfMonth(selectedYear, currentMonth) }).map((_, i) => (
            <span key={`empty-${i}`} className="text-gray-300 w-6 h-6"></span>
          ))}
          {[...Array(getDaysInMonth(selectedYear, currentMonth))].map((_, i) => {
            const day = i + 1;
            return (
              <button
                key={i}
                className={`w-6 h-6 flex items-center justify-center rounded-full text-xs 
                  ${isSunday(selectedYear, currentMonth, day) ? "text-red-500 font-bold" : ""}
                  ${isLeaveDay(selectedYear, currentMonth, day) ? "bg-red-500 text-white" : ""}
                  ${day === currentDate && selectedYear === currentYear && currentMonth === new Date().getMonth() ? "bg-teal-500 text-white" : ""}`}
              >
                {day}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Calendar Section */}
      <div className="w-full md:w-4/5 p-4">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Calendar</h1>
        </div>

        {/* Yearly Calendar Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          {months.map((month, index) => (
            <div
              key={month}
              className={`text-sm relative p-4 border cursor-pointer hover:bg-gray-100 
                ${selectedYear === currentYear && index === currentMonth ? "border-teal-400 border-2" : "border-gray-300"}`}
              onClick={() => navigate(`/user/month/${selectedYear}/${index}`)}
            >
              <h2 className="text-center text-base font-bold mb-2">{month}</h2>
              <div className="grid grid-cols-7 gap-1 text-gray-500 text-xs">
                {daysOfWeek.map((d) => (
                  <span key={d} className="font-semibold text-center">{d}</span>
                ))}
                {Array.from({ length: getStartDayOfMonth(selectedYear, index) }).map((_, i) => (
                  <span key={`empty-${i}`} className="text-gray-300 w-6 h-6"></span>
                ))}
                {[...Array(getDaysInMonth(selectedYear, index))].map((_, i) => {
                  const day = i + 1;
                  return (
                    <span
                      key={i}
                      className={`text-black text-center w-6 h-6 flex items-center justify-center 
                        ${isSunday(selectedYear, index, day) ? "text-red-500 font-bold" : ""}
                        ${isLeaveDay(selectedYear, index, day) ? "bg-red-500 text-white rounded-full" : ""}`}
                    >
                      {day}
                    </span>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
