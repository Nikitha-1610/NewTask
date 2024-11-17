import React from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import UserTable from './UserTable';
import '../styles/Dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="main-content">
        <Topbar />
        <div className="dashboard-content">
          <div className="dashboard-summary">
            <div className="summary-box">12 <br/> People</div>
            <div className="summary-box">5 <br/> Departments</div>
          </div>
          <UserTable />
        </div>
      </div>
    </div>
  );
};
export default Dashboard;