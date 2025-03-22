import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {  getEventsByMonth  } from "../../common/api";

const MonthView = () => {
  const navigate = useNavigate();
  const { year, month } = useParams();
  const selectedYear = Number(year);
  const selectedMonth = Number(month);
  const currentDate = new Date().getDate();
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();

  const [events, setEvents] = useState({});
  const [selectedDay, setSelectedDay] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [miniCalendarEvents, setMiniCalendarEvents] = useState({});
 const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const startDay = (new Date(selectedYear, selectedMonth, 1).getDay() || 7) - 1;
const daysInMonth = getDaysInMonth(selectedYear, selectedMonth);
const miniStartDay = (new Date(currentYear, currentMonth, 1).getDay() || 7) - 1;
const miniDaysInMonth = getDaysInMonth(currentYear, currentMonth);
const miniDaysArray = Array.from({ length: miniDaysInMonth }, (_, i) => i + 1);
const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);
const formatDate = (year, month, day) => `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

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
        
                // Fix: Properly format the event time when fetching from DB
                let formattedText = event.eventName;
        
                if (event.eventType?.toLowerCase() === "meeting" && event.eventTime) {
                  // Convert `eventTime` from DB to a properly formatted string
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
                  eventTime: event.eventTime, // Ensure correct time is stored
                  leave: event.eventType?.toLowerCase() === "holiday"
                });
              }
              return acc;
            }, {});
        
            setEvents(allEvents);
            setMiniCalendarEvents(allEvents); // Ensure both states are updated
        
          } catch (error) {
            console.error("Error fetching events for the month:", error);
          }
        };
        fetchAllEvents();
  }, [selectedYear, selectedMonth]);


   const fetchMiniCalendarEvents = async () => {
      try {
        const eventsData = await getEventsByMonth(currentYear, currentMonth + 1);
        
        if (!eventsData || !Array.isArray(eventsData.message)) {
          console.error("Unexpected API response for mini calendar:", eventsData);
          return;
        }
    
        const allEvents = eventsData.message.reduce((acc, event) => {
          if (event.eventDate) {
            const eventDate = new Date(event.eventDate);
            const day = eventDate.getDate();
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
              text: formattedText, // Now includes time
              leave: event.isLeave || false,
            });
          }
          return acc;
        }, {});
    
        setMiniCalendarEvents(allEvents);
      } catch (error) {
        console.error("Error fetching mini calendar events:", error);
      }
    };
    useEffect(() => {
      fetchMiniCalendarEvents();
    }, [currentYear, currentMonth]);
  
return (
    <div className="flex lg:h-screen  lg:p-4 bg-gray-100">
      {/* Sidebar - Mini Calendar */}
      <div className="w-full md:w-2/3 lg:w-1/4 p-3 lg:border-r border-gray-300 md:fixed md:left-40 lg:static">
        <button
          onClick={() => navigate(-1)}
          className="bg-gray-200 px-2 py-1 rounded-lg text-teal-600 hover:bg-teal-300 text-sm mb-3"
        > ⬅</button>
        <h1 className="text-xl md:text-3xl font-bold">{currentYear}</h1>
        <h2 className="mt-4 text-lg font-bold">{months[currentMonth]}</h2>
        {/* Days of the week */}
        <div className="grid grid-cols-7 gap-1 text-gray-700 text-xs mt-2">
          {daysOfWeek.map((d, index) => (
            <span key={d} className={`font-bold text-center ${index === 6 ? "text-red-500" : ""}`}>
              {d}
            </span>
          ))}
          {Array.from({ length: miniStartDay }).map((_, i) => (
            <div key={`empty-${i}`} className="text-center"></div>
          ))}
          {/* Calendar Days */}
          {miniDaysArray.map(day => {
            const isSunday = new Date(currentYear, currentMonth, day).getDay() === 0;
            const hasEvents = miniCalendarEvents[day] && miniCalendarEvents[day].length > 0;
            const isHoliday = hasEvents && miniCalendarEvents[day].some(event => event.leave);
            return (
              <button
                key={day}
                className={`w-6 h-6 flex items-center justify-center rounded-full text-xs 
    ${day === currentDate ? "bg-teal-500 text-white" : ""} 
    ${hasEvents ? "bg-blue-500 text-white" : ""} 
    ${isHoliday ? "bg-red-400 text-white" : ""} 
    ${isSunday ? "text-red-500 font-bold" : ""}`}
                onClick={() => { setSelectedDay(day); setModalOpen(true); }}>
                {day}
              </button>
            );
          })}
        </div>
        {/* Mini Calendar Events Section */}
        <div className="mt-4">
          <h3 className="text-md font-bold mb-1">Today's Events</h3>
          {miniCalendarEvents[currentDate] && miniCalendarEvents[currentDate].length > 0 ? (
            <ul className="text-sm bg-gray-200 p-2 rounded">
              {miniCalendarEvents[currentDate].map(event => (
                <li key={event.id} className="border-b py-1">• {event.text}</li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 text-sm">No events today.</p>
          )}
        </div>
      </div>

      {/* Main Calendar */}
      <div className="hidden lg:block  lg:w-4/5 p-6 lg:ml-6">
        <h1 className="text-3xl font-bold mb-4">{months[selectedMonth]} {selectedYear}</h1>
        <div className="grid grid-cols-7 gap-4 bg-white p-4 rounded-lg shadow-lg">
          {/* Days of the week */}
          {daysOfWeek.map((day, index) => (
            <div key={day} className={`font-bold text-center border-b pb-2 ${index === 6 ? "text-red-500" : ""}`}>
              {day}
            </div>
          ))}
          {/* Empty placeholders for days before the first day */}
          {Array.from({ length: startDay }).map((_, i) => (
            <div key={`empty-${i}`} className="text-center"></div>
          ))}
          {/* Calendar Days */}
          {daysArray.map(day => {
            const dayOfWeek = new Date(selectedYear, selectedMonth, day).getDay(); // Get the day of the week (0 = Sunday)
            const isSunday = dayOfWeek === 0; // Check if it's Sunday
            const hasEvents = events[day] && events[day].length > 0; // Check if there are events on this day
            const isHoliday = hasEvents && events[day].some(event => event.leave);
            const isToday = day === currentDate && selectedMonth === currentMonth && selectedYear === currentYear; // Check if it's the current date
            return (
              <div
                key={day}
                className={`h-20 border p-2 relative cursor-pointer hover:bg-gray-200 
              ${hasEvents ? (isToday ? "bg-teal-200" : "bg-blue-200") : ""} 
              ${isHoliday ? "bg-red-300 text-black" : ""}`} // Add red background for holidays
                onClick={() => {
                  setSelectedDay(day);
                  setModalOpen(true);
                }}>{/* Display Date inside a White Circle at the Top-Right */}
                <span
                  className={`absolute top-1 right-1 text-xs font-semibold w-4 h-4 flex items-center justify-center rounded-full bg-white 
                  ${isSunday ? "text-red-500" : ""}`}>
                  {day}
                </span>
                {hasEvents && (
                  <ul className="mt-3 text-xs">
                    {events[day].slice(0, 2).map(event => (
                      <li key={event.id} className="list-disc ml-3 "
                        onClick={() => {
                          setEditingEvent(event);
                          setEventInput(event.text);
                        }}>
                        {event.text}
                      </li>
                    ))}
                    {events[day].length > 2 && (
                      <li
                        className="text-black cursor-pointer ml-4 text-lg font-bold"
                        onClick={() => {
                          setSelectedDay(day);
                          setModalOpen(true);
                        }} >
                        <span className="text-xs font-light underline">more</span>
                      </li>
                    )}
                  </ul>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal for showing Events */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-80">
            <h2 className="text-lg font-bold mb-2">
              Events for {months[selectedMonth]} {selectedDay}
            </h2>
            {events[selectedDay] && events[selectedDay].length > 0 ? (

            <ul>
              {events[selectedDay]?.map(event => (
                <li
                  key={event.id}
                  className="flex justify-between items-center p-2 bg-gray-200 rounded mb-2 cursor-pointer">
                  {event.text}
                </li>
              ))}
            </ul>
             ) : (
              <p className="text-gray-500 text-center mt-2">No events</p>
            )}
            
            {/* Close Button */}
            <button className="bg-gray-300 px-3 py-1 rounded w-full mt-2" onClick={() => setModalOpen(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MonthView;
