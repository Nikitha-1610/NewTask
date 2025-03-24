import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { postEvent, getEventsByMonth, updateEvent, deleteEvent } from "../../common/api";
 import { motion, AnimatePresence } from "framer-motion";

const MonthView = () => {
  const navigate = useNavigate();
  const { year, month } = useParams();
  const selectedYear = Number(year);
  const selectedMonth = Number(month);
  const currentDate = new Date().getDate();
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();
  const [events, setEvents] = useState([]);
  const [selectedDay, setSelectedDay] = useState(null);
  const [eventInput, setEventInput] = useState("");
  const [eventType, setEventType] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [meetingTime, setMeetingTime] = useState("");
  const [editingEvent, setEditingEvent] = useState(null);
  const [miniCalendarEvents, setMiniCalendarEvents] = useState({});
  const [eventToDelete, setEventToDelete] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
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

  {
    useEffect(() => {
      setEditingEvent(null);
      setEventInput("");
      setEventType("");
    }, [modalOpen])
  }

  const handleAddOrUpdateEvent = async () => {
    if (!selectedDay) {
      alert("Please select a date.");
      return;
    }
    
    setModalOpen(false); // ✅ Close modal immediately
    
    const existingEvents = events[selectedDay] || [];
    let updatedEvent = null;

    if (editingEvent) {
        try {
            if (editingEvent.leave) {
                await updateEvent(editingEvent.id, { eventName: eventInput });
                updatedEvent = { ...editingEvent, text: eventInput };
            } else {
                const formattedTime = new Date(`2000-01-01T${meetingTime}`).toLocaleTimeString([], {
                    hour: "numeric",
                    minute: "2-digit",
                    hour12: true
                });

                const updatedMeetingText = `${eventInput} - ${formattedTime}`;

                await updateEvent(editingEvent.id, {
                    eventName: eventInput,
                    eventTime: eventType === "Meeting" ? meetingTime : null,
                });

                updatedEvent = { ...editingEvent, text: updatedMeetingText };
            }

            setEvents(prev => ({
                ...prev,
                [selectedDay]: prev[selectedDay].map(event => event.id === editingEvent.id ? updatedEvent : event)
            }));

            setMiniCalendarEvents(prev => ({
                ...prev,
                [selectedDay]: prev[selectedDay].map(event => event.id === editingEvent.id ? updatedEvent : event)
            }));

        } catch (error) {
            console.error("Error updating event:", error);
        }
    } else {
        if (!eventType) {
            alert("Please select an event type.");
            return;
        }

        const hasMeeting = existingEvents.some(event => event.text.includes(" - "));

        if (eventType === "Holiday" && hasMeeting) {
            if (!window.confirm("Adding a holiday will delete all meeting events. Do you want to continue?")) {
                return;
            }

            try {
                // ✅ Delete ALL events for the selected day
                await Promise.all(existingEvents.map(event => deleteEvent(event.id)));

                // ✅ Now, create and add the new holiday event
                updatedEvent = { id: "temp-id", text: eventInput, leave: true };
                const createdEvent = await postEvent({
                    eventDate: formatDate(selectedYear, selectedMonth, selectedDay),
                    eventType: "holiday", // ✅ Ensure lowercase for consistency
                    eventName: eventInput,
                    eventTime: null,
                });

                updatedEvent.id = createdEvent.id;
            } catch (error) {
                console.error("Error adding holiday event:", error);
            }
        } else {
            try {
                const formattedTime = meetingTime
                    ? new Date(`2000-01-01T${meetingTime}`).toLocaleTimeString([], {
                        hour: "numeric",
                        minute: "2-digit",
                        hour12: true
                    })
                    : "";

                const eventDisplayText = eventType === "Meeting" ? `${eventInput} - ${formattedTime}` : eventInput;
                updatedEvent = { id: "temp-id", text: eventDisplayText, leave: eventType === "Holiday" };

                const createdEvent = await postEvent({
                    eventDate: formatDate(selectedYear, selectedMonth, selectedDay),
                    eventType: eventType.toLowerCase(),
                    eventName: eventInput,
                    eventTime: eventType === "Meeting" ? meetingTime : null
                });

                updatedEvent.id = createdEvent.id;
            } catch (error) {
                console.error("Error adding event:", error);
            }
        }
    }

    if (updatedEvent) {
        setEvents(prev => ({
            ...prev,
            [selectedDay]: editingEvent
                ? prev[selectedDay].map(event => event.id === editingEvent.id ? updatedEvent : event)
                : [updatedEvent] // ✅ Replace all events instead of appending
        }));

        setMiniCalendarEvents(prev => ({
            ...prev,
            [selectedDay]: editingEvent
                ? prev[selectedDay].map(event => event.id === editingEvent.id ? updatedEvent : event)
                : [updatedEvent] // ✅ Replace all events instead of appending
        }));
    }

    await fetchMiniCalendarEvents(); // ✅ Ensure re-fetching after update

    // Reset fields
    setEditingEvent(null);
    setEventInput("");
    setEventType(null);
    setMeetingTime("");
};

  
  const handleConfirmDelete = async (eventId) => {
    try {
      await deleteEvent(eventId);
      setEvents(prev => ({
        ...prev,
        [selectedDay]: prev[selectedDay].filter(event => event.id !== eventId)
      }));
      await fetchMiniCalendarEvents();
      setSuccessMessage("Event deleted successfully!");
      setTimeout(() => setSuccessMessage(""), 2000);
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

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
            text: formattedText,
            leave: event.eventType?.toLowerCase() === "holiday"  // ✅ Ensure consistency
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
    <div className="flex  lg:h-screen lg:p-4 bg-gray-100">
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
    ${isHoliday ? "bg-red-400 text-white" : ""}  /* ✅ Prioritize holiday */
    ${hasEvents && !isHoliday ? "bg-blue-500 text-white" : ""}  /* ✅ Meeting only if no holiday */
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
                    {events[day].slice(0, 1).map(event => (
                      <li key={event.id} className="list-disc ml-3 "
                        onClick={() => {
                          setEditingEvent(event);
                          setEventInput(event.text);
                        }}>
                        {event.text}
                      </li>
                    ))}
                    {events[day].length > 1 && (
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

      {/* Modal for Adding Events */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-80">
            <h2 className="text-lg font-bold mb-2">Events for {months[selectedMonth]} {selectedDay}</h2>
            {(selectedYear > currentYear ||
              (selectedYear === currentYear && selectedMonth > currentMonth) ||
              (selectedYear === currentYear && selectedMonth === currentMonth && selectedDay >= currentDate)) && (
                <>{!editingEvent && (
                  <select
                    value={eventType || ""}
                    onChange={(e) => {
                      setEventType(e.target.value);
                      if (e.target.value === "Meeting") {
                        setMeetingTime("");
                      }
                    }}
                    className="w-full border p-2 mb-2"
                  >
                    <option value="" disabled>Select Event Type</option>
                    <option value="Meeting">Meeting</option>
                    <option value="Holiday">Holiday</option>
                  </select>
                )}
                
                  {/* Show event name input only after selecting an event type */}
                  {eventType && (
                    <input
                      type="text"
                      value={eventInput}
                      onChange={(e) => setEventInput(e.target.value.trimStart())}
                      placeholder="Enter Event Name"
                      className="w-full border p-2 mb-2"
                    />
                  )}
                  {/* Time Input - Only Shown for Meetings */}
                  {eventType === "Meeting" && (
                    <input
                      type="time"
                      value={meetingTime}
                      onChange={(e) => setMeetingTime(e.target.value)}
                      className="w-full border p-2 mb-2" />
                  )}
                  {/* Add or Update Event Button */}
                  <button
                    className="bg-teal-500 text-white px-3 py-1 rounded w-full mb-2"
                    onClick={handleAddOrUpdateEvent}
                    disabled={!eventInput || (eventType === "Meeting" && !meetingTime)}>
                    {editingEvent ? "Update Event" : "Add Event"}
                  </button>
                </>
              )}
            {events[selectedDay] && events[selectedDay].length > 0 ? (
              <ul>
                {events[selectedDay].map(event => (
                  <li key={event.id}
                    className="flex justify-between items-center p-2 bg-gray-200 rounded mb-2 cursor-pointer"
                    onClick={(e) => {
                      if (e.target.tagName !== "BUTTON") {
                        setEditingEvent(event);
                    
                        // Automatically detect event type when editing
                        if (event.leave) {
                          setEventType("Holiday"); // Holiday event
                        } else {
                          setEventType("Meeting"); // Meeting event
                        }
                    
                        const [name, time] = event.text.includes(" - ") ? event.text.split(" - ") : [event.text, ""];
                        setEventInput(name || "");
                        setMeetingTime(event.eventTime || "");
                      }
                    }}
                    >
                    {event.text}
                    {/* Delete Button for Future Events */}
                    {(selectedYear > currentYear ||
                      (selectedYear === currentYear && selectedMonth > currentMonth) ||
                      (selectedYear === currentYear && selectedMonth === currentMonth && selectedDay >= currentDate)) && (
                        <button
                          className="text-red-500 text-sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            setEventToDelete(event); // Store event details before confirming
                          }}>✖</button>
                      )}
                  </li>
                ))}
              </ul>
            ) : (
              (selectedYear < currentYear ||
                (selectedYear === currentYear && selectedMonth < currentMonth) ||
                (selectedYear === currentYear && selectedMonth === currentMonth && selectedDay < currentDate)) ? (
                <p className="text-gray-500 text-center mt-2">No events</p>
              ) : null
            )}
            <button className="bg-gray-300 px-3 py-1 rounded w-full mt-2" onClick={() => setModalOpen(false)}>Close</button>
          </div>
        </div>
      )}
    

<AnimatePresence>
  {eventToDelete && (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.2 } }}
    >
      <motion.div
        className="bg-white p-4 rounded-lg shadow-lg text-center"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        <p className="mb-4">Are you sure you want to delete "<strong>{eventToDelete.text}</strong>"?</p>
        <div className="flex justify-center gap-3">
          <button
            className="bg-teal-500 text-white px-3 py-1 rounded hover:bg-teal-600"
            onClick={async () => {
              await handleConfirmDelete(eventToDelete.id);
              setEventToDelete(null);
            }}>
            Confirm
          </button>
          <button
            className="bg-gray-300 px-3 py-1 rounded hover:bg-gray-400"
            onClick={() => setEventToDelete(null)}>
            Cancel
          </button>
        </div>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>


      {successMessage && (
        <div className="fixed bottom-5 left-1/2 transform -translate-x-1/2 bg-teal-500 text-white px-4 py-2 rounded-lg shadow-lg">
          {successMessage}
        </div>
      )}
    </div>
  );
};
export default MonthView;
