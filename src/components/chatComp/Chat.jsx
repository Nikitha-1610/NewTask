
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faVideo, faEllipsisV } from "@fortawesome/free-solid-svg-icons";

const Chat = ({ contact }) => {
    return (
        <div className="flex items-center p-4 bg-white shadow-sm">
            {/* Profile Picture */}
            <div className="flex items-center justify-center w-16 h-16 ">
                <img
                    src={contact.image}
                    alt={contact.name}
                    className="w-12 h-12 rounded-full"
                />
            </div>

            {/* Chat Content (Text, Files, Media) */}
            <div className="flex-1 ml-4 shadow-lg rounded-lg p-4 bg-white">
                <div className="flex justify-between">
                    <h2 className="text-xl font-semibold">{contact.name}</h2>
                    <span className="text-sm text-gray-500">{contact.time}</span>
                </div>
                <div className="mt-2">
                    <p className="text-md">{contact.lastMessage}</p>
                </div>
            </div>

            {/* Icons (Call, Video Call, More Options) */}
            <div className="flex items-center space-x-4 ml-4">
                <FontAwesomeIcon
                    icon={faPhone}
                    className="text-xl text-gray-600 cursor-pointer hover:text-blue-500"
                />
                <FontAwesomeIcon
                    icon={faVideo}
                    className="text-xl text-gray-600 cursor-pointer hover:text-blue-500"
                />
                <FontAwesomeIcon
                    icon={faEllipsisV}
                    className="text-xl text-gray-600 cursor-pointer hover:text-blue-500"
                />
            </div>
        </div>
    );
};

export default Chat;




