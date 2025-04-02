import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axiosInstance from "../../common/utils/axios/axiosInstance";
import ReactLoading from "react-loading";
import { FaUser, FaEnvelope, FaPhoneAlt, FaBriefcase, FaCalendarAlt, FaTag } from 'react-icons/fa';

const Position = () => {
  const [users, setUsers] = useState([]);
  const [teamLeads, setTeamLeads] = useState([]);
  const [untaggedUsers, setUntaggedUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [show, setShow] = useState(false);
  const [roles, setRoles] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedRole, setSelectedRole] = useState("all");
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [selectedTeamLead, setSelectedTeamLead] = useState("");
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [selectedCheckbox, setSelectedCheckbox] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 700);
  const [loading, setLoading] = useState(false);
  const [selectAll, setSelectAll] = useState(false);

  const usersPerPage = 10;
  const lastUserIndex = currentPage * usersPerPage;
  const firstUserIndex = lastUserIndex - usersPerPage;
  const currentUsers = filteredUsers.slice(firstUserIndex, lastUserIndex);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("employee/untag");
      const data = response.data;
      console.log(response)
      if (Array.isArray(data.message)) {
        setUsers(data.message);
        const taggedEmployees = JSON.parse(localStorage.getItem("taggedEmployees")) || [];
        let untaggedUsers = data.message.filter(user => !taggedEmployees.includes(user.name));
        setUntaggedUsers(untaggedUsers);
        setFilteredUsers(untaggedUsers);
        const uniqueRoles = [...new Set(data.message.map((user) => user.role))]; 
        const departmentOptions = ["Design", "Development", "DevOps", "Marketing", "HR", "AI/ML"];
        setRoles(uniqueRoles);
        setDepartments(departmentOptions); // Set predefined departments
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchTeamLeads = async () => {
      try {
        const response = await axiosInstance.get("employee/getOption/TeamLead");
        const data = response.data;
        if (Array.isArray(data.message)) {
          setTeamLeads(data.message);
        }
      } catch (error) {
        console.error("Error fetching team leads:", error);
      }
    };
    fetchTeamLeads();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 700);
      if (isMobile) {
        document.body.style.height = "auto";
      } else {
        document.body.style.height = "100vh";
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, [isMobile]);

  const handleCheckboxChange = (user, userIndex) => {
    const isAlreadySelected = selectedCheckbox.includes(userIndex);
    let newSelectedCheckbox;
    let newSelectedEmployees;

    if (isAlreadySelected) {
      newSelectedCheckbox = selectedCheckbox.filter(index => index !== userIndex);
      newSelectedEmployees = selectedEmployees.filter(emp => emp.name !== user.name);
    } else {
      newSelectedCheckbox = [...selectedCheckbox, userIndex];
      newSelectedEmployees = [...selectedEmployees, user];
    }

    setSelectedCheckbox(newSelectedCheckbox);
    setSelectedEmployees(newSelectedEmployees);

    if (!isAlreadySelected) {
      console.log("Employee selected:", user.name);
    } else {
      console.log("Employee deselected.");
    }

    // Update selectAll state
    if (newSelectedCheckbox.length === currentUsers.length) {
      setSelectAll(true);
    } else {
      setSelectAll(false);
    }
  };

  const handleSelectAll = (e) => {
    const isChecked = e.target.checked;
    setSelectAll(isChecked);

    if (isChecked) {
      const allIndexes = currentUsers.map((_, index) => index);
      setSelectedCheckbox(allIndexes);
      setSelectedEmployees(currentUsers);
    } else {
      setSelectedCheckbox([]);
      setSelectedEmployees([]);
    }
  };

  const handleRowClick = (user) => {
    const userIndex = users.indexOf(user);
    handleCheckboxChange(user, userIndex);
  };

  const handleTagButtonClick = () => {
    if (selectedEmployees.length === 0) {
      toast.error("Please select at least one row before proceeding.", {
        position: "top-center",
      });
      return;
    }
    setShow(true);
  };

  const handleSubmit = async () => {
    if (selectedEmployees.length > 0 && selectedTeamLead) {
      try {
        const responses = await Promise.all(
          selectedEmployees.map(employee =>
            axiosInstance.put("employee/tag", {
              employeeName: employee.name,
              teamLeadName: selectedTeamLead,
            })
          )
        );

        responses.forEach(response => {
          if (response.status === 200) {
            toast.success(response.data.message.message || "Operation successful!", {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              theme: "colored",
            });
          } else {
            console.error("Unexpected API Response:", response.data);
            toast.error(response.data.message || "Error occurred.");
          }
        });

        fetchUsers();
        setShow(false);
        setSelectedTeamLead("");
        setSelectedEmployees([]);
        setSelectedCheckbox([]);
      } catch (error) {
        console.error("Error tagging employees:", error);
        toast.error(error.response?.data?.message || "Failed to tag the employees. Please try again.", {
          position: "top-right",
          autoClose: 3000,
          theme: "colored",
        });
      }
    } else {
      console.warn("Missing Employees or Team Lead");
      toast.error("Please select at least one employee and a team lead.");
    }
  };

  const filterUsers = () => {
    let filtered = [...users];

    if (selectedRole !== "all") {
      filtered = filtered.filter((user) => user.role === selectedRole);
    }

    if (selectedDepartment !== "all") {
      filtered = filtered.filter((user) => user.department && user.department === selectedDepartment);
    }

    setFilteredUsers(filtered);
    setCurrentPage(1);
  };

  useEffect(() => {
    filterUsers();
  }, [selectedRole, selectedDepartment, users]);

  const goToPreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };


  
  return (
    loading ? (
      <div className="fixed inset-0 flex justify-center items-center bg-white bg-opacity-40 z-50">
                <ReactLoading type="spin" color="#00bfae" height={50} width={50} />
      </div>
    ) : (
      <div className="py-0 sm:px-5 px-0">
        <ToastContainer />
        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-28 mb-5">
          <div className="flex flex-col items-center text-center">
            <span className="text-3xl font-medium">{users.length}</span>
            <span className="text-sm text-gray-400 underline">People</span>
          </div>
          <div className="w-[1px] h-16 bg-gray-300"></div>
          <div className="flex flex-col items-center text-center">
            <span className="text-3xl font-medium">{departments.length}</span>
            <span className="text-sm text-gray-400 underline">Departments</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:justify-start items-center gap-4 mb-6 sm:w-auto w-32">
          <select
            className="p-2 border text-base rounded bg-gray-200 sm:w-auto w-[140px]"
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
          >
            <option className="w-[100px]" value="all">All Roles</option> {/* Changed from All Positions */}
            {roles.map((role, index) => (
              <option key={index} value={role}>
                {role}
              </option>
            ))}
          </select>
          <select
            className="p-2 border rounded bg-gray-200 sm:w-auto w-[140px]"
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
          >
            <option value="all">All Departments</option>
            {departments.map((department, index) => (
              <option key={index} value={department}>
                {department}
              </option>
            ))}
          </select>
          {selectedEmployees.length > 0 && (
            <button
              className="p-2 border text-base rounded bg-[#00bfae] text-white"
              onClick={handleTagButtonClick}
            >
              Tag  ({selectedEmployees.length})
            </button>
          )}
        </div>

        {isMobile ? (
          <div className="grid grid-cols-2 gap-4">
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user, index) => (
                <div
                  key={index}
                  className={`border-4 border-white rounded-lg bg-white transform transition-all duration-300`}
                  style={{
                    borderColor: selectedEmployees.some(emp => emp.name === user.name) ? "blue" : "",
                    boxShadow: "0px 4px 10px rgba(105, 105, 105, 0.6)",
                    width: '45vw',
                    height: '32vh',
                    padding: 0,
                    position: 'relative',
                  }}
                  onClick={() => handleCardClick(user)}
                >
                  <div className="text-left" style={{ padding: '8px', wordWrap: 'break-word', height: '80%' }}>
                    <p className="text-base " style={{ whiteSpace: 'normal' }}>
                      <FaUser className="text-gray-500 inline-block mr-1 text-base" />
                      {user.name}
                    </p>
                    <p className="text-base " style={{ whiteSpace: 'normal' }}>
                      <FaEnvelope className="text-gray-500 inline-block mr-1 text-base" />
                      {user.email}
                    </p>
                    <p className="text-base " style={{ whiteSpace: 'normal' }}>
                      <FaPhoneAlt className="text-gray-500 inline-block mr-1 text-base" />
                      {user.mobile}
                    </p>
                    <p className="text-base" style={{ whiteSpace: 'normal' }}>
                      <FaBriefcase className="text-gray-500 inline-block mr-1 text-base" />
                      {user.position}
                    </p>
                    <p className="text-base" style={{ whiteSpace: 'normal' }}>
                      <FaCalendarAlt className="text-gray-500 inline-block mr-1 text-base" />
                      {user.appliedDate}
                    </p>
                  </div>
                  <div className="text-right text-base" style={{ position: 'absolute', bottom: '10px', right: '10px' }}>
                    <FaTag
                      className="text-[#00bfae] cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        setShow(true);
                      }}
                      style={{
                        fontSize: '20px',
                      }}
                    />
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-xl font-bold text-gray-500">
                No users found for the selected filters.
              </div>
            )}
          </div>
        ) : (
          <div className="relative w-full border border-gray-300 rounded-lg overflow-hidden" style={{ height: "350px" }}>
            <div className="h-full overflow-y-auto">
              <table className="w-full border-collapse border border-white-300">
                <thead className="bg-gray-100" style={{ position: "sticky", top: 0, zIndex: 10 }}>
                  <tr>
                    <th className="p-2 border">
                      <input type="checkbox" checked={selectAll} onChange={handleSelectAll} />
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
                  {currentUsers.length > 0 ? (
                    currentUsers.map((user, index) => (
                      <tr
                        key={index}
                        className={`hover:bg-gray-200 cursor-pointer ${
                          selectedEmployees.some(emp => emp.name === user.name) ? "bg-green-100" : ""
                        }`}
                        onClick={() => handleRowClick(user)}
                      >
                        <td className="p-2 text-center">
                          <input
                            type="checkbox"
                            checked={selectedCheckbox.includes(index)}
                            onChange={() => handleCheckboxChange(user, index)}
                          />
                        </td>
                        <td className="p-2 text-center">{user.name}</td>
                        <td className="p-2 text-center">{user.email}</td>
                        <td className="p-2 text-center">{user.mobile}</td>
                        <td className="p-2 text-center">{user.position}</td>
                        <td className="p-2 text-center">{user.appliedDate}</td>
                        <td className="p-2 text-center">
                          <button
                            className="px-2 py-1 bg-[#00bfae] text-white rounded"
                            onClick={(e) => {
                              e.stopPropagation();
                              setShow(true);
                            }}
                          >
                            Tag
                          </button>
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
            <div className="absolute bottom-0 w-full bg-white border-t border-gray-300 py-2 flex justify-between items-center px-4">
              <button
                onClick={goToPreviousPage}
                disabled={currentPage === 1}
                className="px-4 py-2 border rounded disabled:opacity-50"
              >
                Previous
              </button>
              <div className="flex items-center gap-2">
                {[...Array(totalPages)].map((_, index) => (
                  <button
                    key={index}
                    className={`px-3 py-1 rounded-md ${currentPage === index + 1 ? 'bg-[#00bfae] text-white' : 'bg-white text-gray-500'}`}
                    onClick={() => setCurrentPage(index + 1)}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
              <button
                onClick={goToNextPage}
                disabled={currentPage === totalPages}
                className="px-4 py-2 border rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {show && (
          <>
            <div
              className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40"
              onClick={() => setShow(false)}
            ></div>
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 shadow-lg rounded z-50 w-[90%] max-w-lg sm:max-w-md md:max-w-md lg:max-w-md h-80 text-center border-2 border-gray-500">
              <h3 className="mb-4 text-2xl">Assign Team Lead</h3>
              <div className="mb-10 sm:text-center text-left">
                <select
                  className="p-2 border rounded w-[45%] sm:w-[80%] sm:text-xl text-lg"
                  value={selectedTeamLead}
                  onChange={(e) => setSelectedTeamLead(e.target.value)}
                >
                  <option value="" className="truncate w-16 text-lg sm:text-lg">
                    Select..
                  </option>
                  {teamLeads.map((lead, index) => (
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
    )
  );
};

export default Position;