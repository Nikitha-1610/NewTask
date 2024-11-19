import React, { useState } from "react";
import {
  FaPhone,
  FaVideo,
  FaEllipsisV,
  FaUserCircle,
  FaFilePdf,
} from "react-icons/fa";
import VideoCall from "./VideoCall";
import VoiceCall from "./VoiceCall";
const IndividualChat = ({ contact }) => {
  const [selectedOption, setSelectedOption] = useState("Chat");
  const [activeFeature, setActiveFeature] = useState(null);

  const menuOptions = ["Chat", "Files", "Media"];

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
      {/* Header */}
      <div className="flex items-center justify-between w-full h-[60px] bg-white shadow-md px-5 sticky top-0 z-10 mb-2 mt-0">
        {/* Left Side */}
        <div className="flex items-center sm:gap-3 gap-2">
          {contact?.image ? (
            <img
              src={contact.image}
              alt="Profile"
              className="sm:w-[38px] sm:h-[38px] w-[32px] h-[32px] rounded-full object-cover"
            />
          ) : (
            <FaUserCircle className="w-[38px] h-[38px] text-pink-700" />
          )}
          <span className="text-black font-semibold text-[14px] sm:text-[15px]">
            {contact?.name}
          </span>
          <div className="flex items-center gap-4 ml-4">
            {menuOptions.map((option, index) => (
              <span
                key={index}
                onClick={() => setSelectedOption(option)}
                className={`cursor-pointer sm:text-[17px] text-[17px] font-[500] ${
                  selectedOption === option
                    ? "border-b-2 border-[#01C2B5]"
                    : "text-gray-500"
                }`}
              >
                {option}
              </span>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-4">
          <FaPhone
            className="text-gray-700 sm:w-5 sm:h-5 w-3 h-3 cursor-pointer"
            onClick={() => handleIconClick("VoiceCall")}
          />
          <FaVideo
            className="text-gray-700 sm:w-5 sm:h-5 w-3 h-3 cursor-pointer"
            onClick={() => handleIconClick("VideoCall")}
          />
          <FaEllipsisV className="text-gray-700 sm:w-5 sm:h-5 w-3 h-3 cursor-pointer" />
        </div>
      </div>

      {/* Overlay for Active Feature */}
   {/* Overlay for Active Feature */}
   {activeFeature && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    <div className="relative bg-white w-full max-w-[800px] h-[90%] p-6 rounded-lg shadow-lg">
      {/* Close Button */}
      <button
        className="absolute top-3 right-3 text-red-600 font-bold"
        onClick={closeFeature} // Call to close the overlay
      >
        Close
      </button>

      {/* Render Active Feature */}
      {activeFeature === "VideoCall" && <VideoCall closeFeature={closeFeature} />}
      {activeFeature === "VoiceCall" && <VoiceCall closeFeature={closeFeature} />}
    </div>
  </div>
)}




      {/* Content Section */}
      <div className="p-4">
        {selectedOption === "Chat" && (
          <div>
            {userMessages.map((userMessage, index) => (
              <div key={index} className="mb-6 flex-1 overflow-y-auto">
                {/* Contact's Message */}
                <div className="flex items-start gap-3">
                  {contact?.image ? (
                    <img
                      src={contact.image}
                      alt="Profile"
                      className="sm:w-[35px] sm:h-[35px] w-[25px] h-[25px] rounded-full object-cover"
                    />
                  ) : (
                    <FaUserCircle className="w-[35px] h-[35px] text-gray-700" />
                  )}
                  <div className="flex flex-col gap-1">
                    <div className="p-2 w-auto max-w-md bg-white shadow rounded-lg">
                      <div className="flex justify-between mb-1">
                        <span className="text-black font-semibold text-[14px]">
                          {contact?.name}
                        </span>
                        <span className="text-gray-500 text-[12px]">10:30 AM</span>
                      </div>
                      <p className="text-black text-[14px]">
                        {index === 0
                          ? contact.lastMessage
                          : contactMessages[
                              Math.floor(Math.random() * contactMessages.length)
                            ]}
                      </p>
                    </div>
                  </div>
                </div>

                {/* User's Message */}
                <div className="flex justify-end mt-2">
                  <div className="p-2 w-auto max-w-md bg-[#E5FDF7] shadow rounded-lg">
                    <div className="flex justify-between mb-1">
                      <span className="text-black font-semibold text-[14px]">
                        You
                      </span>
                      <span className="text-gray-500 text-[12px]">10:45 AM</span>
                    </div>
                    <p className="text-black text-[14px]">{userMessage}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {selectedOption === "Files" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {dummyFiles.map((file, index) => (
              <div
                key={index}
                className="flex items-center gap-4 bg-white shadow p-4 rounded-lg"
              >
                <FaFilePdf className="text-red-500 w-6 h-6" />
                <div>
                  <p className="font-semibold">{file.name}</p>
                  <p className="text-sm text-gray-500">{file.size}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {selectedOption === "Media" && (
          <div className="grid grid-cols-3 gap-4">
            {dummyMedia.map((media, index) => (
              <div key={index} className="p-2">
                <img
                  src={media.src}
                  alt={media.alt}
                  className="w-full h-full object-cover rounded-lg shadow"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default IndividualChat;
