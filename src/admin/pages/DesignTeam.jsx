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
import axiosInstance from "../../common/utils/axios/axiosInstance";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import ReactLoading from "react-loading";
import { useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from 'react-dnd-html5-backend';



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


const BoardHeader = ({ showFilterDropdown, setShowFilterDropdown, taskNames, handleFilterChange, handleAddTask }) => {
  return (
    <div className="p-2">
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
                {taskNames.map((taskName, index) => (
                  <button
                    key={index}
                    onClick={() => handleFilterChange(taskName)}
                    className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100"
                  >
                    {taskName}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const employeeName = localStorage.getItem('name');
 
  useEffect(() => {
    const employeeName = "TeamLead1"; 
    localStorage.setItem('name', employeeName); 
  }, []);

  useEffect(() => {
    setLoading(true);
    axiosInstance
      .get(`task/getTaskDashboard/${employeeName}`)
      .then((response) => {
        if (response.data && response.data.message) {
          setTaskData(response.data.message);
        } else {
          setTaskData({
            inTestTasks: [],
            inProgressTasks: [],
            completedTasks: [],
            todayAssignedTasks: [],
          });
        }
        setError(null); 
      })
      .catch((error) => {
        console.error("Error fetching task data:", error);
        setError("Failed to fetch task data. Please try again later.");
      })
      .finally(() => {
        setLoading(false); 
      });
  }, []);

  const handleFilterChange = (label) => {
    setFilterLabel(label);
    setShowFilterDropdown(false);
  };

  const handleAddTask = () => {
    // Logic for adding a task
    console.log('Add Task button clicked');
    navigate('/admin/addtasks');
  };

 

  const extractTaskNames = () => {
    const allTasks = [
      ...taskData.inTestTasks,
      ...taskData.inProgressTasks,
      ...taskData.completedTasks,
      ...taskData.todayAssignedTasks,
    ];
    const uniqueTaskNames = Array.from(new Set(allTasks.map(task => task.taskName).filter(Boolean))); // Remove duplicates
    return uniqueTaskNames;
  };

  const filterTasks = (tasks) => {
    return filterLabel ? tasks.filter((task) => task.taskName === filterLabel) : tasks;
  };

  const filteredColumns = [
    {
      title: "TODAY ASSIGNED",
      color: "green",
      tasks: filterTasks(taskData.todayAssignedTasks),
      path: "assign",
      status: "Today-Assigned",
      assignedBy: "TeamLead1",
    },
    {
      title: "IN PROGRESS",
      color: "yellow",
      tasks: filterTasks(taskData.inProgressTasks),
      path: "inprogress",
      status: "In-Progress",
      assignedBy: "TeamLead1",
    },
    {
      title: "IN TEST",
      color: "red",
      tasks: filterTasks(taskData.inTestTasks),
      path: "intest",
      status: "In-Test",
      assignedBy: "TeamLead1",
    },
    {
      title: "COMPLETED",
      color: "teal",
      tasks: filterTasks(taskData.completedTasks),
      path: "completed",
      status: "Completed",
      assignedBy: "TeamLead1",
    },
  ];

  const columnMapping = {
    "TODAY ASSIGNED": "todayAssignedTasks",
    "IN PROGRESS": "inProgressTasks",
    "IN TEST": "inTestTasks",
    "COMPLETED": "completedTasks",
  };

  const moveTask = (draggedTask, targetColumnTitle) => {
    const targetColumn = columnMapping[targetColumnTitle];
    if (!targetColumn) {
      console.error(`Target column "${targetColumnTitle}" does not exist.`);
      return;
    }
    const updatedTaskData = { ...taskData };
    Object.keys(updatedTaskData).forEach((columnKey) => {
      updatedTaskData[columnKey] = updatedTaskData[columnKey].filter(
        (task) => task.taskId !== draggedTask.taskId
      );
    });
    updatedTaskData[targetColumn].push(draggedTask);
    setTaskData(updatedTaskData); 
  };

  const TaskCard = ({ task, columnId }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
      type: "TASK",
      item: { task, columnId },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }));

    return (
      <Link
        ref={drag}
        to={`${task.taskId}`} 
        className={`block bg-white shadow rounded-lg p-4 mb-4 relative border border-gray-400 w-full ${isDragging ? 'opacity-50' : ''}`}
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
                {task.comment?.length || 0}
              </div>
              <div className="flex items-center">
                <FontAwesomeIcon icon={faLink} className="mr-1 text-black-500" />
                {task.referenceFileUrl?.length || 0}
              </div>
            </div>
          </div>
        </div>
      </Link>
    );
  };

  const Column = ({ column, columnId }) => {
    const [{ canDrop, isOver }, drop] = useDrop(() => ({
      accept: "TASK",
      drop: (item) => moveTask(item.task, column.title),
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
      }),
    }));

    const [showTasks, setShowTasks] = useState(true);

    const handleTitleClick = () => {
      axiosInstance
        .post("task/getTaskByStatus", { status: column.status, assignedBy: column.assignedBy })
        .then((response) => {
          console.log("API Response:", response.data);
          navigate(`/admin/${column.path}`, { state: response.data.message || [] });
        })
        .catch((error) => {
          console.error("Error making POST request:", error);
        });
    };

    const toggleShowTasks = () => setShowTasks((prev) => !prev);

    return (
      <div
        ref={drop}
        className="flex-2 w-full sm:w-full md:w-full lg:basis-1/3 lg:max-w-lg"
      >
        <div className="flex items-center justify-between border-b-2 pb-2">
          <button
            onClick={handleTitleClick}
            className={`font-semibold p-2 ${column.color}-600 flex-grow text-left`}
          >
            {column.title}
          </button>

          <span className="flex items-center justify-center w-6 h-6 bg-gray-200 text-xs rounded-full">
            {column.tasks.length}
          </span>

          <div className="block lg:hidden ml-2">
            <button onClick={toggleShowTasks}>
              <FontAwesomeIcon icon={showTasks ? faChevronUp : faChevronDown} />
            </button>
          </div>
        </div>

        {showTasks && (
          <div className="mt-4">
            {column.tasks.map((task, taskIndex) => (
              <TaskCard key={taskIndex} task={task} columnId={columnId} />
            ))}
          </div>
        )}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-80">
        <ReactLoading type="spin" color="#21a6a1" height={50} width={50} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-40">
        <span className="text-red-500">{error}</span>
      </div>
    );
  }

  return (
    <div className="p-2 min-h-screen">
      <BoardHeader
        showFilterDropdown={showFilterDropdown}
        setShowFilterDropdown={setShowFilterDropdown}
        
        taskNames={extractTaskNames()} 

        handleFilterChange={handleFilterChange}
        handleAddTask={handleAddTask}
      />
      <div className="flex flex-col md:flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4">
        {filteredColumns.map((column, colIndex) => (
          <Column key={colIndex} column={column} columnId={column.status} />
        ))}
      </div>
    </div>
  );
};

export default Board;


