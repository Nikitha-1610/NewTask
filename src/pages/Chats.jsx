
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaArrowLeft } from "react-icons/fa";
import Picker from "emoji-picker-react";
import Chat from "../components/chatComp/Chat";
import { FaUserCircle, FaPhone, FaVideo, FaEllipsisV } from "react-icons/fa";
import {
  faEllipsisVertical,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import img8 from "../assets/img8.jpeg";
import img9 from "../assets/img9.jpeg";

import GroupChat from "../components/chatComp/GroupChat";
import IndividualChat from "../components/chatComp/IndividualChat";
// Updated list of contacts

const contacts = [
  {
    name: "Sanjay",
    image: img9,
    lastMessage: "Can you help with?",
    time: "2:00 PM",
  },
  {
    name: "Revathy",
    image: img8,
    lastMessage: "Let's catch up soon.",
    time: "3:30 PM",
  },
  {
    name: "John",
    image: img9,
    lastMessage: "I need some feedback",
    time: "4:00 PM",
  },
  {
    name: "Alice",
    image: img8,
    lastMessage: "The meeting was great.",
    time: "5:15 PM",
  },
  {
    name: "Raj",
    image: img9,
    lastMessage: "I sent the project details.",
    time: "6:00 PM",
  },
  {
    name: "Anu",
    image: img8,
    lastMessage: "Can we schedule a call?",
    time: "7:00 PM",
  },
  {
    name: "David",
    image: img9,
    lastMessage: "The deadline is tomorrow",
    time: "8:00 PM",
  },
  {
    name: "Sarah",
    image: img8,
    lastMessage: "I have updated the document.",
    time: "9:30 PM",
  },
  {
    name: "Vinay",
    image: img9,
    lastMessage: "Please review my changes.",
    time: "10:00 PM",
  },
  {
    name: "Ananya",
    image: img8,
    lastMessage: "Let's discuss.",
    time: "11:15 PM",
  },
];

// 
const pinnedContacts = [
  {
    name: "Revathy",
    image: img8,
    lastMessage: "Hi, I am having a doubt ",
    time: "1:35 PM",
  },
  {
    name: "Sanjay",
    image: img9,
    lastMessage: "Can you help me with?",
    time: "2:00 PM",
  },
  {
    name: "Raj",
    image: img9,
    lastMessage: "I sent the project details.",
    time: "6:00 PM",
  },
  {
    name: "Maya",
    image: img8,
    lastMessage: "Can we schedule a call?",
    time: "7:00 PM",
  },
  {
    name: "Design Group",
    image: img9,
    lastMessage: "Hi, I am having a doubt",
    time: "1:35 PM",
  },
];


const removeDuplicates = (array) => {
  return array.filter(
    (value, index, self) =>
      index === self.findIndex((t) => t.name === value.name)
  );
};

const ChatApp = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredContacts, setFilteredContacts] = useState(contacts);
  const [filteredPinnedContacts, setFilteredPinnedContacts] =
    useState(pinnedContacts);
  const [selectedContact, setSelectedContact] = useState(null);
  const [selectedOption, setSelectedOption] = useState("Chat");

  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [message, setMessage] = useState("");
  const [isLeftVisible, setIsLeftVisible] = useState(false);
  const handleEmojiClick = (event, emojiObject) => {
    setMessage((prevMessage) => prevMessage + emojiObject.emoji);
  };

  const handleAttachmentClick = () => {
    document.getElementById("fileInput").click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log("File selected:", file.name);
    }
  };

  const menuOptions = ["Chat", "Files", "Media"];

  // Handle search input change
  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    if (query) {
      setFilteredContacts(
        removeDuplicates(
          contacts.filter((contact) =>
            contact.name.toLowerCase().includes(query.toLowerCase())
          )
        )
      );
      setFilteredPinnedContacts(
        removeDuplicates(
          pinnedContacts.filter((contact) =>
            contact.name.toLowerCase().includes(query.toLowerCase())
          )
        )
      );
    } else {
      setFilteredContacts(removeDuplicates(contacts));
      setFilteredPinnedContacts(removeDuplicates(pinnedContacts));
    }
  };

  // Handle selecting a contact
  const handleContactClick = (contact) => {
    setSelectedContact(contact);
  };

  // Handle returning to the contact list
  const handleBackToContacts = () => {
    console.log("Back button clicked");
    setIsLeftVisible(true);
    setSelectedContact(null);


  };

  return (

    <div className="flex flex-col sm:flex-row min-h-screen ">
      {/* Contacts List Section */}
      {(!selectedContact || window.innerWidth >= 1024) && (
        <div className="w-full lg:w-1/4 border-r border-gray-300  overflow-y-auto scrollbar-hide h-screen sticky top-0 bg-white z-20 ">
          {/* Header */}
          <div className="mb-2 sticky top-0 bg-white z-10">
            <div className="flex items-center justify-between mb-2">
              {/* <h3 className="sm:text-2xl text-[28px] font-semibold text-gray-800">
                Chats
              </h3> */}
              <h3 className="text-lg sm:text-2xl text-[28px] font-semibold text-gray-800">
                Chats
              </h3>

              <FontAwesomeIcon
                icon={faEllipsisVertical}
                className="text-gray-500 text-lg cursor-pointer"
              />
            </div>

            {/* Search Bar */}
            <div className="relative ">
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search contacts"
                className="w-full p-2 pr-10 pl-4 border rounded-md sm:text-sm text-[18px] focus:outline-none focus:border-blue-500"
              />
              <FontAwesomeIcon
                icon={faSearch}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              />
            </div>
          </div>

          {/* Pinned Contacts */}
          {/* <h3 className="text-black-500 font-semibold mb-1 text-xl">Pinned</h3>
          <div className="space-y-1 overflow-y-auto">
            {filteredPinnedContacts.map((contact, index) => (
              <div
                key={index}
                className="flex items-start p-2 bg-gray-100 rounded-md hover:bg-gray-200"
                onClick={() => handleContactClick(contact)}
              >
                <img
                  src={contact.image}
                  alt="User"
                  className="w-8 h-8 rounded-full mr-2"
                />
                <div className="flex-1">
                  <p className="font-bold sm:text-xs text-[14px] leading-tight">
                    {contact.name}
                  </p>
                  <p className="sm:text-xs text-[14px] text-gray-600 truncate">
                    {contact.lastMessage}
                  </p>
                </div>
              </div>
            ))}
          </div> */}

          {/* Pinned Contacts */}
          <h3 className="text-black-500 font-semibold mb-1 text-xl">Pinned</h3>
          <div className="space-y-1 overflow-y-auto">
            {filteredPinnedContacts.map((contact, index) => (
              <div
                key={index}
                className="flex items-start p-2 bg-gray-100 rounded-md hover:bg-gray-200"
                onClick={() => handleContactClick(contact)}
              >
                <img
                  src={contact.image}
                  alt="User"
                  className="w-8 h-8 rounded-full mr-2"
                />
                <div className="flex-1">

                  <p className="font-bold text-lg sm:text-xs text-[14px] leading-tight">
                    {contact.name}
                  </p>
                  <p className="text-base sm:text-xs text-[14px] text-gray-600 truncate">
                    {contact.lastMessage}
                  </p>
                </div>
              </div>
            ))}
          </div>




          {/* Recent Contacts */}
          <h3 className="text-black-500 font-semibold mb-1 sm:text-xl text-[22px]">
            Recent
          </h3>
          <div className="space-y-1 overflow-y-auto">
            {filteredContacts.map((contact, index) => (
              <div
                key={index}
                className="flex items-start p-2 bg-gray-100 rounded-md hover:bg-gray-200"
                onClick={() => handleContactClick(contact)}
              >
                <img
                  src={contact.image}
                  alt="User"
                  className="w-8 h-8 rounded-full mr-2"
                />
                <div className="flex-1">

                  <p className="font-bold text-lg sm:text-xs text-[14px] leading-tight">
                    {contact.name}
                  </p>
                  <p className="text-base sm:text-xs text-[14px] text-gray-600 truncate">
                    {contact.lastMessage}
                  </p>

                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Chat Content Section */}

      {selectedContact && (
        <div className="flex-1 flex flex-col bg-gray-100 overflow-y-auto scrollbar-hide h-screen sticky top-0">
          {/* Back Button with Arrow Icon */}
          <button
            onClick={handleBackToContacts}
            className="p-2 text-blue-500 lg:hidden"
          >
            <FaArrowLeft className="text-3xl" />{" "}
            {/* Use the backward arrow icon */}
          </button>

          {/* Chat Body */}
          <div className="flex-1 p-1 mt-0">
            {selectedContact.name === "Design Group" ? (
              <GroupChat contact={selectedContact} />
            ) : (
              <IndividualChat contact={selectedContact} />
            )}
          </div>

          <div className="bottom-0 mt-4 flex mx-3 w-[97%] h-10 p-2 justify-between items-center bg-white border border-[#9B9797] rounded-full shadow-lg sticky">            {/* Icons */}
            <div className="flex gap-3 relative">
              {/* Emoji Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 16 16"
                fill="none"
                onClick={() => setShowEmojiPicker((prev) => !prev)}
                className="cursor-pointer"
              >
                {/* Emoji icon paths */}

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

              {/* Emoji Picker */}
              {showEmojiPicker && (
                <div className="absolute top-10 left-0">
                  <Picker onEmojiClick={handleEmojiClick} />
                </div>
              )}

              {/* Attachment Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                viewBox="0 0 18 18"
                fill="none"
                onClick={handleAttachmentClick}
                className="cursor-pointer"
              >
                {/* Attachment icon paths */}
                <path
                  d="M7.59531 6.7507V11.8079C7.60115 12.1777 7.75216 12.5304 8.01574 12.7899C8.27932 13.0493 8.63435 13.1947 9.0042 13.1947C9.37405 13.1947 9.72907 13.0493 9.99266 12.7899C10.2562 12.5304 10.4072 12.1777 10.4131 11.8079L10.4177 5.17921C10.4215 4.86313 10.3625 4.54944 10.2442 4.25631C10.1259 3.96318 9.95062 3.69645 9.72847 3.47158C9.50631 3.2467 9.24172 3.06817 8.95005 2.94632C8.65838 2.82446 8.34542 2.76172 8.02932 2.76172C7.71321 2.76172 7.40025 2.82446 7.10858 2.94632C6.81691 3.06817 6.55232 3.2467 6.33017 3.47158C6.10801 3.69645 5.93269 3.96318 5.81439 4.25631C5.69608 4.54944 5.63714 4.86313 5.64098 5.17921V11.8526C5.63454 12.2976 5.71662 12.7394 5.88246 13.1524C6.04829 13.5654 6.29457 13.9413 6.60698 14.2582C6.91938 14.5752 7.29168 14.8269 7.70222 14.9987C8.11276 15.1705 8.55336 15.2589 8.9984 15.2589C9.44344 15.2589 9.88403 15.1705 10.2946 14.9987C10.7051 14.8269 11.0774 14.5752 11.3898 14.2582C11.7022 13.9413 11.9485 13.5654 12.1143 13.1524C12.2802 12.7394 12.3623 12.2976 12.3558 11.8526V5.61656"
                  stroke="#5D5B6C"
                  stroke-miterlimit="10"
                  stroke-linecap="round"
                />
              </svg>
              <input
                type="file"
                id="fileInput"
                className="hidden"
                onChange={handleFileChange}
              />
            </div>


            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-grow text-base sm:text-sm text-gray-700 border-none outline-none px-2 font-[700]"
            />


            {/* Send Button */}
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
      )}
    </div>
  );
};

export default ChatApp;
