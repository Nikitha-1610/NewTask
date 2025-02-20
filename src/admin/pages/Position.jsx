import React, { useState, useEffect } from "react";
import { RotatingLines } from "react-loader-spinner";
import axiosInstance from "../../common/utils/axios/axiosInstance";
import { FaTag } from "react-icons/fa";

const Position = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  const usersPerPage = 10;
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get("employee/untag");
        const data = response.data;
        if (Array.isArray(data.message)) {
          setUsers(data.message);
          setFilteredUsers(data.message);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
      setLoading(false);
    };
    fetchUsers();
  }, []);

  const handleCheckboxChange = (user) => {
    setSelectedEmployees((prevSelected) => {
      const isSelected = prevSelected.includes(user.name);
      if (isSelected) {
        return prevSelected.filter((name) => name !== user.name);
      } else {
        return [...prevSelected, user.name];
      }
    });
  };

  const handleSelectAllChange = () => {
    if (selectAll) {
      setSelectedEmployees([]);
    } else {
      setSelectedEmployees(filteredUsers.map((user) => user.name));
    }
    setSelectAll(!selectAll);
  };

  return loading ? (
    <div className="flex justify-center items-center h-screen">
      <RotatingLines strokeColor="blue" strokeWidth="5" animationDuration="0.75" width="20" visible={true} />
    </div>
  ) : (
    <div>
      {/* Search Bar */}
      <div className="mb-4">
        <input type="text" placeholder="Search Projects..." className="w-full p-2 border rounded" />
      </div>
      
      {/* Stats Section */}
      <div className="flex flex-wrap items-center justify-center gap-6 md:gap-28 mb-5">
        <div className="flex flex-col items-center text-center">
          <span className="text-3xl font-medium">{users.length}</span>
          <span className="text-sm text-gray-400 underline">People</span>
        </div>
        <div className="w-[1px] h-16 bg-gray-300"></div>
        <div className="flex flex-col items-center text-center">
          <span className="text-3xl font-medium">{filteredUsers.length}</span>
          <span className="text-sm text-gray-400 underline">Departments</span>
        </div>
      </div>
      
      {/* Filter Section */}
      <div className="flex gap-4 mb-6">
        <select className="p-2 border rounded bg-gray-200">
          <option>All Positions</option>
        </select>
        <select className="p-2 border rounded bg-gray-200">
          <option>All Departments</option>
        </select>
      </div>
      
      <div className="relative w-full border border-gray-300 rounded-lg overflow-hidden">
        <table className="w-full border-collapse border border-white-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">
                <input type="checkbox" checked={selectAll} onChange={handleSelectAllChange} />
              </th>
              <th className="p-2 border">Username</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Phone</th>
              <th className="p-2 border">Position</th>
              <th className="p-2 border">Joining Date</th>
              <th className="p-2 border">Activity</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user, index) => (
              <tr key={index} className={selectedEmployees.includes(user.name) ? "bg-green-100" : ""}>
                <td className="p-2 text-center">
                  <input type="checkbox" checked={selectedEmployees.includes(user.name)} onChange={() => handleCheckboxChange(user)} />
                </td>
                <td className="p-2 text-center">{user.name}</td>
                <td className="p-2 text-center">{user.email}</td>
                <td className="p-2 text-center">{user.mobile}</td>
                <td className="p-2 text-center">{user.position}</td>
                <td className="p-2 text-center">{user.appliedDate}</td>
                <td className="p-2 text-center">
                  <button className="px-2 py-1 bg-teal-500 text-white rounded">Tag</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Pagination Section */}
      <div className="flex justify-between items-center mt-4 p-4 border-t">
        <button className="px-4 py-2 border rounded" disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>
          Previous
        </button>
        <span className="px-4 py-2 bg-teal-500 text-white rounded">{currentPage}</span>
        <button className="px-4 py-2 border rounded" disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Position;
