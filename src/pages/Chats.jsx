import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import img8 from '../assets/img8.jpeg';
import img9 from '../assets/img9.jpeg';

const ChatApp = () => {
  return (
    <div className="flex flex-col lg:flex-row h-screen">
      {/* Left Chat List Section */}
      <div className="w-full lg:w-1/4 border-r border-gray-300 p-2 overflow-y-auto">
        <div className="mb-2 relative">
          <input
            type="text"
            placeholder="Search emojis"
            className="w-full p-2 pr-10 pl-4 border rounded-md text-sm focus:outline-none focus:border-blue-500"
          />
          <FontAwesomeIcon
            icon={faSearch}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
          />
        </div>

        <h3 className="text-black-500 font-semibold mb-1 text-xl">Pinned</h3>
        <div className="space-y-1">
          {/* Chat List Items (Pinned) */}
          <div className="flex items-start p-1 bg-gray-100 rounded-md hover:bg-gray-200 max-w-full">
            <img src={img8} alt="User" className="w-6 h-6 rounded-full mr-2" />
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <p className="font-bold text-xs leading-tight">Revathy</p>
                <span className="text-xs font-semibold text-gray-500 whitespace-nowrap ml-2">1:35 PM</span>
              </div>
              <p className="text-xs text-gray-600 leading-tight truncate">
                Hi, I am having a doubt on profile Screen.
              </p>
            </div>
          </div>

          <div className="flex items-start p-1 bg-gray-100 rounded-md hover:bg-gray-200 max-w-full">
            <img src={img8} alt="User" className="w-6 h-6 rounded-full mr-2" />
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <p className="font-bold text-xs leading-tight">Revathy</p>
                <span className="text-xs font-semibold text-gray-500 whitespace-nowrap ml-2">1:35 PM</span>
              </div>
              <p className="text-xs text-gray-600 leading-tight truncate">
                Hi, I am having a doubt on profile Screen.
              </p>
            </div>
          </div>

          <div className="flex items-start p-1 bg-gray-100 rounded-md hover:bg-gray-200 max-w-full">
            <img src={img9} alt="User" className="w-6 h-6 rounded-full mr-2" />
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <p className="font-bold text-xs leading-tight">Revathy</p>
                <span className="text-xs font-semibold text-gray-500 whitespace-nowrap ml-2">1:35 PM</span>
              </div>
              <p className="text-xs text-gray-600 leading-tight truncate">
                Hi, I am having a doubt on profile Screen.
              </p>
            </div>
          </div>

          <div className="flex items-start p-1 bg-gray-100 rounded-md hover:bg-gray-200 max-w-full">
            <img src={img8} alt="User" className="w-6 h-6 rounded-full mr-2" />
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <p className="font-bold text-xs leading-tight">Revathy</p>
                <span className="text-xs font-semibold text-gray-500 whitespace-nowrap ml-2">1:35 PM</span>
              </div>
              <p className="text-xs text-gray-600 leading-tight truncate">
                Hi, I am having a doubt on profile Screen.
              </p>
            </div>
          </div>

          <div className="flex items-start p-1 bg-gray-100 rounded-md hover:bg-gray-200 max-w-full">
            <img src={img9} alt="User" className="w-6 h-6 rounded-full mr-2" />
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <p className="font-bold text-xs leading-tight">Revathy</p>
                <span className="text-xs font-semibold text-gray-500 whitespace-nowrap ml-2">1:35 PM</span>
              </div>
              <p className="text-xs text-gray-600 leading-tight truncate">
                Hi, I am having a doubt on profile Screen.
              </p>
            </div>
          </div>

          <div className="flex items-start p-1 bg-gray-100 rounded-md hover:bg-gray-200 max-w-full">
            <img src={img8} alt="User" className="w-6 h-6 rounded-full mr-2" />
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <p className="font-bold text-xs leading-tight">Revathy</p>
                <span className="text-xs font-semibold text-gray-500 whitespace-nowrap ml-2">1:35 PM</span>
              </div>
              <p className="text-xs text-gray-600 leading-tight truncate">
                Hi, I am having a doubt on profile Screen.
              </p>
            </div>
          </div>
        </div>

        <h3 className="text-black-500 font-semibold mb-1 text-xl">Recent</h3>
        <div className="space-y-1">
          {/* Chat List Items (Recent) */}
          <div className="flex items-start p-1 bg-gray-100 rounded-md hover:bg-gray-200 max-w-full">
            <img src={img8} alt="User" className="w-6 h-6 rounded-full mr-2" />
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <p className="font-bold text-xs leading-tight">Revathy</p>
                <span className="text-xs font-semibold text-gray-500 whitespace-nowrap ml-2">1:35 PM</span>
              </div>
              <p className="text-xs text-gray-600 leading-tight truncate">
                Hi, I am having a doubt on profile Screen.
              </p>
            </div>
          </div>

          <div className="flex items-start p-1 bg-gray-100 rounded-md hover:bg-gray-200 max-w-full">
            <img src={img8} alt="User" className="w-6 h-6 rounded-full mr-2" />
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <p className="font-bold text-xs leading-tight">Revathy</p>
                <span className="text-xs font-semibold text-gray-500 whitespace-nowrap ml-2">1:35 PM</span>
              </div>
              <p className="text-xs text-gray-600 leading-tight truncate">
                Hi, I am having a doubt on profile Screen.
              </p>
            </div>
          </div>

          <div className="flex items-start p-1 bg-gray-100 rounded-md hover:bg-gray-200 max-w-full">
            <img src={img9} alt="User" className="w-6 h-6 rounded-full mr-2" />
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <p className="font-bold text-xs leading-tight">Revathy</p>
                <span className="text-xs font-semibold text-gray-500 whitespace-nowrap ml-2">1:35 PM</span>
              </div>
              <p className="text-xs text-gray-600 leading-tight truncate">
                Hi, I am having a doubt on profile Screen.
              </p>
            </div>
          </div>

          <div className="flex items-start p-1 bg-gray-100 rounded-md hover:bg-gray-200 max-w-full">
            <img src={img9} alt="User" className="w-6 h-6 rounded-full mr-2" />
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <p className="font-bold text-xs leading-tight">Revathy</p>
                <span className="text-xs font-semibold text-gray-500 whitespace-nowrap ml-2">1:35 PM</span>
              </div>
              <p className="text-xs text-gray-600 leading-tight truncate">
                Hi, I am having a doubt on profile Screen.
              </p>
            </div>
          </div>

          <div className="flex items-start p-1 bg-gray-100 rounded-md hover:bg-gray-200 max-w-full">
            <img src={img8} alt="User" className="w-6 h-6 rounded-full mr-2" />
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <p className="font-bold text-xs leading-tight">Revathy</p>
                <span className="text-xs font-semibold text-gray-500 whitespace-nowrap ml-2">1:35 PM</span>
              </div>
              <p className="text-xs text-gray-600 leading-tight truncate">
                Hi, I am having a doubt on profile Screen.
              </p>
            </div>
          </div>
          <div className="flex items-start p-1 bg-gray-100 rounded-md hover:bg-gray-200 max-w-full">
            <img src={img9} alt="User" className="w-6 h-6 rounded-full mr-2" />
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <p className="font-bold text-xs leading-tight">Revathy</p>
                <span className="text-xs font-semibold text-gray-500 whitespace-nowrap ml-2">1:35 PM</span>
              </div>
              <p className="text-xs text-gray-600 leading-tight truncate">
                Hi, I am having a doubt on profile Screen.
              </p>
            </div>
          </div>
          <div className="flex items-start p-1 bg-gray-100 rounded-md hover:bg-gray-200 max-w-full">
            <img src={img9} alt="User" className="w-6 h-6 rounded-full mr-2" />
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <p className="font-bold text-xs leading-tight">Revathy</p>
                <span className="text-xs font-semibold text-gray-500 whitespace-nowrap ml-2">1:35 PM</span>
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

        {/* Right Chat Content */}
        <div className="p-4">
          {/* Additional content for the right section */}
        </div>
      </div>
    </div>
  );
};

export default ChatApp;
