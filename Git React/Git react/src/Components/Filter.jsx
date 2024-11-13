import React, { useState } from 'react';
import './Filter.css';

const usersData = [
  { id: 1, username: 'Sandhiya Ravikumar', email: 'sandyuva@gmail.com', position: 'UX UI Designer' },
  { id: 2, username: 'Rahul Sharma', email: 'rahulsharma@example.com', position: 'Backend Developer' },
  // Add more user data as needed
];

const Filter = () => {
  const [department, setDepartment] = useState('All Departments');
  const [filteredUsers, setFilteredUsers] = useState(usersData);

  const handleDepartmentChange = (event) => {
    setDepartment(event.target.value);
    filterUsers(event.target.value);
  };

  const filterUsers = (dept) => {
    let filtered = usersData;

    if (dept !== 'All Departments') {
      filtered = filtered.filter(user => user.position === dept);
    }

    setFilteredUsers(filtered);
  };

  return (
    <div className="filter">
      <div className="header">
        <h1>Filter Users</h1>
        <select value={department} onChange={handleDepartmentChange}>
          <option value="All Departments">All Departments</option>
          <option value="UX UI Designer">UX UI Designer</option>
          <option value="Backend Developer">Backend Developer</option>
          {/* Add more department options as needed */}
        </select>
      </div>
      <div className="user-list">
        <table>
          <thead>
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>Position</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id}>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.position}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Filter;
