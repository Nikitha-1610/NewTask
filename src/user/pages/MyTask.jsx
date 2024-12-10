import React, { useState, useEffect } from 'react';
import { GoClock } from "react-icons/go";
import { CiCalendar } from "react-icons/ci";
import { FaRegCircle } from "react-icons/fa";
import { GoPeople, GoPerson } from "react-icons/go";
import { BsPaperclip } from "react-icons/bs";
import { FiMessageCircle } from "react-icons/fi";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { Icon } from "@iconify/react";
import { ClipLoader } from 'react-spinners'; // Importing the loader

const MyTask = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true); // Loader state
  const [showDiv1, setShowDiv1] = useState(false);
  const [showDiv2, setShowDiv2] = useState(false);
  const [hoursSpent, setHoursSpent] = useState('');
  const [selectedTaskId, setSelectedTaskId] = useState(null);

  // Fetch tasks on component mount
  useEffect(() => {
    const employeeName = localStorage.getItem('employeeName');

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
        .finally(() => setLoading(false)); // Hide loader after fetching data
    } else {
      console.error("Employee name not found in localStorage.");
      setLoading(false);
    }
  }, []);

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

      <div className="w-full bg-white rounded-lg shadow-md border border-gray-200">
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <ClipLoader color="#36d7b7" loading={loading} size={50} />
          </div>
        ) : (
          tasks.map((task) => (
            <div key={task.taskId} className="mb-5 p-4 bg-gray-50 border rounded-md relative">
              {/* Update Button */}
              <button 
                onClick={() => handleToggleDiv1(task.taskId)} 
                className="absolute top-4 right-4 px-3 py-2 text-sm text-white bg-teal-500 rounded hover:bg-teal-600"
              >
                Update
              </button>

              <h3 className="font-bold text-xl">{task.taskName}</h3>

              <table className="border-separate border-spacing-2 border-none mt-2">
                <tbody>
                  <tr>
                    <td><GoClock /> Status</td>
                    <td><FaRegCircle /> {task.taskStatus}</td>
                  </tr>
                  <tr>
                    <td><CiCalendar /> Due Date</td>
                    <td>{new Date(task.deadline).toLocaleDateString()}</td>
                  </tr>
                  <tr>
                    <td><GoPeople /> Assigned to</td>
                    <td>{task.assignedTo.join(', ')}</td>
                  </tr>
                  <tr>
                    <td><GoPerson /> Assigned By</td>
                    <td>{task.assignedBy}</td>
                  </tr>
                </tbody>
              </table>

              <div className="mt-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <BsPaperclip /> <span>Attachment</span>
                  </div>
                  <button className="text-blue-500">Download</button>
                </div>
                <div className="flex mt-3 gap-2">
                  {[...Array(4)].map((_, index) => (
                    <div key={index} className="w-1/4 h-[70px] p-2 bg-white shadow-md rounded"></div>
                  ))}
                </div>
              </div>

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
          ))
        )}
      </div>

      {showDiv1 && (
        <div className="w-[300px] h-[170px] absolute top-20 right-20 bg-white border border-gray-300 shadow-md rounded-md p-2">
          <h1 className=" text-lg">Update Task Status</h1>
          <input
            type="number"
            placeholder="Hours spent on task?"
            value={hoursSpent}
            onChange={(e) => setHoursSpent(e.target.value)}
            className="w-full p-2 mb-4 border border-gray-300 rounded-md"
          />
          <div className="flex justify-around">
            <button onClick={(e) => handleSubmit(e, 'Completed')} className=" px-3 py-2 text-sm text-white bg-teal-500 rounded hover:bg-teal-600">Completed</button>
            <button onClick={(e) => handleSubmit(e, 'In-Progress')} className="px-3 py-2 text-sm text-white bg-orange-500 rounded hover:bg-orange-600">In Progress</button>
            <button onClick={(e) => handleSubmit(e, 'In-Test')} className="px-3 py-2 text-sm text-white bg-red-500 rounded hover:bg-red-600">In Test</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyTask;
