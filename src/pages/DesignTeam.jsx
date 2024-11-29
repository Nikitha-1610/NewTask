import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarAlt,
  faSliders,
  faPlus,
  faChevronDown,
  faChevronUp,
  faComment,
  faLink,
} from "@fortawesome/free-solid-svg-icons";
import axiosInstance from "../utilities/axios/axiosInstance";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import ReactLoading from "react-loading";

// DateDisplay component
const DateDisplay = ({ isoDate }) => {
  if (!isoDate) return "No Date";
  const formatDate = (isoDate) => {
  const date = new Date(isoDate);
  const options = { month: "long", day: "numeric" };
    return new Intl.DateTimeFormat("en-US", options).format(date);
  };
  return <span>{formatDate(isoDate)}</span>;
};

const generateRandomColor = () => {
  const colors = [
    "bg-green-200",
    "bg-blue-200",
    "bg-yellow-200",
    "bg-red-200",
    "bg-teal-200",
    "bg-purple-200",
    "bg-pink-200",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch tasks from the API
  useEffect(() => {
    setLoading(true);
    axiosInstance
      .get("task/getTaskDashboard/TeamLead1")
      .then((response) => {
        if (response.data && response.data.message) {
          setTaskData(response.data.message);
        } else {
          // If response is unexpected, reset to default structure
          setTaskData({
            inTestTasks: [],
            inProgressTasks: [],
            completedTasks: [],
            todayAssignedTasks: [],
          });
        }
        setError(null); // Clear any previous errors
      })
      .catch((error) => {
        console.error("Error fetching task data:", error);
        setError("Failed to fetch task data. Please try again later.");
      })
      .finally(() => {
        setLoading(false); // Ensure loading stops after completion
      });
  }, []);

  const labels = [
    ...new Set([
      ...(taskData.inTestTasks?.flatMap((task) => task.taskName) || []),
      ...(taskData.inProgressTasks?.flatMap((task) => task.taskName) || []),
      ...(taskData.completedTasks?.flatMap((task) => task.taskName) || []),
      ...(taskData.todayAssignedTasks?.flatMap((task) => task.taskName) || []),
    ]),
  ];

  const handleFilterChange = (label) => {
    setFilterLabel(label);
    setShowFilterDropdown(false);
  };

  const handleColumnClick = (status, assignedBy, path) => {
    // Make a POST request with the passed parameters
    axiosInstance
      .post("task/getTaskByStatus", { status, assignedBy })
      .then((response) => {
        console.log("API Response:", response.data);
        // Navigate to the specified path after successful API call
        navigate(path, { state: response.data.message || [] });
      })
      .catch((error) => {
        console.error("Error making POST request:", error);
      });
  };

  const filteredColumns = [
    {
      title: "TODAY ASSIGNED",
      color: "green",
      tasks: taskData.todayAssignedTasks.filter((task) =>
        filterLabel ? task.taskName === filterLabel : true
      ),
      path: "/assign",
      status: "Today-Assigned",
      assignedBy: "TeamLead1",
    },
    {
      title: "IN PROGRESS",
      color: "yellow",
      tasks: taskData.inProgressTasks.filter((task) =>
        filterLabel ? task.taskName === filterLabel : true
      ),
      path: "/inprogress",
      status: "In-Progress",
      assignedBy: "TeamLead1",
    },
    {
      title: "IN TEST",
      color: "red",
      tasks: taskData.inTestTasks.filter((task) =>
        filterLabel ? task.taskName === filterLabel : true
      ),
      path: "/intest",
      status: "In-Test",
      assignedBy: "TeamLead1",
    },
    {
      title: "COMPLETED",
      color: "teal",
      tasks: taskData.completedTasks.filter((task) =>
        filterLabel ? task.taskName === filterLabel : true
      ),
      path: "/completed",
      status: "Completed",
      assignedBy: "TeamLead1",
    },
  ];

  const toggleColumn = (colIndex) => {
    setCollapsedColumns((prev) => ({
      ...prev,
      [colIndex]: !prev[colIndex],
    }));
  };

  const handleAddTask = () => {
    navigate("/addtasks");
  };

  return (
    <div className="p-2 min-h-screen">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 space-y-4 sm:space-y-0 md:space-y-0 ml-5 mt-2">
        <h1 className="text-2xl font-bold text-gray-700 bg-teal-100 rounded-lg w-60 h-9 text-center">
          DESIGN TEAM
        </h1>
        <div className="flex space-x-4 flex-wrap items-center sm:ml-auto sm:space-x-4 md:space-x-6">
          <button
            onClick={handleAddTask}
            className="flex items-center px-4 py-2 bg-teal-500 text-white font-bold rounded-2xl hover:bg-green-600"
          >
            <FontAwesomeIcon icon={faPlus} className="mr-2" />
            Add a task
          </button>
          <div className="relative">
            <button
              onClick={() => setShowFilterDropdown(!showFilterDropdown)}
              className="flex items-center px-4 py-2 bg-gray-200 text-gray-700 font-bold rounded-lg hover:bg-gray-300"
            >
              <FontAwesomeIcon icon={faSliders} className="mr-2" />
              Filter
            </button>
            {showFilterDropdown && (
              <div className="absolute top-full left-0 mt-2 w-30 max-w-13 bg-white border rounded shadow-lg z-10">
                <button
                  onClick={() => handleFilterChange("")}
                  className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100"
                >
                  All
                </button>
                {labels.map((label, index) => (
                  <button
                    key={index}
                    onClick={() => handleFilterChange(label)}
                    className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100"
                  >
                    {label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Board Columns */}
      {loading ? (
        <div className="flex justify-center items-center h-80">
          <ReactLoading type="spin" color="#21a6a1" height={50} width={50} />
        </div>
      ) : error ? (
        <div className="flex items-center justify-center h-40">
          <span className="text-red-500">{error}</span>
        </div>
      ) : (
        <div className="flex flex-col md:flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4">
          {filteredColumns.map((column, colIndex) => (
            <div
              key={colIndex}
              className="flex-2 w-full sm:w-full md:w-full lg:basis-1/3 lg:max-w-lg"
            >
              <div className="flex items-center justify-between border-b-2 pb-2">
                <button
                  onClick={() =>
                    handleColumnClick(
                      column.status,
                      column.assignedBy,
                      column.path
                    )
                  }
                  className={`font-semibold p-2 ${column.color}-600 flex-grow`}
                >
                  {column.title}
                </button>
                <span className="flex items-center justify-center w-6 h-6 bg-gray-200 text-xs rounded-full ml-auto">
                  {column.tasks.length}
                </span>
                <div className="lg:hidden">
                  <FontAwesomeIcon
                    icon={
                      collapsedColumns[colIndex] ? faChevronDown : faChevronUp
                    }
                    className="ml-5 cursor-pointer"
                    onClick={(e) => {
                      e.preventDefault();
                      toggleColumn(colIndex);
                    }}
                  />
                </div>
              </div>

              {(!collapsedColumns[colIndex] || window.innerWidth >= 1024) && (
                <div className="mt-4">
                  {column.tasks.map((task, taskIndex) => (
                    <Link
                      to={`/task/${task.taskId}`} // Navigate to the task details page with taskId
                      key={taskIndex}
                      className="block bg-white shadow rounded-lg p-4 mb-4 relative border border-gray-400 w-full"
                    >
                      <div className="absolute top-2 right-2">
                        {task.taskStatus === "Completed" ? (
                          <div className="flex items-center text-green-500 text-xs font-bold">
                            <span className="mr-1">✔✔</span>
                            <span>Done</span>
                          </div>
                        ) : (
                          <div className="flex items-center text-gray-500 text-sm">
                            <FontAwesomeIcon
                              icon={faCalendarAlt}
                              className="mr-1"
                            />
                            <DateDisplay isoDate={task.deadline} />
                          </div>
                        )}
                      </div>
                      {task.taskName && (
                        <span
                          className={`text-xs font-semibold mb-2 mt-4 inline-block px-2 py-1 rounded ${generateRandomColor()}`}
                        >
                          {task.taskName}
                        </span>
                      )}
                      <div className="flex justify-between">
                        <div>
                          <div className="text-sm text-black-100">
                            {task.taskDescription ||
                              "No description available."}
                          </div>
                          <div className="flex items-center text-sm text-gray-600 mt-2 space-x-4">
                            <div className="flex items-center">
                              <FontAwesomeIcon
                                icon={faComment}
                                className="mr-1"
                              />
                              {task.comment?.length || 0}
                            </div>
                            <div className="flex items-center">
                              <FontAwesomeIcon
                                icon={faLink}
                                className="mr-1 text-black-500"
                              />
                              {task.referenceFileUrl?.length || 0}
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Board;
