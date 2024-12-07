import { useLocation } from "react-router-dom";
import TaskDetails from "../components/TaskDetails";
import { Icon } from "@iconify/react";

const AssignTask = () => {
  const location = useLocation();

  const tasksFromState = location.state || [];

  const sampleTask = tasksFromState.map((task) => ({
    id: task.taskId,
    title: task.taskName,
    status: task.taskStatus,
    dueDate: task.deadline,
    assignedTo: task.assignedTo || [],
    assignedBy: task.assignedBy || {},
    attachments: task.referenceFileUrl || [],
    comments: task.comment || [],
    taskDescription: task.taskDescription,
  }));

  return (
    <div className="mx-0 mt-1 mb-5 sm:mb-0 p-4 rounded-md w-full max-w-lg sm:max-w-2xl font-sans">
    {/* Project Name & Due Date */}
    <div className="gap-4 grid grid-cols-1 sm:grid-cols-2 mb-6">
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
        <div className="relative">
          <input
            type="text"
            className="border-gray-300 p-3 pr-10 border rounded-md focus:ring-2 focus:ring-blue-500 w-full focus:outline-none text-sm sm:text-base"
            placeholder="Select date"
            onFocus={(e) => (e.target.type = "date")}
            onBlur={(e) => (e.target.type = "text")}
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            required
          />
          <FaCalendarAlt className="top-1/2 right-3 absolute text-gray-500 transform -translate-y-1/2 cursor-pointer" />
        </div>
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
      <label className="block mb-1 font-medium font-sans text-gray-700">
        Priority
      </label>
      <div className="flex gap-4 font-sans">
        {/* Low Priority Button */}
        <button
          onClick={() => handlePrioritySelect("low")}
          className={`flex items-center gap-2 px-2 py-1 rounded-full border-4 border-gray-100 w-full sm:w-auto ${
            selectedPriority === "low"
              ? "bg-teal-500 text-white"
              : "text-gray-600"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-2.5 h-2.5"
            viewBox="0 0 10 10"
            fill="none"
          >
            <circle cx="5" cy="5" r="5" fill="#FBBC05" />
          </svg>
          Low
        </button>

        {/* Medium Priority Button */}
        <button
          onClick={() => handlePrioritySelect("medium")}
          className={`flex items-center gap-2 px-2 py-1 rounded-full border-4 border-gray-100 ${
            selectedPriority === "medium"
              ? "bg-teal-500 text-white"
              : "text-gray-600"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-2.5 h-2.5"
            viewBox="0 0 10 10"
            fill="none"
          >
            <circle cx="5" cy="5" r="5" fill="#34A853" />
          </svg>
          Medium
        </button>

        {/* Urgent Priority Button */}
        <button
          onClick={() => handlePrioritySelect("urgent")}
          className={`flex items-center gap-2 px-2 py-1 rounded-full border-4 border-gray-100 ${
            selectedPriority === "urgent"
              ? "bg-teal-500 text-white"
              : "text-gray-600"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-2.5 h-2.5"
            viewBox="0 0 10 10"
            fill="none"
          >
            <circle cx="5" cy="5" r="5" fill="#EA4335" />
          </svg>
          Urgent
        </button>
      </div>
    </div>

    {/* Description */}
    <div className="mb-4">
      <label className="block mb-1 font-medium font-sans text-gray-700">
        Description
      </label>
      <textarea
        className="border-gray-400 bg-white p-2 border rounded-md w-full sm:w-full h-60 focus:outline-none font-sans"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Enter a description of the task"
        required
      ></textarea>
    </div>

    {/* Reference */}
    <div className="mb-0">
      <label className="mb-1 font-medium font-sans text-gray-700">
        Reference
      </label>
      <div className="flex items-center gap-4">
        {/* First container for selected files */}
        <div className="flex flex-col gap-2 shadow p-2 rounded w-60 h-16">
          {files.map((file, index) => (
            <div
              key={index}
              className="flex items-start gap-2 bg-gray-50 p-2 rounded"
            >
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
                  <button className="text-blue-600 text-xs hover:underline">
                    Download
                  </button>
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
          <label className="block font-sans text-gray-600">
            Choose a file source:
          </label>
          <div className="flex gap-4 mt-2">
            <label className="text-blue-600 hover:underline cursor-pointer">
              Computer
              <input
                type="file"
                className="hidden"
                onChange={handleFileSelect}
                multiple
              />
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



export default AssignTask;
