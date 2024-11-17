
import React from 'react';
import { FaTachometerAlt, FaProjectDiagram, FaTasks, FaCalendarAlt, FaClock, FaCog } from 'react-icons/fa';
import '../styles/Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <ul>
        <li className="highlight"><FaTachometerAlt className="icon" /> DASHBOARD</li> 
        <li><FaProjectDiagram className="icon" /> PROJECTS</li>
        <li><FaTasks className="icon" /> MY TASKS</li>
        <li><FaCalendarAlt className="icon" /> CALENDAR</li>
        <li><FaClock className="icon" /> TIME MANAGE</li>
        <li><FaCog className="icon" /> SETTINGS</li>
      </ul>
    </div>
  );
};

export default Sidebar;