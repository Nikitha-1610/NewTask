import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import axiosInstance from "../../common/utils/axios/axiosInstance";
import { s3Client } from "../../common/utils/aws/awsconfig";
import { PutObjectCommand } from "@aws-sdk/client-s3";
// import toast, { Toaster } from "react-hot-toast";
const AddProject = () => {
  const [formData, setFormData] = useState({
    projectName: "",
    startDate: "",
    endDate: "",
    projectLead: [],
    frontendLead: [],
    backendLead: [],
    designLead: [], // Single reviewer as a string
    priority: "Low",
    projectDescription: "",
    referenceFileUrl: [], // Reference as an array
  });

  const [showUserList, setShowUserList] = useState(false);
  const [errors, setErrors] = useState({
    projectName: "",
    startDate: "",
    endDate: "",
    projectLead: "",
    frontendLead: "",
    backendLead: "",
    designLead: "", // Single reviewer as a string
   
    projectDescription: "",
    referenceFileUrl: [], 
  });
  const [selectedUserType, setSelectedUserType] = useState("");
  const [users, setUsers] = useState([]);
  const [displayReferences, setDisplayReferences] = useState([]);
  const [uploading, setUploading] = useState(false);
  const employeeId = localStorage.getItem('employeeId')
  const getAllEmp = async () => {
    try {
      const response = await axiosInstance.get(`employee/getOption/TeamLead`);
      

      setUsers(response?.data?.message);
    } catch (error) {
      console.error("Error syncing with server:", error);
      // toast.error("Failed to fetch users.");
    }
  };

  useEffect(() => {
    getAllEmp();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectUser = (user) => {
    setFormData((prev) => ({
      ...prev,
      [selectedUserType]:
        selectedUserType === "assignedTo" ? [...prev.assignedTo, user] : user, // Reviewer is stored as a string
    }));
    setShowUserList(false);
  };

  const handleAddReference = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const BUCKET_NAME = "task-m"; // Replace with your actual bucket name

    const uploadToS3 = async (file) => {
      const fileName = `${Date.now()}-${file.name}`; // Unique file name
      const params = {
        Bucket: BUCKET_NAME,
        Key: fileName,
        Body: file,
        ContentType: file.type,
      };

      try {
        const command = new PutObjectCommand(params);
        await s3Client.send(command);
        const region = "us-east-1";
        return `https://${BUCKET_NAME}.s3.${region}.amazonaws.com/${fileName}`;
      } catch (err) {
        console.error("Error uploading file to S3: ", err);
        return null;
      }
    };
    setUploading(true);
    const fileUrl = await uploadToS3(file);
    setUploading(false);
    if (fileUrl) {
      setFormData((prev) => ({
        ...prev,
        referenceFileUrl: [...prev.referenceFileUrl, fileUrl],
      }));
      setDisplayReferences((prev) => [
        ...prev,
        {
          name: file.name, // Include original file name
          size: file.size, // Include file size
          url: fileUrl, // S3 file URL
        },
      ]);
    } else {
      alert("Failed to upload file. Please try again.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {
      projectName: "",
      startDate: "",
      endDate: "",
      projectLead: "",
      frontendLead: "",
      backendLead: "",
      designLead: "", // Single reviewer as a string
      priority: "",
      projectDescription: "",
      referenceFileUrl: "",
    };
  
    // Check if required fields are filled and set error messages
    if (!formData.projectName) {
      newErrors.projectName = "Project name is required.";
    }
    if (!formData.startDate) {
      newErrors.startDate = "Start date is required.";
    }
    if (!formData.endDate) {
      newErrors.endDate = "Due date is required.";
    }
    if (!formData.projectLead) {
      newErrors.projectLead = "At least one person must be assigned.";
    }
    if (!formData.frontendLead) {
      newErrors.frontendLead = "At least one person must be assigned..";
    }
    if (!formData.backendLead) {
      newErrors.backendLead = "At least one person must be assigned.";
    }
    if (!formData.designLead) {
      newErrors.designLead = "At least one person must be assigned.";
    }
    if (!formData.priority) {
      newErrors.priority = "Select One";
    }
   
    if (formData.referenceFileUrl.length === 0) {
      newErrors.referenceFileUrl = "At least one reference file is required.";
    }
  
    // If there are any validation errors, update the errors state and stop form submission
    if (Object.values(newErrors).some((error) => error !== "")) {
      setErrors(newErrors);
      return;
    }

    try {
      

      // Make the API POST request
      const response = await axiosInstance.post("project/addProject", formData);

      // Handle success
      if (response.status === 200 || response.status === 201) {
        console.log("Server Response:", response.data);

        // Reset form (if needed)
        setFormData({
          projectName: "",
          startDate: "",
          endDate: "",
          projectLead: [],
          frontendLead: [],
          backendLead: [],
          designLead: [], // Single reviewer as a string
          priority: "Low",
          projectDescription: "",
          referenceFileUrl: [],
        });
        setDisplayReferences([]);
      } else {
        console.error("Unexpected response:", response);
        // toast.error("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form data:", error);
      // toast.error("Failed to submit the form. Please try again later.");
    }
  };

  return (
    <div className="w-full p-6">
      <div className="flex md:justify-end justify-center mb-5">
        <div className="flex flex-wrap justify-end gap-4">
          {/* Add Task Button */}
         
        </div>
      </div>
      <form onSubmit={handleSubmit} className="w-full ">
        {/* Project Name and Due Date */}
        <div className="flex flex-wrap space-y-4 md:space-y-0 gap-5 mb-4">
          <div className="w-full">
            <label className="block text-sm font-semibold">Project Name</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded mt-2"
              name="projectName"
              value={formData.projectName}
              onChange={handleInputChange}
              placeholder="Enter project name"
            />
            {errors.projectName && (<p className="text-sm text-red-500 mt-1">{errors.projectName}</p>)}
          </div>
          <div className=" flex w-full md:w-8/12 gap-4">
            <div className="w-full md:flex-1">
              <label className="block text-sm font-semibold">Start Date</label>
              <input
                type="date"
                className="w-full p-2 border border-gray-300 rounded mt-2"
                name="startDate"
                value={formData.startDate}
                onChange={handleInputChange}
              />
              {errors.startDate && (<p className="text-sm text-red-500 mt-1">{errors.startDate}</p>)}
            </div>
            <div className="w-full md:flex-1">
              <label className="block text-sm font-semibold">Due Date</label>
              <input
                type="date"
                className="w-full p-2 border border-gray-300 rounded mt-2"
                name="endDate"
                value={formData.endDate}
                onChange={handleInputChange}
              />
              {errors.endDate && (<p className="text-sm text-red-500 mt-1">{errors.endDate}</p>)}
            </div>
          </div>
        </div>

        {/* assignedTo Section */}
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-800 mb-2">
            Project Lead
          </label>
          <div className="flex items-center justify-between border-b border-gray-300 pb-2">
            <div className="flex items-center gap-2">
              <Icon
                icon="ic:sharp-person-add"
                className="text-gray-600"
                height={22}
                width={22}
              />
              {formData.projectLead && (
                <span className="bg-white-200 text-green-700 px-2 py-1 rounded-full text-xs">
                  {formData.projectLead}
                </span>
              )}
            </div>
            <button
              type="button"
              className="flex items-center justify-center w-8 h-8 rounded-full border border-dashed border-gray-400"
              onClick={() => {
                setSelectedUserType("projectLead");
                setShowUserList(true);
              }}
            >
              <Icon
                icon="ic:outline-add"
                className="text-gray-600"
                height={20}
                width={20}
              />
            </button>
          </div>
          {errors.projectLead && (
            <p className="text-sm text-red-500 mt-1">{errors.projectLead}</p>
           )}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-800 mb-2">
            Frontend Lead
          </label>
          <div className="flex items-center justify-between border-b border-gray-300 pb-2">
            <div className="flex items-center gap-2">
              <Icon
                icon="ic:sharp-person-add"
                className="text-gray-600"
                height={22}
                width={22}
              />
              {formData.frontendLead && (
                <span className="bg-white-200 text-green-700 px-2 py-1 rounded-full text-xs">
                  {formData.frontendLead}
                </span>
              )}
            </div>
            <button
              type="button"
              className="flex items-center justify-center w-8 h-8 rounded-full border border-dashed border-gray-400"
              onClick={() => {
                setSelectedUserType("frontendLead");
                setShowUserList(true);
              }}
            >
              <Icon
                icon="ic:outline-add"
                className="text-gray-600"
                height={20}
                width={20}
              />
            </button>
          </div>
          {errors.frontendLead && (<p className="text-sm text-red-500 mt-1">{errors.frontendLead}</p>)}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-800 mb-2">
            Backend Lead
          </label>
          <div className="flex items-center justify-between border-b border-gray-300 pb-2">
            <div className="flex items-center gap-2">
              <Icon
                icon="ic:sharp-person-add"
                className="text-gray-600"
                height={22}
                width={22}
              />
              {formData.backendLead && (
                <span className="bg-white-200 text-green-700 px-2 py-1 rounded-full text-xs">
                  {formData.backendLead}
                </span>
              )}
            </div>
            <button
              type="button"
              className="flex items-center justify-center w-8 h-8 rounded-full border border-dashed border-gray-400"
              onClick={() => {
                setSelectedUserType("backendLead");
                setShowUserList(true);
              }}
            >
              <Icon
                icon="ic:outline-add"
                className="text-gray-600"
                height={20}
                width={20}
              />
            </button>
          </div>
          {errors.backendLead && (<p className="text-sm text-red-500 mt-1">{errors.backendLead}</p>)}
        </div>

        {/* Reviewer Section */}
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-800 mb-2">
            Design Lead
          </label>
          <div className="flex items-center justify-between border-b border-gray-300 pb-2">
            <div className="flex items-center gap-2">
              <Icon
                icon="ic:sharp-person-add"
                className="text-gray-600"
                height={22}
                width={22}
              />
              {formData.designLead && (
                <span className="bg-white-200 text-green-700 px-2 py-1 rounded-full text-xs">
                  {formData.designLead}
                </span>
              )}
            </div>
            <button
              type="button"
              className="flex items-center justify-center w-8 h-8 rounded-full border border-dashed border-gray-400"
              onClick={() => {
                setSelectedUserType("designLead");
                setShowUserList(true);
              }}
            >
              <Icon
                icon="ic:outline-add"
                className="text-gray-600"
                height={20}
                width={20}
              />
            </button>
          </div>
          {errors.designLead && (<p className="text-sm text-red-500 mt-1">{errors.designLead}</p>)}
        </div>

        {/* Priority and taskDescription */}
        <div className="flex-col space-y-4 items-center mb-4">
          <label className="text-sm font-semibold mr-2">Priority</label>
          <div className="flex space-x-4">
            <button
              type="button"
              className={`${
                formData.priority === "Low"
                  ? "bg-teal-200 text-yellow-700"
                  : "bg-gray-200 text-gray-700"
              } px-4 py-1 rounded-full flex justify-center items-center gap-2`}
              onClick={() =>
                setFormData((prev) => ({ ...prev, priority: "Low" }))
              }
            >
              <div className=" h-2 w-2 bg-yellow-400 rounded-full"></div>
              Low
            </button>
            <button
              type="button"
              className={`${
                formData.priority === "Normal"
                  ? "bg-blue-200 text-teal-500"
                  : "bg-gray-200 text-gray-700"
              } px-4 py-1 rounded-full flex justify-center items-center gap-2`}
              onClick={() =>
                setFormData((prev) => ({ ...prev, priority: "Normal" }))
              }
            >
              <div className=" h-2 w-2 bg-green-400 rounded-full"></div>
              Normal
            </button>
            <button
              type="button"
              className={`${
                formData.priority === "Urgent"
                  ? "bg-red-200 text-red-700"
                  : "bg-gray-200 text-gray-700"
              } px-4 py-1 rounded-full flex justify-center items-center gap-2`}
              onClick={() =>
                setFormData((prev) => ({ ...prev, priority: "Urgent" }))
              }
            >
              <div className=" h-2 w-2 bg-teal-400 rounded-full"></div>
              Urgent
            </button>
          </div>
          {errors.priority && (<p className="text-sm text-red-500 mt-1">{errors.priority}</p>)}
        </div>

        {/* Task taskDescription */}
        <div className="mb-4">
          <label className="block text-sm font-semibold">taskDescription</label>
          <textarea
  className="w-full h-40 p-2 border border-gray-300 rounded mt-4"
  name="projectDescription" // ✅ Corrected name
  value={formData.projectDescription}
  onChange={handleInputChange}
  placeholder="Enter a description of the project"
/>
          {errors.projectDescription && (<p className="text-sm text-red-500 mt-1">{errors.projectDescription}</p>)}
        </div>
        


        {/* File Reference */}
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">References</label>
          <div className="flex flex-wrap gap-3">
            {displayReferences.map((ref, index) => (
              <div
                key={index}
                className="flex flex-wrap gap-2 items-center shadow-md p-4 w-auto border border-gray-300 rounded-lg bg-gray-50"
              >
                <Icon
                  icon="fa6-solid:file-pdf"
                  height={22}
                  width={22}
                  className="text-red-500"
                />
                <div>
                  <p className="text-sm font-medium text-gray-800">
                    {ref.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {new Date().toLocaleDateString()}
                  </p>
                  <p className="text-xs text-gray-500">
                    Size: {(ref.size / 1024).toFixed(1)} KB
                  </p>
                </div>
              </div>
            ))}
            {uploading && (
              <div className="flex items-center justify-center shadow-md p-4 w-auto border border-gray-300 rounded-lg bg-gray-50">
                <Icon
                  icon="mdi:loading"
                  className="animate-spin text-teal-500"
                  height={30}
                  width={30}
                />
                <span className="ml-2 text-sm font-medium text-gray-800">
                  Uploading...
                </span>
              </div>
            )}
            <input
              type="file"
              id="fileInput"
              hidden
              onChange={handleAddReference}
            />
            <button
              type="button"
              className="flex items-center justify-center font-medium h-24 w-14 rounded-md shadow-md"
              onClick={() => document.getElementById("fileInput").click()}
            >
              <Icon
                icon="mdi:add-bold"
                className="text-teal-500"
                height={30}
                width={30}
              />
            </button>
          </div>
          {errors.referenceFileUrl && (<p className="text-sm text-red-500 mt-1">{errors.referenceFileUrl}</p>)}
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-teal-400 text-white px-6 py-2 rounded-md mt-4"
          >
            Submit
          </button>
        </div>
      </form>

      {/* User List Popup */}
      {showUserList && (
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-lg w-full md:w-1/3 max-w-lg">
            <h3 className="font-semibold text-lg mb-2">Select a User</h3>
            <ul>
              {users.map((user, index) => (
                <li
                  key={index}
                  className="py-2 cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSelectUser(user)}
                >
                  {user}
                </li>
              ))}
            </ul>
            <button
              className="mt-4 text-red-600"
              onClick={() => setShowUserList(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddProject;
