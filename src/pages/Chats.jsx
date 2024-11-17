import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Chat from "../components/chatComp/Chat";
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
    setSelectedContact(null);
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      {/* Contacts List Section */}
      {(!selectedContact || window.innerWidth >= 1024) && (
        <div className="w-full lg:w-1/4 border-r border-gray-300 p-2">
          {/* Header */}
          <div className="mb-2">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xl font-semibold text-gray-800">Chats</h3>
              <FontAwesomeIcon
                icon={faEllipsisVertical}
                className="text-gray-500 text-lg cursor-pointer"
              />
            </div>

            {/* Search Bar */}
            <div className="relative">
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
          </div>

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
                  <p className="font-bold text-xs leading-tight">
                    {contact.name}
                  </p>
                  <p className="text-xs text-gray-600 truncate">
                    {contact.lastMessage}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Recent Contacts */}
          <h3 className="text-black-500 font-semibold mb-1 text-xl">Recent</h3>
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
                  <p className="font-bold text-xs leading-tight">
                    {contact.name}
                  </p>
                  <p className="text-xs text-gray-600 truncate">
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
        <div className="flex-1 flex flex-col bg-gray-100">
          {/* Back Button for Mobile */}
          <button
            onClick={handleBackToContacts}
            className="p-2 text-blue-500 lg:hidden"
          >
            Go Back
          </button>



          {/* Chat Body */}
          <div className="flex-1 p-4 overflow-y-auto">
            {selectedContact.name === "Design Group" ? (
              <GroupChat contact={selectedContact} />
            ) : (
              <IndividualChat contact={selectedContact} />
            )}
          </div>

          {/* Chat Input */}
          <div className="p-2 bg-white border-t border-gray-300">
            <input
              type="text"
              placeholder="Type a message"
              className="w-full p-2 border rounded-md text-sm focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatApp;