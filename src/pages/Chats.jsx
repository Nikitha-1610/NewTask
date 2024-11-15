// src/ChatApp.jsx
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faVideo, faEllipsisV, faMicrophone } from '@fortawesome/free-solid-svg-icons';


const ChatApp = () => {
  return (
    <div className="flex h-screen">
      {/* Left Chat List Section */}
      <div className="w-1/4 border-r border-gray-300 p-2 overflow-y-auto">
        <div className="mb-2">
          <input
            type="text"
            placeholder="Search emojis"
            className="w-full p-1 border rounded-md text-sm focus:outline-none focus:border-blue-500"
          />
        </div>

        <h3 className="text-gray-500 font-semibold mb-1 text-xs">Pinned</h3>
        <div className="space-y-1">
          <div className="flex items-start p-1 bg-gray-100 rounded-md hover:bg-gray-200 max-w-full">
            <img src="user-avatar.jpg" alt="User" className="w-6 h-6 rounded-full mr-2" />
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <p className="font-bold text-xs leading-tight">Revathy</p>
                <span className="text-xs text-gray-500 whitespace-nowrap ml-2">1:35 PM</span>
              </div>
              <p className="text-xs text-gray-600 leading-tight truncate">
                Hi, I am having a doubt on profile Screen.
              </p>
            </div>



          </div>
          <div className="flex items-start p-1 bg-gray-100 rounded-md hover:bg-gray-200 max-w-full">
            <img src="user-avatar.jpg" alt="User" className="w-6 h-6 rounded-full mr-2" />
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <p className="font-bold text-xs leading-tight">Revathy</p>
                <span className="text-xs text-gray-500 whitespace-nowrap ml-2">1:35 PM</span>
              </div>
              <p className="text-xs text-gray-600 leading-tight truncate">
                Hi, I am having a doubt on profile Screen.
              </p>
            </div>
          </div>

          <div className="flex items-start p-1 bg-gray-100 rounded-md hover:bg-gray-200 max-w-full">
            <img src="user-avatar.jpg" alt="User" className="w-6 h-6 rounded-full mr-2" />
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <p className="font-bold text-xs leading-tight">Revathy</p>
                <span className="text-xs text-gray-500 whitespace-nowrap ml-2">1:35 PM</span>
              </div>
              <p className="text-xs text-gray-600 leading-tight truncate">
                Hi, I am having a doubt on profile Screen.
              </p>
            </div>
          </div>
          <div className="flex items-start p-1 bg-gray-100 rounded-md hover:bg-gray-200 max-w-full">
            <img src="user-avatar.jpg" alt="User" className="w-6 h-6 rounded-full mr-2" />
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <p className="font-bold text-xs leading-tight">Revathy</p>
                <span className="text-xs text-gray-500 whitespace-nowrap ml-2">1:35 PM</span>
              </div>
              <p className="text-xs text-gray-600 leading-tight truncate">
                Hi, I am having a doubt on profile Screen.
              </p>
            </div>
          </div>
          <div className="flex items-start p-1 bg-gray-100 rounded-md hover:bg-gray-200 max-w-full">
            <img src="user-avatar.jpg" alt="User" className="w-6 h-6 rounded-full mr-2" />
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <p className="font-bold text-xs leading-tight">Revathy</p>
                <span className="text-xs text-gray-500 whitespace-nowrap ml-2">1:35 PM</span>
              </div>
              <p className="text-xs text-gray-600 leading-tight truncate">
                Hi, I am having a doubt on profile Screen.
              </p>
            </div>
          </div>
          <div className="flex items-start p-1 bg-gray-100 rounded-md hover:bg-gray-200 max-w-full">
            <img src="user-avatar.jpg" alt="User" className="w-6 h-6 rounded-full mr-2" />
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <p className="font-bold text-xs leading-tight">Revathy</p>
                <span className="text-xs text-gray-500 whitespace-nowrap ml-2">1:35 PM</span>
              </div>
              <p className="text-xs text-gray-600 leading-tight truncate">
                Hi, I am having a doubt on profile Screen.
              </p>
            </div>
          </div>

        </div>

        <h3 className="text-gray-500 font-semibold mb-1 text-xs">Pinned</h3>
        <div className="space-y-1">
          <div className="flex items-start p-1 bg-gray-100 rounded-md hover:bg-gray-200 max-w-full">
            <img src="user-avatar.jpg" alt="User" className="w-6 h-6 rounded-full mr-2" />
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <p className="font-bold text-xs leading-tight">Revathy</p>
                <span className="text-xs text-gray-500 whitespace-nowrap ml-2">1:35 PM</span>
              </div>
              <p className="text-xs text-gray-600 leading-tight truncate">
                Hi, I am having a doubt on profile Screen.
              </p>
            </div>
          </div>

          <div className="flex items-start p-1 bg-gray-100 rounded-md hover:bg-gray-200 max-w-full">
            <img src="user-avatar.jpg" alt="User" className="w-6 h-6 rounded-full mr-2" />
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <p className="font-bold text-xs leading-tight">Revathy</p>
                <span className="text-xs text-gray-500 whitespace-nowrap ml-2">1:35 PM</span>
              </div>
              <p className="text-xs text-gray-600 leading-tight truncate">
                Hi, I am having a doubt on profile Screen.
              </p>
            </div>
          </div>
          <div className="flex items-start p-1 bg-gray-100 rounded-md hover:bg-gray-200 max-w-full">
            <img src="user-avatar.jpg" alt="User" className="w-6 h-6 rounded-full mr-2" />
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <p className="font-bold text-xs leading-tight">Revathy</p>
                <span className="text-xs text-gray-500 whitespace-nowrap ml-2">1:35 PM</span>
              </div>
              <p className="text-xs text-gray-600 leading-tight truncate">
                Hi, I am having a doubt on profile Screen.
              </p>
            </div>
          </div>
          <div className="flex items-start p-1 bg-gray-100 rounded-md hover:bg-gray-200 max-w-full">
            <img src="user-avatar.jpg" alt="User" className="w-6 h-6 rounded-full mr-2" />
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <p className="font-bold text-xs leading-tight">Revathy</p>
                <span className="text-xs text-gray-500 whitespace-nowrap ml-2">1:35 PM</span>
              </div>
              <p className="text-xs text-gray-600 leading-tight truncate">
                Hi, I am having a doubt on profile Screen.
              </p>
            </div>
          </div>
          <div className="flex items-start p-1 bg-gray-100 rounded-md hover:bg-gray-200 max-w-full">
            <img src="user-avatar.jpg" alt="User" className="w-6 h-6 rounded-full mr-2" />
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <p className="font-bold text-xs leading-tight">Revathy</p>
                <span className="text-xs text-gray-500 whitespace-nowrap ml-2">1:35 PM</span>
              </div>
              <p className="text-xs text-gray-600 leading-tight truncate">
                Hi, I am having a doubt on profile Screen.
              </p>
            </div>
          </div>
          <div className="flex items-start p-1 bg-gray-100 rounded-md hover:bg-gray-200 max-w-full">
            <img src="user-avatar.jpg" alt="User" className="w-6 h-6 rounded-full mr-2" />
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <p className="font-bold text-xs leading-tight">Revathy</p>
                <span className="text-xs text-gray-500 whitespace-nowrap ml-2">1:35 PM</span>
              </div>
              <p className="text-xs text-gray-600 leading-tight truncate">
                Hi, I am having a doubt on profile Screen.
              </p>
            </div>
          </div>
          <div className="flex items-start p-1 bg-gray-100 rounded-md hover:bg-gray-200 max-w-full">
            <img src="user-avatar.jpg" alt="User" className="w-6 h-6 rounded-full mr-2" />
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <p className="font-bold text-xs leading-tight">Revathy</p>
                <span className="text-xs text-gray-500 whitespace-nowrap ml-2">1:35 PM</span>
              </div>
              <p className="text-xs text-gray-600 leading-tight truncate">
                Hi, I am having a doubt on profile Screen.
              </p>
            </div>
          </div>


        </div>
      </div>

      {/* Right Chat Content Section */}
      <div className="flex-1 flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-gray-300">
          <h2 className="text-lg font-bold">Design Group</h2>

        </div>




      </div>
    </div>
  );
};

export default ChatApp;

