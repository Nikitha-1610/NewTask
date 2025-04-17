import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarAlt,
  faPlus,
  faComment,
  faLink,
} from "@fortawesome/free-solid-svg-icons";
import axiosInstance from "../../common/utils/axios/axiosInstance";
import { useNavigate } from "react-router-dom";
import ReactLoading from "react-loading";
import { AnimatePresence } from "framer-motion";

const DateDisplay = ({ isoDate }) => {
  if (!isoDate) return "No Date";
  const date = new Date(isoDate);
  const options = { month: "long", day: "numeric" };
  return new Intl.DateTimeFormat("en-US", options).format(date);
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
    inProgressTasks: [],
    completedTasks: [],
    assignedTasks: [],
  });
  const [filterDate, setFilterDate] = useState('');
  const [filterYear, setFilterYear] = useState('');
  const [filterSection, setFilterSection] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const employeeName = localStorage.getItem('name');

  useEffect(() => {
    setLoading(true);
    axiosInstance
      .get(`task/getTaskDashboard/${employeeName}`)
      .then((response) => {
        if (response.data && response.data.message) {
          const { inProgressTasks, completedTasks, assignedTasks } = response.data.message;
          setTaskData({ inProgressTasks, completedTasks, assignedTasks });
        } else {
          setTaskData({
            inProgressTasks: [],
            completedTasks: [],
            assignedTasks: [],
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

  const handleAddTask = () => {
    navigate('/admin/addtasks');
  };

  const filteredTasks = (tasks) => {
    return tasks.filter(task => {
      const matchDate = !filterDate || (task.deadline && new Date(task.deadline) <= new Date(filterDate));
      const matchYear = !filterYear || (task.year === filterYear);
      const matchSection = !filterSection || (task.section === filterSection);
      const matchStatus = !filterStatus || (task.taskStatus === filterStatus);
      return matchDate && matchYear && matchSection && matchStatus;
    });
  };

  const columns = [
    {
      title: "ASSIGNED TASKS",
      color: "green",
      tasks: filteredTasks(taskData.assignedTasks),
      path: "assign",
      status: "Assigned",
    },
    {
      title: "IN PROGRESS",
      color: "yellow",
      tasks: filteredTasks(taskData.inProgressTasks),
      path: "inprogress",
      status: "In-Progress",
    },
    {
      title: "COMPLETED",
      color: "teal",
      tasks: filteredTasks(taskData.completedTasks),
      path: "completed",
      status: "Completed",
    },
  ];

  const TaskCard = ({ task }) => {
    return (
      <div className="block bg-white shadow-lg rounded-lg p-4 mb-4 relative border border-gray-300 hover:shadow-xl transition-all cursor-pointer">
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
        <div className="flex flex-col justify-between">
          <div className="text-sm text-black-100">
            {task.taskDescription || "No description available."}
          </div>
          <div className="flex items-center text-sm text-gray-600 mt-2 space-x-4">
            <div className="flex items-center">
              <FontAwesomeIcon icon={faComment} className="mr-1" />
              {task.comment?.length || 0}
            </div>
            <div className="flex items-center">
              <FontAwesomeIcon icon={faLink} className="mr-1" />
              {task.referenceFileUrl?.length || 0}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const Column = ({ column }) => {
    return (
      <div className="flex-1 w-full sm:w-full md:w-full lg:w-1/3 p-4">
        <div className="flex items-center justify-between border-b-2 pb-2 mb-4">
          <h2 className={`font-semibold text-lg text-${column.color}-600`}>
            {column.title}
          </h2>
          <span className="flex items-center justify-center w-6 h-6 bg-gray-200 text-xs rounded-full">
            {column.tasks.length}
          </span>
        </div>
        <div>
          {column.tasks.length > 0 ? (
            column.tasks.map((task, index) => (
              <TaskCard key={index} task={task} />
            ))
          ) : (
            <div className="text-center text-gray-400 mt-4 text-sm">
              No tasks found.
            </div>
          )}
        </div>
      </div>
    );
  };

  const getTotalFilteredTaskCount = () => {
    const allFilteredTasks = [
      ...filteredTasks(taskData.assignedTasks),
      ...filteredTasks(taskData.inProgressTasks),
      ...filteredTasks(taskData.completedTasks),
    ];
    return allFilteredTasks.length;
  };

  if (loading) {
    return (
      <div className="fixed inset-0 flex justify-center items-center bg-white bg-opacity-70 z-50">
        <ReactLoading type="spin" color="#00bfa6" height={50} width={50} />
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
    <div className="p-4 min-h-screen bg-gray-50">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 space-y-4 md:space-y-0">
        <button
          onClick={handleAddTask}
          className="flex items-center px-6 py-3 bg-teal-500 text-white font-bold rounded-2xl hover:bg-teal-600 cursor-pointer transition"
        >
          <FontAwesomeIcon icon={faPlus} className="mr-2" />
          Add a task
        </button>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 items-center justify-between md:justify-start">
          <div className="flex items-center space-x-2">
            <label htmlFor="dateFilter" className="text-sm font-semibold">
              Date:
            </label>
            <input
              type="date"
              id="dateFilter"
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
              className="border border-gray-300 rounded px-3 py-2"
            />
          </div>

          <div className="flex items-center space-x-2">
            <label className="text-sm font-semibold">Year:</label>
            <select
              value={filterYear}
              onChange={(e) => setFilterYear(e.target.value)}
              className="border border-gray-300 rounded px-3 py-2"
            >
              <option value="">All</option>
              <option value="I">I</option>
              <option value="II">II</option>
              <option value="III">III</option>
              <option value="IV">IV</option>
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <label className="text-sm font-semibold">Section:</label>
            <select
              value={filterSection}
              onChange={(e) => setFilterSection(e.target.value)}
              className="border border-gray-300 rounded px-3 py-2"
            >
              <option value="">All</option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="D">D</option>
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <label className="text-sm font-semibold">Status:</label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="border border-gray-300 rounded px-3 py-2"
            >
              <option value="">All</option>
              <option value="Assigned">Assigned</option>
              <option value="In-Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          {(filterDate || filterYear || filterSection || filterStatus) && (
            <button
              onClick={() => {
                setFilterDate('');
                setFilterYear('');
                setFilterSection('');
                setFilterStatus('');
              }}
              className="px-3 py-2 bg-red-400 text-white rounded cursor-pointer transition"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Display filtered task count */}
      <div className="mb-6 text-lg text-gray-700">
        <strong>Showing {getTotalFilteredTaskCount()} tasks</strong>
      </div>

      {/* Columns */}
      <div className="flex flex-col sm:flex-row md:flex-row lg:flex-row gap-6">
        {columns.map((column, index) => (
          <Column key={index} column={column} />
        ))}
      </div>
    </div>
  );
};

export default Board;
