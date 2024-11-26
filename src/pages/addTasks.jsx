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




  // Handle the form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if all fields are filled
    const isFormFilled = Object.values(taskData).every((value) => value !== "");

    if (isFormFilled) {
      setIsSubmitted(true); // Show success message
      setFormMessage("Form submitted successfully!");

      // // Apply blur effect to the background elements only
      // document.body.style.filter = "blur(2px)";

      const sidebar = document.querySelector(".sidebar");
      const navbar = document.querySelector(".navbar");

      if (sidebar) sidebar.style.filter = "blur(2px)";
      if (navbar) navbar.style.filter = "blur(2px)";
      // document.querySelector(".add-tasks-container").style.filter = "blur(2px)";
      document.querySelector(".left-container").style.filter = "blur(2px)";
      document.querySelector(".right").style.filter = "blur(2px)";

      // Ensure success message is not blurred
      document.querySelector(".success-message").style.filter = "none";
    } else {
      setIsSubmitted(false); // Show failure message
      setFormMessage("Please fill all the fields.");
    }
  };

  const handleClose = () => {
    setIsSubmitted(false); // Close success message
    // Remove blur effect

    const sidebar = document.querySelector(".sidebar");
    const navbar = document.querySelector(".navbar");

    if (sidebar) sidebar.style.filter = "none";
    if (navbar) navbar.style.filter = "none";
    // Remove blur effect from all background elements
    document.body.style.filter = "none";
    // document.querySelector(".add-tasks-container").style.filter = "none";
    document.querySelector(".left-container").style.filter = "none";
    document.querySelector(".add-task-btn").style.filter = "none";
    document.querySelector(".filter-btn").style.filter = "none";
    document.querySelector(".right").style.filter = "none";

    navigate("/addtasks");
  };

  const handleRefresh = () => {
    const isFormFilled = Object.values(taskData).every((value) => value !== "");
    if (isFormFilled) {
      setIsSubmitted(true); // Set submission success
      setFormMessage("Form submitted successfully!");
    } else {
      setIsSubmitted(false); // Submission failure
      setFormMessage("Please fill all the fields.");
    }
  };

  const handleAddTaskClick = () => {
    // Triggering a page reload
    window.location.reload();
  };
  return (
    
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

  <Link
    className="flex items-center gap-2 hover:bg-transparent p-3 sm:p-2 rounded-md w-24 sm:w-30 sm:h-10 font-normal font-sans text-slate-500 text-xs sm:text-lg"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={14}
      height={13}
      viewBox="0 0 14 13"
      fill="none"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.33333 6.77344C2.6555 6.77344 2.91667 7.0346 2.91667 7.35677V11.4401C2.91667 11.7623 2.6555 12.0234 2.33333 12.0234C2.01117 12.0234 1.75 11.7623 1.75 11.4401V7.35677C1.75 7.0346 2.01117 6.77344 2.33333 6.77344Z"
        fill="#475569"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.33333 0.357422C2.6555 0.357422 2.91667 0.618589 2.91667 0.940755V5.02409C2.91667 5.34625 2.6555 5.60742 2.33333 5.60742C2.01117 5.60742 1.75 5.34625 1.75 5.02409V0.940755C1.75 0.618589 2.01117 0.357422 2.33333 0.357422Z"
        fill="#475569"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.99935 5.60742C7.32152 5.60742 7.58268 5.86859 7.58268 6.19076V11.4408C7.58268 11.7629 7.32152 12.0241 6.99935 12.0241C6.67718 12.0241 6.41602 11.7629 6.41602 11.4408V6.19076C6.41602 5.86859 6.67718 5.60742 6.99935 5.60742Z"
        fill="#475569"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.99935 0.357422C7.32152 0.357422 7.58268 0.618589 7.58268 0.940755V3.85742C7.58268 4.17959 7.32152 4.44076 6.99935 4.44076C6.67718 4.44076 6.41602 4.17959 6.41602 3.85742V0.940755C6.41602 0.618589 6.67718 0.357422 6.99935 0.357422Z"
        fill="#475569"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.6673 7.94141C11.9895 7.94141 12.2507 8.20257 12.2507 8.52474V11.4414C12.2507 11.7636 11.9895 12.0247 11.6673 12.0247C11.3452 12.0247 11.084 11.7636 11.084 11.4414V8.52474C11.084 8.20257 11.3452 7.94141 11.6673 7.94141Z"
        fill="#475569"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.6673 0.357422C11.9895 0.357422 12.2507 0.618589 12.2507 0.940755V6.19076C12.2507 6.51292 11.9895 6.77409 11.6673 6.77409C11.3452 6.77409 11.084 6.51292 11.084 6.19076V0.940755C11.084 0.618589 11.3452 0.357422 11.6673 0.357422Z"
        fill="#475569"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0 7.35677C0 7.0346 0.261167 6.77344 0.583333 6.77344H4.08333C4.4055 6.77344 4.66667 7.0346 4.66667 7.35677C4.66667 7.67894 4.4055 7.9401 4.08333 7.9401H0.583333C0.261167 7.9401 0 7.67894 0 7.35677Z"
        fill="#475569"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.66602 3.85677C4.66602 3.5346 4.92718 3.27344 5.24935 3.27344H8.74935C9.07151 3.27344 9.33268 3.5346 9.33268 3.85677C9.33268 4.17894 9.07151 4.4401 8.74935 4.4401H5.24935C4.92718 4.4401 4.66602 4.17894 4.66602 3.85677Z"
        fill="#475569"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.33398 8.52474C9.33398 8.20257 9.59515 7.94141 9.91732 7.94141H13.4173C13.7395 7.94141 14.0007 8.20257 14.0007 8.52474C14.0007 8.84691 13.7395 9.10807 13.4173 9.10807H9.91732C9.59515 9.10807 9.33398 8.84691 9.33398 8.52474Z"
        fill="#475569"
      />
    </svg>
    Filter
  </Link>
</div>


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
          />
        </svg>
      </button>

      {/* Success Message */}
      <h2 className="font-bold font-sans text-gray-800 text-xl">
        Task Added Successfully!
      </h2>

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
          >
            Submit
          </button>
        </div>
        )}
      </div>
   
  );
};

export default AddTasks;
