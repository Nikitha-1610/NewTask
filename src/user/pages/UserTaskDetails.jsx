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

  // Handle task status update
  const updateTaskStatus = (newStatus) => {
    if (newStatus === "Completed" && !hoursSpent) {
      alert("Please enter hours spent to complete the task.");
      return;
    }

    const updateData = newStatus === "Completed"
      ? { taskStatus: newStatus, hoursSpent: parseFloat(hoursSpent) }
      : { taskStatus: newStatus };

    axiosInstance
      .put(`task/update/${taskId}`, updateData)
      .then(() => {
        setTaskDetails((prevDetails) => ({
          ...prevDetails,
          taskStatus: newStatus,
        }));
        if (newStatus === "Completed") setHoursSpent(""); // Clear input
        alert("Task updated successfully!");
      })
      .catch(() => {
        alert("Failed to update the task.");
      });
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
    comments = [],
    referenceFileUrl = [],
  } = taskDetails || {};

  return (
    <div className="w-full mx-auto p-6 bg-white rounded-lg shadow-md">
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

      <h3 className="mt-4 text-2xl font-semibold">{taskName}</h3>
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
                onClick={() => updateTaskStatus("In-Progress")}
                className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600"
              >
                In Progress
              </button>
            )}
            {taskStatus === "In-Progress" && (
              <button
                onClick={() => updateTaskStatus("In-Test")}
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
                  onClick={() => updateTaskStatus("Completed")}
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
