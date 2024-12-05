import React from "react";

const Header = ({ year, onYearChange, onAddMeeting }) => {
  return (
    <div className="flex items-center justify-between p-4 bg-white shadow">
      <div className="flex items-center space-x-4">
        <button
          onClick={() => onYearChange(year - 1)}
          className="px-4 py-2 bg-gray-300 rounded"
        >
          Previous
        </button>
        <h1 className="text-xl font-bold">{year}</h1>
        <button
          onClick={() => onYearChange(year + 1)}
          className="px-4 py-2 bg-gray-300 rounded"
        >
          Next
        </button>
      </div>
      <button
        onClick={onAddMeeting}
        className="px-4 py-2 bg-green-500 text-white rounded"
      >
        Add Meeting +
      </button>
    </div>
  );
};

export default Header;
