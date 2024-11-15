import { useState } from "react";

import {
  FaInbox,
  FaStar,
  FaPaperPlane,
  FaExclamationTriangle,
  FaEnvelopeOpen,
  FaTrashAlt,
  FaDownload,
  FaInfoCircle,
} from "react-icons/fa";

const EmailApp = () => {
  const [selectedFolder, setSelectedFolder] = useState("Inbox");
  const [selectedLabel, setSelectedLabel] = useState(null);
  const [showCreateLabelForm, setShowCreateLabelForm] = useState(false);
  const [newLabelName, setNewLabelName] = useState("");
  const [labels, setLabels] = useState([
    "Primary",
    "Work",
    "Project",
    "Assign",
  ]);


  const [emails, setEmails] = useState([
    {
      id: 1,
      sender: "Username",
      label: "Primary",
      text: "Some Text here",
      time: "8:38 AM",
      folder: "Inbox",
      isStarred: true,
      isDeleted: false,
    },
    {
      id: 2,
      sender: "Username",
      label: "Work",
      text: "Some Text here",
      time: "8:13 AM",
      folder: "Sent",
      isStarred: false,
      isDeleted: false,
    },
    {
      id: 3,
      sender: "Username",
      label: "Project",
      text: "Some Text here",
      time: "7:52 PM",
      folder: "Inbox",
      isStarred: false,
      isDeleted: false,
    },
    {
      id: 4,
      sender: "Username",
      label: "",
      text: "Some Text here",
      time: "7:52 PM",
      folder: "Bin",
      isStarred: false,
      isDeleted: true,
    },
    {
      id: 5,
      sender: "Username",
      label: "Assign",
      text: "Some Text here",
      time: "4:13 PM",
      folder: "Inbox",
      isStarred: false,
      isDeleted: false,
    },
    {
      id: 6,
      sender: "Username",
      label: "Project",
      text: "Some Text here",
      time: "3:52 PM",
      folder: "Inbox",
      isStarred: false,
      isDeleted: false,
    },
    {
      id: 7,
      sender: "Username",
      label: "",
      text: "Some Text here",
      time: "2:30 PM",
      folder: "Starred",
      isStarred: true,
      isDeleted: false,
    },

    {
      id: 8,
      sender: "Username",
      label: "",
      text: "Some Text here",
      time: "7:52 PM",
      folder: "Bin",
      isStarred: false,
      isDeleted: true,
    },
    {
      id: 9,
      sender: "Username",
      label: "Primary",
      text: "Some Text here",
      time: "1:00 PM",
      folder: "Inbox",
      isStarred: true,
      isDeleted: false,
    },
    {
      id: 10,
      sender: "Username",
      label: "Project",
      text: "Some Text here",
      time: "3:52 PM",
      folder: "Inbox",
      isStarred: false,
      isDeleted: false,
    },
    {
      id: 11,
      sender: "Username",
      label: "Primary",
      text: "Some Text here",
      time: "2:30 PM",
      folder: "Inbox",
      isStarred: true,
      isDeleted: false,
    },
  ]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const emailsPerPage = 10;

  const handleFolderClick = (folder) => {
    setSelectedFolder(folder);
    setSelectedLabel(null);
  };

  const handleLabelClick = (label) => {
    setSelectedFolder("Label");
    setSelectedLabel(label);
  };

  const handleCreateLabelClick = () => {
    setShowCreateLabelForm(true);
  };

  const handleLabelInputChange = (e) => {
    setNewLabelName(e.target.value);
  };

  const handleCreateLabelSubmit = (e) => {
    e.preventDefault();
    if (newLabelName.trim()) {
      setLabels([...labels, newLabelName.trim()]);
      setNewLabelName("");
      setShowCreateLabelForm(false);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredEmails = emails.filter((email) => {
    if (selectedFolder === "Inbox") return true;
    if (selectedFolder && email.folder !== selectedFolder && selectedFolder !== "Label")
      return false;
    if (selectedLabel && email.label !== selectedLabel) return false;
    return true;
  });

  const lowerSearchQuery = searchQuery.toLowerCase();
  const searchFilteredEmails = filteredEmails.filter(
    (email) =>
      email.sender.toLowerCase().includes(lowerSearchQuery) ||
      email.text.toLowerCase().includes(lowerSearchQuery) ||
      (email.label && email.label.toLowerCase().includes(lowerSearchQuery))
  );

  const indexOfLastEmail = currentPage * emailsPerPage;
  const indexOfFirstEmail = indexOfLastEmail - emailsPerPage;
  const currentEmails = searchFilteredEmails.slice(
    indexOfFirstEmail,
    indexOfLastEmail
  );
  const totalPages = Math.ceil(searchFilteredEmails.length / emailsPerPage);

  const handleNextPage = () =>
    currentPage < totalPages && setCurrentPage(currentPage + 1);
  const handlePrevPage = () =>
    currentPage > 1 && setCurrentPage(currentPage - 1);

  return (

    <div className="flex flex-col sm:flex-row ">
      <div className="w-full sm:w-64 bg-gray-100 shadow-lg p-4 flex flex-col mb-8 sm:mb-0 max-h-screen overflow-y-auto">
        <button className="bg-teal-500 text-white w-full py-2 rounded hover:bg-teal-600 font-semibold mb-4">
          + Compose
        </button>

        <h3 className="text-lg font-bold text-gray-700 mb-2 ">My Email</h3>

        <ul className="space-y-1 flex-grow">
          <li
            className={`flex items-center p-2 cursor-pointer rounded ${selectedFolder === "Inbox" ? "text-teal-500 bg-teal-100" : ""
              }`}
            onClick={() => handleFolderClick("Inbox")}
          >
            <FaInbox className="mr-2" /> Inbox &nbsp; 1253
          </li>
          <li
            className={`flex items-center p-2 cursor-pointer rounded ${selectedFolder === "Starred" ? "bg-teal-100 text-teal-700" : ""
              }`}
            onClick={() => handleFolderClick("Starred")}
          >
            <FaStar className="mr-2" /> Starred &nbsp; 245
          </li>
          <li
            className={`flex items-center p-2 cursor-pointer rounded ${selectedFolder === "Sent" ? "bg-teal-100 text-teal-700" : ""
              }`}
            onClick={() => handleFolderClick("Sent")}
          >
            <FaPaperPlane className="mr-2" /> Sent &nbsp; 24,532
          </li>
          <li
            className={`flex items-center p-2 cursor-pointer rounded ${selectedFolder === "Spam" ? "bg-teal-100 text-teal-700" : ""
              }`}
            onClick={() => handleFolderClick("Spam")}
          >
            <FaExclamationTriangle className="mr-2 " /> Spam &nbsp; 72
          </li>
          <li
            className={`flex items-center p-2 cursor-pointer rounded ${selectedFolder === "Drafts" ? "bg-teal-100 text-teal-700" : ""
              }`}
            onClick={() => handleFolderClick("Drafts")}
          >
            <FaEnvelopeOpen className="mr-2" /> Drafts &nbsp; 5
          </li>
          <li
            className={`flex items-center p-2 cursor-pointer rounded ${selectedFolder === "Importance" ? "bg-teal-100 text-teal-700" : ""
              }`}
            onClick={() => handleFolderClick("Importance")}
          >
            <FaExclamationTriangle className="mr-2" /> Importance &nbsp; 10
          </li>

          <li
            className={`flex items-center p-2 cursor-pointer rounded ${selectedFolder === "Bin" ? "bg-teal-100 text-teal-700" : ""
              }`}
            onClick={() => handleFolderClick("Bin")}
          >
            <FaTrashAlt className="mr-2" /> Bin &nbsp; 15
          </li>
        </ul>

        <h3 className="text-lg font-bold text-gray-700 mb-2 mt-2">Labels</h3>
        <ul className="space-y-1 flex-grow">
          {labels.map((label, index) => (
            <li
              key={index}
              className={`flex items-center p-2 cursor-pointer rounded ${selectedLabel === label ? "bg-teal-100 text-teal-700" : ""
                }`}
              onClick={() => handleLabelClick(label)}
            >
              <span
                className={`w-4 h-4 rounded-none font-bold mr-2 ${label === "Primary"
                    ? "border-teal-400"
                    : label === "Work"
                      ? "border-blue-500"
                      : label === "Project"
                        ? "border-orange-500"
                        : "border-pink-500"
                  } border-2`}
              />
              {label}
            </li>
          ))}
        </ul>

        <button
          className="mt-1 text-teal-500 hover:text-teal-600 font-semibold"
          onClick={handleCreateLabelClick}
        >
          + Create New Label
        </button>

        {showCreateLabelForm && (
          <form onSubmit={handleCreateLabelSubmit} className="mt-3">
            <input
              type="text"
              value={newLabelName}
              onChange={handleLabelInputChange}
              placeholder="Enter new label"
              className="border rounded w-full py-1 px-2 mb-2"
              required
            />
            <button
              type="submit"
              className="bg-teal-200 text-white py-1 px-3 rounded hover:bg-teal-600"
            >
              Create
            </button>
          </form>
        )}
      </div>

      {/* Main Content Area */}
      <div className="tab-content w-full sm:w-8/12 p-4 sm:ml-auto sm:mr-8 border rounded-lg shadow-md flex-grow max-h-screen overflow-auto">
  <div className="flex justify-between mb-4 items-center">
    <input
      type="text"
      placeholder="Search mail"
      value={searchQuery}
      onChange={handleSearchChange}
      className="w-3/4 p-2 border border-gray-300 rounded-lg text-sm"
    />
    <div className="flex space-x-3">
      <FaDownload className="text-lg cursor-pointer hover:text-teal-600" />
      <FaInfoCircle className="text-lg cursor-pointer hover:text-teal-600" />
      <FaTrashAlt className="text-lg cursor-pointer hover:text-teal-600" />
    </div>
  </div>

  <div className="email-list space-y-1">
    {currentEmails.length > 0 ? (
      currentEmails.map((email) => (
        <div className={`email-item flex items-center p-2 border-b ${!email.label ? "bg-gray-100" : "bg-white"}`} key={email.id}>
  <input type="checkbox" className="mr-4" />
  <span className="star mr-4">
    <i className={`fas fa-star ${email.isStarred ? "text-yellow-500" : "text-gray-400"}`}></i>
  </span>
  <span className="sender font-medium text-gray-800 mr-12 text-sm">
    {email.sender}
  </span>
  {email.label && (
    <span
      className={`label inline-block px-2 py-1 text-xs rounded-full ${email.label.toLowerCase() === "primary"
        ? "bg-blue-200 text-blue-600"
        : "bg-orange-200 text-orange-600"
      } mr-3`}
    >
      {email.label}
    </span>
  )}
  <span className="text flex-grow text-gray-600 mr-4 font-semibold text-sm overflow-hidden truncate">
    {email.text}
  </span>
  <span className="time text-gray-500 font-semibold text-sm whitespace-nowrap">
    {email.time}
  </span>
</div>

  
      ))
    ) : (
      <p>No emails to display.</p>
    )}
  </div>

  {/* Pagination */}
  <div className="footer flex justify-between items-center mt-4 text-sm text-gray-600">
    <div>
      <h5>
        Showing {indexOfFirstEmail + 1} -{" "}
        {Math.min(indexOfLastEmail, searchFilteredEmails.length)} of{" "}
        {searchFilteredEmails.length}
      </h5>
    </div>
    <div className="buttons flex space-x-2">
      <button
        onClick={handlePrevPage}
        disabled={currentPage === 1}
        className="bg-gray-300 text-gray-600 rounded p-2"
      >
        Prev
      </button>
      <button
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
        className="bg-gray-300 text-gray-600 rounded p-2"
      >
        Next
      </button>
    </div>
  </div>
</div>

     
    </div>
  );
};

export default EmailApp;

