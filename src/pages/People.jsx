import { useState } from "react"; 
import { IoClose } from "react-icons/io5";

const initialUsers = [
  {
    username: "Sandhiya Ravikumar",
    email: "sandyva@gmail.com",
    phone: "+91 6789054321",
    position: "UX UI Designer",
    joiningDate: "02-11-2024",
    isApproved: false,
  },
  ...Array(25).fill({
    username: "Sandhiya Ravikumar",
    email: "sandyva@gmail.com",
    phone: "+91 6789054321",
    position: "UX UI Designer",
    joiningDate: "02-11-2024",
    isApproved: false,
  }),
];

const People = () => {
  const [users, setUsers] = useState(initialUsers);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;
  const [show, setShow] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const lastUserIndex = currentPage * usersPerPage;
  const firstUserIndex = lastUserIndex - usersPerPage;
  const currentUsers = users.slice(firstUserIndex, lastUserIndex);
  const totalPages = Math.ceil(users.length / usersPerPage);

  const goToPreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const approveUser = (index) => {
    const updatedUsers = users.map((user, idx) =>
      idx === index ? { ...user, isApproved: true } : user
    );
    setUsers(updatedUsers);
  };

  const approvedDenied = (index) => {
    const updatedUsers = users.map((user, idx) =>
      idx === index ? { ...user, isApproved: false } : user
    );
    setUsers(updatedUsers);
  };

  return (
    <div className="p-5">
      {/* Statistics Section */}
      <div className="mx-auto w-1/2 flex space-x-20 gap-2 my-5">
          <div className="flex flex-col items-start justify-center w-[200px] h-[100px] text-[20px]  text-[#333] text-center ">
            <span className="text-center text-[42.52px] font-medium leading-[49.83px] tracking-[0.09966778010129929px] ">
              {users.length}
            </span>
            <span className="text-center text-[9.97px] font-medium leading-[11.68px] tracking-[0.1px] text-[#C4C4C4] underline decoration-skip-ink-none">
              People
            </span>
          </div>
          <div className="h-[130px] min-h-[1em] w-px self-stretch bg-gradient-to-tr from-transparent via-neutral-500 to-transparent opacity-25 dark:via-neutral-400"></div>
          <div className="flex flex-col items-start justify-center w-[200px] h-[100px] text-[20px]  text-[#333] text-center  ">
            <span className="text-center text-[42.52px] font-medium leading-[49.83px] tracking-[0.09966778010129929px] ">
              5
            </span>
            <span className="text-center text-[9.97px] font-medium leading-[11.68px] tracking-[0.1px] text-[#C4C4C4] underline decoration-skip-ink-none">
              Department
            </span>
          </div>
          <div className="h-[130px] min-h-[1em] w-px self-stretch bg-gradient-to-tr from-transparent via-neutral-500 to-transparent opacity-25 dark:via-neutral-400"></div>
        </div>
      

      {/* Filters */}
      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-6">
        <select className="p-2 border rounded bg-gray-200">
          <option value="all">All</option>
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
        </select>
        <select className="p-2 border rounded bg-gray-200">
          <option value="all-departments">All Departments</option>
          <option value="hr">HR</option>
          <option value="finance">Finance</option>
          <option value="marketing">Marketing</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border-none">
          <thead className="bg-white">
            <tr className="bg-gray-200">
              <th className="p-2 "><input type="checkbox" /></th>
              <th className="p-2 ">Username</th>
              <th className="p-2 ">Mail ID</th>
              <th className="p-2 bordr">Phone</th>
              <th className="p-2 ">Position</th>
              <th className="p-2 ">Joining Date</th>
              <th className="p-2 ">Activity</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((user, index) => (
              <tr key={index} className="odd:bg-white-50">
                <td className="p-2  text-center">
                  <input type="checkbox" />
                </td>
                <td className="p-2 ">{user.username}</td>
                <td className="p-2 ">{user.email}</td>
                <td className="p-2 ">{user.phone}</td>
                <td className="p-2 ">{user.position}</td>
                <td className="p-2 ">{user.joiningDate}</td>
                <td className="p-2  text-center">
                  <button
                    onClick={() => {
                      setSelectedUser(index + firstUserIndex);
                      setShow(true);
                    }}
                    className={`px-3 py-1 rounded ${
                      user.isApproved ? "bg-green-500 text-white" : "bg-gray-300"
                    }`}
                  >
                    {user.isApproved ? "Approved" : "Approve"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-6 mt-6">
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

      {/* Modal */}
      {show && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-md max-w-sm w-full">
            <div className="flex justify-end">
              <button onClick={() => setShow(false)} className="text-red-500">
                <IoClose size={24} />
              </button>
            </div>
            <p className="mb-4 text-center">Are you sure to Approve?</p>
            <div className="flex justify-around">
              <button
                onClick={() => {
                  approveUser(selectedUser);
                  setShow(false);
                }}
                className="px-4 py-2 bg-green-500 text-white rounded"
              >
                Approve
              </button>
              <button
                onClick={() => {
                  approvedDenied(selectedUser);
                  setShow(false);
                }}
                className="px-4 py-2 bg-red-500 text-white rounded"
              >
                Reject
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default People;
