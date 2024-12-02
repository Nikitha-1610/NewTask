import React from "react";

const Sidebar = ({ year, events }) => {
  const today = new Date().toISOString().split("T")[0]; // Format: YYYY-MM-DD

  return (
    <div className="w-64 bg-gray-50 p-4 border-r">
      <h1 className="text-4xl font-semibold mb-4">{year}</h1>
      <h2 className="font-semibold text-lg mb-4">Today</h2>
      <ul className="space-y-4">
        {(events[today] || []).map((event, index) => (
          <li key={index} className="flex items-center space-x-2">
            <span className="w-3 h-3 rounded-full bg-blue-500"></span>
            <p>{event}</p>
          </li>
        ))}
        {!events[today]?.length && <p>No events for today.</p>}
      </ul>
    </div>
  );
};

export default Sidebar;
