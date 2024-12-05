import { useLocation } from "react-router-dom";
import TaskDetails from "../../admin/components/TaskDetails";
import { Icon } from "@iconify/react";
import React, { useState, useEffect } from 'react';
import { HiOutlineDotsVertical } from "react-icons/hi";

import { useNavigate } from "react-router-dom";
const MyTask = () => {
  const [showDiv1, setShowDiv1] = useState(false);
  const [showDiv2, setShowDiv2] = useState(false);

  const handleToggleDiv1 = () => {
    setShowDiv1((prev) => !prev); // Toggle visibility of Div 1
  };

  const handleToggleDiv2 = () => {
    setShowDiv2((prev) => !prev); // Toggle visibility of Div 2
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
          <button onClick={handleToggleDiv1} className="px-3 py-2 text-sm text-white bg-teal-500 rounded hover:bg-teal-600">
            Updates
          </button >
          <button onClick={handleToggleDiv2} className="px-3 py-2 text-sm text-white bg-gray-300 rounded hover:bg-gray-600">
            
            Message
          </button>
        </div>
      </div>
      {sampleTask.map((task) => (
        <TaskDetails key={task.id} task={task} className=" gap-6" />
      ))}
     {showDiv1 && (
      <div className="w-64 h-[140px] absolute left-150 bg-white border border-gray-300 shadow-md rounded-md">
        <div><h1 className="flex relative left-4">What is your project's status</h1></div>
        <div className="w-[200px] h-12 relative top-3 left-3 bg-white border border-gray-300 shadow-md rounded-md">
            <p className="text-xs text-gray-500">Tell us,how the project's going</p>
        </div>
        <div className="relative flex top-5 justify-around">
            <button className="px-2 py-1 text-sm text-white bg-green-500  rounded hover:bg-teal-600">Completed</button>
            <button className="px-3 py-2 text-sm text-orange-500  bg-orange-100 rounded hover:bg-orange-600">In Progress</button>
            <button className="px-3 py-2 text-sm text-red-500 bg-white-500 bg-red-100 rounded hover:bg-red-600">In Test</button>
        </div>
      </div>
     )}
           {showDiv2 && (
        <div className="w-64 h-[280px] relative left-[1000px] bg-white border border-gray-300 shadow-md rounded-md">
          <div className="w-full h-15 flex  bg-white  p-2">
            <img src="/Images/person1.png" className="w-10 h-10 rounded-s-full"></img>
            <div className="relative left-4">
              <span className="text-sm">Username 4</span><br></br>
              <span className="text-xs">2024/10/21</span>
            </div>
            <button className="relative left-[100px] "><HiOutlineDotsVertical /></button>
          </div>
          <div className="p-3">
            <p className="text-xs text-gray-800">Did you done the first project, please me the completed pdfs.</p>
          </div>
          <div className="w-[230px] h-[100px] relative left-3 bg-gray-300 border border-gray-300 shadow-md rounded-md">
            <p className="text-xs">@Jhon,Write your Comment.</p>
          </div>
          <div className="w-[130px] h-[30px] relative left-[120px] top-4 flex justify-around">
            <button className="px-3 py-2 text-white text-xs bg-gray-300  rounded hover:bg-gray-600">Close</button>
            <button className="px-3 py-2 text-white text-xs  bg-green-500  rounded hover:bg-teal-600">Save</button>
          </div>
        </div>
          )
      }
    </div>
  );
};

export default MyTask;
