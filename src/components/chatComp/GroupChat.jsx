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
  const [designMessages, setDesignMessages] = useState([
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
  ]);

  const [devMessages, setDevMessages] = useState([
    {
      user: "John",
      time: "11:00 AM",
      message: "Hey, I need help with the login page issue.",
      type: "text",
      attachment: null,
    },
    {
      user: "Alex",
      time: "11:05 AM",
      message: "I have attached the code for the login page.",
      type: "code",
      attachment: "/Files/login_code.js",
    },
    {
      user: "Sarah",
      time: "11:10 AM",
      message: "Can someone look into the database connection issue?",
      type: "text",
      attachment: null,
    },
    {
      user: "Sarah",
      time: "11:15 AM",
      message: "I found the issue with the connection string.",
      type: "text",
      attachment: null,
    },
    {
      user: "John",
      time: "11:20 AM",
      message: "Thanks, Sarah! I will update the connection string.",
      type: "text",
      attachment: null,
    },
  ]);


  
  return (
  
  <div className="flex flex-col h-full">
     <div className="flex items-center justify-between w-full h-[60px] bg-white shadow-md px-5">
        {/* Left Side */}
        <div className="flex items-center sm:gap-3 gap-2">
          {contact?.image ? (
            <img
              src={contact.image}
              alt="Profile"
              className="sm:w-[38px] sm:h-[38px] w-[30px] h-[30px] rounded-full object-cover"
            />
          ) : (
            <FaUserCircle className="sm:w-[38px] sm:h-[38px] w-[30px] h-[30px]  text-pink-700" />
          )}
          <span className="text-black font-semibold text-[15px]">{contact?.name}</span>
          <div className="flex items-center gap-4 ml-4">
            {menuOptions &&
              menuOptions.map((option, index) => (
                <span
                  key={index}
                  onClick={() => setSelectedOption(option)}
                  className={`cursor-pointer text-[15px] font-[500] ${
                    selectedOption === option ? "border-b-2 border-[#01C2B5]" : "text-gray-500"
                  }`}
                >
                  {option}
                </span>
              ))}
          </div>
        </div>
        {/* Right Side */}
        <div className="flex items-center sm:gap-4 gap-2">
          <FaPhone className="text-gray-700 sm:w-5 sm:h-5 w-3 h-3 cursor-pointer" />
          <FaVideo className="text-gray-700 sm:w-5 sm:h-5 w-3 h-3 cursor-pointer" />
          <FaEllipsisV className="text-gray-700 sm:w-5 sm:h-5 w-3 h-3 cursor-pointer" />
        </div>
      </div>
    <div className="flex-1 p-4 overflow-y-hidden">
     {/* Chat Screen */}
<div className="mt-8 space-y-4">
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
    <div class="bottom-1 flex mx-3 w-[97%] h-10 p-2 justify-between items-center bg-white border border-[#9B9797] rounded-full shadow-lg">
        <div class="flex gap-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 16 16"
            fill="none"
          >
            <path
              d="M7.9987 14.6673C4.3167 14.6673 1.33203 11.6827 1.33203 8.00065C1.33203 4.31865 4.3167 1.33398 7.9987 1.33398C11.6807 1.33398 14.6654 4.31865 14.6654 8.00065C14.6654 11.6827 11.6807 14.6673 7.9987 14.6673Z"
              stroke="#39383A"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M11 9.66797C11 9.66797 10 11.0013 8 11.0013C6 11.0013 5 9.66797 5 9.66797"
              stroke="#39383A"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M10.332 6.00065C10.2436 6.00065 10.1588 5.96553 10.0963 5.90302C10.0338 5.84051 9.9987 5.75572 9.9987 5.66732C9.9987 5.57891 10.0338 5.49413 10.0963 5.43162C10.1588 5.3691 10.2436 5.33398 10.332 5.33398C10.4204 5.33398 10.5052 5.3691 10.5677 5.43162C10.6302 5.49413 10.6654 5.57891 10.6654 5.66732C10.6654 5.75572 10.6302 5.84051 10.5677 5.90302C10.5052 5.96553 10.4204 6.00065 10.332 6.00065ZM5.66536 6.00065C5.57696 6.00065 5.49217 5.96553 5.42966 5.90302C5.36715 5.84051 5.33203 5.75572 5.33203 5.66732C5.33203 5.57891 5.36715 5.49413 5.42966 5.43162C5.49217 5.3691 5.57696 5.33398 5.66536 5.33398C5.75377 5.33398 5.83855 5.3691 5.90107 5.43162C5.96358 5.49413 5.9987 5.57891 5.9987 5.66732C5.9987 5.75572 5.96358 5.84051 5.90107 5.90302C5.83855 5.96553 5.75377 6.00065 5.66536 6.00065Z"
              fill="#39383A"
              stroke="#39383A"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="25"
            viewBox="0 0 18 18"
            fill="none"
          >
            <path
              d="M7.59531 6.7507V11.8079C7.60115 12.1777 7.75216 12.5304 8.01574 12.7899C8.27932 13.0493 8.63435 13.1947 9.0042 13.1947C9.37405 13.1947 9.72907 13.0493 9.99266 12.7899C10.2562 12.5304 10.4072 12.1777 10.4131 11.8079L10.4177 5.17921C10.4215 4.86313 10.3625 4.54944 10.2442 4.25631C10.1259 3.96318 9.95062 3.69645 9.72847 3.47158C9.50631 3.2467 9.24172 3.06817 8.95005 2.94632C8.65838 2.82446 8.34542 2.76172 8.02932 2.76172C7.71321 2.76172 7.40025 2.82446 7.10858 2.94632C6.81691 3.06817 6.55232 3.2467 6.33017 3.47158C6.10801 3.69645 5.93269 3.96318 5.81439 4.25631C5.69608 4.54944 5.63714 4.86313 5.64098 5.17921V11.8526C5.63454 12.2976 5.71662 12.7394 5.88246 13.1524C6.04829 13.5654 6.29457 13.9413 6.60698 14.2582C6.91938 14.5752 7.29168 14.8269 7.70222 14.9987C8.11276 15.1705 8.55336 15.2589 8.9984 15.2589C9.44344 15.2589 9.88403 15.1705 10.2946 14.9987C10.7051 14.8269 11.0774 14.5752 11.3898 14.2582C11.7022 13.9413 11.9485 13.5654 12.1143 13.1524C12.2802 12.7394 12.3623 12.2976 12.3558 11.8526V5.61656"
              stroke="#5D5B6C"
              stroke-miterlimit="10"
              stroke-linecap="round"
            />
          </svg>
        </div>

        <input
          type="text"
          placeholder="Type a message..."
          class="flex-grow text-gray-700 border-none outline-none px-2 font-[700]"
        />

        <div class="flex items-center justify-center bg-[#01C2B5] rounded-full w-10 h-10 right-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="16"
            viewBox="0 0 14 16"
            fill="none"
          >
            <path
              d="M9.85491 7.42941C9.85491 8.18717 9.55389 8.9139 9.01807 9.44971C8.48225 9.98553 7.75553 10.2866 6.99777 10.2866C6.24001 10.2866 5.51328 9.98553 4.97746 9.44971C4.44164 8.9139 4.14062 8.18717 4.14062 7.42941V3.42941C4.14063 2.67165 4.44164 1.94492 4.97746 1.4091C5.51328 0.873285 6.24001 0.572266 6.99777 0.572266C7.75553 0.572266 8.48225 0.873285 9.01807 1.4091C9.55389 1.94492 9.85491 2.67165 9.85491 3.42941V7.42941Z"
              stroke="white"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M12.7137 8C12.7152 8.67579 12.5833 9.34523 12.3253 9.96987C12.0674 10.5945 11.6887 11.1621 11.2108 11.6399C10.7329 12.1178 10.1654 12.4965 9.54075 12.7544C8.91611 13.0124 8.24668 13.1444 7.57088 13.1429H6.42803C5.75223 13.1444 5.0828 13.0124 4.45816 12.7544C3.83352 12.4965 3.26598 12.1178 2.78812 11.6399C2.31026 11.1621 1.9315 10.5945 1.67358 9.96987C1.41566 9.34523 1.28366 8.67579 1.28517 8M6.99945 13.1429V15.4286"
              stroke="white"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
      </div>
  </div>
);
}
export default GroupChat;
