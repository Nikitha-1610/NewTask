import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {  getEventsByMonth  } from "../../common/api";


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
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [miniCalendarEvents, setMiniCalendarEvents] = useState({});
  

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

  useEffect(() => {
    const fetchAllEvents = async () => {
      try {
        const eventsData = await getEventsByMonth(selectedYear, selectedMonth + 1);
  
        if (!eventsData || !Array.isArray(eventsData.message)) {
          console.error("Unexpected API response format:", eventsData);
          return;
        }
  
        const allEvents = eventsData.message.reduce((acc, event) => {
          if (event.eventDate) {
            const eventDate = new Date(event.eventDate);
            const day = eventDate.getDate(); // Extract the day of the month
  
            if (!acc[day]) acc[day] = [];
  
            let formattedText = event.eventName;
  
            if (event.eventType?.toLowerCase() === "meeting" && event.eventTime) {
              const formattedTime = new Date(`2000-01-01T${event.eventTime}`).toLocaleTimeString([], {
                hour: "numeric",
                minute: "2-digit",
                hour12: true
              });
              formattedText = `${event.eventName} - ${formattedTime}`;
            }
  
            acc[day].push({
              id: event.id,
              text: formattedText,
              eventType: event.eventType?.toLowerCase(), // ✅ Store eventType correctly
              eventTime: event.eventTime,
              leave: event.eventType?.toLowerCase() === "holiday"
            });
          }
          return acc;
        }, {});
  
        setEvents(allEvents);
        setMiniCalendarEvents(allEvents); // ✅ Ensure eventType is stored in miniCalendarEvents
  
      } catch (error) {
        console.error("Error fetching events for the month:", error);
      }
    };
    fetchAllEvents();
  }, [selectedYear, selectedMonth]);
  
       

  return (
    <div className="flex flex-col md:flex-row lg:flex-row h-screen">
      {/* Sidebar */}
      <div className="w-full md:w-60 lg:w-1/5 p-3 lg:border-r border-gray-300 h-fit sticky top-0">
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
        <div className="grid grid-cols-7 gap-1 text-gray-700 text-[10px] sm:text-xs md:text-[10px] mt-2">
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
        {/* Events Section */}
        <div className="mt-4">
  <h3 className="text-md font-bold mb-1">Events for {months[selectedMonth]}</h3>

  {/* Meetings Section */}
  {Object.keys(miniCalendarEvents).some(day => 
    miniCalendarEvents[day].some(event => event.eventType === "meeting")
  ) ? (
    <div className="mb-2">
      <h4 className="text-blue-600 font-semibold">Meetings</h4>
      <ul className="text-sm bg-gray-200 p-2 rounded">
        {Object.entries(miniCalendarEvents).map(([day, events]) =>
          events
            .filter(event => event.eventType === "meeting")  // ✅ Corrected filtering logic
            .map(event => (
              <li key={event.id} className="border-b py-1">
                • {day} - {event.text}
              </li>
            ))
        )}
      </ul>
    </div>
  ) : (
    <p className="text-gray-500 text-sm">No meetings this month.</p>
  )}

  {/* Holidays Section */}
  {Object.keys(miniCalendarEvents).some(day => 
    miniCalendarEvents[day].some(event => event.leave)
  ) ? (
    <div>
      <h4 className="text-red-600 font-semibold">Holidays</h4>
      <ul className="text-sm bg-gray-200 p-2 rounded">
        {Object.entries(miniCalendarEvents).map(([day, events]) =>
          events
            .filter(event => event.leave)  
            .map(event => (
              <li key={event.id} className="border-b py-1">
                • {day} - {event.text}
              </li>
            ))
        )}
      </ul>
    </div>
  ) : (
    <p className="text-gray-500 text-sm">No holidays this month.</p>
  )}
</div>
      </div>

      {/* Main Calendar Section */}
      <div className="w-full md:w-full lg:w-5/6 p-4">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Calendar</h1>
        </div>

        {/* Yearly Calendar Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4  gap-4 mt-4">
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
