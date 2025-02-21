import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarAlt,
  faChevronDown,
  faChevronUp,
  faComment,
  faLink,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import ReactLoading from "react-loading";

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

const UserHome = () => {
  const [taskData, setTaskData] = useState({
    inTestTasks: [],
    inProgressTasks: [],
    completedTasks: [],
    assignedTasks: [],
  });

  const [collapsedColumns, setCollapsedColumns] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const baseUrl = "https://3qhglx2bhd.execute-api.us-east-1.amazonaws.com/";

  useEffect(() => {
    const employeeName = localStorage.getItem("name");

    if (!employeeName) {
      console.error("No employee name found in localStorage.");
      setLoading(false);
      return;
    }

    const fetchTasks = async () => {
      try {
        const response = await fetch(`${baseUrl}task/userTasks/${employeeName}`, {
          method: "GET",
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch tasks: ${response.status}`);
        }

        const data = await response.json();

        if (!data.message) {
          throw new Error("API response does not contain 'message' key.");
        }

        setTaskData(data.message);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const filteredColumns = [
    { title: "ASSIGNED TASKS", color: "green", tasks: taskData.assignedTasks || [], path: "/assigned" },
    { title: "IN PROGRESS", color: "yellow", tasks: taskData.inProgressTasks || [], path: "/in-progress" },
    { title: "IN TEST", color: "red", tasks: taskData.inTestTasks || [], path: "/in-test" },
    { title: "COMPLETED", color: "teal", tasks: taskData.completedTasks || [], path: "/completed" },
  ];

  const toggleColumn = (colIndex) => {
    setCollapsedColumns((prev) => ({
      ...prev,
      [colIndex]: !prev[colIndex],
    }));
  };

  const handleHeadingClick = (column) => {
    navigate(`/user${column.path}`, { state: { tasks: column.tasks } });
  };

  return (
    <div className="p-2 min-h-screen">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 space-y-4 sm:space-y-0 ml-5 mt-2">
        <h1 className="text-2xl font-bold text-gray-700 bg-teal-100 rounded-lg w-60 h-9 flex items-center justify-center">
          TASKS
        </h1>
      </div>

      {/* Loader */}
      {loading ? (
  <div className="fixed inset-0 flex justify-center items-center bg-white bg-opacity-70 z-50">
    <ReactLoading type="spin" color="#00bfae" height={50} width={50} />
  </div>
) : (

        <div className="flex flex-col md:flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4">
          {filteredColumns.map((column, colIndex) => (
            <div key={colIndex} className="flex-2 w-full sm:w-full md:w-full lg:basis-1/3 lg:max-w-lg">
              {/* Clickable Header */}
              <div
                className="flex items-center justify-between border-b-2 pb-2 cursor-pointer"
                onClick={() => handleHeadingClick(column)}
              >
                <h2 className="font-semibold p-2 text-left flex-grow">{column.title}</h2>
                <span className="flex items-center justify-center w-6 h-6 bg-gray-200 text-xs rounded-full">
                  {column.tasks.length}
                </span>
                <FontAwesomeIcon
                  icon={collapsedColumns[colIndex] ? faChevronDown : faChevronUp}
                  className="ml-5 cursor-pointer"
                  onClick={(e) => {
                    e.preventDefault();
                    toggleColumn(colIndex);
                  }}
                />
              </div>

              {/* Task List */}
              {(!collapsedColumns[colIndex] || window.innerWidth >= 1024) && (
                <div className="mt-4">
                  {column.tasks.map((task, taskIndex) => (
                    <div
                      key={taskIndex}
                      className="block bg-white shadow rounded-lg p-4 mb-4 relative border border-gray-400 w-full cursor-pointer"
                      onClick={() => navigate(`/user/home/${task.taskId}`)}
                    >
                      <div className="absolute top-2 right-2">
                        {task.taskStatus === "Completed" ? (
                          <div className="flex items-center text-green-500 text-xs font-bold">
                            <span className="mr-1">✔✔</span>
                            <span>Done</span>
                          </div>
                        ) : (
                          <div className="flex items-center text-gray-500 text-sm">
                            <FontAwesomeIcon icon={faCalendarAlt} className="mr-1" />
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
                            {task.taskDescription || "No description available."}
                          </div>
                          <div className="flex items-center text-sm text-gray-600 mt-2 space-x-4">
                            <div className="flex items-center">
                              <FontAwesomeIcon icon={faComment} className="mr-1" />
                              {Array.isArray(task.comment) ? task.comment.length : 0} Comments
                            </div>
                            <div className="flex items-center">
                              <FontAwesomeIcon icon={faLink} className="mr-1" />
                              {Array.isArray(task.referenceFileUrl) ? task.referenceFileUrl.length : 0} Attachments
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
      )}
    </div>
  );
};

export default UserHome;
