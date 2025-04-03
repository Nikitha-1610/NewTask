import React, { useEffect, useState } from 'react';
import axiosInstance from "../../common/utils/axios/axiosInstance";
import ReactLoading from 'react-loading';

const EmployeeDetails = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [employeesPerPage] = useState(6);
  const [show, setShow] = useState(false);
  const [selectedTeamLead, setSelectedTeamLead] = useState("");
  const [currentEmployeeId, setCurrentEmployeeId] = useState(null);

  const roleOptions = ['Employee', 'Intern', 'TeamLead', 'Manager'];

  useEffect(() => {
    axiosInstance.get('employee/getAll')
      .then(response => {
        const employeeData = Array.isArray(response.data.message) ? response.data.message : [];
        setEmployees(employeeData);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching employee data:', error);
        setEmployees([]);
        setLoading(false);
      });
  }, []);

  const handleRoleUpdate = (employeeId, newRole) => {
    axiosInstance.put(`employee/update/${employeeId}`, { role: newRole })
      .then(response => {
        setEmployees(prevEmployees =>
          prevEmployees.map(employee =>
            employee.employeeID === employeeId ? { ...employee, role: newRole } : employee
          )
        );
        setActiveDropdown(null);
      })
      .catch(error => {
        console.error('Error updating role:', error);
      });
  };

  const toggleDropdown = (employeeId) => {
    setActiveDropdown(activeDropdown === employeeId ? null : employeeId);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleRoleFilter = (role) => {
    setSelectedRole(role);
    setRoleDropdownOpen(false);
  };

  const filteredEmployees = employees.filter(employee =>
    employee.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (selectedRole ? employee.role === selectedRole : true)
  );

  const indexOfLastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
  const currentEmployees = filteredEmployees.slice(indexOfFirstEmployee, indexOfLastEmployee);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleSubmit = () => {
    if (currentEmployeeId && selectedTeamLead) {
      handleRoleUpdate(currentEmployeeId, selectedTeamLead);
      setShow(false);
      setSelectedTeamLead("");
      setCurrentEmployeeId(null);
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 flex justify-center items-center bg-white bg-opacity-70 z-50">
        <ReactLoading type="spin" color="#00bfa6" height={50} width={50} />
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">
        Total Employees: {filteredEmployees.length}
      </h1>

      <div className="flex flex-col md:flex-row items-center justify-between mb-4">
        {/* Search Input */}
        <input
          type="text"
          placeholder="Search by name"
          value={searchQuery}
          onChange={handleSearch}
          className="border border-gray-300 rounded px-4 py-2 mb-2 md:mb-0 md:mr-4"
        />

        {/* Role Dropdown */}
        <div className="relative w-48">
          <button
            onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
            className="border border-gray-300 text-gray-700 px-4 py-2 rounded flex justify-between items-center w-full bg-white"
          >
            {selectedRole || 'Select Role'}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w -4 h-4 ml-2 transition-transform duration-200"
              style={{ transform: roleDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
            </svg>
          </button>

          {/* Dropdown Menu */}
          {roleDropdownOpen && (
            <div className="absolute mt-2 w-full bg-white border border-gray-300 rounded shadow-lg z-10">
              <button
                className="block px-4 py-2 text-left hover:bg-gray-100 w-full"
                onClick={() => handleRoleFilter('')}
              >
                All Roles
              </button>
              {roleOptions.map((role, index) => (
                <button
                  key={index}
                  className="block px-4 py-2 text-left hover:bg-gray-100 w-full"
                  onClick={() => handleRoleFilter(role)}
                >
                  {role}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="hidden lg:block">
        <table className="min-w-full table-auto border-collapse border border-gray-300 ">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300  px-4 py-2 text-center">Employee ID</th>
              <th className="border border-gray-300 px-4 py-2 text-center">Name</th>
              <th className="border border-gray-300 px-4 py-2 text-center">Department</th>
              <th className="border border-gray-300 px-4 py-2 text-center">Role</th>
              <th className="border border-gray-300 px-4 py-2 text-center">Position</th>
              <th className="border border-gray-300 px-4 py-2 text-center">Update Role</th>
            </tr>
          </thead>
          <tbody>
            {currentEmployees.map((employee) => (
              <tr key={employee.employeeID} className="bg-white hover:bg-gray-50">
                <td className="border border-gray-200 px-4 py-2 text-center">{employee.employeeID}</td>
                <td className="border border-gray-200 px-4 py-2 text-center">{employee.name}</td>
                <td className="border border-gray-200 px-4 py-2 text-center">{employee.department}</td>
                <td className="border border-gray-200 px-4 py-2 text-center">{employee.role}</td>
                <td className="border border-gray-200 px-4 py-2 text-center">{employee.position}</td>
                <td className="border border-gray-200 px-4 py-2 text-center">
                  <div className="relative inline-block">
                    <button
                      onClick={() => {
                        setCurrentEmployeeId(employee.employeeID);
                        setShow(true);
                      }}
                      className="bg-teal-500 text-white px-4 py-2 rounded"
                    >
                      Update
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-center mt-4">
          {[...Array(Math.ceil(filteredEmployees.length / employeesPerPage))].map((_, index) => (
            <button
              key={index}
              className={`px-4 py-2 border-t border-b border-gray-300 ${currentPage === index + 1 ? 'bg-teal-500 text-white' : 'bg-white'}`}
              onClick={() => paginate(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>

      <div className="lg:hidden">
        {filteredEmployees.map((employee) => (
          <div key={employee.employeeID} className="border border-gray-300 rounded p-4 mb-4 relative">
            <p><strong>Employee ID:</strong> {employee.employeeID}</p>
            <p><strong>Name:</strong> {employee.name}</p>
            <p><strong>Department:</strong> {employee.department}</p>
            <p><strong>Role:</strong> {employee.role}</p>
            <p><strong>Position:</strong> {employee.position}</p>
            <button
              className="bg-teal-500 text-white px-4 py-2 rounded mt-2"
              onClick={() => {
                setCurrentEmployeeId(employee.employeeID);
                setShow(true);
              }}
            >
              Update
            </button>
          </div>
        ))}
      </div>

      {show && (
  <>
    <div
      className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40"
      onClick={() => setShow(false)}
    ></div>
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 shadow-lg rounded z-50 w-[90%] max-w-lg sm:max-w-md md:max-w-md lg:max-w-md h-80 text-center border-2 border-gray-500">
      <h3 className="mb-4 text-2xl">Update Employee Role</h3>
      <div className="mb-10 sm:text-center text-left">
        <select
          className="p-2 border rounded w-[45%] sm:w-[80%] sm:text-xl text-lg"
          value={selectedTeamLead}
          onChange={(e) => setSelectedTeamLead(e.target.value)}
        >
          <option value="" className="truncate w-16 text-lg sm:text-lg">
            Select..
          </option>
          {roleOptions.map((lead, index) => (
            <option key={index} value={lead} className="truncate w-24 text-lg sm:text-lg">
              {lead}
            </option>
          ))}
        </select>
      </div>
      <div>
        <button
          className="w-[60%] py-2 bg-green-500 text-white rounded"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
      <button
        className="w-[60%] py-2 mt-2 bg-red-500 text-white rounded"
        onClick={() => setShow(false)}
      >
        Close
      </button>
    </div>
  </>
)}
    </div>
  );
};

export default EmployeeDetails;