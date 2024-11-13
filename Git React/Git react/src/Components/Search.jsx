import React, { useState } from 'react';
import './Search.css';

const usersData = [
  { id: 1, username: 'Sandhiya Ravikumar', email: 'sandyuva@gmail.com' },
  { id: 2, username: 'Rahul Sharma', email: 'rahulsharma@example.com' },
  // Add more user data as needed
];

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredUsers, setFilteredUsers] = useState(usersData);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    filterUsers(event.target.value);
  };

  const filterUsers = (search) => {
    let filtered = usersData;

    if (search) {
      filtered = filtered.filter(user =>
        user.username.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFilteredUsers(filtered);
  };

  return (
    <div className="search">
      <div className="header">
        <h1>Search Users</h1>
        <input
          type="text"
          placeholder="Search by username or email..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <div className="user-list">
        <table>
          <thead>
            <tr>
              <th>Username</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id}>
                <td>{user.username}</td>
                <td>{user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Search;
