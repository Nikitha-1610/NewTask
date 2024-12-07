import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactLoading from 'react-loading'; 

const AssignedTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!localStorage.getItem('name')) {
      localStorage.setItem('name', 'Mukilan');
    }

    const employeeName = localStorage.getItem('name');

    if (employeeName) {
      
      const baseUrl = "https://3qhglx2bhd.execute-api.us-east-1.amazonaws.com/"; 
      const url = `${baseUrl}/task/getEmployeeTask/${employeeName}?days=7`;

      console.log("Request URL:", url); 

      
      axios.get(url)
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

  return (
    <div className="min-h-auto  bg-gray-100 flex justify-center">
      <div className="bg-white p-6 rounded-lg w-full max-w-8xl">
        <h1 className="text-2xl font-semibold text-center text-gray-700 mb-4">Assigned Tasks</h1>

        {loading ? (
          <div className="flex justify-center items-center">
            <ReactLoading type="spin" color="#00FFFF" height={50} width={50} /> 
          </div>
        ) : tasks.length === 0 ? (
          <div className="text-center text-gray-500">No tasks assigned to you.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {tasks.map(task => (
              <div key={task.taskId} className="task-card bg-white p-4 rounded-lg shadow-md">
                <h3 className="text-xl font-medium text-gray-800">{task.taskName}</h3>
                <p className="text-gray-600">{task.taskDescription}</p>
                <p className="text-sm text-gray-500 mt-2">Assigned on: {new Date(task.assignedDate).toLocaleDateString()}</p>
                <div className="mt-3">
                  <span className={`px-2 py-1 text-sm rounded-full ${task.taskStatus === 'In-Progress' ? 'bg-yellow-200 text-yellow-800' : 'bg-green-200 text-green-800'}`}>
                    {task.taskStatus}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AssignedTasks;
