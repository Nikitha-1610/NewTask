<<<<<<< HEAD
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Icon } from "@iconify-icon/react";
import TaskForm from "../components/TaskComp/TaskForm";
import { FaCalendarAlt, FaUserPlus, FaCog, FaFileAlt } from "react-icons/fa";
import { FaFilePdf, FaFileWord, FaFileExcel } from "react-icons/fa";


const AddTasks = () => {
  const [isSubmitted, setIsSubmitted] = useState(false); // To toggle the success message
  const [taskData, setTaskData] = useState({}); // Store form data (example)
  const [formMessage, setFormMessage] = useState("");
  const navigate = useNavigate();
  const [dueDate, setDueDate] = useState("");
const [selectedMembers, setSelectedMembers] = useState([]);
const [selectedPriority, setSelectedPriority] = useState(null);
const [isMemberDropdownOpen, setIsMemberDropdownOpen] = useState(false);
const [selectedDesigner, setSelectedDesigner] = useState([]);
const [isDesignerDropdownOpen, setIsDesignerDropdownOpen] = useState(false);
const [description, setDescription] = useState("");
const [files, setFiles] = useState([]);
const [showFileOptions, setShowFileOptions] = useState(false);
const [formValid, setFormValid] = useState(true);

const membersList = ["Alice", "Bob", "Charlie", "Dave"];
const designersList = ["Designer A", "Designer B", "Designer C"];

const handleFileChange = (e) => {
  const newFile = e.target.files[0];
  const date = new Date().toLocaleDateString();
  setFiles([...files, { name: newFile.name, size: newFile.size, date: date }]);
};

const handleDesignerSelect = (designer) => {
  setSelectedDesigner(designer);
  setIsDesignerDropdownOpen(false);
};

const handleMemberSelect = (member) => {
  setSelectedMembers([...selectedMembers, member]);
  setIsMemberDropdownOpen(false);
};

const handlePrioritySelect = (priority) => {
  setSelectedPriority(priority);
};

const handleIconClick = () => {
  setShowFileOptions(!showFileOptions);
};

const handleFileSelect = (event) => {
  const selectedFiles = Array.from(event.target.files).map((file) => ({
    name: file.name,
    size: file.size,
    type: file.type,
    date: new Date().toLocaleDateString(),
  }));
  setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
  setShowFileOptions(false);
};

const getFileIcon = (type) => {
  if (type === "application/pdf") {
    return <FaFilePdf className="text-2xl text-red-600" />;
  } else if (
    type ===
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ) {
    return <FaFileWord className="text-2xl text-blue-600" />;
  } else if (
    type ===
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  ) {
    return <FaFileExcel className="text-2xl text-green-600" />;
  } else {
    return <FaFileAlt className="text-2xl text-gray-500" />;
  }
};

const validateForm = () => {
  if (
    !dueDate ||
    selectedMembers.length === 0 ||
    !selectedPriority ||
    !description ||
    files.length === 0
  ) {
    setFormValid(false);
    return false;
  }
  setFormValid(true);
  return true;
};



=======
import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import axiosInstance from "../utilities/axios/axiosInstance";
import { s3Client } from "../utilities/aws/awsconfig";
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
>>>>>>> fbf1fb956a300b6a33745c0ee20cdf5e469ae143

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
<<<<<<< HEAD
    
      <div className="relative bg-white w-full">
        {/* Buttons at the top-right corner */}
        <div className="absolute sm:top-4 sm:right-4 flex flex-row sm:flex-row gap-2 items-center justify-center w-full sm:w-auto mb-3">
  <Link
    onClick={handleAddTaskClick}
    to="/addtasks"
    className="flex items-center gap-2 bg-teal-500 hover:bg-teal-600 shadow-lg p-3 sm:p-2 rounded-xl w-30 sm:w-36 h-9 sm:h-10 font-sans font-semibold text-white text-xs sm:text-lg"
  >
    <Icon icon="mdi:plus" width={24} height={24} />
    Add Task
  </Link>
=======
    <div className="w-full p-6">
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
              className="w-full p-2 border border-gray-300 rounded mt-2"
              name="taskName"
              value={formData.taskName}
              onChange={handleInputChange}
              placeholder="Enter project name"
            />
          </div>
          <div className="w-full md:flex-1">
            <label className="block text-sm font-semibold">Due Date</label>
            <input
              type="date"
              className="w-full p-2 border border-gray-300 rounded mt-2"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleInputChange}
            />
          </div>
        </div>

        {/* assignedTo Section */}
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-800 mb-2">
            assignedTo
          </label>
          <div className="flex items-center justify-between border-b border-gray-300 pb-2">
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
        </div>
