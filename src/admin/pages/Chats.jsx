import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faEllipsisVertical,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import img8 from "../../assets/img8.jpeg";
import img9 from "../../assets/img9.jpeg";
import IndividualChat from '../../user/Components/ChatComp/IndividualChat';
import axiosInstance from "../../common/utils/axios/axiosInstance";
import io from 'socket.io-client';

// import GroupChat from "../components/chatComp/GroupChat";
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

let socket;
const removeDuplicates = (array) => {
  return array.filter(
    (value, index, self) =>
      index === self.findIndex((t) => t.name === value.name)
  );
};

const ChatApp = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [data, setData] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState(data);
  const [filteredPinnedContacts, setFilteredPinnedContacts] =
    useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [selectedOption, setSelectedOption] = useState("Chat");
  const socketUrl = 'https://chat-2-1dgm.onrender1.com';
  const employeeId = localStorage.getItem('employeeId');
  const user = localStorage.getItem('name');

  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [message, setMessage] = useState("");
  const [isLeftVisible, setIsLeftVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  
  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    if (query) {
      setFilteredContacts(
        removeDuplicates(
          data.filter((contact) =>
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
      setFilteredContacts(removeDuplicates(data));
      setFilteredPinnedContacts(removeDuplicates(pinnedContacts));
    }
  };

  const getUsers = async () => {
    try {
      const response = await axiosInstance.get('employee/getAll');
      const filteredData = response.data.message.filter(item => item.employeeID !== employeeId);
      setData(filteredData);
      setFilteredContacts(filteredData);
    } catch (err) {
      // Set error state in case of failure
      console.log(err.response ? err.response.data : err.message);
    } finally {
      // Set loading to false after the request is completed
      setLoading(false);
    };
  }

  useEffect(() => {
    getUsers();

  },[]);

  useEffect(() => {
        socket = io(socketUrl);

        // Join the employeeId when the user connects
        socket.emit('join', { user, employeeId }, (err) => {
            if (err) {
                console.error(err);
            }
        });

        return () => {
            socket.disconnect();
            socket.off();
        };
    }, [socketUrl, user, employeeId]);

    // useEffect(() => {
    //     socket.on('message', (msg) => {
    //         // Only update messages if they belong to the selected conversation
    //         if (
    //             (msg.sender === employeeId && msg.receiver === selectedEmployeeId) ||
    //             (msg.sender === selectedEmployeeId && msg.receiver === employeeId)
    //         ) {
    //             setMessages((prevMsg) => [...prevMsg, msg]); // Append new message
    //         }

    //         // Scroll to the bottom when a new message arrives
    //         if (messageEndRef.current) {
    //             messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
    //         }
    //     });

    //     socket.on('roomMembers', (usrs) => {
    //         setOnlineUsers(usrs);
    //     });
    // }, [employeeId, selectedEmployeeId]);

    // const sendMessage = () => {
    //     if (message.trim() && selectedEmployeeId) {
    //         // Emit message to the receiver and the sender
    //         socket.emit('sendMessage', employeeId, message, selectedEmployeeId, () => setMessage(''));
    //     }
    // };

  

  // Handle selecting a contact
  const handleContactClick = (contact) => {
    setSelectedContact(contact);
  };

  const handleBackToContacts = () => {
    
    setIsLeftVisible(true);
    setSelectedContact(null);
  };

  return (
    <div className="flex sm:flex-row flex-col h-full overflow-hidden">
      {/* Contacts List Section */}
      {(!selectedContact || window.innerWidth >= 1024) && (
        <div className="top-0  border-gray-300 bg-white border-r w-full lg:w-1/4 sm:h-screen  overflow-y-auto scrollbar-hide">
          {/* Header */}
          <div className="top-0 z-10 sticky bg-white mb-2">
            <div className="flex justify-between items-center mr-4 mb-2">
              <h3 className="font-semibold text-[28px] text-gray-800 text-lg sm:text-2xl">
                Chats
              </h3>

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
                className="p-2 pr-10 pl-4 border focus:border-blue-500 rounded-md w-full text-[18px] focus:outline-none sm:text-sm"
              />
              <FontAwesomeIcon
                icon={faSearch}
                className="top-1/2 right-3 absolute text-gray-500 transform -translate-y-1/2"
              />
            </div>
          </div>

          

          {/* Recent Contacts */}
          <h3 className="mb-1 font-semibold text-[22px] text-black-500 sm:text-xl ">
            Users
          </h3>
          <div className="space-y-1 overflow-y-auto">
            {filteredContacts.map((contact, index) => (
              <div
                key={index}
                className="flex items-start bg-gray-100 hover:bg-gray-200 p-2 rounded-md"
                onClick={() => handleContactClick(contact)}
              >
                <img
                  src={img9}
                  alt="User"
                  className="mr-2 rounded-full w-8 h-8"
                />
                <div className="flex-1">
                  <p className="font-bold text-[14px] text-lg sm:text-xs leading-tight">
                    {contact.name}
                  </p>
                  <p className="text-[14px] text-base text-gray-600 sm:text-xs truncate">
                    {contact?.lastMessage||""}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Chat Content Section */}

      {selectedContact && (
        <div className="sm:flex flex-col flex-1 bg-gray-100 lg:w-3/4 w-full min-h-screen overflow-hidden">
         
        
       
              <IndividualChat 
                contact={selectedContact}
                handleBackToContacts={handleBackToContacts}
              />
         
       
        </div>
      )}
    </div>
  );
};

export default ChatApp;
