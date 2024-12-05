// import { useState } from "react";
// import {
//   FaPhone,
//   FaVideo,
//   FaEllipsisV,
//   FaUserCircle,
//   FaFilePdf,
// } from "react-icons/fa";
// import VideoCall from "./VideoCall";
// import VoiceCall from "./VoiceCall";
// import { FaArrowLeft } from "react-icons/fa";

// const GroupChat = ({ contact, handleBackToContacts }) => {
//   // Managing menu options and selected option with useState
//   const [selectedOption, setSelectedOption] = useState("Chat");
//   const [activeFeature, setActiveFeature] = useState(null);

//   const menuOptions = ["Chat", "Files", "Media"];

//   // Example of using useState with messages
//   const messages = [
//     {
//       user: "Revathy",
//       time: "10:30 AM",
//       message: "Hi, I am having a doubt on profile Screen.",
//       type: "text", // message type: "text", "image", or "pdf"
//       attachment: null,
//     },
//     {
//       user: "Revathy",
//       time: "10:32 AM",
//       message: "Here is the PDF document.",
//       type: "pdf",
//       attachment: "Profile_Document.pdf",
//     },
//     {
//       user: "Santosh",
//       time: "10:35 AM",
//       message: "Hi, I am having a doubt on profile Screen.",
//       type: "text",
//       attachment: null,
//     },
//     {
//       user: "Santosh",
//       time: "10:35 AM",
//       message: "Hi, I am having a doubt on profile Screen.",
//       type: "text",
//       attachment: "Profile_Document.docx",
//     },
//     {
//       user: "Santosh",
//       time: "10:40 AM",
//       message: "Here is an image for reference.",
//       type: "image",
//       attachment: "/Images/chat1.jpg",
//     },
//     {
//       sender: "Revathy",
//       time: "10:30 AM", // Add the timestamp
//       message: "Hi, I am having a doubt on profile Screen.",
//       type: "image",
//       attachment: "/Images/chat2.jpg",
//     },
//   ];
//   const handleMenuClick = (option) => {
//     setSelectedOption(option);
//   };

//   const handleIconClick = (feature) => {
//     setActiveFeature(feature); // Set the feature (VideoCall or VoiceCall)
//   };

//   const closeFeature = () => {
//     setActiveFeature(null); // Close the overlay
//   };

//   const renderContent = () => {
//     switch (selectedOption) {
//       case "Files":
//         return (
//           <div className="flex flex-col gap-4">
//             {messages
//               .filter((message) => message.type === "pdf")
//               .map((message, index) => (
//                 <div
//                   key={index}
//                   className="flex items-center gap-4 bg-white shadow p-4 rounded-lg"
//                 >
//                   <FaFilePdf className="w-6 h-6 text-red-500" />
//                   <span>{message.attachment}</span>
//                 </div>
//               ))}
//           </div>
//         );
//       case "Media":
//         return (
//           <div className="gap-4 grid grid-cols-2">
//             {messages
//               .filter((message) => message.type === "image")
//               .map((message, index) => (
//                 <div key={index} className="flex items-center gap-2">
//                   <img
//                     src={message.attachment}
//                     alt={`Media ${index}`}
//                     className="rounded-md w-[280px] h-[100px] object-cover"
//                   />
//                 </div>
//               ))}
//           </div>
//         );
//       case "Chat":
//       default:
//         return (
//           <div className="flex-1 overflow-y-auto scrollbar-hide p-4 mt-10 mb-10">
//             {/* Chat Screen */}
//             <div className="mt-0">
//               {/* First User Message */}
//               <div className="flex items-start gap-2">
//                 {/* Profile Icon */}
//                 <div className="relative">
//                   <FaUserCircle className="w-8 sm:w-9 h-8 sm:h-9 text-gray-700" />
//                   {/* Green online dot */}
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     width="14"
//                     height="15"
//                     viewBox="0 0 14 15"
//                     fill="none"
//                     className="right-0 bottom-0 absolute"
//                   >
//                     <path
//                       d="M7.0013 1.66602C3.79297 1.66602 1.16797 4.29102 1.16797 7.49935C1.16797 10.7077 3.79297 13.3327 7.0013 13.3327C10.2096 13.3327 12.8346 10.7077 12.8346 7.49935C12.8346 4.29102 10.2096 1.66602 7.0013 1.66602ZM5.83464 10.416L2.91797 7.49935L3.74047 6.67685L5.83464 8.76518L10.2621 4.33768L11.0846 5.16602L5.83464 10.416Z"
//                       fill="#2EC804"
//                     />
//                     <path
//                       d="M7.0013 1.66602C3.79297 1.66602 1.16797 4.29102 1.16797 7.49935C1.16797 10.7077 3.79297 13.3327 7.0013 13.3327C10.2096 13.3327 12.8346 10.7077 12.8346 7.49935C12.8346 4.29102 10.2096 1.66602 7.0013 1.66602ZM5.83464 10.416L2.91797 7.49935L3.74047 6.67685L5.83464 8.76518L10.2621 4.33768L11.0846 5.16602L5.83464 10.416Z"
//                       fill="white"
//                       fillOpacity="0.2"
//                     />
//                   </svg>
//                 </div>