>>>>>>> fbf1fb956a300b6a33745c0ee20cdf5e469ae143

        {/* Reviewer Section */}
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-800 mb-2">
            Reviewer
          </label>
          <div className="flex items-center justify-between border-b border-gray-300 pb-2">
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
        </div>

<<<<<<< HEAD
        {/* Form Container */}
        <div className="sm:w-2/3 sm:px-10 sm:pt-10 px-4 pb-0 w-full pt-14">
        <div className="gap-4 grid grid-cols-1 sm:grid-cols-2 mb-3">
        <div>
          <label className="block mb-2 font-medium text-gray-700 text-sm sm:text-base">
            Project Name
          </label>
          <input
            type="text"
            className="border-gray-300 p-3 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
            placeholder="Enter project name"
            required
          />
        </div>
        <div>
  <label className="block mb-2 font-medium text-gray-700 text-sm sm:text-base">
    Due Date
  </label>
  <input
    type="date" // Default type set to date
    className="border-gray-300 p-3 border rounded-md focus:ring-2 focus:ring-blue-500 w-full focus:outline-none text-sm sm:text-base"
    value={dueDate}
    onChange={(e) => setDueDate(e.target.value)}
    required
  />
</div>

      </div>

      {/* Members */}
      <div className="relative mb-6">
        <label className="block mb-2 font-medium text-gray-700">Members</label>
        <div className="relative flex justify-between items-center">
          <div className="flex items-center">
            <FaUserPlus className="text-gray-500 text-xl" />
            {selectedMembers.length > 0 && (
              <span className="ml-2">{selectedMembers.join(", ")}</span>
            )}
          </div>
          <button
            onClick={() => setIsMemberDropdownOpen(!isMemberDropdownOpen)}
            className="flex justify-center items-center bg-gray-200 rounded-full w-8 h-8 text-gray-600 text-xl"
          >
            +
          </button>
          {isMemberDropdownOpen && (
            <div className="left-0 z-10 absolute border-gray-300 bg-white shadow-lg mt-2 p-2 border rounded-md w-40">
              {membersList.map((member, index) => (
                <div
                  key={index}
                  className="hover:bg-gray-100 px-4 py-2 cursor-pointer"
                  onClick={() => handleMemberSelect(member)}
                >
                  {member}
                </div>
              ))}
            </div>
          )}
        </div>
        <hr className="border-gray-300 my-2 border-t" />
      </div>


      {/* Designer */}
      <div className="relative mb-6">
  <label className="block mb-2 font-medium font-sans text-gray-700">
    Reviewer
  </label>
  <div className="relative flex justify-between items-center">
    {selectedDesigner && (
      <div className="flex items-center ml-3">
        <FaUserPlus className="text-gray-500 text-lg" />
        <span className="ml-2">{selectedDesigner}</span>
      </div>
    )}
    <button
      onClick={() => setIsDesignerDropdownOpen(!isDesignerDropdownOpen)}
      className="flex justify-center items-center bg-gray-200 rounded-full w-8 h-8 text-gray-600 text-lg"
    >
      +
    </button>
    {isDesignerDropdownOpen && (
      <div className="left-0 z-10 absolute border-gray-300 bg-white shadow mt-2 p-2 border rounded w-40">
        {designersList.map((designer, index) => (
          <div
            key={index}
            className="hover:bg-gray-100 px-4 py-2 cursor-pointer"
            onClick={() => handleDesignerSelect(designer)}
          >
            {designer}
          </div>
        ))}
      </div>
    )}
  </div>
  <hr className="border-gray-300 my-2 border-t" />
