import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faLink, faUser, faComments } from "@fortawesome/free-solid-svg-icons";
import axiosInstance from "../utilities/axios/axiosInstance";

const TaskCardDetails = () => {
  const { taskId } = useParams(); // Get taskId from URL
  const [taskDetails, setTaskDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); 

  useEffect(() => {
    // Fetch task details
    axiosInstance
      .get(`task/getOne/${taskId}`)
      .then((response) => {
        setTaskDetails(response.data.message); // Store the task details
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching task details:", err);
        setError("Failed to fetch task details.");
        setLoading(false);
      });
  }, [taskId]);

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (error) return <div className="text-center mt-10 text-red-500">{error}</div>;

  const {
    taskName,
    deadline,
    assignedDate,
    taskDescription,
    assignedTo,
    taskStatus,
    comment = [],   
    priority,
    assignedBy,
    referenceFileUrl = [], 
  } = taskDetails || {}; 


  const generateRandomColor = () => {
    const colors = [
      "bg-green-200",
      "bg-blue-200",
      "bg-yellow-200",
      "bg-red-200",
      "bg-teal-200",
      "bg-purple-200",
      "bg-pink-200",
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-gray-100 shadow-lg border b-black-100 rounded-lg mt-10">
      {/* <h1 className="text-2xl font-bold text-gray-800 mb-4">{taskName}</h1> */}
      <h1 className={`text-xl font-semibold mb-2 mt-5 inline-block px-2 py-1 rounded ${generateRandomColor()}`}>{taskName}</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <p className="text-sm text-gray-500">Assigned By</p>
          <p className="text-lg font-semibold">{assignedBy}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Priority</p>
          <p className={`text-lg font-semibold ${priority === "Urgent" ? "text-red-500" : "text-green-500"}`}>
            {priority}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Assigned Date</p>
          <p className="text-lg font-semibold">{new Date(assignedDate).toLocaleDateString()}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Deadline</p>
          <p className="text-lg font-semibold">{new Date(deadline).toLocaleDateString()}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Status</p>
          <p className="text-lg font-semibold">{taskStatus}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Assigned To</p>
          <ul>
            {assignedTo.map((emp, index) => (
              <li key={index} className="text-lg font-bold">
                <FontAwesomeIcon icon={faUser} className="mr-2 text-blue-500 h-4" />
                {emp}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mb-6">
        <p className="text-sm text-gray-500">Task Description</p>
        <p className="text-lg font-semibold">{taskDescription}</p>
      </div>

      <div className="mb-6">
        <p className="text-sm text-gray-500">Comments</p>
        {comment.length > 0 ? (
          <ul>
            {comment.map((c, index) => (
              <li key={index} className="mt-2 flex items-start">
                <FontAwesomeIcon icon={faComments} className="mr-2 text-gray-500" />
                <span className="text-lg">
                  <strong>{c.userName}:</strong> {c.message}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-lg font-semibold">No comments available.</p>
        )}
      </div>

      <div className="mb-6">
        <p className="text-sm text-gray-500">Reference Files</p>
        {referenceFileUrl.length > 0 ? (
          <ul>
            {referenceFileUrl.map((url, index) => (
              <li key={index} className="mt-2">
                <a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                  <FontAwesomeIcon icon={faLink} className="mr-2" />
                  {url}
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-lg font-semibold">No reference files available.</p>
        )}
      </div>
    </div>
  );
};

export default TaskCardDetails;

