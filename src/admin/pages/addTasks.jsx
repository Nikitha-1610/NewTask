import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import axiosInstance from "../../common/utils/axios/axiosInstance";
import { s3Client } from "../../common/utils/aws/awsconfig";
import { PutObjectCommand } from "@aws-sdk/client-s3";
// import toast, { Toaster } from "react-hot-toast";
const AddTasks = () => {
  const [formData, setFormData] = useState({
    taskName: "",
    dueDate: "",
    assignedTo: [],
    assignedBy: "john",
    reviewers: "", // Single reviewer as a string
    priority: "Low",
    taskDescription: "",
    referenceFileUrl: [], // Reference as an array
  });

  const [isPopupVisible, setIsPopupVisible] = useState(false); //popup
  const [errors, setErrors] = useState({
    taskName: "",
    dueDate: "",
    assignedTo: "",
    taskDescription: "",
  });

  const [showUserList, setShowUserList] = useState(false);
  const [selectedUserType, setSelectedUserType] = useState("");
  const [users, setUsers] = useState([]);
  const [displayReferences, setDisplayReferences] = useState([]);
  const [uploading, setUploading] = useState(false);
  const getAllEmp = async () => {
    try {
      const response = await axiosInstance.get("employee/getMembers/24110004");
      console.log(response.data.message);

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
        console.log("Region:", region);
        console.log("Bucket:", BUCKET_NAME);
        console.log("FileName:", fileName);
        return "https://${BUCKET_NAME}.s3.${region}.amazonaws.com/${fileName}";
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

     // Initialize an errors object to track invalid fields
  const newErrors = {
    taskName: "",
    dueDate: "",
    assignedTo: "",
    reviewers: "",
    category: "",
    priority: "",
    taskDescription: "",
    referenceFileUrl: "",
  };

  // Check if required fields are filled and set error messages
  if (!formData.taskName) {
    newErrors.taskName = "Task name is required.";
  }
  if (!formData.dueDate) {
    newErrors.dueDate = "Due date is required.";
  }
  if (formData.assignedTo.length === 0) {
    newErrors.assignedTo = "At least one person must be assigned.";
  }
  if (!formData.reviewers) {
    newErrors.reviewers = "A reviewer is required.";
  }
  if (!formData.category) {
    newErrors.category = "Please select a category.";
  }
  if (!formData.priority) {
    newErrors.priority = "Priority is required.";
  }
  if (!formData.taskDescription) {
    newErrors.taskDescription = "Task description is required.";
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
      console.log("Submitting Form Data:", formData);

      // Make the API POST request
      const response = await axiosInstance.post("task/addTask", formData);

      // Handle success
      if (response.status === 200 || response.status === 201) {
        console.log("Server Response:", response.data);

        // Reset form (if needed)
        setFormData({
          taskName: "",
          dueDate: "",
          assignedTo: [],
          assignedBy: "john",
          reviewers: "",
          priority: "Low",
          taskDescription: "",
          referenceFileUrl: [],
        });
        setDisplayReferences([]);

        // show popup after successful submission
        setIsPopupVisible(true);
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
     {/* Popup */}
     {isPopupVisible && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-6 shadow-lg relative w-11/12 md:w-1/3">
            {/* Close Icon */}
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
              onClick={() => setIsPopupVisible(false)}
            >
              <Icon icon="mdi:alpha-x-circle" height={24} width={24} />
            </button>
            {/* Popup Content */}
            <div className="text-center">
              <h2 className="text-xl font-bold text-gray-800">
                Task Added Successfully!
              </h2>
              <p className="text-gray-600 mt-2">
                Your task has been successfully added to this project.
              </p>
              <button
                onClick={() => setIsPopupVisible(false)}
                className="mt-6 bg-teal-500 text-white px-6 py-2 rounded-full"
              >
                Great
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="flex md:justify-end justify-center mb-5">
        <div className="flex flex-wrap justify-end gap-4">
          {/* Add Task Button */}
          <button className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md shadow-md transition">
            <Icon icon="ic:round-add" height={22} width={22} />
            <span>Add Task</span>
          </button>

          {/* Filter Button */}
          <button className="flex items-center gap-2 border border-gray-300 hover:border-gray-400 text-gray-600 px-4 py-2 rounded-md shadow-md transition">
            <Icon icon="lets-icons:filter" height={22} width={22} />
            <span>Filter</span>
          </button>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="w-full md:w-8/12">
        {/* Project Name and Due Date */}
        <div className="flex flex-wrap space-y-4 md:space-y-0 md:space-x-4 mb-4">
          <div className="w-full md:flex-1">
            <label className="block text-sm font-semibold">Project Name</label>
            <input
              type="text"
              className={'w-full p-2 border ${errors.taskName ? "border-red-500" : "border-gray-300"}  rounded mt-2'}
              name="taskName"
              value={formData.taskName}
              onChange={handleInputChange}
              placeholder="Enter project name"
            />
            {errors.taskName && (<p className="text-sm text-red-500 mt-1">{errors.taskName}</p>)}
          </div>
          <div className="w-full md:flex-1">
            <label className="block text-sm font-semibold">Due Date</label>
            <input
              type="date"
              className={'w-full p-2 border ${errors.dueDate ? "border-red-500" : "border-gray-300"} rounded mt-2'}
              name="dueDate"
              value={formData.dueDate}
              onChange={handleInputChange}
            />
          </div>
          {errors.dueDate && (<p className="text-sm text-red-500 mt-1">{errors.dueDate}</p>)}
        </div>

        {/* assignedTo Section */}
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-800 mb-2">
            assignedTo
          </label>
          <div className={'flex items-center justify-between border-b ${errors.assignedTo ? "border-red-500" : "border-gray-300"} pb-2'}>
            <div className="flex items-center gap-2">
              <Icon
                icon="ic:sharp-person-add"
                className="text-gray-600"
                height={22}
                width={22}
              />
              {formData.assignedTo.map((member, index) => (
                <span
                  key={index}
                  className="bg-blue-200 text-blue-700 px-2 py-1 rounded-full text-xs"
                >
                  {member}
                </span>
              ))}
            </div>
            <button
              type="button"
              className="flex items-center justify-center w-8 h-8 rounded-full border border-dashed border-gray-400"
              onClick={() => {
                setSelectedUserType("assignedTo");
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
          {errors.assignedTo && (
            <p className="text-sm text-red-500 mt-1">{errors.assignedTo}</p>
           )}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-500 mb-6">
            Select Category
            <select className={'mt-1 block w-full px-3 py-2 bg-white border ${errors.category ? "border-red-500" : "border-gray-300"} rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm'}
            name="category"
            value={formData.category || ""}
            onChange={handleInputChange}
            >
              <option value="">Select a category</option>
              <option value="development">Development</option>
              <option value="research">Research</option>
              <option value="ui">UI</option>
            </select>
          </label>
          {errors.category && (<p className="text-sm text-red-500 mt-1">{errors.category}</p>)}
        </div>

        {/* Reviewer Section */}
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-800 mb-2">
            Reviewer
          </label>
          <div className={'flex items-center justify-between border-b ${errors.reviewers ? "border-red-500" : "border-gray-300"} pb-2'}>
            <div className="flex items-center gap-2">
              <Icon
                icon="ic:sharp-person-add"
                className="text-gray-600"
                height={22}
                width={22}
              />
              {formData.reviewers && (
                <span className="bg-green-200 text-green-700 px-2 py-1 rounded-full text-xs">
                  {formData.reviewers}
                </span>
              )}
            </div>
            <button
              type="button"
              className="flex items-center justify-center w-8 h-8 rounded-full border border-dashed border-gray-400"
              onClick={() => {
                setSelectedUserType("reviewers");
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
          {errors.reviewers && (<p className="text-sm text-red-500 mt-1">{errors.reviewers}</p>)}
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
                  ? "bg-blue-200 text-blue-700"
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
            className={'w-full h-40 p-2 border ${errors.taskDescription ? "border-red-500" : "border-gray-300"} rounded mt-4'}
            name="taskDescription"
            value={formData.taskDescription}
            onChange={handleInputChange}
            placeholder="Enter a taskDescription of the task"
          />
          {errors.taskDescription && (<p className="text-sm text-red-500 mt-1">{errors.taskDescription}</p>)}
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

export default AddTasks;
