import React, { useState } from "react";

const MonthView = () => {
  const daysOfWeek = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
  const months = [
    "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
  ];

  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [events, setEvents] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);
  const [eventText, setEventText] = useState("");

  const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const startDay = (new Date(selectedYear, selectedMonth, 1).getDay() + 6) % 7;
  const daysInMonth = getDaysInMonth(selectedYear, selectedMonth);
  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const handleSaveEvent = () => {
    if (selectedDate) {
      setEvents((prev) => ({ ...prev, [selectedDate]: eventText }));
      setSelectedDate(null);
      setEventText("");
    }
  };

  return (
    <div className="flex h-screen p-4 bg-gray-100">
      {/* Sidebar */}
      <div className="w-full md:w-1/5 p-3 border-r border-gray-300">
        <div className="flex items-center justify-between md:justify-start space-x-2">
          <h1 className="text-xl md:text-3xl font-bold">{selectedYear}</h1>
          <select 
            className="border border-teal-500 px-3 py-1 rounded-lg text-teal-500 text-sm"
            value={selectedYear}
            onChange={(e) => setSelectedYear(Number(e.target.value))}
          >
            {Array.from({ length: 21 }, (_, i) => selectedYear - 10 + i).map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>
        <h2 className="mt-4 text-lg font-bold">{months[selectedMonth]}</h2>
        {/* Smaller Calendar */}
        <div className="grid grid-cols-7 gap-1 text-gray-700 text-xs mt-2">
          {["M", "T", "W", "T", "F", "S", "S"].map((d) => (
            <span key={d} className="font-bold text-center">{d}</span>
          ))}
          {[...Array(getDaysInMonth(selectedYear, selectedMonth))].map((_, i) => (
            <button
              key={i}
              className={`w-6 h-6 flex items-center justify-center rounded-full text-xs ${i + 1 === new Date().getDate() ? "bg-teal-500 text-white" : ""}`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Main Calendar */}
      <div className="w-4/5 p-6">
        <h1 className="text-3xl font-bold mb-4">{months[selectedMonth]}</h1>
        <div className="grid grid-cols-7 gap-4 bg-white p-4 rounded-lg shadow-lg">
          {daysOfWeek.map((day) => (
            <div key={day} className="font-bold text-center border-b pb-2">{day}</div>
          ))}

          {Array.from({ length: startDay }).map((_, i) => (
            <div key={`empty-${i}`} className="text-center"></div>
          ))}

          {daysArray.map((day) => (
            <div
              key={day}
              className="h-20 border p-2 relative cursor-pointer"
              onClick={() => {
                setSelectedDate(`${selectedYear}-${selectedMonth + 1}-${day}`);
                setEventText(events[`${selectedYear}-${selectedMonth + 1}-${day}`] || "");
              }}
            >
              <span className="absolute top-1 left-1 text-sm font-semibold">{day}</span>
              {events[`${selectedYear}-${selectedMonth + 1}-${day}`] && (
                <div className="text-xs bg-teal-500 text-white p-1 mt-1 rounded">
                  {events[`${selectedYear}-${selectedMonth + 1}-${day}`]}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Event Modal */}
      {selectedDate && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-bold mb-2">Add/Edit Event for {selectedDate}</h2>
            <textarea
              className="w-full border p-2 rounded"
              value={eventText}
              onChange={(e) => setEventText(e.target.value)}
            />
            <div className="flex justify-end mt-4 space-x-2">
              <button
                className="bg-red-500 text-white px-3 py-1 rounded"
                onClick={() => setSelectedDate(null)}
              >
                Cancel
              </button>
              <button
                className="bg-teal-500 text-white px-3 py-1 rounded"
                onClick={handleSaveEvent}
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
