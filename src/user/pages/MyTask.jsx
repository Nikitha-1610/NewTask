import React, { useState, useEffect } from 'react';
import { GoClock } from "react-icons/go";
import { CiCalendar } from "react-icons/ci";
import { FaRegCircle } from "react-icons/fa";
import { GoPeople } from "react-icons/go";
import { GoPerson } from "react-icons/go";
import { MdOutlineDescription } from "react-icons/md";
import { BsPaperclip } from "react-icons/bs";
import { FiMessageCircle } from "react-icons/fi";
import { HiOutlineDotsVertical } from "react-icons/hi";

const MyTask = () => {
  const [tasks, setTasks] = useState([]);
  const [showDiv1, setShowDiv1] = useState(false);
  const [showDiv2, setShowDiv2] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    setShowDiv1(false); // Hide the div
  };

  useEffect(() => {
    // Fetch the tasks from the API
    fetch("https://3qhglx2bhd.execute-api.us-east-1.amazonaws.com/task/getEmployeeTask/Mukilan")
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 200) {
          setTasks(data.message);
        } else {
          console.error("Failed to fetch tasks:", data);
        }
      })
      .catch((error) => console.error("Error fetching tasks:", error));
  }, []);

  const handleToggleDiv1 = () => {
    setShowDiv1((prev) => !prev); // Toggle visibility of Div 1
  };

  const handleToggleDiv2 = () => {
    setShowDiv2((prev) => !prev); // Toggle visibility of Div 2
  };

  const handleCompleteTask = (taskId) => {
    const body = {
      taskStatus: "Completed",
      hoursSpent: "3"
    };

    fetch(`https://3qhglx2bhd.execute-api.us-east-1.amazonaws.com/task/updateTask/${taskId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 200) {
          // Update the task status in the local state
          setTasks((prevTasks) =>
            prevTasks.map((task) =>
              task.taskId === taskId ? { ...task, taskStatus: "Completed" } : task
            )
          );
          console.log("Task updated successfully:", data);
        } else {
          console.error("Failed to update task:", data);
        }
      })
      .catch((error) => console.error("Error updating task:", error));
  };

  return (
    <>
      <div className="space-y-5">
        <div className="flex items-center justify-between pb-4 border-gray-300">
          <h2 className="text-xl font-bold bg-yellow-200 px-2 p-1 rounded-md text-gray-700">MyTask</h2>
          <div className="flex gap-3">
           
            <button onClick={handleToggleDiv2} className="px-3 py-2 text-sm text-white bg-gray-300 rounded hover:bg-gray-600">
              Message
            </button>
          </div>
        </div>

        <div className="w-[1050px] h-auto bg-[#FFFFFF] border-[0.2px] border-[#565557] rounded p-2">
          {tasks.map((task) => (
            <div key={task.taskId} className="mb-4">
              <span className="font-bold">Task: {task.taskName}</span>
              <table className="border-separate border-spacing-2 border-none mt-2">
                <tbody>
                  <tr>
                    <td className="status w-50 flex">
                      <GoClock /> <div>Status</div>
                    </td>
                    <td>
                      <div className="flex">
                        <FaRegCircle /> <div>{task.taskStatus}</div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="date w-50 flex">
                      <CiCalendar /> <div>Due Date</div>
                    </td>
                    <td>{new Date(task.deadline).toLocaleDateString()}</td>
                  </tr>
                  <tr>
                    <td className="flex">
                    <GoPeople /><div>Assigned to</div>
                    </td>
                    <td>
                      {task.assignedTo.map((assignee, index) => (
                        <div key={index} className="flex items-center">
                          {/* <img
                            src="Images/person.jpeg"
                            alt="User Profile"
                            className="w-[15px] h-[15px] rounded-full mr-2"
                          /> */} <GoPerson />
                          {assignee}
                        </div>
                      ))}
                    </td>
                  </tr>
                  <tr>
                    <td className="flex">
                    <GoPerson /><div>Assigned By</div>
                    </td>
                    <td>
                      <div className="flex items-center">
                      <GoPerson />
                        {task.assignedBy}
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="mt-2">
                <span className="flex">
                  <MdOutlineDescription /> Description
                </span>
                <div className="w-[990px] h-[80px] bg-[#FFFFFF] border-[0.2px] border-[#565557] rounded p-2">
                  {task.taskDescription}
                </div>
              </div><br></br>
              <div>
                    <div className="flex justify-between">                    
                <span className="flex"><BsPaperclip />Attachment(4)</span>
                <button className="text-blue-500">Download</button>
                </div><br></br>
                <div className="flex justify-between">
                    <div className="w-[250px] h-[70px] p-2 rounded  bg-white shadow-[2px_2px_4px_0px_#7F767626] shadow-2px_2px_2px_0px_#7F767626]"></div>
                    <div className="w-[250px] h-[70px] p-2 rounded  bg-white shadow-[2px_2px_4px_0px_#7F767626] shadow-2px_2px_2px_0px_#7F767626]"></div>
                    <div className="w-[250px] h-[70px] p-2 rounded  bg-white shadow-[2px_2px_4px_0px_#7F767626] shadow-2px_2px_2px_0px_#7F767626]"></div>
                    <div className="w-[70px] h-[70px] p-2 rounded  bg-white shadow-[2px_2px_4px_0px_#7F767626] shadow-2px_2px_2px_0px_#7F767626]"></div>
                </div>
                </div>
                <div className="" >
                <span className="flex"><FiMessageCircle />Comments(8)</span><br></br>
                <div className="w-[990px] h-[50px] bg-[#FFFFFF] border-[0.2px] border-[#565557] rounded p-2 text-[#8B8A8E] flex">
                    <img src="" alt="" />
                    <img src='Images/person.jpeg' alt="User Profile" className="w-[15px] h-[15px] rounded-full" />
                    Comments Here...
                    </div><br></br>
                <div className="w-[990px] h-[50px] bg-[#D0FCF9] border-[0.2px] border-[#565557] rounded p-2 text-[#8B8A8E] flex">
                <img src='Images/person.jpeg' alt="User Profile" className="w-[15px] h-[15px] rounded-full" />
                Your Comment</div>
                </div><br></br>
                <div className="w-[990px] h-[50px] relative justify-center">
                  <button onClick={handleToggleDiv1} className="px-3 py-2 text-sm relative left-[450px] text-white bg-teal-500 rounded hover:bg-teal-600">
              Updates
            </button></div>
            </div>
            
          ))}
        </div>
        {showDiv1 && (
   <div className="w-64 h-[140px] absolute top-20 right-20 bg-white border border-gray-300 shadow-md rounded-md">
   <div><h1 className="flex relative left-4">What is your project's status</h1></div>
   <div className="w-[230px] h-12 relative top-3 left-3 bg-white border border-gray-300 shadow-md rounded-md">
       <p className="text-xs text-gray-500">Tell us,how the project's going</p>
   </div>
   <div className="relative flex top-5 justify-around">
   <button onClick={handleSubmit} className="px-3 py-2 text-white text-xs bg-green-400  rounded hover:bg-green-600">Completed</button>
   <button onClick={handleSubmit} className="px-3 py-2 text-white text-xs bg-orange-400  rounded hover:bg-orange-600">In Progress</button>
   <button onClick={handleSubmit} className="px-3 py-2 text-white text-xs bg-red-400  rounded hover:bg-red-600">In Test</button>
   </div>
 </div>
    
      )}
      {showDiv2 && (
        <div className="w-64 h-[280px] absolute top-20 right-20 bg-white border border-gray-300 shadow-md rounded-md">
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

      
    </>
  );
};

export default MyTask;
