// src/ChatApp.jsx
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Chat from "../components/chatComp/Chat";

import { useState } from "react";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import img8 from "../assets/img8.jpeg";
import img9 from "../assets/img9.jpeg";

// Updated list of contacts
const contacts = [
  {
    name: "Revathy",
    image: img8,
    lastMessage: "Hi, I am having a doubt.",
    time: "1:35 PM",
  },
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
    lastMessage: "I have updated the document .",
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

// Updated list of pinned contacts
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
];

const ChatApp = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredContacts, setFilteredContacts] = useState(contacts);
  const [filteredPinnedContacts, setFilteredPinnedContacts] =
    useState(pinnedContacts);

  // Handle the search query and filter contacts
  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    if (query) {
      setFilteredContacts(
        contacts.filter((contact) =>
          contact.name.toLowerCase().includes(query.toLowerCase())
        )
      );
      setFilteredPinnedContacts(
        pinnedContacts.filter((contact) =>
          contact.name.toLowerCase().includes(query.toLowerCase())
        )
      );
    } else {
      setFilteredContacts(contacts);
      setFilteredPinnedContacts(pinnedContacts);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      {/* Left Chat List Section */}
      <div className="w-full lg:w-1/4 border-r border-gray-300 p-2">
        <div className="mb-2 relative">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search contacts"
            className="w-full p-2 pr-10 pl-4 border rounded-md text-sm focus:outline-none focus:border-blue-500"
          />
          <FontAwesomeIcon
            icon={faSearch}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
          />
        </div>

        {/* Pinned Contacts */}
        <h3 className="text-black-500 font-semibold mb-1 text-xl">Pinned</h3>
        <div className="space-y-1">
          {filteredPinnedContacts.map((contact, index) => (
            // <div key={index} className="flex items-start p-1 bg-gray-100 rounded-md hover:bg-gray-200 max-w-full">
            //   <img src={contact.image} alt="User" className="w-6 h-6 rounded-full mr-2" />
            //   <div className="flex-1">
            //     <div className="flex justify-between items-start">
            //       <p className="font-bold text-xs leading-tight">{contact.name}</p>
            //       <span className="text-xs font-semibold text-gray-500 whitespace-nowrap ml-2">{contact.time}</span>
            //     </div>
            //     <p className="text-xs text-gray-600 leading-tight truncate">
            //       {contact.lastMessage}
            //     </p>
            //   </div>
            // </div>
            <div className="flex items-start p-1 bg-gray-100 rounded-md hover:bg-gray-200 max-w-full">
              <img
                src={contact.image}
                alt="User"
                className="w-6 h-6 rounded-full mr-2"
              />
              <div className="flex-1 flex flex-col">
                <div className="flex justify-between items-start">
                  <p className="font-bold text-xs leading-tight">
                    {contact.name}
                  </p>
                  <span className="text-xs font-semibold text-gray-500 whitespace-nowrap ml-2">
                    {contact.time}
                  </span>
                </div>
                <p className="text-xs text-gray-600 leading-tight truncate overflow-hidden text-ellipsis">
                  {contact.lastMessage}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Contacts */}
        <h3 className="text-black-500 font-semibold mb-1 text-xl">Recent</h3>
        <div className="space-y-1">
          {filteredContacts.map((contact, index) => (
            <div
              key={index}
              className="flex items-start p-1 bg-gray-100 rounded-md hover:bg-gray-200 max-w-full"
            >
              <img
                src={contact.image}
                alt="User"
                className="w-6 h-6 rounded-full mr-2"
              />
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <p className="font-bold text-xs leading-tight">
                    {contact.name}
                  </p>
                  <span className="text-xs font-semibold text-gray-500 whitespace-nowrap ml-2">
                    {contact.time}
                  </span>
                </div>
                <p className="text-xs text-gray-600 leading-tight truncate">
                  {contact.lastMessage}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Chat Content Section */}
      <div className="flex-1 flex flex-col">
        {/* <div className="flex items-center justify-between p-4 border-b border-gray-300">
          <h2 className="text-lg font-bold">Design Group</h2>

       

        </div> */}

        <Chat />
      </div>

      {/* Right Chat Content */}
      <div className="p-4">
        {/* Additional content for the right section */}
      </div>
    </div>
  );
};

export default ChatApp;
