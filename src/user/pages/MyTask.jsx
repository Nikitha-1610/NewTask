import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { BsPaperclip } from 'react-icons/bs';
//import { Oval } from "react-loader-spinner"; 
import axiosInstance from "../../common/utils/axios/axiosInstance"; 
import ReactLoading from "react-loading";
import { ToastContainer, toast } from "react-toastify";


const MyTask = () => {
  const [tasks, setTasks] = useState([]);
  const [showDiv1, setShowDiv1] = useState(false);
  const [hoursSpent, setHoursSpent] = useState("");
  const [selectedTask, setSelectedTask] = useState(null);
  const [loading, setLoading] = useState(true);

  const getStatusColor = (status) => {
    switch (status) {
      case "Assigned":
        return "bg-gray-400"; 
      case "In-Progress":
        return "bg-orange-500"; 
      case "In-Test":
        return "bg-red-500"; 
      case "Completed":
        return "bg-teal-500"; 
      default:
        return "bg-gray-500"; 
    }
  };

  useEffect(() => {
    const employeeName = localStorage.getItem('name');
    if (employeeName) {
      const url = `/task/getEmployeeTask/${employeeName}?days=7`;
      axiosInstance.get(url)
        .then(response => {
          if (response.data.status === 200) {
            const filteredTasks = response.data.message.filter(task =>
              task.assignedTo.includes(employeeName)
            );
            setTasks(filteredTasks);
          } else {
            setTasks([]); 
          }
          setLoading(false); 
        })
        .catch(error => {
          console.error('Error:', error); 
          setLoading(false); 
        });
    } else {
      setLoading(false); 
      console.log('No employee name found in localStorage');
    }
  }, []);

  const handleToggleDiv1 = (task) => {
    if (task.taskStatus !== "Completed") {
      setSelectedTask(task);
      setShowDiv1(true);
    }
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

    axiosInstance.put(`/task/updateTask/${selectedTask.taskId}`, body)
      .then((response) => {
        if (response.data.status === 200) {
          setTasks((prevTasks) =>
            prevTasks.map((task) =>
              task.taskId === selectedTask.taskId
                ? { ...task, taskStatus: status }
                : task
            )
          );
          setShowDiv1(false);
          setHoursSpent("");
          toast.success("Task status updated")
        } else {
          console.error("Failed to update task:", response.data);
        }
      })
      .catch((error) => console.error("Error updating task:", error));
  };

  return (
    <div className="space-y-5">
      <h2 className="text-xl font-bold px-2 py-1 rounded-md text-gray-700">MyTask</h2>

      {loading ? (
        <div className="fixed inset-0 flex justify-center items-center bg-white bg-opacity-40 z-50">
        <ReactLoading type="spin" color="#00bfae" height={50} width={50} />
        </div>
      ) : (
        <div className="w-full bg-white rounded-lg shadow-md  ">
          {tasks.map((task) => (
            <div key={task.taskId} className="p-4 bg-gray-50 border rounded-md relative mb-4">
              {task.taskStatus !== "Completed" && (
                <button
                  onClick={() => handleToggleDiv1(task)}
                  className="absolute top-4 right-4 px-3 py-2 text-sm text-white bg-teal-500 rounded hover:bg-teal-600"
                >
                  Update
                </button>
              )}

              <h3 className="font-bold text-xl mb-3">{task.taskName}</h3>

              <div className="flex flex-wrap items-center gap-6 mb-4">
                <div className="flex items-center">
                  <Icon icon="ic:outline-watch-later" height={18} width={18} />
                  <span className="ml-2">Status:</span>
                </div>
                <div className="flex items-center">
                  <div
                    className={`w-4 h-4 rounded-full ${getStatusColor(task.taskStatus)}`}
                  />
                  <span className="ml-2 font-medium">{task.taskStatus}</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-6 mb-4">
                <div className="flex items-center">
                  <Icon icon="ic:outline-calendar-today" className="text-gray-500" />
                  <span className="ml-2">Due Date:</span>
                </div>
                <span className="font-medium">
                  {new Date(task.deadline).toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-6 mb-4">
                <div className="flex items-center">
                  <Icon icon="lucide:users" height={22} width={22} />
                  <span className="ml-2">Assigned to:</span>
                </div>
                <div className="flex flex-wrap gap-3">
                  {task.assignedTo.map((person, index) => (
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

              <div className="flex flex-wrap items-center mb-4">
                <Icon icon="mdi:user-outline" height={22} width={32} />
                <span className=" ">Assigned by:</span>
                <div className="flex items-center gap-3 ml-4">
                  <Icon
                    icon="mdi:account-circle-outline"
                    className="text-blue-500 p-0 rounded-full"
                    width={32}
                    height={32}
                  />
                  <span className="text-gray-700 font-medium">{task.assignedBy}</span>
                </div>
              </div>

              {task.referenceFileUrl && task.referenceFileUrl.length > 0 && (
                <div className="mt-4">
                  <h4 className="text-xl font-semibold">Attachments</h4>
                  <div className="space-y-3 mt-2">
                    {task.referenceFileUrl.map((url, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <BsPaperclip />
                        <a
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 hover:underline"
                        >
                          File {index + 1}
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              )}


             
            </div>
          ))}
        </div>
      )}

      {/* Update task status modal */}
      {showDiv1 && selectedTask && (
        <div className="w-[300px] h-auto p-4 absolute top-20 right-20 bg-white border border-gray-300 shadow-md rounded-md">
          <h1 className="mb-4 text-lg">Update Task Status</h1>
          {selectedTask.taskStatus === "Assigned" && (
            <button
              onClick={(e) => handleSubmit(e, "In-Progress")}
              className="w-full px-3 py-2 text-sm text-white bg-orange-500 rounded hover:bg-orange-600"
            >
              In Progress
            </button>
          )}
          {selectedTask.taskStatus === "In-Progress" && (
            <button
              onClick={(e) => handleSubmit(e, "In-Test")}
              className="w-full px-3 py-2 text-sm text-white bg-red-500 rounded hover:bg-red-600"
            >
              In Test
            </button>
          )}
          {selectedTask.taskStatus === "In-Test" && (
            <div>
              <input
                type="number"
                placeholder="Enter hours spent"
                value={hoursSpent}
                onChange={(e) => setHoursSpent(e.target.value)}
                className="w-full p-2 mb-4 border border-gray-300 rounded-md"
              />
              <button
                onClick={(e) => handleSubmit(e, "Completed")}
                className="w-full px-3 py-2 text-sm text-white bg-teal-500 rounded hover:bg-teal-600"
              >
                Completed
              </button>
            </div>
          )}

          <button
            onClick={() => setShowDiv1(false)}
            className="w-full px-3 py-2 mt-4 text-sm text-gray-600 bg-gray-200 rounded hover:bg-gray-300"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default MyTask;
