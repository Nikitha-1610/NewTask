import React, { useState, useEffect } from 'react';
import { GoClock } from "react-icons/go";
import { CiCalendar } from "react-icons/ci";
import { FaRegCircle } from "react-icons/fa";
import { GoPeople, GoPerson } from "react-icons/go";
import { BsPaperclip } from "react-icons/bs";
import { FiMessageCircle } from "react-icons/fi";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { Icon } from "@iconify/react";

const MyTask = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [showDiv1, setShowDiv1] = useState(false);
  const [showDiv2, setShowDiv2] = useState(false);
  const [hoursSpent, setHoursSpent] = useState('');
  const [selectedTaskId, setSelectedTaskId] = useState(null);

  
  const employeeName = localStorage.getItem('name');

  // Fetch tasks on component mount
  useEffect(() => {
    if (employeeName) {
      fetch(`https://3qhglx2bhd.execute-api.us-east-1.amazonaws.com/task/getEmployeeTask/${employeeName}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.status === 200) {
            setTasks(data.message);
          } else {
            console.error("Failed to fetch tasks:", data);
          }
        })
        .catch((error) => console.error("Error fetching tasks:", error))
        .finally(() => setLoading(false)); 
    } else {
      console.error("Employee name not found in localStorage.");
      setLoading(false);
    }
  }, [employeeName]); 


  // Toggle status update menu
  const handleToggleDiv1 = (taskId) => {
    setSelectedTaskId(taskId);
    setShowDiv1((prev) => !prev);
  };

  // Handle task status update
  const handleSubmit = (e, status) => {
    e.preventDefault();
    if (!hoursSpent) {
      console.error("Please enter hours spent.");
      return;
    }

    const body = {
      taskStatus: status,
      hoursSpent: hoursSpent,
    };

    fetch(`https://3qhglx2bhd.execute-api.us-east-1.amazonaws.com/task/updateTask/${selectedTaskId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 200) {
          setTasks((prevTasks) =>
            prevTasks.map((task) =>
              task.taskId === selectedTaskId ? { ...task, taskStatus: status } : task
            )
          );
          setShowDiv1(false);
        } else {
          console.error("Failed to update task:", data);
        }
      })
      .catch((error) => console.error("Error updating task:", error));
  };
  return (
    <div className="space-y-5">
      <h2 className="text-xl font-bold px-2 py-1 rounded-md text-gray-700">MyTask</h2>

      <div className="w-full  bg-white rounded-lg shadow-md border border-gray-200">
      {tasks.map((task) => (
  <div key={task.taskId} className="mb-5 p-4 bg-gray-50 border rounded-md relative">
    {/* Update Button */}
    {task.taskStatus !== "Completed" && (
      <button 
        onClick={() => handleToggleDiv1(task.taskId)} 
        className="absolute top-4 right-4 px-3 py-2 text-sm text-white bg-teal-500 rounded hover:bg-teal-600"
      >
        Update
      </button>
    )}

    <h3 className="font-bold text-xl">{task.taskName}</h3>

    <div className="mt-4 text-sm md:text-base font-normal text-gray-600 space-y-4">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center">
            <Icon icon="ic:outline-watch-later" height={18} width={18} />
            <span className="ml-2">Status:</span>
          </div>
          <div className="flex items-center">
            <Icon icon="ri:progress-8-fill" height={18} width={18} />
            <span className="ml-1 font-medium">{task.taskStatus}</span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center">
            <Icon icon="ic:outline-calendar-today" className="text-gray-500" />
            <span className="ml-2">Due Date:</span>
          </div>
          <span className="font-medium">
            {new Date(task.dueDate).toLocaleDateString("en-US", {
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
            {task.assignedTo.map((person, index) => (
              <div key={index} className="flex items-center gap-2">
                {/* <img
                  src={person.image}
                  alt={person.name}
                  className="w-6 h-6 rounded-full"
                /> */}
                <Icon
                  icon="ph:user-circle-fill"
                  className="text-blue-500  p-0 rounded-full"
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
            <span className="text-gray-700 font-medium">{task.assignedBy}</span>
          </div>
        </div>
      </div>

            {/* Attachments Section */}
            <div className="mt-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <BsPaperclip /> <span>Attachment</span>
                  </div>
                  <button className="text-blue-500">Download</button>
                </div>
                <div className="flex mt-3 gap-2">
                {[...Array(0)].map((_, index) => (
                  <div key={index} className="w-1/4 h-[70px] p-2 bg-white shadow-md rounded"></div>
                ))}
              </div>
            
              </div>

            {/* Comments Section */}
            <div className="mt-4">
              <div className="flex items-center gap-2">
                <FiMessageCircle /> <span>Comments</span>
              </div>
              <div className="p-2 bg-blue-100 border border-gray-300 rounded-md">
                {task.comments && task.comments.length > 0 ? (
                  task.comments.map((comment, index) => (
                    <div key={index} className="p-2 bg-white rounded-md mb-2">
                      {comment}
                    </div>
                  ))
                ) : (
                  <span>No comments available</span>
                )}
              </div>

              <div className="mt-2">
                <input 
                  type="text" 
                  placeholder="Your comment..." 
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {showDiv1 && selectedTaskId && (
  <div className="w-[300px] absolute top-20 right-20 bg-white border border-gray-300 shadow-md rounded-md">
    <h1 className="p-4 text-lg">Update Task Status</h1>

    {/* Show hours input only if the task status is "In-Test" */}
    {tasks.find((task) => task.taskId === selectedTaskId)?.taskStatus === "In-Test" && (
      <input
        type="number"
        placeholder="Enter hours"
        value={hoursSpent}
        onChange={(e) => setHoursSpent(e.target.value)}
        className="w-[250px] left-5 relative p-2 mb-4 border border-gray-300 rounded-md"
      />
    )}

    <div className="flex justify-around">
      {tasks.find((task) => task.taskId === selectedTaskId)?.taskStatus === "Assigned" && (
        <button
          onClick={(e) => handleSubmit(e, "In-Progress")}
          className="px-3 py-2 text-sm text-white bg-orange-500 rounded hover:bg-orange-600"
        >
          In Progress
        </button>
      )}
      {tasks.find((task) => task.taskId === selectedTaskId)?.taskStatus === "In-Progress" && (
        <button
          onClick={(e) => handleSubmit(e, "In-Test")}
          className="px-3 py-2 text-sm text-white bg-red-500 rounded hover:bg-red-600"
        >
          In Test
        </button>
      )}
      {tasks.find((task) => task.taskId === selectedTaskId)?.taskStatus === "In-Test" && (
        <button
          onClick={(e) => handleSubmit(e, "Completed")}
          className="px-3 py-2 text-sm text-white bg-teal-500 rounded hover:bg-teal-600"
        >
          Completed
        </button>
      )}
    </div>
  </div>
)}

    </div>
  );
};

export default MyTask;
  
