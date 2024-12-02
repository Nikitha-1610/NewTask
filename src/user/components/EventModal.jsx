import React, { useState } from "react";

const EventModal = ({ date, onClose, onSave }) => {
  const [event, setEvent] = useState("");

  const handleSave = () => {
    if (event.trim()) {
      onSave(date, event);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h2 className="text-lg font-bold mb-4">Add Event</h2>
        <p className="mb-2 text-gray-500">{date}</p>
        <input
          type="text"
          placeholder="Event name"
          value={event}
          onChange={(e) => setEvent(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        />
        <div className="flex justify-end space-x-4">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventModal;
