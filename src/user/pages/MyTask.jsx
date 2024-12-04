import { useLocation } from "react-router-dom";
import TaskDetails from "../../admin/components/TaskDetails";
import { Icon } from "@iconify/react";
import React, { useState } from 'react';

import { useNavigate } from "react-router-dom";
const MyTask = () => {
    const [isVisible, setIsVisible] = useState(false);

  const handleClick = () => {
    setIsVisible(!isVisible);
  };
  const location = useLocation();
  const navigate = useNavigate();

  console.log("here is location", location);

  const tasksFromState = location.state || [];

  const sampleTask = tasksFromState.map((task) => ({
    id: task.taskId,
    title: task.taskName,
    status: task.taskStatus,
    dueDate: task.deadline,
    assignedTo: task.assignedTo || [],
    assignedBy: task.assignedBy || {},
    attachments: task.referenceFileUrl || [],
    comments: task.comment || [],
    taskDescription: task.taskDescription,
  }));
  const goBack = () => {
    navigate("/admin/task");
  };

  return (
    <div className=" space-y-5">
      <div className="flex items-center justify-between pb-4 border-gray-300">
        <div className=" flex gap-2">
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
          <h2 className="text-xl font-bold bg-yellow-200 px-2 p-1 rounded-md text-gray-700">
            MyTask({sampleTask.length})
          </h2>
        </div>
        <div className=" flex gap-3">
          <button   onClick={handleClick}  className="px-3 py-2 text-sm text-white bg-teal-500 rounded hover:bg-teal-600">
            Updates
          </button>
          <h2 className=" flex gap-2">
            <Icon icon="lets-icons:filter" height={22} width={22} />
            Filter
          </h2>
        </div>
      </div>
      {sampleTask.map((task) => (
        <TaskDetails key={task.id} task={task} className=" gap-6" />
      ))}
       {isVisible && (
      <div className="w-64 h-32 absolute left-150 bg-white border border-gray-300 shadow-md rounded-md">
        <div><h1 className="flex relative left-4">What is your project's status</h1></div>
        <div className="w-25 h-10 relative top-3 bg-white border border-gray-300 shadow-md rounded-md">
            <p className="text-xs text-gray-500">Tell us,how the project's going</p>
        </div>
        <div className="relative flex top-5 justify-around">
            <button className="px-2 py-1 text-sm text-white bg-green-500  rounded hover:bg-teal-600">Assigned</button>
            <button className="px-3 py-2 text-sm text-orange-500  bg-orange-100 rounded hover:bg-orange-600">In Progress</button>
            <button className="px-3 py-2 text-sm text-red-500 bg-white-500 bg-red-100 rounded hover:bg-red-600">In Test</button>
        </div>
      </div>
        )}
    </div>
  );
};

export default MyTask;
