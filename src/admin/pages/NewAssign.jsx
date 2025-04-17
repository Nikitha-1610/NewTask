import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../common/utils/axios/axiosInstance";
import { useDrag, useDrop } from "react-dnd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReactLoading from "react-loading";
import {
  faCalendarAlt,
  faSliders,
  faPlus,
  faChevronDown,
  faChevronUp,
  faComment,
  faLink,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
const NewAssign = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [filterLabel, setFilterLabel] = useState("");
  const [loading, setLoading] = useState(true);
  const [taskAssign, setTaskAssign] = useState({
    inTestTasks: [],
    inProgressTasks: [],
    completedTasks: [],
    assignedTasks: [],
  });
  useEffect(() => {
    setLoading(true);
    axiosInstance
      .get(`task/getTaskDashboard/${employeeName}`)
      .then((response) => {
        console.log("responseAss", response);
        if (response.data && response.data.message) {
          const {
            inTestTasks,
            inProgressTasks,
            completedTasks,
            assignedTasks,
          } = response.data.message;
          setTaskAssign({
            inTestTasks,
            inProgressTasks,
            completedTasks,
            assignedTasks,
          });
        } else {
          setTaskAssign({
            inTestTasks: [],
            inProgressTasks: [],
            completedTasks: [],
            assignedTasks: [],
          });
        }
      })
      .catch((error) => {
        console.error("Error fetching task data:", error);
        setError("Failed to fetch task data. Please try again later.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  console.log("here is location", location);
  const employeeName = localStorage.getItem("name");

  const tasksFromState = location.state || [];
  console.log("here is location", employeeName);

  const sampleTask = tasksFromState.map((task) => ({
    id: task.taskId,
    title: task.taskName,
    status: task.taskStatus,
    dueDate: task.deadline,
    assignedTo: task.assignedTo || [],
    assignedBy: task.assignedBy || {},
    attachments: task.referenceFileUrl || [],
    comments: task.comment || [],
    taskDescription: task.taskDescription,
  }));
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

  const goBack = () => {
    navigate("/admin/dashboard");
  };
  const DateDisplay = ({ isoDate }) => {
    if (!isoDate) return "No Date";
    const formatDate = (isoDate) => {
      const date = new Date(isoDate);
      const options = { month: "long", day: "numeric" };
      return new Intl.DateTimeFormat("en-US", options).format(date);
    };
    return <span>{formatDate(isoDate)}</span>;
  };
  const TaskCard = ({ task, columnId }) => {
    console.log("task", task);
    const [{ isDragging }, drag] = useDrag(() => ({
      type: "NEWASSIGN",
      item: { task, columnId },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }));
    console.log(isDragging, drag, "NEWAASIGN", task?.taskId);
    return (
      <Link
        ref={drag}
        to={`/admin/task/${task.taskId}`}
        className={`block bg-white shadow rounded-lg p-4 mb-4 relative border border-gray-400 w-full ${
          isDragging ? "opacity-50" : ""
        }`}
      >
        <div className="absolute top-2 right-2">
          {task.taskStatus === "Completed" ? (
            <div className="flex items-center text-green-500 text-xs font-bold">
              <span className="mr-1">✔✔</span>
              <span>Done</span>
            </div>
          ) : (
            <div className="flex items-center text-gray-500 text-sm">
              {/* <FontAwesomeIcon className="mr-1" /> */}
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
        .post("task/getTaskByStatus", {
          status: column.status,
          assignedBy: employeeName,
        })
        .then((response) => {
          console.log("API Response:", response.data);
          navigate(`/admin/${column.path}`, {
            state: response.data.message || [],
          });
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
              <FontAwesomeIcon />
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
      <div className="fixed inset-0 flex justify-center items-center bg-white bg-opacity-70 z-50">
        <ReactLoading type="spin" color="#00bfa6" height={50} width={50} />
      </div>
    );
  }

  const filterTasks = (tasks) => {
    return filterLabel
      ? tasks.filter((task) => task.project === filterLabel)
      : tasks;
  };

  const filteredColumns = [
    {
      title: "ASSIGNED TASKS",
      color: "green",
      tasks: filterTasks(taskAssign.assignedTasks),
      path: "assign",
      status: "Assigned",
      assignedBy: "TeamLead1",
    },
  ];

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between pb-4 border-gray-300">
        <div className=" flex gap-2">
          <button
            onClick={goBack}
            style={{
              background: "transparent",
              border: "none",
              cursor: "pointer",
              fontSize: "24px",
            }}
          >
            <Icon icon="mdi:arrow-left" height={24} width={24} />
          </button>
        </div>
      </div>
      <div className="flex flex-col md:flex-col lg:flex-row lg:justify-center lg:items-center space-y-4 lg:space-y-0 lg:space-x-4">
        {filteredColumns.map((column, colIndex) => (
          <Column key={colIndex} column={column} columnId={column.status} />
        ))}
      </div>
    </div>
  );
};

export default NewAssign;
