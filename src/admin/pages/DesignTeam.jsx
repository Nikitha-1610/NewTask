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
import { useNavigate, Link } from "react-router-dom";
import ReactLoading from "react-loading";
import { useDrag, useDrop } from "react-dnd";

const Board = () => {
  const [taskData, setTaskData] = useState({
    inProgressTasks: [],
    completedTasks: [],
    assignedTasks: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const employeeName = localStorage.getItem('name');

  const [selectedDate, setSelectedDate] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedSection, setSelectedSection] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');

  const years = ["I", "II", "III", "IV"];
  const sections = ["A", "B", "C", "D"];
  const statuses = ["Assigned", "In Progress", "Completed"];

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

  const DateDisplay = ({ isoDate }) => {
    if (!isoDate) return "No Date";

    const date = new Date(isoDate);
    const options = { month: "long", day: "numeric" };
    return new Intl.DateTimeFormat("en-US", options).format(date);
  };

  const columnMapping = {
    "ASSIGNED TASKS": "assignedTasks",
    "IN PROGRESS": "inProgressTasks",
    "COMPLETED": "completedTasks",
  };

  const titleToStatusMap = {
    "ASSIGNED TASKS": "Assigned",
    "IN PROGRESS": "In-Progress",
    "COMPLETED": "Completed",
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

    const newTaskStatus = titleToStatusMap[targetColumnTitle];
    if (!newTaskStatus) {
      console.error(`No matching status found for column title: "${targetColumnTitle}"`);
      return;
    }

    axiosInstance
      .put(`task/updateTask/${draggedTask.taskId}`, { taskStatus: newTaskStatus })
      .then((response) => {
        console.log("Task status updated successfully:", response.data);
      })
      .catch((error) => {
        console.error("Error updating task status:", error);
      });
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

  const Column = ({ column }) => {
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
        .post("task/getTaskByStatus", { status: column.status, assignedBy: employeeName })
        .then((response) => {
          navigate(`/admin/${column.path}`, { state: response.data.message || [] });
        })
        .catch((error) => {
          console.error("Error making POST request:", error);
        });
    };

    const toggleShowTasks = () => setShowTasks((prev) => !prev);

    const filteredTasks = column.tasks.filter((task) => {
      const matchesDate = selectedDate ? task.deadline?.startsWith(selectedDate) : true;
      const matchesYear = selectedYear ? task.year === selectedYear : true;
      const matchesSection = selectedSection ? task.section === selectedSection : true;
      const matchesStatus = selectedStatus ? task.taskStatus === selectedStatus : true;
      return matchesDate && matchesYear && matchesSection && matchesStatus;
    });

    return (
      <div ref={drop} className="flex-2 w-full sm:w-full md:w-full lg:basis-1/3 lg:max-w-lg">
        <div className="flex items-center justify-between border-b-2 pb-2">
          <button
            onClick={handleTitleClick}
            className={`font-semibold p-2 ${column.color}-600 flex-grow text-left`}
          >
            {column.title}
          </button>
          <span className="flex items-center justify-center w-6 h-6 bg-gray-200 text-xs rounded-full">
            {filteredTasks.length}
          </span>
          <div className="block lg:hidden ml-2">
            <button onClick={toggleShowTasks}>
              <FontAwesomeIcon icon={showTasks ? faChevronUp : faChevronDown} />
            </button>
          </div>
        </div>

        {showTasks && (
          <div className="mt-4">
            {filteredTasks.map((task, taskIndex) => (
              <TaskCard key={taskIndex} task={task} columnId={column.status} />
            ))}
          </div>
        )}
      </div>
    );
  };

  const columns = [
    {
      title: "ASSIGNED TASKS",
      color: "green",
      tasks: taskData.assignedTasks,
      path: "assign",
      status: "Assigned",
    },
    {
      title: "IN PROGRESS",
      color: "yellow",
      tasks: taskData.inProgressTasks,
      path: "inprogress",
      status: "In-Progress",
    },
    {
      title: "COMPLETED",
      color: "teal",
      tasks: taskData.completedTasks,
      path: "completed",
      status: "Completed",
    },
  ];

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
    <div style={{ backgroundColor: "#F9FAFB" }} className="p-2 min-h-screen">
      {/* Header */}
      <div className="p-2">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 space-y-4 sm:space-y-0 md:space-y-0 ml-5 mt-2">
          <h1 className="text-2xl font-bold text-gray-700 bg-teal-100 rounded-lg w-60 h-9 text-center">
            TASKS
          </h1>

          {/* Filters and Add Button */}
          <div className="flex flex-wrap items-center space-x-2 sm:space-x-4 md:space-x-6">

            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="border rounded-lg px-2 py-1 text-sm"
            />

            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="border rounded-lg px-2 py-1 text-sm"
            >
              <option value="">Year</option>
              {years.map((year) => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>

            <select
              value={selectedSection}
              onChange={(e) => setSelectedSection(e.target.value)}
              className="border rounded-lg px-2 py-1 text-sm"
            >
              <option value="">Section</option>
              {sections.map((section) => (
                <option key={section} value={section}>{section}</option>
              ))}
            </select>

            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="border rounded-lg px-2 py-1 text-sm"
            >
              <option value="">Status</option>
              {statuses.map((status) => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>

            {/* Clear Filters button */}
            {(selectedDate || selectedYear || selectedSection || selectedStatus) && (
              <button
                onClick={() => {
                  setSelectedDate('');
                  setSelectedYear('');
                  setSelectedSection('');
                  setSelectedStatus('');
                }}
                className="flex items-center px-3 py-2 bg-red-400 text-white font-semibold rounded-2xl hover:bg-red-500 text-xs"
              >
                Clear Filters
              </button>
            )}

            <button
              onClick={handleAddTask}
              className="flex items-center px-4 py-2 bg-teal-500 text-white font-bold rounded-2xl hover:bg-green-600"
            >
              <FontAwesomeIcon icon={faPlus} className="mr-2" />
              Add a task
            </button>

          </div>
        </div>
      </div>

      {/* Columns */}
      <div className="flex flex-col md:flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4">
        {columns.map((column, colIndex) => (
          <Column key={colIndex} column={column} />
        ))}
      </div>
    </div>
  );
};

export default Board;
