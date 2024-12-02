import React from "react";

const CalendarGrid = ({ year, events, onDateSelect }) => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const getDaysInMonth = (month, year) =>
    new Date(year, month + 1, 0).getDate();

  return (
    <div className="grid grid-cols-4 gap-6 p-6">
      {months.map((month, monthIndex) => {
        const days = getDaysInMonth(monthIndex, year);

        return (
          <div key={month} className="border rounded p-4 bg-white shadow-sm">
            <h3 className="font-bold mb-2">{month}</h3>
            <table className="w-full text-sm text-gray-700">
              <thead>
                <tr>
                  {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
                    (day) => (
                      <th key={day} className="px-1 py-1">
                        {day}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody>
                {[...Array(6)].map((_, row) => (
                  <tr key={row}>
                    {[...Array(7)].map((_, col) => {
                      const day =
                        row * 7 +
                        col -
                        new Date(year, monthIndex, 1).getDay() +
                        2;
                      const date = `${year}-${String(monthIndex + 1).padStart(
                        2,
                        "0"
                      )}-${String(day).padStart(2, "0")}`;

                      return (
                        <td
                          key={col}
                          className={`px-1 py-1 text-center cursor-pointer ${
                            day > 0 && day <= days
                              ? "hover:bg-blue-100"
                              : "text-gray-300"
                          }`}
                          onClick={() =>
                            day > 0 && day <= days && onDateSelect(date)
                          }
                        >
                          {day > 0 && day <= days ? (
                            <span
                              className={`${
                                events[date]?.length
                                  ? "bg-blue-200 rounded"
                                  : ""
                              }`}
                            >
                              {day}
                            </span>
                          ) : (
                            ""
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      })}
    </div>
  );
};

export default CalendarGrid;
