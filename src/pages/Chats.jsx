import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import Chat from "../components/chatComp/Chat";
import img8 from "../assets/img8.jpeg";
import img9 from "../assets/img9.jpeg";


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

const pinnedContacts = [

  {
    name: "Revathy",
    image: img8,
    lastMessage: "Hi, I am having a doubt",
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

  const [selectedContact, setSelectedContact] = useState(null);

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

  const handleContactClick = (contact) => {
    setSelectedContact(contact); // Update the selected contact
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      {/* Left Sidebar */}
      <div className="w-full lg:w-1/4 border-r border-gray-300 p-2">
        {/* Top Bar with "Chats" Text and 3 Dots Icon */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold">Chats</h3>
          <FontAwesomeIcon
            icon={faEllipsisV}
            className="text-xl cursor-pointer hover:text-gray-500"
          />
        </div>

        {/* Search Bar */}
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
            <div
              key={index}
              className="flex items-start p-1 bg-gray-100 rounded-md hover:bg-gray-200 max-w-full cursor-pointer"
              onClick={() => handleContactClick(contact)} // Click handler
            >
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
              className="flex items-start p-1 bg-gray-100 rounded-md hover:bg-gray-200 max-w-full cursor-pointer"
              onClick={() => handleContactClick(contact)} // Click handler
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
        {selectedContact ? (
          <Chat contact={selectedContact} /> // Pass selected contact to Chat component
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            Select a contact to start chatting
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatApp;