//                 <div className="flex flex-col gap-2">
//                   {/* First Message */}
//                   <div className="flex flex-col bg-white shadow p-2 rounded-lg w-64">
//                     <div className="flex justify-between w-full">
//                       <span className="font-semibold text-base text-black">
//                         Revathy
//                       </span>
//                       <span className="text-gray-500 text-sm">10:30 AM</span>
//                     </div>
//                     <p className="text-base text-black leading-normal">
//                       Hi, I am having a doubt on profile Screen.
//                     </p>
//                   </div>

//                   {/* Second Message (PDF Attachment with Username) */}
//                   <div className="flex flex-col bg-white shadow p-2 rounded-lg w-72">
//                     {/* Username */}
//                     <div className="flex items-center gap-2 mb-2">
//                       <span className="font-semibold text-base text-black">
//                         Revathy
//                       </span>
//                     </div>

//                     {/* PDF Attachment */}
//                     <div className="flex items-center gap-2 border-gray-300 bg-gray-100 mb-2 p-2 border rounded-md h-12">
//                       <FaFilePdf className="text-red-500 text-xl" />
//                       <span className="font-semibold text-black text-sm">
//                         Profile_Document.pdf
//                       </span>
//                     </div>

//                     {/* Message */}
//                     <p className="text-base text-black leading-normal">
//                       Hi, I am having a doubt on profile Screen.
//                     </p>
//                   </div>
//                 </div>
//               </div>

//               <div className="mt-5"></div>

//               {/* Second User Message */}
//               <div className="flex items-start gap-3">
//                 {/* Profile Icon */}
//                 <div className="relative">
//                   <FaUserCircle className="w-8 sm:w-9 h-8 sm:h-9 text-blue-600" />
//                   {/* Green online dot */}
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     width="14"
//                     height="15"
//                     viewBox="0 0 14 15"
//                     fill="none"
//                     className="right-0 bottom-0 absolute"
//                   >
//                     <path
//                       d="M7.0013 1.66602C3.79297 1.66602 1.16797 4.29102 1.16797 7.49935C1.16797 10.7077 3.79297 13.3327 7.0013 13.3327C10.2096 13.3327 12.8346 10.7077 12.8346 7.49935C12.8346 4.29102 10.2096 1.66602 7.0013 1.66602ZM5.83464 10.416L2.91797 7.49935L3.74047 6.67685L5.83464 8.76518L10.2621 4.33768L11.0846 5.16602L5.83464 10.416Z"
//                       fill="#2EC804"
//                     />
//                     <path
//                       d="M7.0013 1.66602C3.79297 1.66602 1.16797 4.29102 1.16797 7.49935C1.16797 10.7077 3.79297 13.3327 7.0013 13.3327C10.2096 13.3327 12.8346 10.7077 12.8346 7.49935C12.8346 4.29102 10.2096 1.66602 7.0013 1.66602ZM5.83464 10.416L2.91797 7.49935L3.74047 6.67685L5.83464 8.76518L10.2621 4.33768L11.0846 5.16602L5.83464 10.416Z"
//                       fill="white"
//                       fillOpacity="0.2"
//                     />
//                   </svg>
//                 </div>

