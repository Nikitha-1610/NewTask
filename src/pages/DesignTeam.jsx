import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt, faUsers, faComment, faSliders, faPlus } from "@fortawesome/free-solid-svg-icons";
import img1 from '../assets/img1.png';
import img2 from '../assets/img2.png';
import img3 from '../assets/img3.png';
import img4 from '../assets/img4.png';
import img5 from '../assets/img5.png';
import img6 from '../assets/img6.png';
import img7 from '../assets/img7.png';
import spiralPin from '../assets/spiralPin.png';

const Board = () => {
  const [filterLabel, setFilterLabel] = useState(""); // State for the selected label
  const [showFilterDropdown, setShowFilterDropdown] = useState(false); // State for dropdown visibility

  const columns = [
    {
      title: "TODAY ASSIGNED",
      color: "green",
      tasks: [
        {
          title: "Overall UX Process of full product for first version",
          dueDate: "Oct 10",
          label: "Work 1",
          status: "Assigned",
          images: [img1],
        },
      ],
    },
    {
      title: "IN PROGRESS",
      color: "yellow",
      tasks: [
        { title: "Overall UX Process of full product for first version", dueDate: "Oct 20", label: "Development", status: "In Progress" },
        { title: "Overall UX Process of full product for first version", dueDate: "Oct 12", label: "New Screen", status: "In Progress" },
        { title: "Overall UX Process of full product for first version", dueDate: "Oct 23", label: "Table Content", status: "In Progress" },
      ],
    },
    {
      title: "IN TEST",
      color: "red",
      tasks: [
        { title: "Overall UX Process of full product for first version", dueDate: "Oct 20", label: "UX Design", status: "In Test", images: [img2, img3] },
        { title: "Overall UX Process of full product for first version", dueDate: "Oct 20", label: "UX Research", status: "In Test" },
        { title: "Overall UX Process of full product for first version", dueDate: "Oct 20", label: "Planning", status: "In Test", images: [img4] },
      ],
    },
    {
      title: "COMPLETED",
      color: "teal",
      tasks: [
        { title: "Overall UX Process of full product for first version", dueDate: "Oct 20", label: "Requirement Gathering", status: "Completed", images: [img6, img7] },
        { title: "Overall UX Process of full product for first version", dueDate: "Oct 23", label: "Business Insights", status: "Completed" },
        { title: "Overall UX Process of full product for first version", dueDate: "Oct 23", label: "Development", status: "Completed", images: [img5] }
      ],
    },
  ];

  // Extract all unique labels from the tasks
  const labels = [...new Set(columns.flatMap(column => column.tasks.map(task => task.label)))];


  const handleFilterChange = (label) => {
    setFilterLabel(label);
    setShowFilterDropdown(false); // Close the dropdown after selecting a label
  };

  const filteredColumns = columns.map(column => ({
    ...column,
    tasks: column.tasks.filter(task => (filterLabel ? task.label === filterLabel : true)),
  }));

  const generateRandomColor = () => {
    const colors = ["bg-green-200", "bg-blue-200", "bg-yellow-200", "bg-red-200", "bg-teal-200", "bg-purple-200", "bg-pink-200"];
    return colors[Math.floor(Math.random() * colors.length)];
  };



  return (
    <div className="p-2 bg-gray-100 min-h-screen">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-700 bg-teal-100 rounded-lg w-60 h-9 text-center ">DESIGN TEAM</h1>
        <div className="flex space-x-4">
          <button className="flex items-center px-4 py-2 bg-teal-500 text-white  font-bold rounded-2xl hover:bg-green-600">
            <FontAwesomeIcon icon={faPlus} className="mr-2" />
            Add a task
          </button>

          {/* Filter Button */}
          <div className="relative">
            <button
              onClick={() => setShowFilterDropdown(!showFilterDropdown)} // Toggle dropdown visibility
              className="flex items-center px-4 py-2 bg-gray-200 text-gray-700 font-bold rounded-lg hover:bg-gray-300"
            >
              <FontAwesomeIcon icon={faSliders} className="mr-2" />
              Filter
            </button>

            {/* Dropdown Menu */}
            {showFilterDropdown && (
              <div className="absolute top-full left-0 mt-2 w-30 max-w-13 bg-white border rounded shadow-lg z-10">
                <button onClick={() => handleFilterChange("")} className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100">All</button>
                {labels.map((label, index) => (
                  <button key={index} onClick={() => handleFilterChange(label)} className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100">
                    {label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Board Columns */}
      <div className="flex space-x-4">
        {filteredColumns.map((column, colIndex) => (
          <div key={colIndex} className="flex-1">
            {/* Column Title with Bottom Border */}
            <h2 className={`font-semibold mb-4 p-2 border-b-2 ${column.color === 'green' ? 'text-gray-600 border-green-400' :
              column.color === 'yellow' ? 'text-gray-600 border-yellow-500' :
                column.color === 'red' ? 'text-gray-600 border-red-500' :
                  column.color === 'teal' ? 'text-gray-600 border-teal-500' : ''}`}>
              {column.title}
            </h2>

            {/* Tasks */}
            {column.tasks.map((task, taskIndex) => (
              <div key={taskIndex} className="bg-white shadow rounded-lg  p-4 mb-4 relative border border-gray-400">
                <div className="flex items-center text-gray-500 text-xs absolute top-2 right-2 ">
                  <FontAwesomeIcon icon={faCalendarAlt} className="mr-1" />
                  <span>{task.dueDate}</span>
                </div>

                {task.label && (
                  <span className={`text-xs font-semibold mb-2 inline-block px-2 py-1 rounded ${generateRandomColor()}`}>
                    {task.label}
                  </span> 
                )}

                <h3 className="text-sm font-semibold text-gray-800 mt-2">{task.title}</h3>
                {task.images && task.images.length > 0 && (
                  <div className={`mt-2 flex ${task.images.length > 1 ? 'space-x-2' : ''}`}>
                    {task.images.map((image, imgIndex) => (
                      <img
                        key={imgIndex}
                        src={image}
                        alt={`Task image ${imgIndex + 1}`}
                        className={`${task.images.length === 1 ? 'w-full' : 'w-1/2'} h-24 object-cover rounded`}
                      />
                    ))}
                  </div>
                )}
                <div className="flex justify-between items-center mt-4">
                  <div className="flex items-center text-gray-500 text-xs">
                    <FontAwesomeIcon icon={faComment} className="mr-1" />
                    <span>8</span>
                    <img src={spiralPin} alt="Pin icon" className="w-4 h-4 mr-1 ml-2 " />
                  </div>
                  <div className="flex items-center text-gray-500 text-xs">
                    <FontAwesomeIcon icon={faUsers} className="mr-1" />
                    <span>8</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Board;
