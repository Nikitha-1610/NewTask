import { useState } from "react";
import {
  FaPhone,
  FaVideo,
  FaEllipsisV,
  FaUserCircle,
  FaFilePdf,
   FaFileWord, FaFileExcel, FaDownload, FaTrashAlt
} from "react-icons/fa";
import VideoCall from "./VideoCall";
import VoiceCall from "./VoiceCall";
import { FaArrowLeft } from "react-icons/fa";
import Picker from 'emoji-picker-react'; // For emoji picker
import { Icon } from '@iconify/react'; // For Iconify


const IndividualChat = ({ contact, handleBackToContacts }) => {
  const [selectedOption, setSelectedOption] = useState("Chat");
  const [activeFeature, setActiveFeature] = useState(null);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [showActions, setShowActions] = useState(false);
  const menuOptions = ["Chat", "Files", "Media"];

  const [message, setMessage] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const handleEmojiClick = (emojiObject) => {
    if (emojiObject && emojiObject.emoji) {
      setMessage((prev) => prev + emojiObject.emoji); // Append emoji to the message
    }
  };

  const [selectedMedia, setSelectedMedia] = useState([]);

  const handleMediaSelection = (message) => {
    if (selectedMedia.includes(message)) {
      setSelectedMedia(selectedMedia.filter(item => item !== message));
    } else {
      setSelectedMedia([...selectedMedia, message]);
    }
  };
  const handleMediaSelections = (message) => {
    if (selectedMedia.includes(message)) {
      setSelectedMedia(selectedMedia.filter(item => item !== message)); // Unselect media
    } else {
      setSelectedMedia([...selectedMedia, message]); // Select media
    }
  };
  

 
  // Function to handle attachment click (file explorer)
  const handleAttachmentClick = () => {
    document.getElementById('fileInput').click();
  };

  // Function to handle mic click (voice recorder - placeholder for now)
  const handleMicClick = () => {
    alert('Microphone recording functionality will be implemented here.');
  };

  const userMessages = [
    { text: "Hey! What's up?", file: null, timestamp: 1 },
    { text: "Check out this image I took!", file: { type: "image", url: "/Images/image1.jpeg" }, timestamp: 3 },
    { text: "Here's the document you requested.", file: { type: "document", url: "/documents/1.pdf" }, timestamp: 5 },
    { text: "When is the deadline?", file: null, timestamp: 7 },
    { text: "Listen to this track!", file: { type: "audio", url: "/audio/audio1.mp3" }, timestamp: 9 },
    { text: "See you at 5 PM.", file: null, timestamp: 11 },
    { text: "Did you finish the project?", file: null, timestamp: 13 },
    { text: "Check out this new file I uploaded.", file: { type: "image", url: "/Images/image2.jpeg" }, timestamp: 15 },
    { text: "I have a new version of the document.", file: { type: "document", url: "/documents/2.pdf" }, timestamp: 17 },
    { text: "Here's a song I just found.", file: { type: "audio", url: "/audio/audio2.mp3" }, timestamp: 19 },
  ];
  
  const contactMessages = [
    { text: "Not much, you?", file: null, timestamp: 2 },
    { text: "Cool picture!", file: null, timestamp: 4 },
    { text: "Thanks for the document.", file: null, timestamp: 6 },
    { text: "The deadline is next Friday.", file: null, timestamp: 8 },
    { text: "Nice track! Here's a video you might like.", file: { type: "video", url: "/videos/video1.mp4" }, timestamp: 10 },
    { text: "Sure thing, see you then!", file: null, timestamp: 12 },
    { text: "I finished the project!", file: null, timestamp: 14 },
    { text: "Here is the updated file.", file: { type: "image", url: "/Images/image3.jpeg" }, timestamp: 16 },
    { text: "I just added new details to the document.", file: { type: "document", url: "/documents/3.pdf" }, timestamp: 18 },
    { text: "This song is great! You should hear it.", file: { type: "audio", url: "/audio/audio3.mp3" }, timestamp: 20 },
  ];
  
  
  const toggleSelectFile = (file) => {
    setSelectedFiles((prevSelected) => {
      if (prevSelected.includes(file)) {
        return prevSelected.filter((f) => f !== file);
      } else {
        return [...prevSelected, file];
      }
    });
  };

  // Extract file name from URL
  const extractFileName = (url) => {
    const parts = url.split("/");
    return parts[parts.length - 1];
  };

  // Show/Hide actions (Share/Delete) buttons based on selection
  const handleSelectionChange = () => {
    setShowActions(selectedFiles.length > 0);
  };

  // Handle delete action
  const handleDeletes = () => {
    console.log("Deleting selected files:", selectedFiles);
    // Add delete functionality here
  };

  // Handle share action
  const handleShare = () => {
    console.log("Sharing selected files:", selectedFiles);
    // Add share functionality here
  };
  
  // Function to get the correct file icon based on the file type
  const getFileIcon = (fileType) => {
    // Return the appropriate icon based on the file type
    switch (fileType) {
      case 'pdf':
        return <FaFilePdf className="text-red-500 text-3xl" />;
      case 'doc':
      case 'docx':
        return <FaFileWord className="text-blue-500 text-3xl" />;
      case 'xls':
      case 'xlsx':
        return <FaFileExcel className="text-green-500 text-3xl" />;
      default:
        return <FaFilePdf className="text-red-500 text-3xl" />; // Default icon if type is unknown
    }
  };
  
  const formatFileSize = (sizeInBytes) => {
    if (sizeInBytes < 1024) return `${sizeInBytes} bytes`;
    const sizeInKB = sizeInBytes / 1024;
    if (sizeInKB < 1024) return `${sizeInKB.toFixed(2)} KB`;
    const sizeInMB = sizeInKB / 1024;
    return `${sizeInMB.toFixed(2)} MB`;
  };

 
  const handleIconClick = (feature) => {
    setActiveFeature(feature); // Set the feature (VideoCall or VoiceCall)
  };

  const closeFeature = () => {
    setActiveFeature(null); // Close the overlay
  };
  const handleDownload = (fileUrl) => {
    // Logic for downloading the file
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = extractFileName(fileUrl); // This assumes extractFileName function gives the name
    link.click();
  };
  
  const handleDelete = (fileUrl) => {
    // Logic for deleting the file
    alert(`File ${extractFileName(fileUrl)} will be deleted.`);
  };
  
  return (
    <>
      <div className="flex flex-col  bg-gray-100 overflow-y-hidden">
        {/* Chat Container */}
        <div className="flex flex-col flex-1  overflow-y-hidden">
          {/* Navbar inside chat body */}
          <div className="sticky top-0  sm:w-full w-full z-10 bg-white shadow-md p-2 sm:mx-0 sm:px-5 flex justify-between items-center h-14">
            <div className="flex items-center gap-1 sm:gap-3">
              <button
                onClick={handleBackToContacts}
                className="sm:top-1/2 sm:left-4 sm:absolute flex items-center lg:hidden text-blue-500 sm:-translate-y-1/2"
              >
                <FaArrowLeft className="text-3xl" />
              </button>
              {contact?.image ? (
                <img
                  src={contact.image}
                  alt="Profile"
                  className="rounded-full w-8 sm:w-9 h-8 sm:h-9 object-cover"
                />
              ) : (
                <FaUserCircle className="w-9 h-9 text-pink-700" />
              )}
              <span className="font-semibold text-black text-sm sm:text-base">
                {contact?.name}
              </span>
              <div className="flex items-center gap-4 ml-4">
                {menuOptions.map((option, index) => (
                  <span
                    key={index}
                    onClick={() => setSelectedOption(option)}
                    className={`cursor-pointer sm:text-lg text-lg font-medium ${
                      selectedOption === option
                        ? "border-b-2 border-teal-500"
                        : "text-gray-500"
                    }`}
                  >
                    {option}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2 sm:gap-4">
              <FaPhone
                className="w-5 h-5 text-gray-700 cursor-pointer"
                onClick={() => handleIconClick("VoiceCall")}
              />
              <FaVideo
                className="w-5 h-5 text-gray-700 cursor-pointer"
                onClick={() => handleIconClick("VideoCall")}
              />
              <FaEllipsisV className="w-5 h-5 text-gray-700 cursor-pointer" />
            </div>
          </div>

          {/* Overlay for Active Feature */}
          {activeFeature && (
            <div className="z-50 fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
              <div className="relative top-9 bg-white shadow-lg p-6 rounded-lg w-full max-w-[800px] h-[80%]">
                <button
                  className="top-3 right-3 absolute font-bold text-red-600"
                  onClick={closeFeature} // Call to close the overlay
                >
                  Close
                </button>

                {/* Render Active Feature */}
                {activeFeature === "VideoCall" && (
                  <VideoCall closeFeature={closeFeature} />
                )}
                {activeFeature === "VoiceCall" && (
                  <VoiceCall closeFeature={closeFeature} />
                )}
              </div>
            </div>
          )}

          {/* Chat Body - Scrollable */}
{/* Chat Body - Scrollable */}
<div className="flex-1 overflow-y-auto p-4 scrollbar-hide ">

  {selectedOption === "Chat" && (
    <div>
      {/* Conditional Rendering for 'design group' */}
      {contact.name === "Design Group" ? (
        <div className="mt-0">
          {/* First User Message */}
          <div className="flex items-start gap-2">
            <div className="relative">
              <FaUserCircle className="w-8 sm:w-9 h-8 sm:h-9 text-gray-700" />
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex flex-col bg-white shadow p-2 rounded-lg w-64">
                <div className="flex justify-between w-full">
                  <span className="font-semibold text-base text-black">
                    Revathy
                  </span>
                  <span className="text-gray-500 text-sm">10:30 AM</span>
                </div>
                <p className="text-base text-black leading-normal">
                  Hi, I am having a doubt on profile Screen.
                </p>
              </div>

              <div className="flex flex-col bg-white shadow p-2 rounded-lg w-72">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-semibold text-base text-black">
                    Revathy
                  </span>
                </div>

                <div className="flex items-center gap-2 border-gray-300 bg-gray-100 mb-2 p-2 border rounded-md h-12">
                  <FaFilePdf className="text-red-500 text-xl" />
                  <span className="font-semibold text-black text-sm">
                    Profile_Document.pdf
                  </span>
                </div>

                <p className="text-base text-black leading-normal">
                  Hi, I am having a doubt on profile Screen.
                </p>
              </div>
            </div>
          </div>

          {/* Second User Message */}
          <div className="mt-5"></div>
          <div className="flex items-start gap-3">
            <div className="relative">
              <FaUserCircle className="w-8 sm:w-9 h-8 sm:h-9 text-blue-600" />
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex flex-col bg-white shadow p-2 rounded-lg w-64">
                <div className="flex justify-between w-full">
                  <span className="font-semibold text-base text-black">
                    Santosh
                  </span>
                  <span className="text-gray-500 text-sm">10:30 AM</span>
                </div>
                <p className="text-base text-black leading-normal">
                  Hi, I am having a doubt on profile Screen.
                </p>
              </div>

              <div className="flex flex-col bg-white shadow p-2 rounded-lg w-64 sm:w-[482px]">
                <div className="flex items-center gap-1 mb-0">
                  <span className="font-semibold text-black text-sm">
                    Santosh
                  </span>
                </div>

                <div className="flex items-center gap-1">
                  <img
                    src="/Images/chat1.jpg"
                    alt="specification"
                    className="p-2 h-28"
                  />
                </div>

                <p className="mt-0 text-black text-sm leading-normal">
                  Hi, I am having a doubt on profile Screen.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-5"></div>

          {/* Third User Message */}
          <div className="flex items-start gap-3">
            <div className="relative">
              <FaUserCircle className="w-8 sm:w-9 h-8 sm:h-9 text-gray-700" />
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex flex-col bg-white shadow p-2 rounded-lg w-64 sm:w-[30rem]">
                <div className="flex justify-between gap-1 mb-0">
                  <span className="flex font-semibold text-base text-black">
                    Revathy
                  </span>
                  <span className="text-gray-500 text-sm">10:45 AM</span>
                </div>

                <div className="flex items-center gap-1">
                  <img
                    src="/Images/chat2.jpg"
                    alt="specification"
                    className="p-2 h-28"
                  />
                </div>

                <p className="mt-0 text-base text-black leading-normal">
                  Hi, I am having a doubt on profile Screen.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-5"></div>

          {/* User's Message */}
          <div className="flex justify-end w-full">
            <div className="flex flex-col gap-2">
              <div className="flex flex-col justify-end bg-green-100 shadow-md p-2 rounded-lg w-72 sm:w-96 min-h-8">
                <div className="flex justify-between mb-2 w-full">
                  <span className="font-semibold text-base text-black">
                    You
                  </span>
                  <span className="text-gray-500 text-sm">10:45 AM</span>
                </div>
                <p className="text-base text-black text-left leading-normal">
                  Hi, I am having a doubt on profile Screen.
                </p>
              </div>

              <div className="flex flex-col justify-end bg-green-100 shadow-md p-2 rounded-lg w-72 sm:w-96">
                <p className="text-black text-left text-sm leading-normal">
                  Yes, Sure!
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        // Render default chat
        userMessages.map((userMessage, index) => {
          // Randomly pick a contact message except the first one
          const randomContactMessage =
            index === 0
              ? contact.lastMessage // Ensure the first contact message is sequential
              : contactMessages[Math.floor(Math.random() * (contactMessages.length - 1)) + 1]; // Pick randomly from the rest
              const dummyTimestamp = "10:00 AM";
          // Skip rendering for the first user message (handled sequentially)
          if (index === 0) {
            return (
              <div key={index} className="flex-1 overflow-y-auto">
                {/* Contact's First Message */}
                <div className="flex items-start gap-3">
                  {contact?.image ? (
                    <img
                      src={contact.image}
                      alt="Profile"
                      className="rounded-full w-8 sm:w-8 h-8 sm:h-8 object-cover"
                    />
                  ) : (
                    <FaUserCircle className="w-8 h-8 text-gray-700" />
                  )}
                  <div className="flex flex-col mt-2 mb-2">
                    <div className="bg-white shadow-md p-2 rounded-lg w-auto max-w-md">
                      <div className="flex justify-between mb-1">
                        <span className="font-semibold text-base text-black">
                          {contact?.name}
                        </span>
                        <span className="text-gray-500 text-sm">{dummyTimestamp}</span>
                      </div>
                      <p className="text-base text-black">{contact.lastMessage}</p>
                    </div>
                  </div>
                </div>
        
                {/* User's First Message */}
                <div className="flex justify-end mt-2 mb-2">
                  <div className="bg-teal-100 shadow-md p-2 rounded-lg w-auto max-w-md">
                    <div className="flex justify-between mb-1">
                      <span className="font-semibold text-base text-black">You</span>
                      <span className="text-gray-500 text-sm">
                        {new Date(userMessage.timestamp).toLocaleTimeString()}
                      </span>
                    </div>
                    <p className="text-base text-black">{userMessage.text}</p>
                  </div>
                </div>
              </div>
            );
          }
          // Render for subsequent messages
          return (
            <div key={index}>
              <div className="flex items-start gap-3">
                <div className="relative">
                  {contact?.image ? (
                    <img
                      src={contact.image}
                      alt="Profile"
                      className="rounded-full w-8 sm:w-8 h-8 sm:h-8 object-cover"
                    />
                  ) : (
                    <FaUserCircle className="w-8 h-8 text-gray-700" />
                  )}
                </div>
                <div className="flex flex-col mt-2 mb-2">
                  <div className="bg-white shadow-md p-2 rounded-lg w-auto max-w-md">
                    <div className="flex justify-between mb-1">
                      <span className="font-semibold text-base text-black">{contact?.name}</span>
                      <span className="text-gray-500 text-sm">{dummyTimestamp}</span>
                    </div>
          
                    {/* Render file first if available */}
                    {randomContactMessage.file && randomContactMessage.file.type === 'image' && (
                      <img
                        src={randomContactMessage.file.url}
                        alt="file"
                        className="w-full h-auto mt-2 rounded-lg"
                      />
                    )}
                   {userMessage.file && userMessage.file.type === 'document' && (
          <div className="flex items-center gap-2 mt-2">
            {/* File icon */}
            {getFileIcon(userMessage.file.ext)}

            {/* File details */}
            <div>
              <div className="text-black font-semibold">
                {extractFileName(userMessage.file.url)} {/* Extract file name */}
              </div>
              <div className="text-gray-500 text-sm">
                {userMessage.file.size
                  ? formatFileSize(userMessage.file.size)
                  : '100 KB'} {/* If size is available, use it; otherwise, use a dummy size */}
              </div>
            </div>

            {/* Download icon */}
            <a
              href={userMessage.file.url}
              download
              className="text-blue-500 ml-2 text-lg"
            >
              <FaDownload />
            </a>
          </div>
        )}

                    {randomContactMessage.file && randomContactMessage.file.type === 'audio' && (
                      <audio controls className="mt-2">
                        <source src={randomContactMessage.file.url} type="audio/mp3" />
                        Your browser does not support the audio element.
                      </audio>
                    )}
                    {randomContactMessage.file && randomContactMessage.file.type === 'video' && (
                      <video controls className="mt-2 w-full">
                        <source src={randomContactMessage.file.url} type="video/mp4" />
                        Your browser does not support the video element.
                      </video>
                    )}
          
                    {/* Render text message after the file */}
                    <p className="text-base text-black pt-2">{randomContactMessage.text}</p>
                  </div>
                </div>
              </div>
          
              {/* User's message */}
              <div className="flex justify-end mt-2 mb-2">
                <div className="bg-teal-100 shadow-md p-2 rounded-lg w-auto max-w-md">
                  <div className="flex justify-between mb-1">
                    <span className="font-semibold text-base text-black">You</span>
                    <span className="text-gray-500 text-sm">{new Date(userMessage.timestamp).toLocaleTimeString()}</span>
                  </div>
          
                  {/* Render file first if available for user's message */}
                  {userMessage.file && userMessage.file.type === 'image' && (
                    <img
                      src={userMessage.file.url}
                      alt="file"
                      className="w-full h-auto mt-2 rounded-lg"
                    />
                  )}
               {userMessage.file && userMessage.file.type === 'document' && (
          <div className="flex items-center gap-2 mt-2">
            {/* File icon */}
            {getFileIcon(userMessage.file.ext)}

            {/* File details */}
            <div>
              <div className="text-black font-semibold">
                {extractFileName(userMessage.file.url)} {/* Extract file name */}
              </div>
              <div className="text-gray-500 text-sm">
                {userMessage.file.size
                  ? formatFileSize(userMessage.file.size)
                  : '100 KB'} {/* If size is available, use it; otherwise, use a dummy size */}
              </div>
            </div>

            {/* Download icon */}
            <a
              href={userMessage.file.url}
              download
              className="text-blue-500 ml-2"
            >
              <FaDownload />
            </a>
          </div>
        )}

                  {userMessage.file && userMessage.file.type === 'audio' && (
                    <audio controls className="mt-2">
                      <source src={userMessage.file.url} type="audio/mp3" />
                      Your browser does not support the audio element.
                    </audio>
                  )}
                  {userMessage.file && userMessage.file.type === 'video' && (
                    <video controls className="mt-2 w-full">
                      <source src={userMessage.file.url} type="video/mp4" />
                      Your browser does not support the video element.
                    </video>
                  )}
          
                  {/* Render user text message after the file */}
                  <p className="text-base text-black pt-2">{userMessage.text}</p>
                </div>
              </div>
            </div>
          );
          
        })
      )}
    </div>
  )}

{selectedOption === "Files" && (
  <div>
    {/* Document Table */}
    <h3 className="font-semibold text-lg mb-2 text-center">Documents</h3>
    <table className="w-full table-auto mb-4 border-collapse">
      <thead>
        <tr className="border-b">
          <th className="px-4 py-2 text-center">Type</th>
          <th className="px-4 py-2 text-center">File Name</th>
          <th className="px-4 py-2 text-center">Date</th>
          <th className="px-4 py-2 text-center">Location</th>
          <th className="px-4 py-2 text-center">Actions</th>
        </tr>
      </thead>
      <tbody>
        {userMessages
          .filter((msg) => msg.file && msg.file.type === "document")
          .map((message, index) => (
            <tr key={index} className="border-b">
              <td className="px-4 py-2 text-center">
                <FaFilePdf className="text-red-500 text-xl" />
              </td>
              <td className="px-4 py-2 text-center">{extractFileName(message.file.url)}</td>
              <td className="px-4 py-2 text-center">12/03/2024</td> {/* Dummy date */}
              <td className="px-4 py-2 text-center">Local Drive</td>
              <td className="px-4 py-2 text-center flex justify-center gap-4">
                <button 
                  onClick={() => handleDownload(message.file.url)} 
                  className="text-blue-500">
                  <FaDownload />
                </button>
                <button 
                  onClick={() => handleDelete(message.file.url)} 
                  className="text-red-500">
                  <FaTrashAlt />
                </button>
              </td>
            </tr>
          ))}
      </tbody>
    </table>

    {/* Audio Table */}
    <h3 className="font-semibold text-lg mb-2 text-center">Audio</h3>
    <table className="w-full table-auto border-collapse">
      <thead>
        <tr className="border-b">
          <th className="px-4 py-2 text-center">Type</th>
          <th className="px-4 py-2 text-center">File Name</th>
          <th className="px-4 py-2 text-center">Date</th>
          <th className="px-4 py-2 text-center">Location</th>
          <th className="px-4 py-2 text-center">Actions</th>
        </tr>
      </thead>
      <tbody>
        {userMessages
          .filter((msg) => msg.file && msg.file.type === "audio")
          .map((message, index) => (
            <tr key={index} className="border-b">
              <td className="px-4 py-2 text-center">
                <Icon icon="mdi:audio" className="text-gray-500 text-xl" />
              </td>
              <td className="px-4 py-2 text-center">{extractFileName(message.file.url)}</td>
              <td className="px-4 py-2 text-center">12/03/2024</td> {/* Dummy date */}
              <td className="px-4 py-2 text-center">Local Drive</td>
              <td className="px-4 py-2 text-center flex justify-center gap-4">
                <button 
                  onClick={() => handleDownload(message.file.url)} 
                  className="text-blue-500">
                  <FaDownload />
                </button>
                <button 
                  onClick={() => handleDelete(message.file.url)} 
                  className="text-red-500">
                  <FaTrashAlt />
                </button>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  </div>
)}
  {selectedOption === "Media" && (
        <div>
          <h3 className="font-semibold text-lg mb-2 text-center">Media</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {/* Rendering images */}
            {[...userMessages, ...contactMessages]
              .filter((msg) => msg.file && msg.file.type === "image")
              .map((message, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center"
                  onClick={() => {
                    toggleSelectFile(message.file.url);
                    handleSelectionChange();
                  }}
                  style={{
                    border: selectedFiles.includes(message.file.url) ? "2px solid #007BFF" : "none",
                    cursor: "pointer",
                  }}
                >
                  <img
                    src={message.file.url}
                    alt={`Image ${index}`}
                    className="w-full h-40 object-cover"
                  />
                  <p className="text-center mt-2">{extractFileName(message.file.url)}</p>
                </div>
              ))}

            {/* Rendering videos */}
            {[...userMessages, ...contactMessages]
              .filter((msg) => msg.file && msg.file.type === "video")
              .map((message, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center"
                  onClick={() => {
                    toggleSelectFile(message.file.url);
                    handleSelectionChange();
                  }}
                  style={{
                    border: selectedFiles.includes(message.file.url) ? "2px solid #007BFF" : "none",
                    cursor: "pointer",
                  }}
                >
                  <video
                    src={message.file.url}
                    controls
                    className="w-full h-40 object-cover"
                  />
                  <p className="text-center mt-2">{extractFileName(message.file.url)}</p>
                </div>
              ))}
          </div>

          {/* Pop-up Share/Delete Buttons */}
          {showActions && (
            <div
              className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
              onClick={() => setShowActions(false)} // Close popup when clicking outside
            >
              <div
                className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center"
                onClick={(e) => e.stopPropagation()} // Prevent closing popup on button click
              >
                <button
                  onClick={handleShare}
                  className="mx-2 bg-blue-500 text-white px-4 py-2 rounded mb-4"
                >
                  Share
                </button>
                <button
                  onClick={handleDelete}
                  className="mx-2 bg-red-500 text-white px-4 py-2 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          )}
        </div>
      )}







</div>

{showEmojiPicker && (
  <div
    className="absolute inset-0 z-40 flex justify-center items-center top-12"
    onClick={() => setShowEmojiPicker(false)} // Close on clicking outside
  >
    <div onClick={(e) => e.stopPropagation()} style={{ transform: 'scale(0.9)', transformOrigin: 'bottom' }}>
      <Picker onEmojiClick={handleEmojiClick} />
    </div>
  </div>
)}

{selectedOption === "Chat" && (
  <div
  className={`mb-[96px] sticky flex justify-between items-center border-[#9B9797] bg-white shadow-lg mt-2 border rounded-full w-[99%] sm:w-[99%] h-11 overflow-hidden ml-1 p-3 ${showEmojiPicker ? 'z-50' : ''}`}
>
    {/* Icons */}
    <div className="relative flex gap-3 px-2 sm:px-0">
      {/* Emoji Icon */}
      <Icon
        icon="twemoji:grinning-face"
        width="24"
        height="24"
        onClick={() => setShowEmojiPicker((prev) => !prev)} // Toggle emoji picker
        className="cursor-pointer"
      />
      {/* Attachment Icon */}
      <Icon
        icon="bx:bx-paperclip"
        width="25"
        height="25"
        onClick={() => {
          setShowEmojiPicker(false); // Close emoji picker
          handleAttachmentClick(); // Open file explorer
        }}
        className="cursor-pointer"
      />
      <input
        type="file"
        id="fileInput"
        className="hidden"
        onChange={(e) => console.log(e.target.files[0])} // Handle file selection
      />
    </div>
    {/* Text Input */}
    <input
      type="text"
      value={message}
      onChange={(e) => setMessage(e.target.value)}
      placeholder="Type a message..."
      className="flex-grow px-2 border-none font-[700] text-gray-700 text-lg sm:text-lg md:text-clip outline-none"
      onFocus={() => setShowEmojiPicker(false)} // Close emoji picker on focus
    />
    {/* Mic/Send Button */}
    <div className="right-0 flex justify-center items-center  rounded-full w-10 h-10">
      <Icon
        icon={message.length > 0 ? 'fluent:send-24-filled' : 'carbon:microphone-filled'}
        width="25"
        height="25"
        onClick={message.length > 0 ? () => alert('Message sent!') : handleMicClick}
        className="cursor-pointer"
        style={{ color: '#01C2B5' }}
      />
    </div>
  </div>
)}





        </div>

       
      </div>
    </>
  );
};

export default IndividualChat;