//                 {/* Message Container */}
//                 <div className="flex flex-col gap-2">
//                   {/* First Message */}
//                   <div className="flex flex-col bg-white shadow p-2 rounded-lg w-64">
//                     <div className="flex justify-between w-full">
//                       <span className="font-semibold text-base text-black">
//                         Santosh
//                       </span>
//                       <span className="text-gray-500 text-sm">10:30 AM</span>
//                     </div>
//                     <p className="text-base text-black leading-normal">
//                       Hi, I am having a doubt on profile Screen.
//                     </p>
//                   </div>

//                   {/* Image Message */}
//                   <div className="flex flex-col bg-white shadow p-2 rounded-lg w-64 sm:w-[482px]">
//                     {/* Username */}
//                     <div className="flex items-center gap-1 mb-0">
//                       <span className="font-semibold text-black text-sm">
//                         Santosh
//                       </span>
//                     </div>

//                     {/* Image Attachment */}
//                     <div className="flex items-center gap-1">
//                       <img
//                         src="/Images/chat1.jpg"
//                         alt="specification"
//                         className="p-2 h-28"
//                       />
//                     </div>

//                     {/* Message */}
//                     <p className="mt-0 text-black text-sm leading-normal">
//                       Hi, I am having a doubt on profile Screen.
//                     </p>
//                   </div>
//                 </div>
//               </div>

//               <div className="mt-5"></div>

//               <div className="flex items-start gap-3">
//                 {/* Profile Icon */}
//                 <div className="relative">
//                   <FaUserCircle className="w-8 sm:w-9 h-8 sm:h-9 text-gray-700" />
//                   {/* Green online dot */}
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     width="14"
//                     height="15"
//                     viewBox="0 0 14 15"
//                     fill="none"
//                     className="right-0 bottom-0 absolute"
//                   >
//                     <path
//                       d="M7.0013 1.66602C3.79297 1.66602 1.16797 4.29102 1.16797 7.49935C1.16797 10.7077 3.79297 13.3327 7.0013 13.3327C10.2096 13.3327 12.8346 10.7077 12.8346 7.49935C12.8346 4.29102 10.2096 1.66602 7.0013 1.66602ZM5.83464 10.416L2.91797 7.49935L3.74047 6.67685L5.83464 8.76518L10.2621 4.33768L11.0846 5.16602L5.83464 10.416Z"
//                       fill="#2EC804"
//                     />
//                     <path
//                       d="M7.0013 1.66602C3.79297 1.66602 1.16797 4.29102 1.16797 7.49935C1.16797 10.7077 3.79297 13.3327 7.0013 13.3327C10.2096 13.3327 12.8346 10.7077 12.8346 7.49935C12.8346 4.29102 10.2096 1.66602 7.0013 1.66602ZM5.83464 10.416L2.91797 7.49935L3.74047 6.67685L5.83464 8.76518L10.2621 4.33768L11.0846 5.16602L5.83464 10.416Z"
//                       fill="white"
//                       fillOpacity="0.2"
//                     />
//                   </svg>
//                 </div>

//                 {/* Message Container */}
//                 <div className="flex flex-col gap-2">
//                   {/* Image Message */}
//                   <div className="flex flex-col bg-white shadow p-2 rounded-lg w-64 sm:w-[30rem]">
//                     {/* Username */}
//                     <div className="flex justify-between gap-1 mb-0">
//                       <span className="flex font-semibold text-base text-black">
//                         Reavathy
//                       </span>
//                       <span className="text-gray-500 text-sm">10:45 AM</span>
//                     </div>

//                     {/* Image Attachment */}
//                     <div className="flex items-center gap-1">
//                       <img
//                         src="/Images/chat2.jpg"
//                         alt="specification"
//                         className="p-2 h-28"
//                       />
//                     </div>

//                     {/* Message */}
//                     <p className="mt-0 text-base text-black leading-normal">
//                       Hi, I am having a doubt on profile Screen.
//                     </p>
//                   </div>
//                 </div>
//               </div>

