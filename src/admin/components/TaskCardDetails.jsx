import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axiosInstance from "../../common/utils/axios/axiosInstance";
import { Icon } from "@iconify/react";
import ReactLoading from "react-loading";

const TaskCardDetails = () => {
  console.log("TaskCardDetails");
  const { taskId } = useParams();
  const navigate = useNavigate();
  const [taskDetails, setTaskDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [priority, setPriority] = useState("Normal");

  useEffect(() => {
    // Fetch task details
    axiosInstance
      .get(`task/getOne/${taskId}`)
      .then((response) => {
        setTaskDetails(response.data.message); // Store the task details
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching task details:", err);
        setError("Failed to fetch task details.");
        setLoading(false);
      });
  }, [taskId]);
  console.log("taskStatus", taskDetails?.taskStatus);
  const goBack = () => {
    if (taskDetails?.taskStatus === "Assigned") {
      navigate("/admin/NewAssign");
    } else {
      // console.log("taskStatus", taskDetails.taskStatus);
      navigate("/admin/task");
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 flex justify-center items-center z-50">
        <ReactLoading type="spin" color="#00bfae" height={50} width={40} />
      </div>
    );
  }

  if (error)
    return <div className="text-center mt-10 text-red-500">{error}</div>;

  const {
    taskName,
    deadline,
    assignedDate,
    taskDescription,
    assignedTo,
    taskStatus,
    comment = [],

    assignedBy,
    referenceFileUrl = [],
  } = taskDetails || {};

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

  return (
    <div className="w-full mx-auto p-6 bg-white rounded-lg shadow-md border border-gray-200">
      {/* Back Arrow Button */}
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

      <h3 className={"mt-4 text-lg md:text-xl font-semibold text-gray-800"}>
        {taskName}
      </h3>

      <div className="mt-4 text-sm md:text-base font-normal text-gray-600 space-y-4">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center">
            <Icon icon="ic:outline-watch-later" height={18} width={18} />
            <span className="ml-2">Status:</span>
          </div>
          <div className="flex items-center">
            <Icon icon="ri:progress-8-fill" height={18} width={18} />
            <span className="ml-1 font-medium">{taskStatus}</span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center">
            <Icon icon="ic:outline-calendar-today" className="text-gray-500" />
            <span className="ml-2">Due Date:</span>
          </div>
          <span className="font-medium">
            {new Date(deadline).toLocaleDateString("en-US", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-4 ">
          <div className="flex items-center">
            <Icon icon="lucide:users" height={22} width={22} />
            <span className="ml-2">Assigned to:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {assignedTo.map((emp, index) => (
              <div key={index} className="flex items-center gap-2">
                <Icon
                  icon="ph:user-circle-fill"
                  className="text-blue-500  p-0 rounded-full"
                  width={32}
                  height={32}
                />
                <span className="text-gray-700 font-medium">{emp}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap items-center">
          <Icon icon="mdi:user-outline" height={22} width={22} />
          <span className="ml-2">Assigned by:</span>
          <div className="flex items-center gap-2 ml-3">
            {/* <img
              src={task.assignedBy.image}
              alt={task.assignedBy.name}
              className="w-6 h-6 rounded-full"
            /> */}
            <Icon
              icon="mdi:account-circle-outline"
              className="text-blue-500  p-0 rounded-full"
              width={32}
              height={32}
            />
            <span className="text-gray-700 font-medium">{assignedBy}</span>
          </div>
        </div>

        <div className="mt-8">
          <div className="flex items-center gap-2">
            <Icon icon="tabler:file-description" height={22} width={22} />
            <h2 className="text-base font-semibold">Description</h2>
          </div>
          <textarea
            value={taskDescription || "No description available."}
            placeholder="Description"
            className="w-full p-2 mt-4 text-sm text-gray-700 bg-gray-100 border border-gray-300 rounded-md resize-none focus:outline-none"
          />
        </div>

        <div className="mt-4">
          <div className="flex justify-between">
            <div className="flex gap-2">
              <Icon
                icon="cuida:attachment-clip-outline"
                height={22}
                width={22}
              />
              <h4 className="text-base font-semibold text-gray-400">
                Attachments ({referenceFileUrl.length})
              </h4>
            </div>
          </div>
          <div className="flex flex-wrap gap-4 mt-2">
            {referenceFileUrl.map((url, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-2 border rounded-md border-gray-300 bg-gray-50 w-full md:w-80"
              >
                <Icon
                  icon="mdi:file-pdf"
                  className="text-red-500"
                  height={40}
                  width={40}
                />
                <div className="flex">{/* Removed the size text */}</div>
                <div className="text-blue-600 cursor-pointer">
                  <a href={url} target="_blank" rel="noopener noreferrer">
                    <button className="text-blue-600 hover:underline">
                      View
                    </button>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4">
          <div className="flex items-center gap-2">
            <Icon icon="basil:comment-outline" height={22} width={22} />
            <h4 className="text-base font-semibold">
              Comments ({comment.length})
            </h4>
          </div>
          <div className="space-y-2 mt-2">
            {comment.map((comment, index) => (
              <div
                key={index}
                className="flex items-center gap-2 p-2 text-sm text-gray-700 bg-blue-100 border border-gray-300 rounded-md"
              >
                <div className=" font-bold text-teal-300 text-base">
                  {comment.userName}:
                </div>
                <div>{comment.message}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Priority Section */}
        <div
          className={`mt-4 flex flex-wrap gap-2 items-center ${
            priority === "Urgent"
              ? "bg-red-100"
              : priority === "Normal"
              ? "bg-yellow-100"
              : "bg-green-100"
          } p-4 rounded-md`}
        >
          <span className="text-sm font-semibold">Change Priority:</span>
          {["Low", "Normal", "Urgent"].map((currentPriority) => (
            <button
              key={currentPriority}
              onClick={() => setPriority(currentPriority)} // Update priority on click
              className={`px-3 py-1 flex items-center gap-1 text-xs font-medium rounded-md transition duration-200 ${
                currentPriority === priority
                  ? "ring-2 ring-offset-2 ring-blue-500"
                  : ""
              } ${
                currentPriority === "Low"
                  ? "bg-green-100 text-green-600"
                  : currentPriority === "Normal"
                  ? "bg-yellow-100 text-yellow-600"
                  : "bg-red-100 text-red-600"
              }`}
            >
              <div
                className={`h-2 w-2 rounded-full ${
                  currentPriority === "Low"
                    ? "bg-green-400"
                    : currentPriority === "Normal"
                    ? "bg-yellow-400"
                    : "bg-red-400"
                }`}
              ></div>
              {currentPriority}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TaskCardDetails;
