import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { postEvent, getEventByDate, getEventsByYear } from "../../common/api";

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
  const [eventId, setEventId] = useState(null);
  const [isLeave, setIsLeave] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const startDay = (new Date(selectedYear, selectedMonth, 1).getDay() || 7) - 1;
  const daysInMonth = getDaysInMonth(selectedYear, selectedMonth);
  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const formatDate = (year, month, day) => `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;


  useEffect(() => {
    const fetchAllEvents = async () => {
      const allEvents = {};
      for (let day = 1; day <= daysInMonth; day++) {
        const formattedDate = formatDate(selectedYear, selectedMonth, day);
        const eventData = await getEventByDate(formattedDate);
  
        if (eventData && eventData.length > 0) { // ✅ Check if events exist
          const event = eventData[0]; // ✅ Take the first event
          allEvents[day] = { id: event.id, text: event.eventName, leave: event.isLeave };
        }
      }
      setEvents(allEvents);
    };
    
    fetchAllEvents();
  }, [selectedYear, selectedMonth]);
  

  useEffect(() => {
    if (selectedDay) {
      const fetchEvent = async () => {
        const formattedDate = formatDate(selectedYear, selectedMonth, selectedDay);
        const eventData = await getEventByDate(formattedDate);
  
        if (eventData && eventData.length > 0) {  // ✅ Ensure eventData is not null
          const event = eventData[0];  // ✅ Take the first event
          setEventInput(event.eventName || "");
          setEventId(event.id || null);
          setIsLeave(event.isLeave || false);
        } else {
          setEventInput("");
          setEventId(null);
          setIsLeave(false);
        }
      };
  
      fetchEvent();
    }
  }, [selectedDay]);
  
  


  const handleAddOrUpdateEvent = async () => {
    if (!selectedDay || !eventInput.trim()) {
      alert("Event name is required.");
      return;
    }

    const eventDate = `${selectedYear}-${String(selectedMonth + 1).padStart(2, "0")}-${String(selectedDay).padStart(2, "0")}`;

    const newEventData = {
      eventDate,
      eventName: eventInput,
      leave: isLeave
    };

    try {
      const createdEvent = await postEvent(newEventData);
      console.log("Event created:", createdEvent);

      // 🔹 Check if the event is actually stored
      setTimeout(async () => {
        const fetchedEvent = await getEventByDate(eventDate);
        console.log("Fetched after creation:", fetchedEvent);
      }, 2000);

    } catch (error) {
      console.error("Error handling event:", error);
    }
  };

  useEffect(() => {
    console.log("Fetched Events:", events);
  }, [events]);
  

  return (
    <div className="flex h-screen p-4 bg-gray-100">
      {/* Sidebar - Mini Calendar */}
      <div className="w-full md:w-1/5 p-3 border-r border-gray-300">
        <button
          onClick={() => navigate(-1)}
          className="bg-gray-200 px-2 py-1 rounded-lg text-teal-600 hover:bg-teal-300 text-sm mb-3"
        >
          ⬅
        </button>

        <h1 className="text-xl md:text-3xl font-bold">{selectedYear}</h1>
        <h2 className="mt-4 text-lg font-bold">{months[selectedMonth]}</h2>

        <div className="grid grid-cols-7 gap-1 text-gray-700 text-xs mt-2">
          {daysOfWeek.map((d, index) => (
            <span key={d} className={`font-bold text-center ${index === 6 ? "text-red-500" : ""}`}>{d}</span>
          ))}
          {Array.from({ length: startDay }).map((_, i) => (
            <div key={`empty-${i}`} className="text-center"></div>
          ))}
          {daysArray.map(day => {
            const hasEvent = events[day];
            const dayOfWeek = (new Date(selectedYear, selectedMonth, day).getDay() || 7) - 1;

            return (
              <button
                key={day}
                className={`w-6 h-6 flex items-center justify-center rounded-full text-xs 
                  ${day === currentDate ? "bg-teal-500 text-white" : ""}
                  ${hasEvent ? "bg-blue-500 text-white" : ""}
                  ${dayOfWeek === 6 ? "text-red-500" : ""}`}
                onClick={() => {
                  if (year >= currentYear && month >= currentMonth && day >= currentDate) {
                    setSelectedDay(day);
                    setModalOpen(true);
                  }
                }}
              >
                {day}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Calendar */}
      <div className="w-4/5 p-6">
        <h1 className="text-3xl font-bold mb-4">{months[selectedMonth]} {selectedYear}</h1>
        <div className="grid grid-cols-7 gap-4 bg-white p-4 rounded-lg shadow-lg">
          {daysOfWeek.map((day, index) => (
            <div key={day} className={`font-bold text-center border-b pb-2 ${index === 6 ? "text-red-500" : ""}`}>{day}</div>
          ))}

          {Array.from({ length: startDay }).map((_, i) => (
            <div key={`empty-${i}`} className="text-center"></div>
          ))}

          {daysArray.map(day => {
            const hasEvent = events[day];
            const dayOfWeek = (new Date(selectedYear, selectedMonth, day).getDay() || 7) - 1;

            return (
              <div
                key={day}
                className={`h-20 border p-2 relative cursor-pointer hover:bg-gray-200 
                  ${hasEvent ? "bg-blue-200" : ""}`}
                onClick={() => {
                  if (year >= currentYear && month >= currentMonth && day >= currentDate) {
                    setSelectedDay(day);
                    setModalOpen(true);
                  }
                }}
              >
                <span className={`absolute top-1 left-1 text-sm font-semibold ${dayOfWeek === 6 ? "text-red-500" : ""}`}>
                  {day}
                </span>

                {hasEvent && hasEvent.text && (
                  <div className="mt-2 text-xs bg-gray-200 p-1 rounded">
                    {hasEvent.text}
                  </div>
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
            <h2 className="text-lg font-bold mb-2">Event for {months[selectedMonth]} {selectedDay}</h2>

            <input
              type="text"
              value={eventInput || ""}
              onChange={(e) => setEventInput(e.target.value)}
              placeholder="Event details..."
              className="w-full border p-2 mb-2"
            />

            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={isLeave}
                onChange={() => setIsLeave(!isLeave)}
              />
              <span>Mark as Leave</span>
            </label>

            <div className="flex justify-end mt-4">
              <button
                className="bg-gray-300 px-3 py-1 rounded mr-2"
                onClick={() => setModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="bg-teal-500 text-white px-3 py-1 rounded"
                onClick={handleAddOrUpdateEvent}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

};

export default MonthView;
