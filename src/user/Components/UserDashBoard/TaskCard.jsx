import { useState } from "react";
import { Icon } from '@iconify/react';

const TaskCard = ({ title, time, task }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false); // State to manage popup visibility

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen); // Toggle popup visibility
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "border-green-500";
      case "In-Progress":
        return "border-yellow-500";
      case "In-Test":
        return "border-orange-500";
      case "Assigned":
        return "border-blue-500";
      default:
        return "border-gray-300";
    }
  };
  
  const getStatusColorBullet = (status) => {
    switch (status) {
      case "Completed":
        return "bg-green-500";
      case "In-Progress":
        return "bg-yellow-500";
      case "In-Test":
        return "bg-orange-500";
      case "Assigned":
        return "bg-blue-500";
      default:
        return "bg-gray-300";
    }
  };
  
  
  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "bg-red-500";
      case "Medium":
        return "bg-green-500";
      case "Low":
        return "bg-yellow-500";
      default:
        return "bg-gray-300";
    }
  };
  
  const getFileIcon = (fileUrl) => {
    if (fileUrl?.endsWith(".pdf")) return "mdi:file-pdf-outline";
    if (fileUrl?.endsWith(".doc") || fileUrl?.endsWith(".docx")) return "mdi:file-word-outline";
    return "mdi:file-outline";
  };
  



  return (
    <div className="relative">
      {/* Task Card */}
      <div className="flex items-center bg-white shadow-md rounded-md px-4 py-2 mb-4 overflow-y-auto">
        <div className="w-1 bg-teal-500 rounded-full h-full mr-3"></div>
        <div className="flex-1">
          <p className="font-semibold text-gray-800">{title}</p>
          <p className="text-sm text-gray-600">{time}</p>
        </div>
        <div className="ml-auto">
          <button
            className="text-gray-400 hover:text-gray-600"
            onClick={togglePopup} // Open the popup
          >
            &#x2026;
          </button>
        </div>
      </div>

      {/* Popup */}
      {isPopupOpen && task && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div
      className={`bg-white rounded-lg shadow-lg w-[90%] max-w-lg p-8 relative border-4 ${
        getStatusColor(task.taskStatus)
      }`}
    >
      {/* Close Button */}
      <button
        className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-4xl"
        onClick={togglePopup} // Close the popup
      >
        &times;
      </button>

      {/* Popup Content */}
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-gray-800 text-center">{task.taskName || "No Task Name"}</h2>

        {/* Assigned Date */}
        <div className="flex items-center space-x-3">
          <Icon icon="mdi:calendar-outline" className="text-teal-500 text-2xl" />
          <p className="text-gray-600">
            <strong>Assigned Date:</strong> {task.assignedDate ? new Date(task.assignedDate).toLocaleString() : "N/A"}
          </p>
        </div>

        {/* Task Status */}
       {/* Task Status */}
<div className="flex items-center space-x-3">
  <span className={`w-4 h-4 rounded-full ${getStatusColorBullet(task.taskStatus)}`}></span>
  <p className="text-gray-600">
    <strong>Task Status:</strong> {task.taskStatus || "N/A"}
  </p>
</div>


        {/* Priority */}
        <div className="flex items-center space-x-3">
          <span className={`w-4 h-4 rounded-full ${getPriorityColor(task.priority)}`}></span>
          <p className="text-gray-600">
            <strong>Priority:</strong> {task.priority || "N/A"}
          </p>
        </div>

        {/* Assigned To */}
        <div className="flex items-center space-x-3">
          <Icon icon="mdi:account-outline" className="text-blue-500 text-2xl" />
          <p className="text-gray-600">
            <strong>Assigned To:</strong> {task.assignedTo?.join(", ") || "N/A"}
          </p>
        </div>

        {/* Assigned By */}
        <div className="flex items-center space-x-3">
          <Icon icon="mdi:account-outline" className="text-purple-500 text-2xl" />
          <p className="text-gray-600">
            <strong>Assigned By:</strong> {task.assignedBy || "N/A"}
          </p>
        </div>

        {/* Task Description */}
        <div className="p-4 bg-gray-100 border-l-4 border-blue-500 rounded-md">
          <p className="text-lg font-serif text-gray-700">{task.taskDescription || "N/A"}</p>
        </div>

        {/* Reference File */}
        <div className="flex items-center space-x-3">
          <Icon icon={getFileIcon(task.referenceFileUrl?.[0])} className="text-red-500 text-2xl" />
          <p className="text-gray-600">
            <strong>Reference File:</strong>{" "}
            {task.referenceFileUrl?.[0] ? (
              <a
                href={task.referenceFileUrl[0]}
                className="text-blue-500 underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                View File
              </a>
            ) : (
              "No File"
            )}
          </p>
        </div>
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default TaskCard;
