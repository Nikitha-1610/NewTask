import { Icon } from "@iconify/react";
import { useLocation } from "react-router-dom"; 
import axiosInstance from "../utilities/axios/axiosInstance";

const TaskDetails = () => {
  const { state } = useLocation();
  const { tasks, columnTitle } = state || {}; // Extract tasks and columnTitle passed via navigate

  if (!tasks || tasks.length === 0) {
    return <div>No tasks available!</div>;
  }

  const handleStatusChange = (newStatus, task) => {
    // Update the status of the task on the backend
    axiosInstance.post("/task/updateStatus", {
      taskId: task.id, // Assuming task has an 'id' property
      newStatus: newStatus,
    })
    .then(response => {
      // Update the local task status after successful response
      const updatedTasks = tasks.map(t => 
        t.id === task.id ? { ...t, taskStatus: newStatus } : t
      );
      // Optionally navigate back to the dashboard with updated tasks
      navigate('/designteam', { state: { tasks: updatedTasks } }); 
    })
    .catch(error => {
      console.error("Error updating task status:", error);
    });
  };


  return (
    <div className="w-full mx-auto p-6 bg-white rounded-lg shadow-md border border-gray-200">
    {/* Task Title */}
    {tasks.map((task, index) => (
    <div
      key={task.taskId || index}
      className="p-6 mb-6 bg-white rounded-lg shadow-lg border border-gray-200"
    >
    <h3 className="text-lg md:text-xl font-semibold text-gray-800">
      {task.taskName}
    </h3>
  
    {/* Task Info */}
    <div className="text-sm md:text-base text-gray-600 space-y-4">
      <div className="flex flex-wrap items-center gap-4 mt-2">
        <div className="flex items-center">
          <Icon icon="ic:outline-watch-later" height={18} width={18} />
          <span className="ml-2 font-medium text-gray-700">Status:</span>
          <span className="ml-2 text-gray-900">{task.Status}</span>
        </div>
      </div>
  
      <div className="flex flex-wrap items-center gap-4 mt-2">
        <div className="flex items-center">
          <Icon icon="ic:outline-calendar-today" className="text-gray-500" />
          <span className="ml-2 font-medium text-gray-700">Due Date:</span>
          <span className="ml-2 text-gray-900">{task.deadline}</span>
        </div>
      </div>
  
      {/* Assigned To */}
      <div className="flex flex-wrap items-center gap-4 mt-4">
        <div className="flex items-center">
          <Icon icon="lucide:users" height={22} width={22} />
          <span className="ml-2 font-medium text-gray-700">Assigned to:</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {task.assignedTo.map((person, index) => (
            <div key={index} className="flex items-center gap-2">
              <img
                src={person.image}
                alt={person.name}
                className="w-8 h-8 rounded-full border border-gray-300"
              />
              <span className="text-gray-700 font-medium">{person}</span>
            </div>
          ))}
        </div>
      </div>
  
      {/* Assigned By */}
      <div className="flex items-center gap-2 mt-4">
        <Icon icon="mdi:user-outline" height={22} width={22} />
        <span className="ml-2 font-medium text-gray-700">Assigned by:</span>
        <div className="flex items-center gap-2 ml-3">
          <img
            src={task.assignedBy.image}
            alt={task.assignedBy}
            className="w-8 h-8 rounded-full border border-gray-300"
          />
          <span className="text-gray-700 font-medium">
            {task.assignedBy}
          </span>
        </div>
      </div>
    </div>
  
    {/* Description Section */}
    <div className="mt-6">
      <div className="flex items-center gap-2">
        <Icon icon="tabler:file-description" height={22} width={22} />
        <h2 className="text-base font-semibold text-gray-800">Description</h2>
      </div>
      <p className="mt-4 text-gray-700 text-sm">{task.taskDescription}</p>
    </div>
  
    {/* Attachments Section */}
    <div className="mt-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Icon icon="cuida:attachment-clip-outline" height={22} width={22} />
            <h4 className="text-lg font-semibold">Attachments</h4>
          </div>
        </div>
        <div className="mt-4">
          {task.referenceFileUrl?.length ? (
            <ul className="list-disc pl-6">
              {task.referenceFileUrl.map((file, index) => (
                <li key={index}>
                  <a
                    href={file}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
                  >
                    {`File ${index + 1}`}
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No attachments available.</p>
          )}
        </div>
      </div>
  
    {/* Comments Section */}
    <div className="mt-6">
        <div className="flex items-center gap-2">
          <Icon icon="ic:outline-chat" height={22} width={22} />
          <h4 className="text-lg font-semibold">Comments</h4>
        </div>
        <div className="mt-4">
          {task.comment?.length ? (
            <ul className="space-y-3">
              {task.comment.map((cmt, index) => (
                <li
                  key={index}
                  className="p-3 bg-blue-50 border rounded-lg text-sm text-gray-800"
                >
                  <strong className="font-semibold">{cmt.userName}:</strong> {cmt.message}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No comments available.</p>
          )}
        </div>
      </div>
  
      {/* Change Status Section */}
      <div
            className={`mt-4 flex flex-wrap gap-2 items-center ${
              task.taskStatus === "In Test"
                ? "bg-red-300"
                : "bg-orange-100"
            } p-4 rounded-md`}
          >
            <span className="text-sm font-semibold">Change Status</span>
            {["Low", "Normal", "Urgent"].map((status, index) => (
              <button
                key={index}
                onClick={() => handleStatusChange(status, task)}
                className={`px-2 py-1 flex items-center gap-1 text-xs font-medium rounded-md ${
                  status === "Low"
                    ? "bg-green-100 text-green-600"
                    : status === "Normal"
                    ? "bg-yellow-100 text-yellow-600"
                    : "bg-red-100 text-red-600"
                }`}
              >
                <div
                  className={`h-2 w-2 rounded-full ${
                    status === "Low"
                      ? "bg-green-400"
                      : status === "Normal"
                      ? "bg-yellow-400"
                      : "bg-red-400"
                  }`}
                ></div>
                {status}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskDetails;