import React,{ useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import { toast, ToastContainer  } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axiosInstance from "../utilities/axios/axiosInstance";
import { Icon } from "@iconify/react";
import { FaUser, FaEnvelope, FaPhoneAlt, FaBriefcase, FaCalendarAlt, FaTag } from 'react-icons/fa';

// const axiosInstance = axios.create({
//   baseURL: 'https://3qhglx2bhd.execute-api.us-east-1.amazonaws.com/employee',
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

const Position = () => {
  const [users, setUsers] = useState([]);
  const [teamLeads, setTeamLeads] = useState([]);
  const [untaggedUsers, setUntaggedUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [show, setShow] = useState(false);
  const [positions, setPositions] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedPosition, setSelectedPosition] = useState("all");
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [selectedTeamLead, setSelectedTeamLead] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [selectedCheckbox, setSelectedCheckbox] = useState(null);



  const [isMobile, setIsMobile] = useState(window.innerWidth <= 700);
  const [selectedRow, setSelectedRow] = useState(null);

  const usersPerPage = 10;
  const lastUserIndex = currentPage * usersPerPage;
  const firstUserIndex = lastUserIndex - usersPerPage;
  const currentUsers = filteredUsers.slice(firstUserIndex, lastUserIndex);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);


  
  

  
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosInstance.get("employee/getAll");
        const data = response.data;
  
        if (Array.isArray(data.message)) {
          // Store users in state
          setUsers(data.message);
  
          // Get tagged employees from localStorage
          const taggedEmployees = JSON.parse(localStorage.getItem("taggedEmployees")) || [];
  
          // Filter out tagged employees
          let untaggedUsers = data.message.filter(user => 
            !taggedEmployees.includes(user.name)
          );
  
          // Update untagged users state
          setUntaggedUsers(untaggedUsers);
  
          // Set filtered users without tagged ones
          setFilteredUsers(untaggedUsers);
  
          // Extract unique positions and departments
          const uniquePositions = [
            ...new Set(data.message.map((user) => user.position)),
          ];
          const uniqueDepartments = [
            ...new Set(data.message.map((user) => user.team || "General")),
          ];
          setPositions(uniquePositions);
          setDepartments(uniqueDepartments);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
  
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
  }, [])

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 700);
      if (isMobile) {
        document.body.style.height = "auto"; // Reset height on mobile
      } else {
        document.body.style.height = "100vh"; // Full screen on desktop
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, [isMobile]);
  


  
  
  const handleCardClick = (user) => {
    setSelectedEmployee(user);
};




const handleTagButtonClick = () => {
  if (!selectedEmployee) {
    toast.error("Please select a row before proceeding.", {
      position: "top-center",
    });
    return;
  }
  setShow(true);
};




