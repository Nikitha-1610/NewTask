
import React from 'react';
import { FaBars, FaBell } from 'react-icons/fa';
import '../styles/Topbar.css';

const Topbar = () => {
  return (
    <div className="topbar">
      <div className="topbar-left">
        <FaBars className="menu-icon" />
        <span className="dashboard-title">Dashboard</span>
      </div>
      <input type="text" placeholder="Search Project..." className="search-input" />
      <div className="topbar-info">
        <FaBell className="notification-icon" />
        <span>Santhosh R</span>
        <img src="profile.jpg" alt="User Profile" className="profile-pic" />
      </div>
    </div>
  );
};

export default Topbar;