import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axiosInstance from "../../common/utils/axios/axiosInstance";
import { Icon } from "@iconify/react";
import ReactLoading from "react-loading";

const UserTaskCardDetails = () => {
  const { taskId } = useParams();
  const navigate = useNavigate();
  const [taskDetails, setTaskDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hoursSpent, setHoursSpent] = useState(""); // New state for hours spent input
  const [successMessage, setSuccessMessage] = useState(""); // New state for success message
  const [selectedTask, setSelectedTask] = useState(null);
    const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axiosInstance
      .get(`task/getOne/${taskId}`)
      .then((response) => {
        setTaskDetails(response.data.message);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch task details.");
        setLoading(false);
      });
  }, [taskId]);

  const goBack = () => {
    navigate("/user/home");
  };

  const handleSubmit = (e, status) => {
    e.preventDefault();

    if (status === "Completed" && !hoursSpent) {
      console.error("Please enter hours spent.");
      return;
    }

    const body = {
      taskStatus: status,
      hoursSpent: status === "Completed" ? hoursSpent : undefined,
    };

    fetch(
      `https://3qhglx2bhd.execute-api.us-east-1.amazonaws.com/task/updateTask/${selectedTask.taskId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 200) {
          setTasks((prevTasks) =>
            prevTasks.map((task) =>
              task.taskId === selectedTask.taskId
                ? { ...task, taskStatus: status }
                : task
            )
          );
         
          setHoursSpent("");
        } else {
          console.error("Failed to update task:", data);
        }
      })
      .catch((error) => console.error("Error updating task:", error));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ReactLoading type="spin" color="#0d6efd" height={50} width={40} />
      </div>
    );
  }

  if (error) return <div className="text-center mt-10 text-red-500">{error}</div>;

  const {
    taskName,
    deadline,
    taskDescription,
    assignedTo,
    taskStatus,
    assignedBy,
  } = taskDetails || {};

  return (
    <div className="w-full mx-auto p-6 bg-white rounded-lg shadow-md">
      {/* Go Back */}
      <button
        onClick={goBack}
        className="flex items-center text-gray-600 hover:text-gray-800"
      >
        <Icon icon="mdi:arrow-left" height={24} width={24} />
        <span className="ml-2">Back</span>
      </button>

      <h3 className="mt-4 text-2xl font-semibold">{taskName}</h3>

      {/* Success Message */}
      {successMessage && (
        <div className="mt-4 p-4 bg-green-100 text-green-800 rounded-md">
          {successMessage}
        </div>
      )}

      <div className="mt-4 space-y-3">
        {/* Status */}
        <div className="flex items-center gap-3 text-lg">
          <Icon icon="ic:outline-watch-later" height={24} width={24} />
          <span>Status:</span>
          <span className="font-medium">{taskStatus}</span>
        </div>

        {/* Deadline */}
        <div className="flex items-center gap-3 text-lg">
          <Icon icon="ic:outline-calendar-today" height={24} width={24} />
          <span>Due Date:</span>
          <span className="font-medium">
            {new Date(deadline).toLocaleDateString("en-US")}
          </span>
        </div>

        {/* Assigned To */}
        <div className="flex items-center gap-3 text-lg">
          <Icon icon="lucide:users" height={24} width={24} />
          <span>Assigned To:</span>
          <span className="font-medium">{assignedTo.join(", ")}</span>
        </div>

        {/* Assigned By */}
        <div className="flex items-center gap-3 text-lg">
          <Icon icon="mdi:user-outline" height={24} width={24} />
          <span>Assigned By:</span>
          <span className="font-medium">{assignedBy}</span>
        </div>

        {/* Description */}
        <div className="mt-4">
          <h4 className="text-xl font-semibold">Description</h4>
          <textarea
            value={taskDescription || "No description available."}
            className="w-full p-4 mt-2 text-lg text-gray-700 bg-gray-100 border border-gray-300 rounded-md"
            readOnly
          />
        </div>

        {/* Update Task Section */}
        <div className="mt-4">
          <h4 className="text-xl font-semibold">Update Task</h4>
          <div className="mt-2 flex flex-col space-y-3">
            {taskStatus === "Assigned" && (
              <button
              onClick={(e) => handleSubmit(e, "In-Progress")}
                className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600"
              >
                In Progress
              </button>
            )}
            {taskStatus === "In-Progress" && (
              <button
              onClick={(e) => handleSubmit(e, "In-Test")}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                In Test
              </button>
            )}
            {taskStatus === "In-Test" && (
              <>
                <input
                  type="number"
                  placeholder="Enter hours spent"
                  value={hoursSpent}
                  onChange={(e) => setHoursSpent(e.target.value)}
                  className="p-2 border border-gray-300 rounded-md"
                />
                <button
                  onClick={(e) => handleSubmit(e, "Completed")}
                  className="px-4 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600"
                >
                  Completed
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserTaskCardDetails;
