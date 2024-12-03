import { useState } from "react";
import {
  FaPhone,
  FaVideo,
  FaEllipsisV,
  FaUserCircle,
  FaFilePdf,
} from "react-icons/fa";
import VideoCall from "./VideoCall";
import VoiceCall from "./VoiceCall";
import { FaArrowLeft } from "react-icons/fa";
import Picker from 'emoji-picker-react'; // For emoji picker
import { Icon } from '@iconify/react'; // For Iconify


const IndividualChat = ({ contact, handleBackToContacts }) => {
  const [selectedOption, setSelectedOption] = useState("Chat");
  const [activeFeature, setActiveFeature] = useState(null);

  const menuOptions = ["Chat", "Files", "Media"];

  const [message, setMessage] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  // Function to handle emoji click
  const handleEmojiClick = (event, emojiObject) => {
    setMessage(message + emojiObject.emoji);
  };

  // Function to handle attachment click (file explorer)
  const handleAttachmentClick = () => {
    document.getElementById('fileInput').click();
  };

  // Function to handle mic click (voice recorder - placeholder for now)
  const handleMicClick = () => {
    alert('Microphone recording functionality will be implemented here.');
  };

  const [userMessages] = useState([
    "How are you?",
    "Can we discuss the profile screen issue?",
    "Sure, I’ll look into it!",
    "Thank you for your quick response.",
    "When can we connect for the meeting?",
  ]);

  const contactMessages = [
    "I'm good, thanks!",
    "Sure, let’s discuss.",
    "That sounds great!",
    "You’re welcome!",
    "Let’s connect at 3 PM.",
  ];

  const dummyFiles = [
    { name: "Resume.pdf", type: "pdf", size: "2 MB" },
    { name: "Project_Doc.pdf", type: "pdf", size: "1.5 MB" },
    { name: "MeetingNotes.docx", type: "doc", size: "1 MB" },
  ];

  const dummyMedia = [
    { type: "image", src: "https://via.placeholder.com/150", alt: "Image 1" },
    { type: "image", src: "https://via.placeholder.com/150", alt: "Image 2" },
    { type: "image", src: "https://via.placeholder.com/150", alt: "Image 3" },
  ];

  const handleIconClick = (feature) => {
    setActiveFeature(feature); // Set the feature (VideoCall or VoiceCall)
  };

  const closeFeature = () => {
    setActiveFeature(null); // Close the overlay
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
              <div className="relative top-9 bg-white shadow-lg p-6 rounded-lg w-full max-w-[800px] h-[90%]">
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
        userMessages.map((userMessage, index) => (
          <div key={index} className="flex-1 overflow-y-auto">
            {/* Contact's Message */}
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
                    <span className="text-gray-500 text-sm">
                      10:30 AM
                    </span>
                  </div>
                  <p className="text-base text-black">
                    {index === 0
                      ? contact.lastMessage
                      : contactMessages[
                          Math.floor(
                            Math.random() * contactMessages.length
                          )
                        ]}
                  </p>
                </div>
              </div>
            </div>
        
            {/* User's Message */}
            <div className="flex justify-end mt-2 mb-2">
              <div className="bg-teal-100 shadow-md p-2 rounded-lg w-auto max-w-md">
                <div className="flex justify-between mb-1">
                  <span className="font-semibold text-base text-black">
                    You
                  </span>
                  <span className="text-gray-500 text-sm">
                    10:45 AM
                  </span>
                </div>
                <p className="text-base text-black">{userMessage}</p>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  )}
</div>
{selectedOption === "Chat" && (
  <div className="mb-[96px] sticky z-10 flex justify-between items-center border-[#9B9797] bg-white shadow-lg mt-2 border rounded-full w-[99%] sm:w-[99%] h-11 overflow-hidden ml-1 p-3 relative">
    {/* Icons */}
    <div className="relative flex gap-3 px-2 sm:px-0">
      {/* Emoji Icon */}
      <Icon
        icon="twemoji:grinning-face"
        width="24"
        height="24"
        onClick={() => setShowEmojiPicker((prev) => !prev)}
        className="cursor-pointer"
      />

      {/* Emoji Picker */}
      {showEmojiPicker && (
        <div className="absolute bottom-full left-0 z-20 bg-white shadow-lg border border-gray-300 rounded-lg p-2">
          <div className="flex justify-end mb-2">
            {/* Close Icon */}
            <Icon
              icon="mdi:close-circle"
              width="20"
              height="20"
              onClick={() => setShowEmojiPicker(false)}
              className="cursor-pointer text-gray-500 hover:text-gray-800"
            />
          </div>
          <Picker onEmojiClick={handleEmojiClick} />
        </div>
      )}

      {/* Attachment Icon */}
      <Icon
        icon="bx:bx-paperclip"
        width="25"
        height="25"
        onClick={handleAttachmentClick}
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
    />

    {/* Mic/Send Button */}
    <div className="right-0 flex justify-center items-center bg-[#01C2B5] rounded-full w-10 h-10">
      <Icon
        icon={message.length > 0 ? 'twemoji:send' : 'twemoji:microphone'}
        width="14"
        height="16"
        onClick={message.length > 0 ? () => alert('Message sent!') : handleMicClick}
        className="cursor-pointer"
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
