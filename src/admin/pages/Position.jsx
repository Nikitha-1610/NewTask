import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axiosInstance from "../../common/utils/axios/axiosInstance";

const Position = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedPosition, setSelectedPosition] = useState("all");
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [positions, setPositions] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [selectedCheckbox, setSelectedCheckbox] = useState(null);
  const [isCheckboxSelected, setIsCheckboxSelected] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axiosInstance.get("employee/untag");
      if (Array.isArray(response.data.message)) {
        setUsers(response.data.message);
        setFilteredUsers(response.data.message);

        // Extract unique positions & departments
        const uniquePositions = [...new Set(response.data.message.map(user => user.position))];
        const uniqueDepartments = [...new Set(response.data.message.map(user => user.team || "General"))];

        setPositions(uniquePositions);
        setDepartments(uniqueDepartments);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const filterUsers = () => {
    let filtered = [...users];

    if (selectedPosition !== "all") {
      filtered = filtered.filter(user => user.position === selectedPosition);
    }

    if (selectedDepartment !== "all") {
      filtered = filtered.filter(user => user.team === selectedDepartment);
    }

    setFilteredUsers(filtered);
  };

  useEffect(() => {
    filterUsers();
  }, [selectedPosition, selectedDepartment, users]);

  const handleCheckboxChange = (user, index) => {
    const isSelected = selectedCheckbox === index;
    setSelectedCheckbox(isSelected ? null : index);
    setSelectedEmployee(isSelected ? null : user);
    setIsCheckboxSelected(!isSelected);
  };

  const handleRowClick = (user, index) => {
    const isSelected = selectedEmployee?.name === user.name;
    setSelectedEmployee(isSelected ? null : user);
    setSelectedCheckbox(isSelected ? null : index);
    setIsCheckboxSelected(!isSelected);
  };

  return (
    <div className="py-0 sm:px-5 px-0">
      <ToastContainer />

      {/* Stats Section */}
      <div className="flex flex-wrap items-center justify-center gap-6 md:gap-28 mb-5">
        <div className="flex flex-col items-center text-center">
          <span className="text-3xl font-medium">{filteredUsers.length}</span>
          <span className="text-sm text-gray-400 underline">People</span>
        </div>
        <div className="w-[1px] h-16 bg-gray-300"></div>
        <div className="flex flex-col items-center text-center">
          <span className="text-3xl font-medium">{departments.length}</span>
          <span className="text-sm text-gray-400 underline">Departments</span>
        </div>
      </div>

      {/* Filters Section */}
      <div className="flex flex-col sm:flex-row sm:justify-start items-center gap-4 mb-6">
        <select
          className="p-2 border text-base rounded bg-gray-200"
          value={selectedPosition}
          onChange={(e) => setSelectedPosition(e.target.value)}
        >
          <option value="all">All Positions</option>
          {positions.map((position, index) => (
            <option key={index} value={position}>{position}</option>
          ))}
        </select>

        <select
          className="p-2 border rounded bg-gray-200"
          value={selectedDepartment}
          onChange={(e) => setSelectedDepartment(e.target.value)}
        >
          <option value="all">All Departments</option>
          {departments.map((department, index) => (
            <option key={index} value={department}>{department}</option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="relative w-full border border-gray-300 rounded-lg overflow-hidden">
        <div className="h-full overflow-y-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead className="bg-gray-100 sticky top-0 z-10">
              <tr>
                <th className="p-2 border">
                  <input type="checkbox" />
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
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user, index) => (
                  <tr
                    key={index}
                    className={`hover:bg-gray-200 cursor-pointer ${selectedEmployee?.name === user.name ? "bg-green-100" : ""}`}
                    onClick={() => handleRowClick(user, index)}
                  >
                    <td className="p-2 text-center">
                      <input
                        type="checkbox"
                        checked={selectedCheckbox === index}
                        onChange={() => handleCheckboxChange(user, index)}
                      />
                    </td>
                    <td className="p-2 text-center">{user.name}</td>
                    <td className="p-2 text-center">{user.email}</td>
                    <td className="p-2 text-center">{user.mobile}</td>
                    <td className="p-2 text-center">{user.position}</td>
                    <td className="p-2 text-center">{user.appliedDate}</td>
                    <td className="p-2 text-center">
                      {isCheckboxSelected && (
                        <button
                          className="px-2 py-1 bg-blue-500 text-white rounded"
                          onClick={(e) => {
                            e.stopPropagation();
                            setShow(true);
                          }}
                        >
                          Tag
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center p-4 text-gray-500">
                    No users found for the selected filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal for Tagging */}
      {show && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg w-96 text-center">
            <h3 className="mb-4 text-2xl">Assign Team Lead</h3>
            <button
              className="w-full py-2 mt-2 bg-red-500 text-white rounded"
              onClick={() => setShow(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Position;