//               <div className="mt-5"></div>
//               <div className="flex justify-end w-full">
//                 <div className="flex flex-col gap-2">
//                   {/* First Message for User */}
//                   <div className="flex flex-col justify-end bg-green-100 shadow-md p-2 rounded-lg w-72 sm:w-96 min-h-8">
//                     <div className="flex justify-between mb-2 w-full">
//                       <span className="font-semibold text-base text-black">
//                         You
//                       </span>
//                       <span className="text-gray-500 text-sm">10:45 AM</span>
//                     </div>
//                     <p className="text-base text-black text-left leading-normal">
//                       Hi, I am having a doubt on profile Screen.
//                     </p>
//                   </div>

//                   {/* Second Message for User */}
//                   <div className="flex flex-col justify-end bg-green-100 shadow-md p-2 rounded-lg w-72 sm:w-96">
//                     <p className="text-black text-left text-sm leading-normal">
//                       Yes, Sure!
//                     </p>
//                   </div>
//                 </div>
//               </div>

//               {/* More messages can follow the same structure */}
//             </div>
//           </div>
//         );
//     }
//   };

//   return (
//     <div>
//       {/* Header */}
//       {/* Header */}
//       <div className="flex flex-col flex-1 overflow-hidden">
//         <div className="fixed top-14 sm:mt-2 mt-2 sm:w-[59%] w-[91%] z-10 bg-white shadow-md p-2 sm:mx-0 sm:px-5 flex justify-between items-center h-14">
//           {/* Left Side */}
//           <div className="flex items-center gap-2 sm:gap-3">
//             <button
//               onClick={handleBackToContacts}
//               className="sm:top-1/2 sm:left-4 sm:absolute flex items-center lg:hidden text-blue-500 sm:-translate-y-1/2"
//             >
//               <FaArrowLeft className="text-3xl" />
//             </button>
//             {contact?.image ? (
//               <img
//                 src={contact.image}
//                 alt="Profile"
//                 className="rounded-full w-8 sm:w-9 h-8 sm:h-9 object-cover"
//               />
//             ) : (
//               <FaUserCircle className="w-9 h-9 text-pink-700" />
//             )}
//             <span className="font-semibold text-black text-sm sm:text-sm">
//               {contact?.name}
//             </span>
//             <div className="flex items-center gap-3 sm:gap-4 ml-0 sm:ml-4">
//               {menuOptions.map((option, index) => (
//                 <span
//                   key={index}
//                   onClick={() => setSelectedOption(option)}
//                   className={`cursor-pointer sm:text-base text-sm font-medium ${
//                     selectedOption === option
//                       ? "border-b-2 border-teal-500"
//                       : "text-gray-500"
//                   }`}
//                 >
//                   {option}
//                 </span>
//               ))}
//             </div>
//           </div>
//           <div className="flex items-center gap-3 sm:gap-4">
//             <FaPhone
//               className="w-4 sm:w-5 h-4 sm:h-5 text-gray-700 cursor-pointer"
//               onClick={() => handleIconClick("VoiceCall")}
//             />
//             <FaVideo
//               className="w-4 sm:w-5 h-4 sm:h-5 text-gray-700 cursor-pointer"
//               onClick={() => handleIconClick("VideoCall")}
//             />
//             <FaEllipsisV className="w-4 sm:w-5 h-4 sm:h-5 text-gray-700 cursor-pointer" />
//           </div>
//         </div>

//         {/* Overlay for Active Feature */}
//         {/* Overlay for Active Feature */}
//         {activeFeature && (
//           <div className="z-50 fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
//             <div className="relative top-9 bg-white shadow-lg p-6 rounded-lg w-full max-w-[800px] h-[90%]">
//               {/* Close Button */}
//               <button
//                 className="top-3 right-3 absolute font-bold text-red-600"
//                 onClick={closeFeature} // Call to close the overlay
//               >
//                 Close
//               </button>

//               {/* Render Active Feature */}
//               {activeFeature === "VideoCall" && (
//                 <VideoCall closeFeature={closeFeature} />
//               )}
//               {activeFeature === "VoiceCall" && (
//                 <VoiceCall closeFeature={closeFeature} />
//               )}
//             </div>
//           </div>
//         )}

//         {/* Content */}
//         <div className="flex-1 mb-6 p-4 overflow-y-auto">{renderContent()}</div>
//       </div>
//     </div>
//   );
// };

// export default GroupChat;
