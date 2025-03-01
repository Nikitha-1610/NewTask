import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const MonthView = () => {
  const navigate = useNavigate();
  const { year, month } = useParams();

  const selectedYear = Number(year);
  const selectedMonth = Number(month);

  const [events, setEvents] = useState({});
  const [selectedDay, setSelectedDay] = useState(null);
  const [eventInput, setEventInput] = useState("");
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

  useEffect(() => {
    const savedEvents = localStorage.getItem(`events-${selectedYear}-${selectedMonth}`);
    if (savedEvents) {
      setEvents(JSON.parse(savedEvents));
    }
  }, [selectedYear, selectedMonth]);

  useEffect(() => {
    localStorage.setItem(`events-${selectedYear}-${selectedMonth}`, JSON.stringify(events));
  }, [events, selectedYear, selectedMonth]);

  const handleAddOrEditEvent = () => {
    if (!eventInput.trim()) {
      return;
    }

    setEvents((prev) => ({
      ...prev,
      [selectedDay]: eventInput.trim(),
    }));

    setModalOpen(false);
    setEventInput("");
  };

  useEffect(() => {
    if (selectedDay && events[selectedDay]) {
      setEventInput(events[selectedDay]);
    } else {
      setEventInput("");
    }
  }, [selectedDay, events]);

  return (
    <div className="flex h-screen p-4 bg-gray-100">
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
          {daysArray.map(day => (
            <button
              key={day}
              className={`w-6 h-6 flex items-center justify-center rounded-full text-xs 
                ${events[day] ? "bg-green-500 text-white" : ""} 
                ${(new Date(selectedYear, selectedMonth, day).getDay() === 0) ? "text-red-500" : ""}`}
              onClick={() => {
                setSelectedDay(day);
                setModalOpen(true);
              }}
            >
              {day}
            </button>
          ))}
        </div>
      </div>

      <div className="w-4/5 p-6">
        <h1 className="text-3xl font-bold mb-4">{months[selectedMonth]} {selectedYear}</h1>
        <div className="grid grid-cols-7 gap-4 bg-white p-4 rounded-lg shadow-lg">
          {daysOfWeek.map((day, index) => (
            <div key={day} className={`font-bold text-center border-b pb-2 ${index === 6 ? "text-red-500" : ""}`}>{day}</div>
          ))}

          {Array.from({ length: startDay }).map((_, i) => (
            <div key={`empty-${i}`} className="text-center"></div>
          ))}

          {daysArray.map(day => (
            <div 
              key={day} 
              className={`h-20 border p-2 relative cursor-pointer hover:bg-gray-200 
                ${events[day] ? "bg-green-200" : ""}`}
              onClick={() => {
                setSelectedDay(day);
                setModalOpen(true);
              }}
            >
              <span className={`absolute top-1 left-1 text-sm font-semibold ${(new Date(selectedYear, selectedMonth, day).getDay() === 0) ? "text-red-500" : ""}`}>
                {day}
              </span>
              {events[day] && (
                <div className="mt-2 text-xs bg-gray-200 p-1 rounded">
                  {events[day]}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-80">
            <h2 className="text-lg font-bold mb-2">Event for {months[selectedMonth]} {selectedDay}</h2>
            
            <input 
              type="text" 
              value={eventInput} 
              onChange={(e) => setEventInput(e.target.value)}
              placeholder="Event details..." 
              className="w-full border p-2 mb-2"
            />

            <div className="flex justify-end mt-4">
              <button 
                className="bg-gray-300 px-3 py-1 rounded mr-2"
                onClick={() => setModalOpen(false)}
              >
                Cancel
              </button>
              <button 
                className="bg-teal-500 text-white px-3 py-1 rounded"
                onClick={handleAddOrEditEvent}
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
