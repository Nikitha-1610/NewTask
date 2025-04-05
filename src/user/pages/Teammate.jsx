import React, { useEffect, useState } from 'react';
import ReactLoading from 'react-loading';
import axios from 'axios';

const Teammate = () => {
  const [loading, setLoading] = useState(true);
  const [tasks, setTasks] = useState([]); // Initialize as an empty array

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('task/getTeammateTask', {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ik11a2lsYW4iLCJyb2xlIjoiRW1wbG95ZWUiLCJpYXQiOjE3NDM1OTQwMzEsImV4cCI6MTc1MTM3MDAzMX0.fl9_YkOj7TfZAjpDTEZICYg1mVSDOD77A0H_XOhOi18`, // Replace with your actual token
          },
        });

        // Log the response to check its structure
        console.log('API Response:', response.data);

        // Ensure the response is an array
        if (Array.isArray(response.data)) {
          setTasks(response.data);
        } else {
          console.error('Expected an array but got:', response.data);
          setTasks([]); // Set to empty array if not an array
        }
      } catch (error) {
        console.error('Error fetching tasks:', error.response ? error.response.data : error.message);
        setTasks([]); // Set to empty array on error
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const handleTaskClick = (taskId) => {
    console.log(`Task clicked: ${taskId}`);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Teammate Task</h2>
      {loading ? (
        <div className="fixed inset-0 flex justify-center items-center bg-white bg-opacity-40 z-50">
          <ReactLoading type="spin" color="#00bfae" height={50} width={50} />
        </div>
      ) : tasks.length === 0 ? (
        <div className="text-center text-gray-500">No tasks assigned to you.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {tasks.map(task => (
            <div
              key={task.taskId}
              className="task-card bg-white p-4 rounded-lg shadow-md cursor-pointer"
              onClick={() => handleTaskClick(task.taskId)}
            >
              <h3 className="text-xl font-medium text-gray-800">{task.taskName}</h3>
              <p className="text-gray-600">{task.taskDescription}</p>
              <p className="text-sm text-gray-500 mt-2">Assigned on: {new Date(task.assignedDate).toLocaleDateString()}</p>
              <div className="mt-3">
                <span className={`px-2 py-1 text-sm rounded-full ${task.taskStatus === 'In-Progress' ? 'bg-yellow-200 text-yellow-800' : 'bg-green-200 text-green-800'}`}>
                  {task .taskStatus}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Teammate;