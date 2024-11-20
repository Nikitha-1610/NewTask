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
      <div className="top-0 z-10 sticky flex justify-between items-center bg-white shadow-md mt-0 mb-2 px-1 sm:px-5 w-full h-14">
  {/* Left Side */}
  <div className="flex items-center gap-1 sm:gap-3">
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
      {/* Overlay for Active Feature */}
      {activeFeature && (
        <div className="z-50 fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="relative top-9 bg-white shadow-lg p-6 rounded-lg w-full max-w-[800px] h-[90%]">
            {/* Close Button */}
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

<div className="p-4 overflow-y-auto">
  {selectedOption === "Chat" && (
    <div>
      {userMessages.map((userMessage, index) => (
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
                  <span className="text-gray-500 text-sm">10:30 AM</span>
                </div>
                <p className="text-base text-black">
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
          <div className="flex justify-end mt-2 mb-2">
            <div className="bg-teal-100 shadow-md p-2 rounded-lg w-auto max-w-md">
              <div className="flex justify-between mb-1">
                <span className="font-semibold text-base text-black">You</span>
                <span className="text-gray-500 text-sm">10:45 AM</span>
              </div>
              <p className="text-base text-black">{userMessage}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )}

  {selectedOption === "Files" && (
    <div className="gap-4 grid grid-cols-1 sm:grid-cols-2">
      {dummyFiles.map((file, index) => (
        <div
          key={index}
          className="flex items-center gap-4 bg-white shadow-md p-4 rounded-lg"
        >
          <FaFilePdf className="w-6 h-6 text-red-500" />
          <div>
            <p className="font-semibold text-sm">{file.name}</p>
            <p className="text-gray-500 text-xs">{file.size}</p>
          </div>
        </div>
      ))}
    </div>
  )}

  {selectedOption === "Media" && (
    <div className="gap-4 grid grid-cols-3">
      {dummyMedia.map((media, index) => (
        <div key={index} className="p-2">
          <img
            src={media.src}
            alt={media.alt}
            className="shadow-md rounded-lg w-full h-full object-cover"
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
