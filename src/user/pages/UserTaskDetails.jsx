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
      {/* Back Arrow Button */}
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
          <span className="font-medium">
            {new Date(deadline).toLocaleDateString("en-US")}
          </span>
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
  <div className="flex justify-between items-center">
    <div className="flex items-center gap-2">
      <Icon icon="cuida:attachment-clip-outline" height={22} width={22} />
      <h4 className="text-lg font-semibold text-gray-600">Attachments ({referenceFileUrl.length})</h4>
    </div>
    
  </div>
  <div className="flex flex-wrap gap-4 mt-4">
    {referenceFileUrl.map((url, index) => (
      <div
        key={index}
        className="flex items-center gap-4 p-4 border rounded-lg border-gray-300 bg-gray-50 w-full md:w-80"
      >
        <Icon icon="mdi:file-pdf" className="text-red-500" height={40} width={40} />
        <div className="flex-grow">
          <div className="text-sm text-gray-500">Size: {fileSize} KB</div>
          <a href={url} className="mt-2 text-blue-600 underline" download>
            Download
          </a>
        </div>
      </div>
    ))}
  </div>
</div>

      </div>
    </div>
  );
};

export default UserTaskCardDetails;