</div>

      {/* Priority */}
      <div className="mb-4">
  <label className="block mb-1 font-medium font-sans text-gray-700">Priority</label>
  <div className="flex gap-4 font-sans">
    {/* Low Priority Button */}
    <button
      onClick={() => handlePrioritySelect("low")}
      className={`flex items-center gap-2 px-2 py-1 rounded-full border-4 border-gray-100 w-full sm:w-auto ${
        selectedPriority === "low" ? "bg-teal-500 text-white" : "text-gray-600"
      }`}
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="w-2.5 h-2.5" viewBox="0 0 10 10" fill="none">
        <circle cx="5" cy="5" r="5" fill="#FBBC05" />
      </svg>
      Low
    </button>

    {/* Medium Priority Button */}
    <button
      onClick={() => handlePrioritySelect("medium")}
      className={`flex items-center gap-2 px-2 py-1 rounded-full border-4 border-gray-100 ${
        selectedPriority === "medium" ? "bg-teal-500 text-white" : "text-gray-600"
      }`}
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="w-2.5 h-2.5" viewBox="0 0 10 10" fill="none">
        <circle cx="5" cy="5" r="5" fill="#34A853" />
      </svg>
      Medium
    </button>

    {/* Urgent Priority Button */}
    <button
      onClick={() => handlePrioritySelect("urgent")}
      className={`flex items-center gap-2 px-2 py-1 rounded-full border-4 border-gray-100 ${
        selectedPriority === "urgent" ? "bg-teal-500 text-white" : "text-gray-600"
      }`}
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="w-2.5 h-2.5" viewBox="0 0 10 10" fill="none">
        <circle cx="5" cy="5" r="5" fill="#EA4335" />
      </svg>
      Urgent
    </button>
  </div>
</div>


      {/* Description */}
      <div className="mb-4">
  <label className="block mb-1 font-medium font-sans text-gray-700">Description</label>
  <textarea
    className="border-gray-400 bg-white p-2 border rounded-md w-full sm:w-[99%] h-60 focus:outline-none font-sans"
    value={description}
    onChange={(e) => setDescription(e.target.value)}
    placeholder="Enter a description of the task" required
  ></textarea>
</div>


      {/* Reference */}
      <div className="mb-0">
  <label className="mb-1 font-medium font-sans text-gray-700">Reference</label>
  <div className="flex items-center gap-4">
    {/* First container for selected files */}
    <div className="flex flex-col gap-2 shadow p-2 rounded w-60 h-16">
      {files.map((file, index) => (
        <div key={index} className="flex items-start gap-2 bg-gray-50 p-2 rounded">
          {/* File Icon */}
          <div>{getFileIcon(file.type)}</div>

          {/* File Details */}
          <div className="flex flex-col">
            {/* File Name */}
            <p className="font-medium text-sm">{file.name}</p>

            {/* File Date */}
            <p className="text-gray-500 text-xs">{file.date}</p>

            {/* Download Section */}
            <div className="flex items-center gap-1 mt-1">
              <button className="text-blue-600 text-xs hover:underline">Download</button>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-3 h-3 text-blue-600"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M5 20h14v-2H5v2zm7-18l-7 7h4v6h6v-6h4l-7-7z" />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 23 23"
              >
                <path
                  d="M11.5166 2.41797C6.52434 2.41797 2.47266 6.46965 2.47266 11.4619C2.47266 16.4541 6.52434 20.5058 11.5166 20.5058C16.5088 20.5058 20.5605 16.4541 20.5605 11.4619C20.5605 6.46965 16.5088 2.41797 11.5166 2.41797ZM9.06568 15.3417L5.81891 12.095C5.4662 11.7423 5.4662 11.1725 5.81891 10.8198C6.17162 10.4671 6.74139 10.4671 7.0941 10.8198L9.7078 13.4244L15.93 7.20221C16.2827 6.84949 16.8525 6.84949 17.2052 7.20221C17.5579 7.55492 17.5579 8.12469 17.2052 8.4774L10.3409 15.3417C9.9972 15.6945 9.41839 15.6945 9.06568 15.3417Z"
                  fill="#05CD99"
                />
              </svg>
            </div>
          </div>
        </div>
      ))}
    </div>

    {/* Second container for plus icon */}
    <div
      className="flex justify-center items-center bg-white shadow rounded w-16 h-16 cursor-pointer"
      onClick={handleIconClick}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-10 h-10"
        fill="none"
        viewBox="0 0 41 41"
      >
        <path
          d="M20.9121 9.13477V32.4681"
          stroke="#01C2B5"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M9.24609 20.8008H32.5794"
          stroke="#01C2B5"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  </div>

  {/* File selection options */}
  {showFileOptions && (
    <div className="bg-gray-100 shadow mt-2 p-4 border rounded">
      <label className="block font-sans text-gray-600">Choose a file source:</label>
      <div className="flex gap-4 mt-2">
        <label className="text-blue-600 hover:underline cursor-pointer">
          Computer
          <input type="file" className="hidden" onChange={handleFileSelect} multiple />
        </label>
        <button className="text-blue-600 hover:underline">Browser</button>
        {/* Add more file source options if needed */}
      </div>
    </div>
  )}
