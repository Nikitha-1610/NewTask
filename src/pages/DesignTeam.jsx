import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt, faUsers, faComment, faSliders, faPlus, faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import img1 from '../assets/img1.png';
import img2 from '../assets/img2.png';
import img3 from '../assets/img3.png';
import img4 from '../assets/img4.png';
import img5 from '../assets/img5.png';
import img6 from '../assets/img6.png';
import img7 from '../assets/img7.png';
import paperpin from '../assets/paper-pin.png'
import user1 from '../assets/users/user1.png'
import user2 from '../assets/users/user2.png'
import user3 from '../assets/users/user3.png'
import user4 from '../assets/users/user4.png'
import user5 from '../assets/users/user5.png'
import user6 from '../assets/users/user6.png'
import user7 from '../assets/users/user7.png'
import user8 from '../assets/users/user8.png'
import user9 from '../assets/users/user9.png'
import user10 from '../assets/users/user10.png'
import user11 from '../assets/users/user11.png'
import user12 from '../assets/users/user12.png'
import user13 from '../assets/users/user13.png'
import user14 from '../assets/users/user14.png'
import user15 from '../assets/users/user15.png'
import user16 from '../assets/users/user16.png'
import user17 from '../assets/users/user17.png'
import user18 from '../assets/users/user18.png'
import user19 from '../assets/users/user19.png'


