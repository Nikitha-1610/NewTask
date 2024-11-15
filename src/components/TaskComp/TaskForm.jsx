import React, { useState } from "react";
import { FaCalendarAlt, FaUserPlus, FaCog, FaFileAlt } from "react-icons/fa";
import { FaFilePdf, FaFileWord, FaFileExcel } from 'react-icons/fa';

const TaskForm = () => {
  const [dueDate, setDueDate] = useState("");
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [selectedPriority, setSelectedPriority] = useState(null);
  const [isMemberDropdownOpen, setIsMemberDropdownOpen] = useState(false); // Separate state for Members
  const [selectedDesigner, setSelectedDesigner] = useState([]);
  const [isDesignerDropdownOpen, setIsDesignerDropdownOpen] = useState(false); // Separate state for Designers
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
    setIsDesignerDropdownOpen(false); // Close dropdown after selection
  };

  const handleMemberSelect = (member) => {
    setSelectedMembers([...selectedMembers, member]);
    setIsMemberDropdownOpen(false); // Close dropdown after selection
  };

  const handlePrioritySelect = (priority) => {
    setSelectedPriority(priority); // Set selected priority
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
    if (type === 'application/pdf') {
      return (
        <FaFilePdf size={30} color="#D11515" /> // PDF icon
      );
    } else if (type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      return (
        <FaFileWord size={30} color="#2A5699" /> // DOCX icon (blue for Word)
      );
    } else if (type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
      return (
        <FaFileExcel size={30} color="#217346" /> // XLSX icon (green for Excel)
      );
    } else {
      return (
        <FaFileAlt size={30} color="#808080" /> // Default icon for other file types
      );
    }
  };
  const validateForm = () => {
    if (!dueDate || selectedMembers.length === 0 || !selectedPriority || !description || files.length === 0) {
      setFormValid(false);
      return false;
    }
    setFormValid(true);
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validateForm();
    if (isValid) {
      alert('Form submitted successfully: true');
    } else {
      alert('Please fill out all required fields: false');
    }
  };
  return (
    <div className="w-full h-full p-2 font-sans" style={{ fontFamily: 'Arial, sans-serif' }}>
      {/* Project Name & Due Date */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
        <div>
          <label className="block text-gray-700 font-medium mb-1  font-sans">Project Name</label>
          <input
            type="text"
            className="w-full p-2 focus:outline-none bg-white rounded-[5.814px] border-[0.727px] border-[rgba(1,194,181,0.3)] shadow-[0px_2.907px_5.814px_rgba(70,95,241,0.1)]"
            placeholder="Enter project name"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-1  font-sans">Due Date</label>
          <div className="relative">
            <input
              type="text"
              className="w-full p-2 pr-10 focus:outline-none bg-white rounded-[5.814px] border-[0.727px] border-[rgba(1,194,181,0.3)] shadow-[0px_2.907px_5.814px_rgba(70,95,241,0.1)]"
              placeholder="Select date"
              onFocus={(e) => (e.target.type = "date")}
              onBlur={(e) => (e.target.type = "text")}
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              required
            />
            <FaCalendarAlt
              className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 cursor-pointer"
              onClick={() => document.querySelector('input[type="text"]').focus()}
            />
          </div>
        </div>
      </div>

      {/* Members */}
      <div className="relative mb-4">
        <label className="block text-gray-700 font-medium mb-1 font-sans">Members</label>

        {/* Container for FaUserPlus icon, selected members and "+" button */}
        <div className="flex items-center justify-between relative">
          {/* Show the FaUserPlus icon and selected member's name together */}
          <div className="flex items-center">
            <FaUserPlus className="text-gray-500 text-xl" />
            {selectedMembers.length > 0 && (
              <span className="ml-2">{selectedMembers.join(", ")}</span>
            )}
          </div>

          {/* Plus Icon - Dropdown on click */}
          <button
            onClick={() => setIsMemberDropdownOpen(!isMemberDropdownOpen)} // Toggle members dropdown
            className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-200 text-gray-600 text-xl font-sans"
          >
            +
          </button>

          {/* Dropdown Menu - appears directly below "+" icon */}
          {isMemberDropdownOpen && (
            <div className="absolute left-0 mt-2 p-2 border border-gray-300 rounded-md bg-white shadow-lg w-40 z-10 font-sans">
              {membersList.map((member, index) => (
                <div
                  key={index}
                  className="py-2 px-4 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleMemberSelect(member)} // Handle member selection
                >
                  {member}
                </div>
              ))}
            </div>
          )}
        </div>

        <hr className="border-t border-gray-300 my-2" />
      </div>

      {/* Designer */}
      <div className="relative mb-4">
        <label className="block text-gray-700 font-medium mb-1 font-sans">Designer</label>

        {/* Container for "+" button and dropdown */}
        <div className="flex items-center justify-between relative">
          {/* Show the selected designer's profile icon and name */}
          {selectedDesigner && (
            <div className="flex items-center ml-3">
              <FaUserPlus className="text-gray-500 text-xl" />
              <span className="ml-2">{selectedDesigner}</span>
            </div>
          )}

          {/* Plus Icon - Dropdown on click */}
          <button
            onClick={() => setIsDesignerDropdownOpen(!isDesignerDropdownOpen)} // Toggle designers dropdown
            className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-200 text-gray-600 text-xl font-sans"
          >
            +
          </button>

          {/* Dropdown Menu - appears directly below "+" icon */}
          {isDesignerDropdownOpen && (
            <div className="absolute left-0 mt-2 p-2 border border-gray-300 rounded-md bg-white shadow-lg w-40 z-10 font-sans">
              {designersList.map((designer, index) => (
                <div
                  key={index}
                  className="py-2 px-4 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleDesignerSelect(designer)} // Handle designer selection
                >
                  {designer}
                </div>
              ))}
            </div>
          )}
        </div>

        <hr className="border-t border-gray-300 my-2" />
      </div>

      {/* Priority */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-1  font-sans">Priority</label>
        <div className="flex gap-4 font-sans"> {/* Flex container with gap between buttons */}
      {/* Low Priority Button */}
      <button
        onClick={() => handlePrioritySelect("low")}
        className={`flex items-center gap-2 px-4 py-2 rounded-full border-4 border-[#EEF2F6] ${
          selectedPriority === "low"
            ? "bg-[#01C2B5] text-white"
            : "text-[#475569]"
        }`}
        style={{
          display: "flex",
          padding: "6px 10px",
          alignItems: "center",
          gap: "6px",
          borderRadius: "100px",
          border: "3px solid #EEF2F6",
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10" fill="none">
          <circle cx="5" cy="5" r="5" fill="#FBBC05" />
        </svg>
        Low
      </button>

      {/* Medium Priority Button */}
      <button
        onClick={() => handlePrioritySelect("medium")}
        className={`flex items-center gap-2 px-4 py-2 rounded-full border-5 border-[#EEF2F6] ${
          selectedPriority === "medium"
            ? "bg-[#01C2B5] text-white"
            : "text-[#475569]"
        }`}
        style={{
          display: "flex",
          padding: "6px 10px",
          alignItems: "center",
          gap: "6px",
          borderRadius: "100px",
          border: "3px solid #EEF2F6",
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10" fill="none">
          <circle cx="5" cy="5" r="5" fill="#34A853" />
        </svg>
        Medium
      </button>

      {/* Urgent Priority Button */}
      <button
        onClick={() => handlePrioritySelect("urgent")}
        className={`flex items-center gap-2 px-4 py-2 rounded-full border-1 border-[#EEF2F6] ${
          selectedPriority === "urgent"
            ? "bg-[#01C2B5] text-white"
            : "text-[#475569]"
        }`}
        style={{
          display: "flex",
          padding: "6px 10px",
          alignItems: "center",
          gap: "6px",
          borderRadius: "100px",
          border: "3px solid #EEF2F6",
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10" fill="none">
          <circle cx="5" cy="5" r="5" fill="#EA4335" />
        </svg>
        Urgent
      </button>
    </div>

      </div>

      {/* Description */}
      <div className="mb-4">
  <label className="block text-gray-700 font-medium mb-1 font-sans">Description</label>
  <textarea
    className="w-[665px] h-[248px] border border-[#999494] rounded-[8px] p-2 focus:outline-none flex-shrink-0 bg-white font-sans"
    value={description}
    onChange={(e) => setDescription(e.target.value)}
    placeholder="Enter a description of the task" required
  ></textarea>
</div>


      {/* Reference */}
      <div className="mb-4">
  <label className="block text-gray-700 font-medium mb-1 font-sans">Reference</label>
  <div className="flex items-center gap-4">
    {/* First container for selected files */}
    <div className="flex flex-col w-[235px]  h-[68px] p-2 rounded bg-white shadow-md gap-2">
      {files.map((file, index) => (
        <div key={index} className="flex gap-2 items-start bg-gray-50 p-2 rounded">
          {/* File Icon */}
          <div>{getFileIcon(file.type)}</div>
          
          {/* File Details */}
          <div className="flex flex-col">
            {/* File Name */}
            <p className="text-sm font-medium">{file.name}</p>
            
            {/* File Date */}
            <p className="text-xs text-gray-500">{file.date}</p>
            
            {/* Download Section */}
            <div className="flex items-center gap-1 mt-1">
              <button className="text-blue-600 hover:underline text-xs">Download</button>
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="text-blue-600">
                <path d="M5 20h14v-2H5v2zm7-18l-7 7h4v6h6v-6h4l-7-7z" />
              </svg>
            </div>
          </div>
        </div>
      ))}
    </div>
    
    {/* Second container for plus icon */}
    <div
      className="flex items-center justify-center w-[68px] h-[68px] rounded bg-white shadow-md cursor-pointer"
      onClick={handleIconClick}
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="41" height="41" viewBox="0 0 41 41" fill="none">
        <path d="M20.9121 9.13477V32.4681" stroke="#01C2B5" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9.24609 20.8008H32.5794" stroke="#01C2B5" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  </div>

  {/* File selection options */}
  {showFileOptions && (
    <div className="mt-2 p-4 border rounded bg-gray-100 shadow-md">
      <label className="block text-gray-600 font-sans">Choose a file source:</label>
      <div className="flex gap-4 mt-2">
        <label className="cursor-pointer text-blue-600 hover:underline">
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
  );
};

export default TaskForm;
