import React, { useState } from "react";
import {
  FaPhone,
  FaVideo,
  FaEllipsisV,
  FaUserCircle,
  FaFilePdf,
} from "react-icons/fa";


const GroupChat = ({ contact }) => {
  // Managing menu options and selected option with useState
  const [selectedOption, setSelectedOption] = useState("Chat");

  const menuOptions = ["Chat", "Files", "Media"];

  // Example of using useState with messages
  const messages = [
    {
      user: "Revathy",
      time: "10:30 AM",
      message: "Hi, I am having a doubt on profile Screen.",
      type: "text", // message type: "text", "image", or "pdf"
      attachment: null,
    },
    {
      user: "Revathy",
      time: "10:32 AM",
      message: "Here is the PDF document.",
      type: "pdf", 
      attachment: "Profile_Document.pdf",
    },
    {
      user: "Santosh",
      time: "10:35 AM",
      message: "Hi, I am having a doubt on profile Screen.",
      type: "text",
      attachment: null,
    },
    {
      user: "Santosh",
      time: "10:35 AM",
      message: "Hi, I am having a doubt on profile Screen.",
      type: "text",
      attachment: "Profile_Document.docx",
    },
    {
      user: "Santosh",
      time: "10:40 AM",
      message: "Here is an image for reference.",
      type: "image",
      attachment: "/Images/chat1.jpg",
    },           
    {
      sender: 'Revathy',
      time: '10:30 AM', // Add the timestamp
      message: 'Hi, I am having a doubt on profile Screen.',
      type: "image",
      attachment: "/Images/chat2.jpg",
    },
  ];
  const handleMenuClick = (option) => {
    setSelectedOption(option);
  };

  const renderContent = () => {
    switch (selectedOption) {
      case "Files":
        return (
          <div className="flex flex-col gap-4">
            {messages
              .filter((message) => message.type === "pdf")
              .map((message, index) => (
                <div key={index} className="flex items-center gap-4 bg-white shadow p-4 rounded-lg">
                  <FaFilePdf className="text-red-500 w-6 h-6" />
                  <span>{message.attachment}</span>
                </div>
              ))}
          </div>
        );
      case "Media":
        return (
          <div className="grid grid-cols-2 gap-4">
            {messages
              .filter((message) => message.type === "image")
              .map((message, index) => (
                <div key={index} className="flex items-center gap-2">
                  <img
                    src={message.attachment}
                    alt={`Media ${index}`}
                    className="h-[100px] w-[280px] object-cover rounded-md"
                  />
                </div>
              ))}
          </div>
        );
        case "Chat":
          default:
            return (

              <div className="mb-6 flex-1 p-4 overflow-y-auto scrollbar-hide" style={{overflowY: 'auto' }}>
              {/* Chat Screen */}
         <div className="mt-2 space-y-4">
           {/* First User Message */}
           <div className="flex items-start gap-3">
             {/* Profile Icon */}
             <div className="relative">
               <FaUserCircle className="sm:w-[35px] sm:h-[35px] w-[28px] h-[28px] text-gray-700" />
               {/* Green online dot */}
               <svg xmlns="http://www.w3.org/2000/svg" width="14" height="15" viewBox="0 0 14 15" fill="none" className="absolute bottom-0 right-0">
                 <path d="M7.0013 1.66602C3.79297 1.66602 1.16797 4.29102 1.16797 7.49935C1.16797 10.7077 3.79297 13.3327 7.0013 13.3327C10.2096 13.3327 12.8346 10.7077 12.8346 7.49935C12.8346 4.29102 10.2096 1.66602 7.0013 1.66602ZM5.83464 10.416L2.91797 7.49935L3.74047 6.67685L5.83464 8.76518L10.2621 4.33768L11.0846 5.16602L5.83464 10.416Z" fill="#2EC804" />
                 <path d="M7.0013 1.66602C3.79297 1.66602 1.16797 4.29102 1.16797 7.49935C1.16797 10.7077 3.79297 13.3327 7.0013 13.3327C10.2096 13.3327 12.8346 10.7077 12.8346 7.49935C12.8346 4.29102 10.2096 1.66602 7.0013 1.66602ZM5.83464 10.416L2.91797 7.49935L3.74047 6.67685L5.83464 8.76518L10.2621 4.33768L11.0846 5.16602L5.83464 10.416Z" fill="white" fillOpacity="0.2" />
               </svg>
             </div>
         
             {/* Message Container */}
             <div className="flex flex-col gap-2">
               {/* First Message */}
               <div className="flex flex-col p-2 w-[254px] bg-white shadow rounded-lg">
                 <div className="flex justify-between w-full">
                   <span className="text-black font-semibold text-[14px]">Revathy</span>
                   <span className="text-gray-500 text-[12px]">10:30 AM</span>
                 </div>
                 <p className="text-black text-[14px] leading-normal">
                   Hi, I am having a doubt on profile Screen.
                 </p>
               </div>
         
               {/* Second Message (PDF Attachment with Username) */}
               <div className="flex flex-col p-2 w-[300px] bg-white shadow rounded-lg">
                 {/* Username */}
                 <div className="flex items-center gap-2 mb-2">
                   <span className="text-black text-[14px] font-semibold">Revathy</span>
                 </div>
         
                 {/* PDF Attachment */}
                 <div className="flex items-center gap-2 mb-2 p-2 bg-gray-100 border h-[50px] border-gray-300 rounded-md">
                   <FaFilePdf className="text-red-500 text-[22px]" />
                   <span className="text-black text-[14px] font-semibold">
                     Profile_Document.pdf
                   </span>
                 </div>
         
                 {/* Message */}
                 <p className="text-black text-[14px] leading-normal">
                   Hi, I am having a doubt on profile Screen.
                 </p>
               </div>
             </div>
           </div>
         
           <div className="mt-12"></div>
         
           {/* Second User Message */}
           <div className="flex items-start gap-3">
             {/* Profile Icon */}
             <div className="relative">
               <FaUserCircle className="sm:w-[35px] sm:h-[35px] w-[28px] h-[28px] text-blue-700" />
               {/* Green online dot */}
               <svg xmlns="http://www.w3.org/2000/svg" width="14" height="15" viewBox="0 0 14 15" fill="none" className="absolute bottom-0 right-0">
                 <path d="M7.0013 1.66602C3.79297 1.66602 1.16797 4.29102 1.16797 7.49935C1.16797 10.7077 3.79297 13.3327 7.0013 13.3327C10.2096 13.3327 12.8346 10.7077 12.8346 7.49935C12.8346 4.29102 10.2096 1.66602 7.0013 1.66602ZM5.83464 10.416L2.91797 7.49935L3.74047 6.67685L5.83464 8.76518L10.2621 4.33768L11.0846 5.16602L5.83464 10.416Z" fill="#2EC804" />
                 <path d="M7.0013 1.66602C3.79297 1.66602 1.16797 4.29102 1.16797 7.49935C1.16797 10.7077 3.79297 13.3327 7.0013 13.3327C10.2096 13.3327 12.8346 10.7077 12.8346 7.49935C12.8346 4.29102 10.2096 1.66602 7.0013 1.66602ZM5.83464 10.416L2.91797 7.49935L3.74047 6.67685L5.83464 8.76518L10.2621 4.33768L11.0846 5.16602L5.83464 10.416Z" fill="white" fillOpacity="0.2" />
               </svg>
             </div>
         
             {/* Message Container */}
             <div className="flex flex-col gap-2">
               {/* First Message */}
               <div className="flex flex-col p-2 w-[254px] bg-white shadow rounded-lg">
                 <div className="flex justify-between w-full">
                   <span className="text-black font-semibold text-[14px]">Santosh</span>
                   <span className="text-gray-500 text-[12px]">10:30 AM</span>
                 </div>
                 <p className="text-black text-[14px] leading-normal">
                   Hi, I am having a doubt on profile Screen.
                 </p>
               </div>
         
               {/* Image Message */}
               <div className="flex flex-col p-2 sm:w-[482px] w-[250px] bg-white shadow rounded-lg">
                 {/* Username */}
                 <div className="flex items-center gap-1 mb-0">
                   <span className="text-black text-[14px] font-semibold">Santosh</span>
                 </div>
         
                 {/* Image Attachment */}
                 <div className="flex items-center gap-1">
                   <img src="/Images/chat1.jpg" alt="specification" className="h-[110px] p-2" />
                 </div>
         
                 {/* Message */}
                 <p className="text-black text-[14px] leading-normal mt-0">
                   Hi, I am having a doubt on profile Screen.
                 </p>
               </div>
             </div>
           </div>
         
           <div className="flex items-start gap-3">
             {/* Profile Icon */}
             <div className="relative">
               <FaUserCircle className="sm:w-[35px] sm:h-[35px] w-[28px] h-[28px] text-grey-700" />
               {/* Green online dot */}
               <svg xmlns="http://www.w3.org/2000/svg" width="14" height="15" viewBox="0 0 14 15" fill="none" className="absolute bottom-0 right-0">
                 <path d="M7.0013 1.66602C3.79297 1.66602 1.16797 4.29102 1.16797 7.49935C1.16797 10.7077 3.79297 13.3327 7.0013 13.3327C10.2096 13.3327 12.8346 10.7077 12.8346 7.49935C12.8346 4.29102 10.2096 1.66602 7.0013 1.66602ZM5.83464 10.416L2.91797 7.49935L3.74047 6.67685L5.83464 8.76518L10.2621 4.33768L11.0846 5.16602L5.83464 10.416Z" fill="#2EC804" />
                 <path d="M7.0013 1.66602C3.79297 1.66602 1.16797 4.29102 1.16797 7.49935C1.16797 10.7077 3.79297 13.3327 7.0013 13.3327C10.2096 13.3327 12.8346 10.7077 12.8346 7.49935C12.8346 4.29102 10.2096 1.66602 7.0013 1.66602ZM5.83464 10.416L2.91797 7.49935L3.74047 6.67685L5.83464 8.76518L10.2621 4.33768L11.0846 5.16602L5.83464 10.416Z" fill="white" fillOpacity="0.2" />
               </svg>
             </div>
         
             {/* Message Container */}
             <div className="flex flex-col gap-2">
               {/* First Message */}
              
         
               {/* Image Message */}
               <div className="flex flex-col p-2 sm:w-[482px] w-[250px] bg-white shadow rounded-lg">
                 {/* Username */}
                 <div className="flex items-center gap-1 mb-0">
                   <span className="text-black text-[14px] font-semibold">Reavathy</span>
                 </div>
         
                 {/* Image Attachment */}
                 <div className="flex items-center gap-1">
                   <img src="/Images/chat2.jpg" alt="specification" className="h-[110px] p-2" />
                 </div>
         
                 {/* Message */}
                 <p className="text-black text-[14px] leading-normal mt-0">
                   Hi, I am having a doubt on profile Screen.
                 </p>
               </div>
             </div>
           </div>
         
         
           <div className="mt-10"></div>
           <div className="flex justify-end sm:justify-end w-full">
           <div className="flex flex-col gap-2">
             {/* First Message for User */}
             <div className="flex flex-col p-2 w-[280px] sm:w-[410px] min-h-[34px] bg-[#E5FDF7] shadow rounded-lg justify-end">
               <div className="flex justify-between w-full mb-2">
                 <span className="text-black font-semibold text-[14px]">
                   You
                 </span>
                 <span className="text-gray-500 text-[12px]">10:45 AM</span>
               </div>
               <p className="text-black text-[14px] leading-normal text-left item">
                 Hi, I am having a doubt on profile Screen.
               </p>
             </div>
         
             {/* Second Message for User */}
             <div className="flex flex-col p-2 w-[280px] sm:w-[410px] bg-[#E5FDF7] shadow rounded-lg justify-end">
               <p className="text-black text-[14px] leading-normal text-left">
                 Yes, Sure!
               </p>
             </div>
           </div>
         </div>
         
           {/* More messages can follow the same structure */}
         </div>
         
         
         
             </div>
            );
      }
    };




  
    return (
      <div>
        {/* Header */}
        <div className="flex items-center justify-between sm:w-[100%] w-[95%] h-[60px] bg-white shadow-md px-5 sticky top-0 z-10 mb-2">
          <div className="flex items-center gap-3">
            {contact?.image ? (
              <img
                src={contact.image}
                alt="Profile"
                className="sm:w-[38px] sm:h-[38px] w-[30px] h-[30px] rounded-full object-cover"
              />
            ) : (
              <FaUserCircle className="w-[38px] h-[38px] text-pink-700" />
            )}
            <span className="text-black font-semibold text-[12px] sm:text-[15px]">
              {contact?.name || "Group Chat"}
            </span>
            <div className="flex items-center gap-4 ml-4">
              {["Chat", "Files", "Media"].map((option, index) => (
                <span
                  key={index}
                  onClick={() => handleMenuClick(option)}
                  className={`cursor-pointer text-[15px] font-[500] ${
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
            <FaPhone className="text-gray-700 sm:w-5 sm:h-5 w-3 h-3 cursor-pointer" />
            <FaVideo className="text-gray-700 sm:w-5 sm:h-5 w-3 h-3 cursor-pointer" />
            <FaEllipsisV className="text-gray-700 sm:w-5 sm:h-5 w-3 h-3 cursor-pointer" />
          </div>
        </div>
  
        {/* Content */}
        <div className="mb-6 flex-1 p-4 overflow-y-auto">{renderContent()}</div>
      </div>
    );
  };
  
  export default GroupChat;