import { Link, useNavigate } from 'react-router-dom';
// import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const Board = () => {
  const [filterLabel, setFilterLabel] = useState("");
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [collapsedColumns, setCollapsedColumns] = useState({});
  const navigate = useNavigate();

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
                users: [
                  { id: 1, image: user1 },
                 
                ],
      
              },
            ],
            path: "/assign"
      
          },
          {
            title: "IN PROGRESS",
            color: "yellow",
            tasks: [
              {
                title: "Overall UX Process of full product for first version",
                dueDate: "Oct 20",
                label: "Development",
                status: "In Progress",
                users: [
                  { id: 2, image: user2 },
                  { id: 3, image: user3 },
                  { id: 4, image: user4 },
                  
        

                 
                ],
              },
              {
                title: "Overall UX Process of full product for first version",
                dueDate: "Oct 12",
                label: "New Screen",
                status: "In Progress",
                users: [
                  { id: 5, image: user5 },
                
        

                 
                ],
              },
              {
                title: "Overall UX Process of full product for first version",
                dueDate: "Oct 23",
                label: "Table Content",
                status: "In Progress",
                users: [
                  { id: 6, image: user6 },
                
        

                 
                ],
              },
              {
                title: "Overall UX Process of full product for first version",
                dueDate: "Oct 3",
                label: "Planning",
                status: "In Progress",
                users: [
                  { id: 7, image: user7 },
                
        

                 
                ],
              },
              {
                title: "Overall UX Process of full product for first version",
                dueDate: "Oct 5",
                label: "Planning",
                status: "In Progress",
               
              },
      
            ],
            path: "/task"
          },
          {
            title: "IN TEST",
            color: "red",
            tasks: [
              {
                title: "Overall UX Process of full product for first version",
                dueDate: "Oct 20",
                label: "UX Design",
                status: "In Test",
                images: [img2, img3],
                users: [
                  { id: 8, image: user8 },
                  { id: 9, image: user9 },
                  { id: 10, image: user10 },
                
        

                 
                ],
              },
              {
                title: "Overall UX Process of full product for first version",
                dueDate: "Oct 20",
                label: "UX Research",
                status: "In Test",
                users: [
                  { id: 11, image: user11 },
                  
        

                 
                ],
              },
              {
                title: "Overall UX Process of full product for first version",
                dueDate: "Oct 20",
                label: "Planning",
                status: "In Test",
                images: [img4],
                users: [
                  { id: 12, image: user12},
                  
        

                 
                ],
              },
            ],
            path: '/intest'
          },
          {
            title: "COMPLETED",
            color: "teal",
            tasks: [
              {
                title: "Overall UX Process of full product for first version",
                dueDate: "Oct 20",
                label: "Requirement Gathering",
                status: "Completed",
                images: [img6, img7],
                users: [
                  { id: 13, image: user13 },
                  { id: 14, image: user14 },
                  { id: 15, image: user15 },
                  
        

                 
                ],
              },
              {
                title: "Overall UX Process of full product for first version",
                dueDate: "Oct 23",
                label: "Business Insights",
                status: "Completed",
                users: [
                  { id: 16, image: user16 },
                  { id: 17, image: user17 },
                  
                  
        

                 
                ],
              },
              {
                title: "Overall UX Process of full product for first version",
                dueDate: "Oct 23",
                label: "Development",
                status: "Completed",
                images: [img5],
                users: [
                  { id: 18, image: user18 },
                  { id: 19, image: user19 },
                  
                  
        

                 
                ],
              },
              {
                title: "Overall UX Process of full product for first version",
                dueDate: "Oct 23",
                label: "Development",
                status: "Completed",
                images: [img5],
              },
              {
                title: "Overall UX Process of full product for first version",
                dueDate: "Oct 23",
                label: "Development",
                status: "Completed",
                images: [img5],
              },
              {
                title: "Overall UX Process of full product for first version",
                dueDate: "Oct 23",
                label: "Development",
                status: "Completed",
                images: [img5],
              },
              {
                title: "Overall UX Process of full product for first version",
                dueDate: "Oct 23",
                label: "Development",
                status: "Completed",
                images: [img5],
              },
            ],
          },
  ];

  const labels = [
    ...new Set(
      columns.flatMap((column) => column.tasks.map((task) => task.label))
    ),
  ];

  const handleFilterChange = (label) => {
    setFilterLabel(label);
    setShowFilterDropdown(false);
  };

  const filteredColumns = columns.map((column) => ({
    ...column,
    tasks: column.tasks.filter((task) =>
      filterLabel ? task.label === filterLabel : true
    ),
  }));

  const generateRandomColor = () => {
    const colors = [
      "bg-green-200", "bg-blue-200", "bg-yellow-200", "bg-red-200", "bg-teal-200", "bg-purple-200", "bg-pink-200",
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const toggleColumn = (colIndex) => {
    setCollapsedColumns((prev) => ({
      ...prev,
      [colIndex]: !prev[colIndex],
    }));
  };

  const handleAddTask = () => {
    navigate('/addtasks'); // Navigate to the AddTask page
  };

  return (
    <div className="p-2 bg-gray-100 min-h-screen">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 space-y-4 sm:space-y-0 md:space-y-0">
        <h1 className="text-2xl font-bold text-gray-700 bg-teal-100 rounded-lg w-60 h-9 text-center">DESIGN TEAM</h1>
        <div className="flex space-x-4 flex-wrap items-center sm:ml-auto sm:space-x-4 md:space-x-6">
          <button onClick={handleAddTask} className="flex items-center px-4 py-2 bg-teal-500 text-white font-bold rounded-2xl hover:bg-green-600">
            <FontAwesomeIcon icon={faPlus} className="mr-2" />
            Add a task
          </button>
          <div className="relative">
            <button onClick={() => setShowFilterDropdown(!showFilterDropdown)} className="flex items-center px-4 py-2 bg-gray-200 text-gray-700 font-bold rounded-lg hover:bg-gray-300">
              <FontAwesomeIcon icon={faSliders} className="mr-2" />
              Filter
            </button>
            {showFilterDropdown && (
              <div className="absolute top-full left-0 mt-2 w-30 max-w-13 bg-white border rounded shadow-lg z-10">
                <button onClick={() => handleFilterChange("")} className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100">All</button>
                {labels.map((label, index) => (
                  <button key={index} onClick={() => handleFilterChange(label)} className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100">{label}</button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Board Columns */}
      <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4">
        {filteredColumns.map((column, colIndex) => (
         <div key={colIndex} className="flex-2">
  
   {/* Column Title with Link for Navigation */}
<Link to={column.path} className="w-full">  {/* Prevent navigation when clicking on dropdown */}
<div className="flex items-center justify-between lg:justify-between cursor-pointer border-b-2 pb-2"
  style={{
    borderColor: column.color === "green" ? "green" :
                  column.color === "yellow" ? "yellow" :
                  column.color === "red" ? "red" :
                  column.color === "teal" ? "teal" : "gray"
  }}
>
  {/* Wrap the Link around the entire column header, but don't prevent default */}
  
    <h2 className={`font-semibold p-2 ${column.color === "green" ? "text-gray-600" :
                        column.color === "yellow" ? "text-gray-600" :
                        column.color === "red" ? "text-gray-600" :
                        column.color === "teal" ? "text-gray-600" : "text-gray-600"} flex-grow`}>
      {column.title}
    </h2>
  

  {/* Task Count */}
  <span className="flex items-center justify-center w-6 h-6 bg-gray-200 text-xs rounded-full ml-auto">
    {column.tasks.length}
  </span>

  {/* Toggle Icon for mobile */}
  <FontAwesomeIcon
    icon={collapsedColumns[colIndex] ? faChevronDown : faChevronUp}
    className="ml-5 lg:hidden cursor-pointer"
    onClick={(e) =>{e.preventDefault(); toggleColumn(colIndex)}} // Only toggle visibility on click for mobile
  />
</div>
</Link>

{/* Mobile Dropdown */}
{showFilterDropdown && (
  <div className="absolute top-full left-0 mt-2 w-30 max-w-13 bg-white border rounded shadow-lg z-10">
    <button onClick={() => handleFilterChange("")} className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100">All</button>
    {labels.map((label, index) => (
      <button key={index} onClick={() => handleFilterChange(label)} className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100">{label}</button>
    ))}
  </div>
)}




  {/* Tasks - Visible on Desktop and toggled on Mobile */}
  {!collapsedColumns[colIndex] && (
    <div className="mt-4">
      {column.tasks.map((task, taskIndex) => (
        <div
          key={taskIndex}
          className="bg-white shadow rounded-lg p-4 mb-4 relative border border-gray-400"
        >
          {/* Task Details with Conditional Rendering for Completed Tasks */}
          <div className="absolute top-2 right-2">
            {task.status === "Completed" ? (
              <div className="flex items-center text-green-500 text-xs font-bold">
                <span className="mr-1">✔✔</span>
                <span>Done</span>
              </div>
            ) : (
              <div className="flex items-center text-gray-500 text-xs">
                <FontAwesomeIcon
                  icon={faCalendarAlt}
                  className="mr-1"
                />
                <span>{task.dueDate}</span>
              </div>
            )}
          </div>

          {task.label && (
            <span
              className={`text-xs font-semibold mb-2 inline-block px-2 py-1 rounded ${generateRandomColor()}`}
            >
              {task.label}
            </span>
          )}

          <h3 className="text-sm font-semibold text-gray-800 mt-2">
            {task.title}
          </h3>
          {task.images && task.images.length > 0 && (
            <div
              className={`mt-2 flex ${task.images.length > 1 ? "space-x-2" : ""}`}
            >
              {task.images.map((image, imgIndex) => (
                <img
                  key={imgIndex}
                  src={image}
                  alt={`Task image ${imgIndex + 1}`}
                  className={`${
                    task.images.length === 1 ? "w-full" : "w-1/2"
                  } h-24 object-cover rounded`}
                />
              ))}
            </div>
          )}
          <div className="flex justify-between items-center mt-4">
            <div className="flex items-center text-gray-500 text-xs">
              <FontAwesomeIcon icon={faComment} className="mr-1" />
              <span>8</span>
              <img
                src={paperpin}
                alt="Pin icon"
                className="w-2 h-3 mr-1 ml-2"
              />
              <span>4</span>
            </div>
           
            <div className="flex items-center mt-4">
    {task.users && task.users.length > 0 ? (
      task.users.map((user, index) => (
        <img
          key={index}
          src={user.image} // User's image URL
          alt={`User ${index + 1}`}
          className="w-6 h-6 rounded-full" // Ensures the images are round and same size as icon
        />
      ))
    ) : (
      <span className="text-gray-500 text-xs">No users</span>
    )}
  </div>
</div>
        </div>
      ))}
    </div>
  )}
</div>

        ))}
      </div>
    </div>
  );
};

export default Board;
