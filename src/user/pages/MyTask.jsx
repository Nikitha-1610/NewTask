import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";

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
            {task.taskStatus !== "Completed" && (
              <button
                onClick={() => handleToggleDiv1(task)}
                className="absolute top-4 right-4 px-3 py-2 text-sm text-white bg-teal-500 rounded hover:bg-teal-600"
              >
                Update
              </button>
            )}

            <h3 className="font-bold text-xl">{task.taskName}</h3>
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

            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center">
                <Icon icon="lucide:users" height={22} width={22} />
                <span className="ml-2">Assigned to:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {task.assignedTo.map((person, index) => (
                  <div key={index} className="flex items-center gap-2">
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

            <div className="flex flex-wrap items-center">
              <Icon icon="mdi:user-outline" height={22} width={22} />
              <span className="ml-2">Assigned by:</span>
              <div className="flex items-center gap-2 ml-3">
                <Icon
                  icon="mdi:account-circle-outline"
                  className="text-blue-500  p-0 rounded-full"
                  width={32}
                  height={32}
                />
                <span className="text-gray-700 font-medium">{task.assignedBy}</span>
              </div>
            </div>

            {/* Attachment section */}
            <div className="mt-4">
              {task.attachments && task.attachments.length > 0 ? (
                <div>
                  <h4 className="font-medium">Attachments:</h4>
                  <ul className="list-disc pl-5">
                    {task.attachments.map((attachment, index) => (
                      <li key={index}>
                        <a href={attachment.url} target="_blank" rel="noopener noreferrer" className="text-blue-500">
                          {attachment.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <p>No attachments available.</p>
              )}
            </div>
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
          {/* Cancel Button */}
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
