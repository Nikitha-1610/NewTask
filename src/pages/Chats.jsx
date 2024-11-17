import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Chat from "../components/chatComp/Chat";
import { faEllipsisVertical, faSearch } from "@fortawesome/free-solid-svg-icons";
import img8 from "../assets/img8.jpeg";
import img9 from "../assets/img9.jpeg";

const contacts = [
  { name: "Sanjay", image: img9, lastMessage: "Can you help with?", time: "2:00 PM" },
  { name: "Revathy", image: img8, lastMessage: "Let's catch up soon.", time: "3:30 PM" },
  { name: "John", image: img9, lastMessage: "I need some feedback", time: "4:00 PM" },
  { name: "Alice", image: img8, lastMessage: "The meeting was great.", time: "5:15 PM" },
  { name: "Raj", image: img9, lastMessage: "I sent the project details.", time: "6:00 PM" },
  { name: "Anu", image: img8, lastMessage: "Can we schedule a call?", time: "7:00 PM" },
  { name: "David", image: img9, lastMessage: "The deadline is tomorrow", time: "8:00 PM" },
  { name: "Sarah", image: img8, lastMessage: "I have updated the document.", time: "9:30 PM" },
  { name: "Vinay", image: img9, lastMessage: "Please review my changes.", time: "10:00 PM" },
  { name: "Ananya", image: img8, lastMessage: "Let's discuss.", time: "11:15 PM" }
];

const pinnedContacts = [
  { name: "Sanjay", image: img9, lastMessage: "Can you help me with?", time: "2:00 PM" },
  { name: "Raj", image: img9, lastMessage: "I sent the project details.", time: "6:00 PM" },
  { name: "Maya", image: img8, lastMessage: "Can we schedule a call?", time: "7:00 PM" },
  { name: "Revathy", image: img8, lastMessage: "Hi, I am having a doubt", time: "1:35 PM" },
  {name:"Design Group", image:img9,lastMessage: "Hi, I am having a doubt", time: "1:35 PM"}
];

const removeDuplicates = (array) => {
  return array.filter((value, index, self) =>
    index === self.findIndex((t) => t.name === value.name)
  );
};

const ChatApp = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredContacts, setFilteredContacts] = useState(removeDuplicates(contacts));
  const [filteredPinnedContacts, setFilteredPinnedContacts] = useState(removeDuplicates(pinnedContacts));
  const [selectedContact, setSelectedContact] = useState(null);

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

  const handleContactClick = (contact) => {
    setSelectedContact(contact);
  };

  const handleBackToContacts = () => {
    setSelectedContact(null);
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      {/* Left Chat List Section */}
      <div
        className={`${
          selectedContact ? "hidden" : "block"
        } lg:block w-full lg:w-1/4 border-r border-gray-300 p-2`}
      >
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
        <div className="space-y-1">
          {filteredPinnedContacts.map((contact, index) => (
            <div
              key={index}
              className="flex items-start p-1 bg-gray-100 rounded-md hover:bg-gray-200 max-w-full cursor-pointer"
              onClick={() => handleContactClick(contact)}
            >
              <img
                src={contact.image}
                alt="User"
                className="w-6 h-6 rounded-full mr-2"
              />
              <div className="flex-1 flex flex-col">
                <div className="flex justify-between items-start">
                  <p className="font-bold text-xs leading-tight">{contact.name}</p>
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
              onClick={() => handleContactClick(contact)}
            >
              <img
                src={contact.image}
                alt="User"
                className="w-6 h-6 rounded-full mr-2"
              />
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <p className="font-bold text-xs leading-tight">{contact.name}</p>
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
      <div className={`flex-1 flex flex-col ${selectedContact ? "block" : "hidden"} lg:block`}>
        {selectedContact ? (
          <>
            {/* Button to go back to contacts (only visible on mobile) */}
            <button
              onClick={handleBackToContacts}
              className="text-blue-500 mb-4 lg:hidden"
            >
              Back to Contacts
            </button>
            <Chat contact={selectedContact} />
          </>
        ) : (
          <div className="p-4">Select a contact to start chatting</div>
        )}
      </div>
    </div>
  );
};
 export default ChatApp;