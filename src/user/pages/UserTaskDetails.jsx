import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axiosInstance from "../../common/utils/axios/axiosInstance";
import { Icon } from "@iconify/react";
import ReactLoading from "react-loading";

const UserTaskCardDetails = () => {
  const { taskId } = useParams();
  const navigate = useNavigate();
  const [taskDetails, setTaskDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [downloading, setDownloading] = useState(false);
  const [fileSize, setFileSize] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [hoursSpent, setHoursSpent] = useState('');

  useEffect(() => {
    axiosInstance
      .get(`task/getOne/${taskId}`)
      .then((response) => {
        setTaskDetails(response.data.message);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to fetch task details.");
        setLoading(false);
      });
  }, [taskId]);

  const goBack = () => {
    navigate("/user/home");
  };

  const handleUpdateClick = () => {
    setShowUpdateModal(true);
  };

  const handleStatusChange = (status) => {
    // Handle status update logic here
    setShowUpdateModal(false);
    // For example: Send request to update task status
    // axiosInstance.put(`task/updateStatus/${taskId}`, { status, hoursSpent });
  };

  const handleHoursChange = (e) => {
    setHoursSpent(e.target.value);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ReactLoading type="spin" color="#0d6efd" height={50} width={40} />
      </div>
    );
  }

  if (error) return <div className="text-center mt-10 text-red-500">{error}</div>;

  const { taskName, deadline, taskDescription, assignedTo, taskStatus, assignedBy, comments = [], referenceFileUrl = [] } = taskDetails || {};

  return (
    <div className="w-full mx-auto p-6 bg-white rounded-lg shadow-md">
      <button
        onClick={goBack}
        style={{ background: "transparent", border: "none", cursor: "pointer", fontSize: "24px" }}
      >
        <Icon icon="mdi:arrow-left" height={24} width={24} />
      </button>

      <h3 className="mt-4 text-2xl font-semibold">{taskName}</h3>

      <div className="mt-4 space-y-3">
        <div className="flex items-center gap-3 text-lg">
          <Icon icon="ic:outline-watch-later" height={24} width={24} />
          <span>Status:</span>
          <span className="font-medium">{taskStatus}</span>
        </div>

        <div className="flex items-center gap-3 text-lg">
          <Icon icon="ic:outline-calendar-today" height={24} width={24} />
          <span>Due Date:</span>
          <span className="font-medium">{new Date(deadline).toLocaleDateString("en-US")}</span>
        </div>

        <div className="flex items-center gap-3 text-lg">
          <Icon icon="lucide:users" height={24} width={24} />
          <span>Assigned To:</span>
          <span className="font-medium">{assignedTo.join(", ")}</span>
        </div>

        <div className="flex items-center gap-3 text-lg">
          <Icon icon="mdi:user-outline" height={24} width={24} />
          <span>Assigned By:</span>
          <span className="font-medium">{assignedBy}</span>
        </div>

        <div className="mt-4">
          <h4 className="text-xl font-semibold">Description</h4>
          <textarea
            value={taskDescription || "No description available."}
            className="w-full p-4 mt-2 text-lg text-gray-700 bg-gray-100 border border-gray-300 rounded-md"
            readOnly
          />
        </div>

        <div className="mt-4">
          <h4 className="text-xl font-semibold">Comments</h4>
          {comments.length > 0 ? (
            <div className="space-y-2">
              {comments.map((comment, index) => (
                <div key={index} className="p-4 border rounded-lg border-gray-300 bg-gray-50">
                  <div className="text-lg font-medium">{comment.user}</div>
                  <div className="text-sm text-gray-500">{comment.text}</div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-4 text-gray-500">No comments available.</div>
          )}
        </div>

        <div className="mt-4">
          <button 
            onClick={handleUpdateClick} 
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Update
          </button>
        </div>

        {/* Update Modal */}
        {showUpdateModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-md shadow-md w-80">
              <h2 className="text-xl font-semibold mb-4">Update Task Status</h2>
              {taskStatus === "Assigned" && (
                <button
                  onClick={() => handleStatusChange("In-Progress")}
                  className="w-full py-2 mb-2 bg-orange-500 text-white rounded hover:bg-orange-600"
                >
                  In Progress
                </button>
              )}
              {taskStatus === "In-Progress" && (
                <button
                  onClick={() => handleStatusChange("In-Test")}
                  className="w-full py-2 mb-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  In Test
                </button>
              )}
              {taskStatus === "In-Test" && (
                <>
                  <input
                    type="number"
                    placeholder="Enter hours spent"
                    value={hoursSpent}
                    onChange={handleHoursChange}
                    className="w-full p-2 mb-4 border border-gray-300 rounded"
                  />
                  <button
                    onClick={() => handleStatusChange("Completed")}
                    className="w-full py-2 mb-2 bg-teal-500 text-white rounded hover:bg-teal-600"
                  >
                    Completed
                  </button>
                </>
              )}
              <button
                onClick={() => setShowUpdateModal(false)}
                className="w-full py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserTaskCardDetails;
