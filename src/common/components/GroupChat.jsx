import { useState, useEffect,useRef } from "react";
import {
  FaPhone,
  FaVideo,
  FaEllipsisV,
  FaUserCircle,
  FaFilePdf,
   FaFileWord, FaFileExcel, FaDownload, FaTrashAlt
} from "react-icons/fa";
import VideoCall from "../../user/Components/ChatComp/VideoCall";
import VoiceCall from "../../user/Components/ChatComp/VoiceCall";
import { FaArrowLeft } from "react-icons/fa";
import Picker from 'emoji-picker-react'; // For emoji picker
import { Icon } from '@iconify/react'; // For Iconify
import io from 'socket.io-client';
import axios from "axios";

let socket;
const GroupChat = ({ contact, handleBackToContacts }) => {
  const employeeId = localStorage.getItem('employeeId');
  const senderName = localStorage.getItem('name');
  const user = localStorage.getItem('name');
  const selectedEmployeeId = contact?.id;
  const [selectedOption, setSelectedOption] = useState("Chat");
  const [activeFeature, setActiveFeature] = useState(null);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [showActions, setShowActions] = useState(false);
  const menuOptions = ["Chat", "Files", "Media"];
  const [showDownloadToast, setShowDownloadToast] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const socketUrl = 'https://chat-2-1dgm.onrender.com';
  console.log(user);
  

  const messageEndRef = useRef(null);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    // Check if the chat container is available
    if (chatContainerRef.current) {
      // Scroll to the bottom by setting scrollTop to the scrollHeight of the container
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);
  


  const getMessages = async () => {
    if (!selectedEmployeeId) return;
    try {
        const response = await axios.get(`https://chat-2-1dgm.onrender.com/getGroupMessages`, {
            params: { group: selectedEmployeeId  }
        });
        setMessages(response.data.messages); // Set the fetched messages
    } catch (err) {
        console.error(err);
    }
  };
  
  


  useEffect(() => {
        socket = io(socketUrl);

        //Join the employeeId when the user connects
        socket.emit('joinGroup', { user, room: selectedEmployeeId }, (err) => {
            if (err) {
                console.error(err);
            }
        });

        return () => {
            socket.disconnect();
            socket.off();
        };
    }, [socketUrl, user, employeeId]);

    useEffect(() => {
      getMessages();
  }, [selectedEmployeeId]); 

    useEffect(() => {
        socket.on('message', (msg) => {
            // Only update messages if they belong to the selected conversation
            console.log(msg);
            
            setMessages((prevMsg) => [...prevMsg, msg]); // Append new message
            
            if (
                (msg.sender === employeeId && msg.receiver === selectedEmployeeId) ||
                (msg.sender === selectedEmployeeId && msg.receiver === employeeId)
            ) {
                setMessages((prevMsg) => [...prevMsg, msg]); // Append new message
            }

            // Scroll to the bottom when a new message arrives
            if (chatContainerRef.current) {
              // Scroll to the bottom by setting scrollTop to the scrollHeight of the container
              chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
            }
        });

        socket.on('roomMembers', (usrs) => {
            setOnlineUsers(usrs);
        });
    }, [employeeId, selectedEmployeeId]);

    const sendMessage = () => {
      
        if (message.trim() && selectedEmployeeId) {
            // Emit message to the receiver and the sender
            socket.emit('sendGroupMessage', message, () => setMessage(''));
        }
    };

    const filteredMessages = messages?.filter(msg =>
      (msg.sender === employeeId && msg.receiver === selectedEmployeeId) || 
      (msg.sender === selectedEmployeeId && msg.receiver === employeeId)
  );

  const handleMicClick = () => {
    if (!isRecording) {
      // Start recording
      startRecording();
    } else {
      // Stop recording
      stopRecording();
    }
  };

  const startRecording = () => {
    setIsRecording(true);
    console.log("Recording started...");
    // Add recording logic here (using Web APIs like MediaRecorder, etc.)
  };

  const stopRecording = () => {
    setIsRecording(false);
    console.log("Recording stopped...");
    // Add stopping logic here and save the recording
  };


  const handleEmojiClick = (emojiObject) => {
    if (emojiObject && emojiObject.emoji) {
      setMessage((prev) => prev + emojiObject.emoji); // Append emoji to the message
    }
  };

  
  const [fileToDelete, setFileToDelete] = useState(null);

  // Toggle file selection
  // Toggle file selection
  const toggleSelectFile = (fileUrl) => {
    if (selectedFiles.includes(fileUrl)) {
      // If already selected, remove from the selected list
      setSelectedFiles(selectedFiles.filter((url) => url !== fileUrl));
    } else {
      // If not selected, add to the selected list and show delete popup
      setSelectedFiles([...selectedFiles, fileUrl]);
      setShowDeletePopup(true);
    }
  };
  

  // Handle file download
  const handleDownloadFile = (fileUrl) => {
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = extractFileName(fileUrl);
    link.click();

    // Show success toast
    setShowDownloadToast(true);
    setTimeout(() => setShowDownloadToast(false), 3000);
  };

 

  // Handle delete confirmation
  const handleDeleteConfirmation = (fileUrl) => {
    setFileToDelete(fileUrl);
    setShowDeletePopup(true);
  };

  // Handle actual file deletion
  const handleDelete = () => {
    setSelectedFiles((prev) => prev.filter((url) => url !== fileToDelete));
    setShowDeletePopup(false);
    setFileToDelete(null);
  };



  
  
  const handleDeletePopup = () => {
    setShowDeletePopup(true); // Show delete confirmation popup
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

  

  
  
  // const toggleSelectFile = (file) => {
  //   setSelectedFiles((prevSelected) => {
  //     if (prevSelected.includes(file)) {
  //       return prevSelected.filter((f) => f !== file);
  //     } else {
  //       return [...prevSelected, file];
  //     }
  //   });
  // };

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
  
  const handleDeletes = (fileUrl) => {
    // Logic for deleting the file
    alert(`File ${extractFileName(fileUrl)} will be deleted.`);
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
  console.log(contact);
  
  return (
    <>
      <div className="flex flex-col  bg-gray-100  h-full">
        {/* Chat Container */}
        <div className="flex flex-col flex-1  overflow-y-hidden">
          {/* Navbar inside chat body */}
          <div className="sticky top-0 w-[99%] sm:w-full z-10 bg-white shadow-md sm:p-2 sm:mx-0 sm:px-5 flex justify-between items-center h-14">
  <div className="flex items-center gap-1 sm:gap-3">
    <button
      onClick={handleBackToContacts}
      className="sm:top-1/2 sm:left-3 sm:absolute flex items-center  text-blue-500 sm:-translate-y-1/2 lg:hidden" // Change lg:hidden to lg:block
    >
      <FaArrowLeft className="text-2xl" />
    </button>
    {contact?.image ? (
      <img
        src={contact.image}
        alt="Profile"
        className="rounded-full w-7 sm:w-9 h-7 sm:h-9 object-cover"
      />
    ) : (
      <FaUserCircle className="sm:w-9 sm:h-9 w-7 h-7 text-pink-700" />
    )}
    <span className="font-semibold text-black text-base sm:text-base">
      {contact?.name}
    </span>
    <div className="flex items-center sm:gap-4 gap-2 ml-4">
      {menuOptions.map((option, index) => (
        <span
          key={index}
          onClick={() => setSelectedOption(option)}
          className={`cursor-pointer sm:text-lg text-base font-medium ${
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
  <div className="flex items-center gap-2 sm:gap-4 sm:left-0">
    <FaPhone
      className="sm:w-5 sm:h-5 w-4 h-4 text-gray-700 cursor-pointer"
      onClick={() => handleIconClick("VoiceCall")}
    />
    <FaVideo
      className="sm:w-5 sm:h-5 w-4 h-4 text-gray-700 cursor-pointer"
      onClick={() => handleIconClick("VideoCall")}
    />
    <FaEllipsisV className="sm:w-5 sm:h-5 w-4 h-4 text-gray-700 cursor-pointer" />
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
<div className="flex-1 overflow-y-auto sm:p-4 p-2 scrollbar-hide ">

{selectedOption === "Chat" && (
  <div className="overflow-y-auto" ref={chatContainerRef}>
    {messages.map((userMessage, index) => (
      <div key={index} className="flex items-start mb-4 " >
        {/* Contact's Message */}
        {userMessage.sender !== user && (
          <div className="flex items-start sm:gap-3 gap-2 ">
            <FaUserCircle className="w-7 sm:w-8 h-7 sm:h-8 text-gray-700" />
            <div className="flex flex-col mt-2 mb-2 w-full">
              <div className="bg-white shadow-md p-2 rounded-lg max-w-sm sm:max-w-md">
                <div className="flex justify-between mb-1">
                  <span className="font-semibold text-[15px] text-black">
                    {userMessage.sender}
                  </span>
                  <span className="text-gray-500 text-sm">
                    {new Date(userMessage.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                <p className="text-base text-black">{userMessage.text}</p>
              </div>
            </div>
          </div>
        )}

        {/* Your Message (currentUserId's message) */}
        {userMessage.sender === user && (
          <div className="flex justify-end w-full">
            <div className="bg-green-100 shadow-md p-2 rounded-lg max-w-sm sm:max-w-md">
              <div className="flex justify-between mb-1">
                <span className="font-semibold text-[15px] text-black pr-1">
                  You
                </span>
                <span className="text-gray-500 text-sm">
                  {new Date(userMessage.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
              <p className="text-base text-black">{userMessage.text}</p>
            </div>
          </div>
        )}
        <div ref={messageEndRef} />
        
      </div>
    ))}
  </div>
)}



{selectedOption === "Files" && (
  <div>
    {/* Document List */}
    <h3 className="font-semibold text-lg mb-2 text-center">Documents</h3>
    <div className="md:hidden">
      {userMessages
        .filter((msg) => msg.file && msg.file.type === "document")
        .map((message, index) => (
          <div key={index} className="flex items-center justify-between mb-2 sm:mb-4">
            <FaFilePdf className="text-red-500 text-xl" />
            <span className="text-sm sm:text-base">{extractFileName(message.file.url)}</span>
            <div className="flex gap-1 sm:gap-2">
              <button
                onClick={() => handleDownload(message.file.url)}
                className="text-blue-500"
              >
                <FaDownload />
              </button>
              <button
                onClick={() => handleDeletes(message.file.url)}
                className="text-red-500"
              >
                <FaTrashAlt />
              </button>
            </div>
          </div>
        ))}
    </div>

    {/* Audio List */}
    <h3 className="font-semibold text-lg mb-2 text-center">Audio</h3>
    <div className="md:hidden">
      {userMessages
        .filter((msg) => msg.file && msg.file.type === "audio")
        .map((message, index) => (
          <div key={index} className="flex items-center justify-between mb-2 sm:mb-4">
            <Icon icon="mdi:audio" className="text-gray-500 text-xl" />
            <span className="text-sm sm:text-base">{extractFileName(message.file.url)}</span>
            <div className="flex gap-1 sm:gap-2">
              <button
                onClick={() => handleDownload(message.file.url)}
                className="text-blue-500"
              >
                <FaDownload />
              </button>
              <button
                onClick={() => handleDelete(message.file.url)}
                className="text-red-500"
              >
                <FaTrashAlt />
              </button>
            </div>
          </div>
        ))}
    </div>

    {/* Document Table (for larger screens) */}
    <div className="hidden md:block">
      <h3 className="font-semibold text-lg mb-2 text-center">Documents</h3>
      <div className="overflow-x-auto">
        <table className="w-full table-auto mb-4 border-collapse text-sm md:text-base">
          <thead>
            <tr className="border-b">
              <th className="px-2 md:px-4 py-2 text-center">Type</th>
              <th className="px-2 md:px-4 py-2 text-center">File Name</th>
              <th className="px-2 md:px-4 py-2 text-center">Date</th>
              <th className="px-2 md:px-4 py-2 text-center">Location</th>
              <th className="px-2 md:px-4 py-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {userMessages
              .filter((msg) => msg.file && msg.file.type === "document")
              .map((message, index) => (
                <tr key={index} className="border-b">
                  <td className="px-2 md:px-4 py-2 text-center">
                    <FaFilePdf className="text-red-500 text-xl" />
                  </td>
                  <td className="px-2 md:px-4 py-2 text-center">
                    {extractFileName(message.file.url)}
                  </td>
                  <td className="px-2 md:px-4 py-2 text-center">12/03/2024</td>
                  <td className="px-2 md:px-4 py-2 text-center">Local Drive</td>
                  <td className="px-2 md:px-4 py-2 text-center flex justify-center gap-2 md:gap-4">
                    <button
                      onClick={() => handleDownload(message.file.url)}
                      className="text-blue-500"
                    >
                      <FaDownload />
                    </button>
                    <button
                      onClick={() => handleDeletes(message.file.url)}
                      className="text-red-500"
                    >
                      <FaTrashAlt />
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>

    {/* Audio Table (for larger screens) */}
    <div className="hidden md:block">
      <h3 className="font-semibold text-lg mb-2 text-center">Audio</h3>
      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse text-sm md:text-base">
          <thead>
            <tr className="border-b">
              <th className="px-2 md:px-4 py-2 text-center">Type</th>
              <th className="px-2 md:px-4 py-2 text-center">File Name</th>
              <th className="px-2 md:px-4 py-2 text-center">Date</th>
              <th className="px-2 md:px-4 py-2 text-center">Location</th>
              <th className="px-2 md:px-4 py-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {userMessages
              .filter((msg) => msg.file && msg.file.type === "audio")
              .map((message, index) => (
                <tr key={index} className="border-b">
                  <td className="px-2 md:px-4 py-2 text-center">
                    <Icon icon="mdi:audio" className="text-gray-500 text-xl" />
                  </td>
                  <td className="px-2 md:px-4 py-2 text-center">
                    {extractFileName(message.file.url)}
                  </td>
                  <td className="px-2 md:px-4 py-2 text-center">12/03/2024</td>
                  <td className="px-2 md:px-4 py-2 text-center">Local Drive</td>
                  <td className="px-2 md:px-4 py-2 text-center flex justify-center gap-2 md:gap-4">
                    <button
                      onClick={() => handleDownload(message.file.url)}
                      className="text-blue-500"
                    >
                      <FaDownload />
                    </button>
                    <button
                      onClick={() => handleDelete(message.file.url)}
                      className="text-red-500"
                    >
                      <FaTrashAlt />
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
)}


{selectedOption === "Media" && (
  <div>
  <h3 className="font-semibold text-lg mb-2 text-center">Media</h3>
  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
    {/* Rendering images */}
    {[...userMessages, ...contactMessages]
      .filter((msg) => msg.file && msg.file.type === "image")
      .map((message, index) => (
        <div
          key={index}
          className="relative flex flex-col items-center p-2 border rounded-lg"
          style={{
            border: "1px solid #ddd",
            cursor: "pointer",
          }}
        >
          {/* Checkbox for selection */}
          <div
            className={`absolute top-2 left-2 w-6 h-6 rounded-full border-2 flex items-center justify-center ${
              selectedFiles.includes(message.file.url)
                ? "bg-green-500 border-green-500"
                : "bg-white border-gray-300"
            }`}
            onClick={() => toggleSelectFile(message.file.url)}
          >
            {selectedFiles.includes(message.file.url) && (
              <span className="text-white font-bold">✔</span>
            )}
          </div>

          <img
            src={message.file.url}
            alt={`Image ${index}`}
            className="w-full h-32 sm:h-40 object-cover rounded"
          />
         

          {/* Download icon */}
          <div
            className="absolute bottom-4 right-4 bg-white text-green-500 p-1 rounded-sm cursor-pointer border-2 border-green-500"
            onClick={() => handleDownloadFile(message.file.url)}
          ><Icon 
          icon="tabler:download"
          width="20"
          height="20"
          className="cursor-pointer"
        />
        
        
        

          </div>
        </div>
      ))}

    {/* Rendering videos */}
    {[...userMessages, ...contactMessages]
      .filter((msg) => msg.file && msg.file.type === "video")
      .map((message, index) => (
        <div
          key={index}
          className="relative flex flex-col items-center p-2 border rounded-lg"
          style={{
            border: "1px solid #ddd",
            cursor: "pointer",
          }}
        >
          {/* Checkbox for selection */}
          <div
            className={`absolute top-2 left-2 w-6 h-6 rounded-full border-2 flex items-center justify-center ${
              selectedFiles.includes(message.file.url)
                ? "bg-green-500 border-green-500"
                : "bg-white border-gray-300"
            }`}
            onClick={() => toggleSelectFile(message.file.url)}
          >
            {selectedFiles.includes(message.file.url) && (
              <span className="text-white font-bold">✔</span>
            )}
          </div>

          <video
            src={message.file.url}
            controls
            className="w-full h-32 sm:h-40 object-cover rounded"
          />
       

          {/* Download icon */}
          <div
            className="absolute bottom-4 right-4 bg-white text-green-500 p-1 rounded-sm cursor-pointer border-2 border-green-500"
            onClick={() => handleDownloadFile(message.file.url)}
          ><Icon 
          icon="tabler:download"
          width="20"
          height="20"
          className="cursor-pointer"
        />
        
        
        

          </div>
        </div>
      ))}
  </div>

  {/* Success Toast */}
  {showDownloadToast && (
    <div className="absolute top-20 right-10 bg-white text-black px-4 py-2 rounded shadow-lg flex flex-col items-center gap-2 z-30 border border-gray-300">
      <div className="text-green-500 font-bold text-xl">✔</div>
      <span>Your media saved successfully!</span>
    </div>
  )}

  {/* Delete Confirmation Popup */}
  {showDeletePopup && (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={() => setShowDeletePopup(false)} // Close on clicking outside
    >
      <div
        className="bg-white p-6 rounded shadow-lg text-center"
        onClick={(e) => e.stopPropagation()} // Prevent closing on clicking inside
      >
        <p className="mb-4 text-lg font-semibold">
          Are you sure you want to delete?
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Delete
          </button>
          <button
            onClick={() => setShowDeletePopup(false)}
            className="bg-gray-300 text-black px-4 py-2 rounded"
          >
            Cancel
          </button>
        </div>
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
        className={`mb-[98px] sticky flex justify-between items-center border-[#9B9797] bg-white shadow-lg mt-2 border rounded-full w-full sm:w-[99.99%] h-11 overflow-hidden sm:px-3 sm:py-0  ${showEmojiPicker ? 'z-50' : ''} sm:flex flex-wrap`}
      >
        {/* Icons */}
        <div className="relative flex sm:gap-3 gap-2 pl-1 sm:px-0">
          {/* Emoji Icon */}
          <Icon
            icon="twemoji:grinning-face"
            width="20"
            height="20"
            onClick={() => setShowEmojiPicker((prev) => !prev)} // Toggle emoji picker
            className="cursor-pointer sm:w-7 sm:h-7"
          />
          {/* Attachment Icon */}
          <Icon
            icon="bx:bx-paperclip"
            width="20"
            height="20"
            onClick={() => {
              setShowEmojiPicker(false);
              handleAttachmentClick(); // Open file explorer
            }}
            className="cursor-pointer sm:w-6 sm:h-6"
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
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
                sendMessage(); // Call sendMessage when Enter is pressed
            }
        }}
          placeholder="Type a message..."
          className="flex-grow px-2 border-none font-[700] text-gray-700 text-sm sm:text-base md:text-clip outline-none sm:h-10 h-8"
          onFocus={() => setShowEmojiPicker(false)} // Close emoji picker on focus
        />

        {/* Mic/Send Button */}
        <div className="flex justify-center items-center sm:w-13 sm:h-13 w-8 h-8 right-7 sm:ml-3 mt-2 sm:mt-0">
          <Icon
            icon={message.length > 0 ? 'fluent:send-24-filled' : isRecording ? 'carbon:microphone-off-filled' : 'carbon:microphone-filled'}
            width="20"
            height="20"
            onClick={message.length > 0 ? () => sendMessage : handleMicClick}
            className="cursor-pointer font-bold"
            style={{ color: '#01C2B5' }}
          />
        </div>
      </div>
    )
  }

        </div>

       
      </div>
    </>
  );
};

export default GroupChat;
