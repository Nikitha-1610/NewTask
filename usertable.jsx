import React from 'react';
import '../styles/UserTable.css';

const users = [
  {
    username: 'Sandhiya Ravikumar',
    email: 'sandyva@gmail.com',
    phone: '+91 6789054321',
    position: 'UX UI Designer',
    joiningDate: '02-11-2024',
  },
  // Duplicate user data for demonstration purposes
  ...Array(7).fill({
    username: 'Sandhiya Ravikumar',
    email: 'sandyva@gmail.com',
    phone: '+91 6789054321',
    position: 'UX UI Designer',
    joiningDate: '02-11-2024',
  })
];

const UserTable = () => {
  return (
    <>
      
      <div className="dropdowns-container">
        <select className="dropdown">
          <option value="all">All</option>
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
        </select>
        <select className="dropdown">
          <option value="all-departments">All Departments</option>
          <option value="hr">HR</option>
          <option value="finance">Finance</option>
          <option value="marketing">Marketing</option>
        </select>
      </div>

    
      <table className="user-table">
        <thead>
          <tr>
            <th></th> 
            <th>Username</th>
            <th>Mail ID</th>
            <th>Phone number</th>
            <th>Position</th>
            <th>Joining Date</th>
            <th>Activity</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td>
                <input
                  type="checkbox"
                  className="user-checkbox"
                />
              </td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>{user.position}</td>
              <td>{user.joiningDate}</td>
              <td>
                <div className="approve-container">
                  <button className="approve-button">Approve</button>
                  <i className="fas fa-ellipsis-v more-options"></i>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination-container">
        <button className="pagination-button">Previous</button>
        <span className="page-number">Page 1 of 10</span>
        <button className="pagination-button">Next</button>
      </div>
    </>
  );
};

export default UserTable;