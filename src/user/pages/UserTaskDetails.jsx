import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axiosInstance from "../../common/utils/axios/axiosInstance";
import { Icon } from "@iconify/react";
import ReactLoading from "react-loading";
import { BsPaperclip } from "react-icons/bs";
import { FaFilePdf, FaFileWord, FaFileExcel, FaFileAlt } from "react-icons/fa";
const UserTaskCardDetails = () => {
  const { taskId } = useParams();
  const navigate = useNavigate();
  const [taskDetails, setTaskDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hoursSpent, setHoursSpent] = useState(""); 
  const [successMessage, setSuccessMessage] = useState(""); 

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

    axiosInstance
      .put(`task/updateTask/${taskId}`, body)
      .then((response) => {
        if (response.status === 200) {
          setSuccessMessage(`Task successfully updated to ${status}`);
          setTaskDetails((prevDetails) => ({
            ...prevDetails,
            taskStatus: status,
          }));
          setHoursSpent(""); // Reset hours spent input
        } else {
          console.error("Failed to update task:", response.data);
        }
      })
      .catch((error) => console.error("Error updating task:", error));
  };

  if (loading) {
    return (
      <div className="fixed inset-0 flex justify-center items-center bg-opacity-70 z-50">
        <ReactLoading type="spin" color="#00bfae" height={50} width={40} />
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
    referenceFileUrl = [], 
  } = taskDetails || {};


  const getFileIcon = (url) => {
    if (url.endsWith(".pdf")) {
      return <FaFilePdf className="text-red-500" size={24} />;
    } else if (url.endsWith(".doc") || url.endsWith(".docx")) {
      return <FaFileWord className="text-blue-500" size={24} />;
    } else if (url.endsWith(".xls") || url.endsWith(".xlsx")) {
      return <FaFileExcel className="text-green-500" size={24} />;
    } else {
      return <FaFileAlt className="text-gray-500" size={24} />; // Default icon for other files
    }
  };
  
  return (
    <div className="w-full mx-auto p-6 bg-white rounded-lg shadow-md border border-gray-200">
      
      <button
        onClick={goBack}
        className="flex items-center text-gray-700 hover:text-gray-800"
      >
        <Icon icon="mdi:arrow-left" height={24} width={24} />
        <span className="ml-2"></span>
      </button>

      <h3 className="mt-4 text-2xl font-semibold">{taskName}</h3>

      
      {successMessage && (
        <div className="mt-4 p-4 bg-green-100 text-green-800 rounded-md">
          {successMessage}
        </div>
      )}

      <div className="mt-4 space-y-3">
      
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

        
     {/* Assigned To */}
<div className="flex flex-wrap items-center gap-4">
  <div className="flex items-center">
    <Icon icon="lucide:users" height={22} width={22} />
    <span className="ml-2">Assigned to:</span>
  </div>
  <div className="flex flex-wrap gap-2">
    {assignedTo.map((person, index) => (
      <div key={index} className="flex items-center gap-2">
        <Icon
          icon="ph:user-circle-fill"
          className="text-blue-500 p-0 rounded-full"
          width={32}
          height={32}
        />
        <span className="text-gray-700 font-medium">{person}</span>
      </div>
    ))}
  </div>
</div>

{/* Assigned By */}
<div className="flex flex-wrap items-center">
  <Icon icon="mdi:user-outline" height={22} width={22} />
  <span className="ml-2">Assigned by:</span>
  <div className="flex items-center gap-2 ml-3">
    <Icon
      icon="mdi:account-circle-outline"
      className="text-blue-500 p-0 rounded-full"
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
    className="md:w-1/3 w-full p-2 mt-4 text-sm text-gray-700 bg-gray-100 border border-gray-300 rounded-md resize-none focus:outline-none"
    readOnly
  />
</div>


{referenceFileUrl.length > 0 && (
  <div className="mt-4">
    {/* Header */}
    <div className="flex justify-between">
      <div className="flex gap-2">
        <h4 className="text-base font-semibold text-gray-400">
          Attachments ({referenceFileUrl.length})
        </h4>
      </div>
    </div>

    {/* Attachments List */}
    <div className="flex flex-wrap gap-4 mt-2">
      {referenceFileUrl.map((url, index) => (
        <div
          key={index}
          className="flex items-center gap-3 p-2 border rounded-md border-gray-300 bg-gray-50 w-full md:w-1/3"
        >
          {getFileIcon(url)} {/* Dynamically render the icon based on file type */}
          <div className="text-blue-600 cursor-pointer">
            <a href={url} target="_blank" rel="noopener noreferrer">
              <button className="text-blue-600 hover:underline">
                View File {index + 1}
              </button>
            </a>
          </div>
        </div>
      ))}
    </div>
  </div>
)}


<div className="mt-4 md:w-1/3">
  {taskStatus === "Completed" ? (
    <div className="flex flex-col items-center p-4 bg-teal-100 border border-teal-500 rounded-lg shadow-md animate-pulse">
      <div className="flex items-center space-x-2">
        <span className="text-teal-600 text-lg font-bold">✅ Task Completed</span>
      </div>
      <p className="text-teal-700 font-medium mt-2 text-center">
        Great job! This task has been successfully completed. 🎉
      </p>
    </div>
  ) : (
    <>
      <h4 className="text-xl font-semibold ">
        {taskStatus === "Completed" ? "Task Completed" : "Update Task"}
      </h4>

      {/* Task Progression Buttons */}
      <div className="mt-2 flex flex-col space-y-3">
        {taskStatus === "Assigned" && (
          <button
            onClick={(e) => handleSubmit(e, "In-Progress")}
            className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition duration-300 ease-in-out transform hover:scale-105"
          >
            In Progress
          </button>
        )}
        {taskStatus === "In-Progress" && (
          <button
            onClick={(e) => handleSubmit(e, "In-Test")}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300 ease-in-out transform hover:scale-105"
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
              className="px-4 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600 transition duration-300 ease-in-out transform hover:scale-105"
            >
              Completed
            </button>
          </>
        )}
      </div>
    </>
  )}
</div>


      </div>
    </div>
  );
};

export default UserTaskCardDetails;