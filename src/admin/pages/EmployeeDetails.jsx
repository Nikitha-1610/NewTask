import React, { useEffect, useState } from 'react';
import axiosInstance from "../../common/utils/axios/axiosInstance";
import ReactLoading from 'react-loading';

const EmployeeDetails = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterYear, setFilterYear] = useState("");
  const [filterSection, setFilterSection] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [employeesPerPage] = useState(7);

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

  const handleDelete = (employeeId) => {
    axiosInstance.delete(`employee/delete/${employeeId}`)
      .then(response => {
        console.log('Employee deleted:', response.data.message);
        setEmployees(prevEmployees =>
          prevEmployees.filter(employee => employee.employeeID !== employeeId)
        );
      })
      .catch(error => {
        console.error('Error deleting employee:', error);
      });
  };

  const handleSearch = (e) => setSearchQuery(e.target.value);
  const handleFilterYear = (e) => setFilterYear(e.target.value);
  const handleFilterSection = (e) => setFilterSection(e.target.value);

  const filteredEmployees = employees.filter(employee =>
    employee.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (filterYear === "" || employee.year === filterYear) &&
    (filterSection === "" || employee.section === filterSection)
  );

  const indexOfLastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
  const currentEmployees = filteredEmployees.slice(indexOfFirstEmployee, indexOfLastEmployee);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const uniqueYears = ['I', 'II', 'III', 'IV'];  // Fixed year options
  const uniqueSections = ['A', 'B'];  // Fixed section options

  if (loading) {
    return (
      <div className="fixed inset-0 flex justify-center items-center bg-white bg-opacity-70 z-50">
        <ReactLoading type="spin" color="#00bfa6" height={50} width={50} />
      </div>
    );
  }

  return (
    <div className="bg-gray-50 p-4 min-h-screen">
      <h1 className="text-2xl font-bold mb-4 text-teal-600">Total Students: {filteredEmployees.length}</h1>

      {/* Filters Section */}
      <div className="flex flex-col lg:flex-row lg:items-center gap-4 mb-4 justify-between">
        {/* Search Input on the Left */}
        <input
          type="text"
          placeholder="Search by name"
          value={searchQuery}
          onChange={handleSearch}
          className="border border-black rounded px-4 py-2 w-full lg:w-1/3"
        />

        {/* Filters on the Right */}
        <div className="flex gap-4 w-full lg:w-1/3">
          <select value={filterYear} onChange={handleFilterYear} className="border border-black rounded px-4 py-2 w-full">
            <option value="">All Years</option>
            {uniqueYears.map((year, i) => (
              <option key={i} value={year}>{year}</option>
            ))}
          </select>

          <select value={filterSection} onChange={handleFilterSection} className="border border-black rounded px-4 py-2 w-full">
            <option value="">All Sections</option>
            {uniqueSections.map((sec, i) => (
              <option key={i} value={sec}>{sec}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Desktop Table */}
      <div className="hidden lg:block bg-white p-4 rounded-lg shadow-md">
        <table className="min-w-full table-auto border-collapse border border-black">
          <thead className="bg-teal-200">
            <tr>
              <th className="border px-4 py-2 text-center">RegisterNo</th>
              <th className="border px-4 py-2 text-center">Name</th>
              <th className="border px-4 py-2 text-center">Year</th>
              <th className="border px-4 py-2 text-center">Section</th>
              <th className="border px-4 py-2 text-center">Department</th>
              <th className="border px-4 py-2 text-center">Delete</th>
            </tr>
          </thead>
          <tbody>
            {currentEmployees.map(employee => (
              <tr key={employee.employeeID} className="bg-white hover:bg-gray-50">
                <td className="border px-4 py-2 text-center">{employee.registerNo}</td>
                <td className="border px-4 py-2 text-center">{employee.name}</td>
                <td className="border px-4 py-2 text-center">{employee.year}</td>
                <td className="border px-4 py-2 text-center">{employee.section}</td>
                <td className="border px-4 py-2 text-center">{employee.department}</td>
                <td className="border px-4 py-2 text-center">
                  <button
                    onClick={() => handleDelete(employee.employeeID)}
                    className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600 transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex justify-center mt-4 flex-wrap gap-2">
          {[...Array(Math.ceil(filteredEmployees.length / employeesPerPage))].map((_, index) => (
            <button
              key={index}
              className={`px-4 py-2 border rounded ${currentPage === index + 1 ? 'bg-teal-500 text-white' : 'bg-white border-black'}`}
              onClick={() => paginate(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Mobile Cards */}
      <div className="lg:hidden bg-white p-4 rounded-lg shadow-md">
        {currentEmployees.map(employee => (
          <div key={employee.employeeID} className="border border-black rounded p-4 mb-4">
            <p><strong>Register No:</strong> {employee.registerNo}</p>
            <p><strong>Name:</strong> {employee.name}</p>
            <p><strong>Year:</strong> {employee.year}</p>
            <p><strong>Section:</strong> {employee.section}</p>
            <p><strong>Department:</strong> {employee.department}</p>
            <button
              className="bg-teal-500 text-white px-4 py-2 rounded mt-2 hover:bg-teal-600 transition"
              onClick={() => handleDelete(employee.employeeID)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmployeeDetails;
