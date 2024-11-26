import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt, faUsers, faComment, faSliders, faPlus, faChevronDown, faLink, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import axiosInstance from "../utilities/axios/axiosInstance";
import { Link, useNavigate } from 'react-router-dom';
import TaskDetails from "../components/TaskDetails";

const Board = () => {
  const [taskData, setTaskData] = useState({
    inTestTasks: [],
    inProgressTasks: [],
    completedTasks: [],
    todayAssignedTasks: [],
  });
  const [filterLabel, setFilterLabel] = useState("");
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [collapsedColumns, setCollapsedColumns] = useState({});
  const [selectedTask, setSelectedTask] = useState(null);
  const navigate = useNavigate();

  // Fetch tasks from the API
  useEffect(() => {
    axiosInstance.get("task/getTaskDashboard/TeamLead1")
      .then(response => {
        setTaskData(response.data.message || {
          inTestTasks: [],
          inProgressTasks: [],
          completedTasks: [],
          todayAssignedTasks: [],
        });
      })
      .catch(error => {
        console.error("Error fetching task data:", error);
      });
  }, []);

  const labels = [
    ...new Set([
      ...taskData.inTestTasks?.flatMap((task) => task.taskName) || [],
      ...taskData.inProgressTasks?.flatMap((task) => task.taskName) || [],
      ...taskData.completedTasks?.flatMap((task) => task.taskName) || [],
      ...taskData.todayAssignedTasks?.flatMap((task) => task.taskName) || []
    ]),
  ];

  const handleFilterChange = (label) => {
    setFilterLabel(label);
    setShowFilterDropdown(false);
  };

  const filteredColumns = [
    {
      title: "TODAY ASSIGNED",
      color: "green",
      tasks: taskData.todayAssignedTasks.filter(task => filterLabel ? task.taskName === filterLabel : true),

      path: "/assign"
    },
    {
      title: "IN PROGRESS",
      color: "yellow",
      tasks: taskData.inProgressTasks.filter(task => filterLabel ? task.taskName === filterLabel : true),

      path: "/inprogress"
    },
    {
      title: "IN TEST",
      color: "red",
      tasks: taskData.inTestTasks.filter(task => filterLabel ? task.taskName === filterLabel : true),

      path: '/intest'
    },
    {
      title: "COMPLETED",
      color: "teal",
      tasks: taskData.completedTasks.filter(task => filterLabel ? task.taskName === filterLabel : true),
      // path: "completed",
    },
  ];

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
    navigate('/addtasks');
  };

const handleTaskStatusUpdate = (taskId, newStatus) => {
    // Find the task in the current list and update its status
    setTaskData(prevState => {
      const updatedInTestTasks = prevState.inTestTasks.map(task => 
        task.id === taskId ? { ...task, status: newStatus } : task
      );
      const updatedInProgressTasks = prevState.inProgressTasks.map(task => 
        task.id === taskId ? { ...task, status: newStatus } : task
      );
      const updatedCompletedTasks = prevState.completedTasks.map(task => 
        task.id === taskId ? { ...task, status: newStatus } : task
      );
  
      return {
        ...prevState,
        inTestTasks: updatedInTestTasks,
        inProgressTasks: updatedInProgressTasks,
        completedTasks: updatedCompletedTasks,
      };
    });
  };
const handleColumnClick = (tasks, columnTitle) => {
    navigate(`/task-details`, { state: { tasks, columnTitle } });
  };


  return (
    <div className="p-2 bg-gray-100 min-h-screen ">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 space-y-4 sm:space-y-0 md:space-y-0 ml-5 mt-2">
        <h1 className="text-2xl font-bold text-gray-700 bg-teal-100 rounded-lg w-60 h-9 text-center ">DESIGN TEAM</h1>
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
      <div className="flex flex-col md:flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4">
        {filteredColumns.map((column, colIndex) => (
          <div
            key={colIndex}
            className="flex-2 w-full sm:w-full md:w-full lg:basis-1/3 lg:max-w-lg"
          >
            {/* Column Header */}
            <div
              className="flex items-center justify-between border-b-2 pb-2"
              style={{
                borderColor:
                  column.color === "green"
                    ? "green"
                    : column.color === "yellow"
                      ? "yellow"
                      : column.color === "red"
                        ? "red"
                        : column.color === "teal"
                          ? "teal"
                          : "gray",
              }}
                onClick={() => handleColumnClick(column.tasks, column.title)}
            >
              {/* Title navigates to the specified path */}
              <Link
                to={column.path}
                className={`font-semibold p-2 ${column.color}-600 flex-grow`}
              >
                {column.title}
              </Link>

              {/* Task Count */}
              <span className="flex items-center justify-center w-6 h-6 bg-gray-200 text-xs rounded-full ml-auto">
                {column.tasks.length}
              </span>

              {/* Arrow visible only in Tabview and Mobileview */}
              <div className="lg:hidden">
                <FontAwesomeIcon
                  icon={collapsedColumns[colIndex] ? faChevronDown : faChevronUp}
                  className="ml-5 cursor-pointer"
                  onClick={(e) => {
                    e.preventDefault(); // Prevent navigation when clicking the arrow
                    toggleColumn(colIndex);
                  }}
                />
              </div>
            </div>

            {/* Column Content */}
            {(!collapsedColumns[colIndex] || window.innerWidth >= 1024) && (
              <div className="mt-4">
                {column.tasks.map((task, taskIndex) => (
                  <div
                    key={taskIndex}
                    className="bg-white shadow rounded-lg p-4 mb-4 relative border border-gray-400 w-full"
                  >
                    {/* Task Header */}
                    {/* <div className="absolute top-2 right-2">
                      {task.taskStatus === "Completed" ? (
                        <div className="flex items-center text-teal-600 text-xs font-bold">
                          <span className="mr-1">✔✔</span>
                          <span>Done</span>
                        </div>
                      ) : (
                        <div className="flex items-center text-gray-500 text-sm">
                          <FontAwesomeIcon icon={faCalendarAlt} className="mr-1" />
                          <span>{task.deadline}</span>
                        </div>
                      )}
                    </div> */}

<div className="absolute top-2 right-2">
  {task.taskStatus === "Completed" ? (
    <div className="flex items-center text-teal-600 text-xs font-bold">
      <span className="mr-1">✔✔</span>
      <span>Done</span>
    </div>
  ) : (
    <div className="flex items-center text-gray-500 text-sm ">
      <FontAwesomeIcon icon={faCalendarAlt} className="mr-1" />
      <span>
        {new Date(task.deadline).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
        })}
      </span>
    </div>
  )}
</div>


                    {/* Task Name */}
                    {task.taskName && (
                      <span
                        className={`text-xs font-semibold mb-4 mt-3 inline-block px-2 py-1 rounded ${generateRandomColor()}`}
                      >
                        {task.taskName}
                      </span>
                    )}

                    {/* Task Details */}
                    <div className="flex justify-between">
                      <div>
                        <div className="text-sm text-black-100">
                          {task.taskDescription || "No description available."}
                        </div>

                        {/* Comments and References */}
                        <div className="flex items-center text-sm text-gray-600 mt-2 space-x-4">
                          <div className="flex items-center">
                            <FontAwesomeIcon icon={faComment} className="mr-1" />
                            {task.comment?.length || 0}
                          </div>
                          <div className="flex items-center">
                            <FontAwesomeIcon icon={faLink} className="mr-1 text-black-500" />
                            {task.referenceFileUrl?.length || 0}
                          </div>
                        </div>
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
