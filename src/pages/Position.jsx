import { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";

const Position = () => {
  const [users, setUsers] = useState([]);
  const [teamLeads, setTeamLeads] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [show, setShow] = useState(false);
  const [positions, setPositions] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedPosition, setSelectedPosition] = useState("all");
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [selectedTeamLead, setSelectedTeamLead] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState(null);


  const [isMobile, setIsMobile] = useState(false); // Track screen size
  const [selectedRow, setSelectedRow] = useState(null);

  const usersPerPage = 10;
  const lastUserIndex = currentPage * usersPerPage;
  const firstUserIndex = lastUserIndex - usersPerPage;
  const currentUsers = filteredUsers.slice(firstUserIndex, lastUserIndex);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          "https://3qhglx2bhd.execute-api.us-east-1.amazonaws.com/employee/getAll"
        );
        const data = await response.json();
        if (Array.isArray(data.message)) {
          setUsers(data.message);
          setFilteredUsers(data.message);

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
        const response = await fetch(
          "https://3qhglx2bhd.execute-api.us-east-1.amazonaws.com/employee/getOption/TeamLead"
        );
        const data = await response.json();
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
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  
  const handleCardClick = (user) => {
    setSelectedEmployee(user);
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
  }, [selectedPosition, selectedDepartment]);

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




  const handleSubmit = () => {
    console.log('Selected Employee:', selectedEmployee);
    console.log('Selected TeamLead:', selectedTeamLead);

    if (selectedEmployee && selectedTeamLead) {
      console.log('Employee:', selectedEmployee.name);
      console.log('Assigned to TeamLead:', selectedTeamLead);
      setShow(false);
      setSelectedTeamLead('');
      setSelectedEmployee(null);
    } else {
      console.log('No employee or team lead selected');
    }
  };



  return (
    <div className="p-5">
      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-6">
        <select
          className="p-2 border rounded bg-gray-200"
          value={selectedPosition}
          onChange={(e) => setSelectedPosition(e.target.value)}
        >
          <option value="all">All Positions</option>
          {positions.map((position, index) => (
            <option key={index} value={position}>
              {position}
            </option>
          ))}
        </select>
        <select
          className="p-2 border rounded bg-gray-200"
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

      {isMobile ? (
   <div className="grid grid-cols-1 gap-4">
   {users.map((user, index) => (
       <div
           key={index}
           className={`p-6 border rounded-lg shadow bg-white transition-transform duration-300 hover:scale-105`}style={{
            backgroundColor: selectedEmployee?.name === user.name ? "#90ee90" : "white"
        }}
           onClick={() => handleCardClick(user)}
       >
           <div className="text-left">
               <p className="text-xl mb-2">
                   <span className="font-bold">Name:</span> {user.name}
               </p>
               <p className="text-xl mb-2">
                   <span className="font-bold">Email:</span> {user.email}
               </p>
               <p className="text-xl mb-2">
                   <span className="font-bold">Phone:</span> {user.mobile}
               </p>
               <p className="text-xl mb-2">
                   <span className="font-bold">Position:</span> {user.position}
               </p>
               <p className="text-xl mb-4">
                   <span className="font-bold">Joining Date:</span> {user.appliedDate}
               </p>
           </div>
           <div className="text-center text-xl">
               <button
                   className="px-2 py-1 bg-blue-500 text-white rounded"
                   onClick={(e) => {
                       e.stopPropagation();
                       setShow(true);
                   }}
               >
                   Tag
               </button>
           </div>
       </div>
   ))}
</div>
  
     
      ) : (
        <div
        className="relative w-full border border-gray-300 rounded-lg overflow-hidden"
        style={{ height: "300px" }}
      >
        <div className="overflow-y-auto h-full">
          <table className="w-full border-collapse border border-white-300">
            <thead className="bg-gray-100">
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
              {currentUsers.map((user, index) => (
               <tr
               key={index}
               className={`even:bg-white-50 odd:bg-white ${
                 selectedRow === index ? "bg-sky-100" : "" // Add faint sky blue background color
               }`}
               onClick={() => setSelectedRow(index)} // Set the selected row on click
             >
                  <td className="p-2 text-center">

                    <input
                      type="checkbox"
                      onClick={(e) => {

                        setSelectedEmployee(user);

                      }}
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
                      onClick={() => setShow(!show)}
                    >
                      Tag
                    </button>
                  </td>
                </tr>
              ))}
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

    {/* Modal box */}
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 shadow-lg rounded z-50 w-[90%] max-w-lg sm:max-w-md md:max-w-md lg:max-w-md h-80 text-center border-2 border-gray-500">
      <h3 className="mb-4 text-2xl">Assign Team Lead</h3>
      <select
        className="p-2 border rounded sm:w-[90%]  w-[50%] mb-10 sm:text-xl text-base"
        value={selectedTeamLead}
        onChange={(e) => setSelectedTeamLead(e.target.value)}
      >
        <option  value="" className="truncate w-24 text-base sm:text-lg">Select Team Lead</option>
        {teamLeads.map((lead, index) => (
          <option
          key={index}
          value={lead}
          className="truncate w-24 text-sm sm:text-lg" // Ensures text truncates if too long
        >
          {lead}
        </option>
        ))}
      </select>
      <button
        className="w-[60%] py-2 bg-green-500 text-white rounded"
        onClick={handleSubmit}
      >
        Submit
      </button>
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