const handleSubmit = async () => {
  if (selectedEmployee && selectedTeamLead) {
    try {
      const response = await axiosInstance.put("employee/tag", {
        employeeName: selectedEmployee.name,
        teamLeadName: selectedTeamLead,
      });

      if (response.status === 200) {
        toast.success(response.data.message || "Operation successful!");

        // Remove the tagged user from the lists
        setUsers((prevUsers) =>
          prevUsers.filter((user) => user.name !== selectedEmployee.name)
        );
        setFilteredUsers((prevFilteredUsers) =>
          prevFilteredUsers.filter((user) => user.name !== selectedEmployee.name)
        );


        // Reset states
        setShow(false);
        setSelectedTeamLead("");
        setSelectedEmployee(null);
      } else {
        toast.error(response.data.message || "Error occurred.");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to tag the employee. Please try again.");
    }
  } else {
    toast.error("Please select an employee and a team lead.");
  }
};




const filterUsers = () => {
  let filtered = [...users];

  if (selectedPosition !== "all") {
    filtered = filtered.filter((user) => user.position === selectedPosition);
  }

  if (selectedDepartment !== "all") {
    filtered = filtered.filter((user) => user.team === selectedDepartment);
  }

  setFilteredUsers(filtered);
  setCurrentPage(1);
};

useEffect(() => {
  filterUsers();
}, [selectedPosition, selectedDepartment, users]);






  
 
  const goToPreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  
  useEffect(() => {
    const sidebar = document.querySelector(".sidebar");
    if (sidebar) {
      if (show) {
        sidebar.classList.add("blur", "bg-black", "bg-opacity-100");
      } else {
        sidebar.classList.remove("blur", "bg-black", "bg-opacity-50");
      }
    }
  }, [show]);


  // const handleSubmit = () => {
  //   if (selectedEmployee && selectedTeamLead) {
  //     console.log("Employee:", selectedEmployee.name);
  //     console.log("Assigned to TeamLead:", selectedTeamLead);
  //     setShow(false);
  //     setSelectedTeamLead("");
  //     setSelectedEmployee(null);
  //   } else {
  //     console.log("No employee or team lead selected");
  //   }
  // };


  
  const handleCheckboxChange = (user, userIndex) => {
    // Toggle checkbox selection
    const isAlreadySelected = selectedCheckbox === userIndex;
    setSelectedCheckbox(isAlreadySelected ? null : userIndex);
  
    // Synchronize with selectedEmployee state
    setSelectedEmployee(isAlreadySelected ? null : user);
  
    // Log selection status
    if (!isAlreadySelected) {
      console.log("Employee selected:", user.name);
    } else {
      console.log("Employee deselected.");
    }
  };



  
  const handleRowClick = (user) => {
    // Toggle row selection
    const isAlreadySelected = selectedEmployee?.name === user.name;
    setSelectedEmployee(isAlreadySelected ? null : user);
    setSelectedCheckbox(isAlreadySelected ? null : users.indexOf(user)); // Sync checkbox
  
    // Log selection status
    if (!isAlreadySelected) {
      console.log("Employee selected via row click:", user.name);
    } else {
      console.log("Employee deselected.");
    }
  };
  


  
  

 

  

  return (
    <div className="py-0 sm:px-5 px-0">
    <ToastContainer />
      {/* Stats Section */}
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
  

     



    
      {/* Filter Section */}
      <div className="flex flex-col sm:flex-row sm:justify-start items-center gap-4 mb-6 sm:w-auto w-32">
      <select
        className="p-2 border text-base rounded bg-gray-200 sm:w-auto w-[140px]"
        value={selectedPosition}
        onChange={(e) => setSelectedPosition(e.target.value)}
      >
        <option  className="w-[100px]" value="all">All Positions</option>
        {positions.map((position, index) => (
          <option   key={index} value={position}>
            {position}
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
    </div>


    {/* User Display */}
    {isMobile ? (
  <div className="grid grid-cols-2 gap-4"> {/* Increased gap between cards */}
    {filteredUsers.length > 0 ? (
      filteredUsers.map((user, index) => (
        <div
          key={index}
          className={`border-4 border-white rounded-lg bg-white transform transition-all duration-300`} // Removed hover effects
          style={{
            borderColor: selectedEmployee?.name === user.name ? "blue" : "", 
            boxShadow: "0px 4px 10px rgba(105, 105, 105, 0.6)",
            width: '45vw',  // Slightly increased width for the card
            height: '32vh',  // Slightly increased height for more content space
            padding: 0,  // Removed padding from the card
            position: 'relative',  // For absolute positioning of the button
          }}
          onClick={() => handleCardClick(user)}
        >
          <div className="text-left" style={{ padding: '8px', wordWrap: 'break-word', height: '80%' }}> {/* Allow text to wrap */}
            <p className="text-base " style={{ whiteSpace: 'normal' }}>
              <FaUser className="text-gray-500 inline-block mr-1 text-base" /> {/* Icon for Name */}
               {user.name}
            </p>
            <p className="text-base " style={{ whiteSpace: 'normal' }}>
              <FaEnvelope className="text-gray-500 inline-block mr-1 text-base" /> {/* Icon for Email */}
              {user.email}
            </p>
            <p className="text-base " style={{ whiteSpace: 'normal' }}>
              <FaPhoneAlt className="text-gray-500 inline-block mr-1 text-base" /> {/* Icon for Phone */}
              {user.mobile}
            </p>
            <p className="text-base" style={{ whiteSpace: 'normal' }}>
              <FaBriefcase className="text-gray-500 inline-block mr-1 text-base" /> {/* Icon for Position */}
              {user.position}
            </p>
            <p className="text-base" style={{ whiteSpace: 'normal' }}>
              <FaCalendarAlt className="text-gray-500 inline-block mr-1 text-base" /> {/* Icon for Joining Date */}
              {user.appliedDate}
            </p>
          </div>
          <div className="text-right text-base" style={{ position: 'absolute', bottom: '10px', right: '10px' }}>
            <FaTag
              className="text-blue-500 cursor-pointer"  // Tag icon with color and pointer cursor
              onClick={(e) => {
                e.stopPropagation();
                setShow(true);  // Show tag functionality
              }}
              style={{
                fontSize: '20px',  // Adjust size of the icon
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
) 

 : (
  <div
  className="relative w-full border border-gray-300 rounded-lg overflow-hidden"
  style={{ height: "350px" }}
>
  {/* Scrollable Table Data */}
  <div className="h-full overflow-y-auto">
    <table className="w-full border-collapse border border-white-300">
      <thead
        className="bg-gray-100"
        style={{
          position: "sticky",
          top: 0, // Keeps it at the top while scrolling
          zIndex: 10, // Ensures the header stays above table data
        }}
      >
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
        {currentUsers.length > 0 ? (
          currentUsers.map((user, index) => (
            <tr
              key={index}
              className={`hover:bg-gray-200 cursor-pointer ${
                selectedEmployee?.name === user.name ? "bg-green-100" : ""
              }`}
              onClick={() => handleRowClick(user)}
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
                <button
                  className="px-2 py-1 bg-blue-500 text-white rounded"
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
  {/* Pagination */}
  <div className="absolute bottom-0 w-full bg-white border-t border-gray-300 py-2 flex justify-between items-center px-4">
    <button
      onClick={goToPreviousPage}
      disabled={currentPage === 1}
      className="px-4 py-2 border rounded disabled:opacity-50"
    >
      Previous
    </button>
    <span>
      Page {currentPage} of {totalPages}
    </span>
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
    {/* Overlay for blur and shadow */}
    <div
      className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40"
      onClick={() => setShow(false)} // Close the modal if the overlay is clicked
    ></div>

<div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 shadow-lg rounded z-50 w-[90%] max-w-lg sm:max-w-md md:max-w-md lg:max-w-md h-80 text-center border-2 border-gray-500">
  <h3 className="mb-4 text-2xl">Assign Team Lead</h3>
  
  {/* Responsive alignment for the select box */}
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
        <option
          key={index}
          value={lead}
          className="truncate w-24 text-lg sm:text-lg"
        >
          {lead}
        </option>
      ))}
    </select>
  </div>
  
  {/* Submit button stays in the center */}
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

export default Position;