</div>

        </div>


          {/* Success Message */}
      {isSubmitted && (
  <div className="fixed inset-0 flex justify-center items-center bg-gray-100 w-full h-full">
    <div className="relative z-10 flex flex-col items-center gap-4 bg-white shadow-lg p-8 sm:p-6 border border-black rounded-xl max-w-96 sm:max-w-lg font-sans">
      {/* Close Icon */}
      <button onClick={handleClose} className="top-4 right-4 absolute">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="33"
          height="33"
          viewBox="0 0 36 36"
          fill="none"
        >
          <path
            d="M20.121 18L24.3645 13.758C24.646 13.4765 24.8041 13.0948 24.8041 12.6967C24.8041 12.2987 24.646 11.917 24.3645 11.6355C24.083 11.354 23.7013 11.1959 23.3032 11.1959C22.9052 11.1959 22.5235 11.354 22.242 11.6355L18 15.879L13.758 11.6355C13.4765 11.354 13.0948 11.1959 12.6967 11.1959C12.2987 11.1959 11.917 11.354 11.6355 11.6355C11.354 11.917 11.1959 12.2987 11.1959 12.6967C11.1959 13.0948 11.354 13.4765 11.6355 13.758L15.879 18L11.6355 22.242C11.354 22.5235 11.1959 22.9052 11.1959 23.3032C11.1959 23.7013 11.354 24.083 11.6355 24.3645C11.917 24.646 12.2987 24.8041 12.6967 24.8041C13.0948 24.8041 13.4765 24.646 13.758 24.3645L18 20.121L22.242 24.3645C22.5235 24.646 22.9052 24.8041 23.3032 24.8041C23.7013 24.8041 24.083 24.646 24.3645 24.3645C24.646 24.083 24.8041 23.7013 24.8041 23.3032C24.8041 22.9052 24.646 22.5235 24.3645 22.242L20.121 18ZM18 33C9.7155 33 3 26.2845 3 18C3 9.7155 9.7155 3 18 3C26.2845 3 33 9.7155 33 18C33 26.2845 26.2845 33 18 33Z"
            fill="black"
=======
        {/* Task taskDescription */}
        <div className="mb-4">
          <label className="block text-sm font-semibold">taskDescription</label>
          <textarea
            className="w-full h-40 p-2 border border-gray-300 rounded mt-4"
            name="taskDescription"
            value={formData.taskDescription}
            onChange={handleInputChange}
            placeholder="Enter a taskDescription of the task"
>>>>>>> fbf1fb956a300b6a33745c0ee20cdf5e469ae143
          />
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
        </div>

<<<<<<< HEAD
      {/* Additional Content */}
      <p className="font-sans font-semibold text-centr text-gray-700 text-lg leading-relaxed tracking-wide">
        Your task has been successfully added to this project.
      </p>

      {/* Great Button */}
      <button
        onClick={handleRefresh}
        className="bg-teal-500 mt-6 px-16 sm:px-6 py-4 sm:py-2 rounded-full sm:w-96 max-w-80 font-semibold text-lg text-white"
      >
        Great
      </button>
    </div>
  </div>
)}


        {/* Button at the bottom-right corner */}
        {!isSubmitted && (
        <div className="sm:absolute sm:bottom-2 sm:right-4 flex justify-center mb-2 mt-5 sm:mb-0 sm:mt-0 ">
        <button
            onClick={handleSubmit}
            className="flex justify-center items-center bg-[#01C2B5] hover:bg-[#019F97] shadow-lg px-[12px] py-[10px] rounded-[var(--Spacing-8,8px)] w-[85px] sm:w-[150px] sm:h-[44px] font-[600] font-sans text-[12px] text-white sm:text-[20px] submit-btn"
=======
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-teal-400 text-white px-6 py-2 rounded-md mt-4"
>>>>>>> fbf1fb956a300b6a33745c0ee20cdf5e469ae143
          >
            Submit
          </button>
        </div>
<<<<<<< HEAD
        )}
      </div>
   
=======
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
>>>>>>> fbf1fb956a300b6a33745c0ee20cdf5e469ae143
  );
};

export default AddTasks;
