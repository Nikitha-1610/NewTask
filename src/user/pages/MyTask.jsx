import React, { useState, useEffect } from "react";
import { GoClock } from "react-icons/go";
import { CiCalendar } from "react-icons/ci";
import { FaRegCircle } from "react-icons/fa";
import { GoPeople, GoPerson } from "react-icons/go";
import { BsPaperclip } from "react-icons/bs";
import { FiMessageCircle } from "react-icons/fi";

const MyTask = () => {
  const [tasks, setTasks] = useState([]);
  const [showDiv1, setShowDiv1] = useState(false);
  const [hoursSpent, setHoursSpent] = useState("");
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    localStorage.setItem("employeeName", "Mukilan");
    const employeeName = localStorage.getItem("employeeName");

    if (employeeName) {
      fetch(
        `https://3qhglx2bhd.execute-api.us-east-1.amazonaws.com/task/getEmployeeTask/${employeeName}`
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.status === 200) {
            setTasks(data.message);
          } else {
            console.error("Failed to fetch tasks:", data);
          }
        })
        .catch((error) => console.error("Error fetching tasks:", error));
    } else {
      console.error("Employee name not found in localStorage.");
    }
  }, []);

  const handleToggleDiv1 = (task) => {
    setSelectedTask(task);
    setShowDiv1(true);
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
          setShowDiv1(false);
          setHoursSpent("");
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
        {tasks.map((task) => (
          <div
            key={task.taskId}
            className="mb-5 p-4 bg-gray-50 border rounded-md relative"
          >
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
            <table className="border-separate border-spacing-2 border-none mt-2">
              <tbody>
                <tr>
                  <td>
                    <GoClock /> Status
                  </td>
                  <td>
                    <FaRegCircle /> {task.taskStatus}
                  </td>
                </tr>
                <tr>
                  <td>
                    <CiCalendar /> Due Date
                  </td>
                  <td>{new Date(task.deadline).toLocaleDateString()}</td>
                </tr>
                <tr>
                  <td>
                    <GoPeople /> Assigned to
                  </td>
                  <td>{task.assignedTo.join(", ")}</td>
                </tr>
                <tr>
                  <td>
                    <GoPerson /> Assigned By
                  </td>
                  <td>{task.assignedBy}</td>
                </tr>
              </tbody>
            </table>
          </div>
        ))}
      </div>

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
        </div>
      )}
    </div>
  );
};

export default MyTask;
