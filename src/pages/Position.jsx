import { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import toast from 'react-hot-toast';

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
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [priority, setPriority] = useState("Urgent");
  const [assignedBy, setAssignedBy] = useState("");
  const [assignedTo, setAssignedTo] = useState([]);
  const [reviewer, setReviewer] = useState("");
  const [referenceFileUrl, setReferenceFileUrl] = useState([]);
  const [dueDate, setDueDate] = useState("");
  const [score, setScore] = useState(85);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
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


  const handleSubmit = async () => {
    console.log("Selected Employee:", selectedEmployee);
    console.log("Selected TeamLead:", selectedTeamLead);

    if (selectedEmployee && selectedTeamLead) {
      try {
        const response = await fetch("https://3qhglx2bhd.execute-api.us-east-1.amazonaws.com/employee/tag", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            employeeName: selectedEmployee.name,
            teamLeadName: selectedTeamLead,
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          console.error("Error:", data.message);
          toast.error(data.message); // Show error toast
        } else {
          console.log("Employee successfully tagged:", data);
          toast.success("Employee tagged successfully!"); // Show success toast
          setShow(false);
          setSelectedTeamLead("");
          setSelectedEmployee(null);
        }
      } catch (error) {
        console.error("Network error:", error);
        toast.error("Failed to tag the employee. Please try again."); // Show network error toast
      }
    } else {
      toast.error("Please select an employee and a team lead."); // Show validation error toast
    }
 };






  return (
    <div className="p-5">
      {/* Stats Section */}
      <div className="mx-auto w-1/2 flex space-x-20 gap-2 my-5">
        <div className="flex flex-col relative left-10 items-start justify-center w-[200px] h-[100px] text-[20px] text-[#333] text-center">
          <span className="text-center text-[42.52px] font-medium leading-[49.83px]">
            {users.length}
          </span>
          <span className="text-center text-[10.97px] font-bold leading-[11.68px] tracking-[0.1px] text-[#C4C4C4] underline decoration-skip-ink-none">
            People
          </span>
        </div>
        <div className="h-[130px] min-h-[1em] w-px self-stretch bg-gradient-to-tr from-transparent via-neutral-500 to-transparent opacity-25 dark:via-neutral-400"></div>
        <div className="flex flex-col relative left-14 items-start justify-center w-[200px] h-[100px] text-[20px] text-[#333] text-center">
          <span className="text-center text-[42.52px] font-medium leading-[49.83px]">
            {departments.length}
          </span>
          <span className="text-center text-[10.80px] font-bold leading-[11.68px] tracking-[0.1px] text-[#C4C4C4] underline decoration-skip-ink-none">
            Departments
          </span>
        </div>
      </div>

      {/* Filters */}
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


         {/* Table */}
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
                 selectedRow === index ? "bg-sky-100" : "" 
               }`}
               onClick={() => setSelectedRow(index)} 
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

      {/* Tag Modal */}
      {show && (
        <div className="absolute top-1/3 right-4 bg-white shadow-lg rounded p-4">
          <div className="flex justify-between items-center mb-4">
            <select
              className="p-2 border rounded"
              value={selectedTeamLead}
              onChange={(e) => setSelectedTeamLead(e.target.value)}
            >
              <option value="">Select TeamLead</option>
              {teamLeads.map((lead, index) => (
                <option key={index} value={lead}>
                  {lead}
                </option>
              ))}
            </select>
            <button
              className="ml-2 p-1 bg-red-500 text-white rounded"
              onClick={() => setShow(false)}
            >
              <IoClose />
            </button>
          </div>
          <button
            className="w-full py-2 bg-green-500 text-white rounded"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      )}


    </div>
  );
};

export default Position;


