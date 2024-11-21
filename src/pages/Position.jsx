import { useState } from "react";
import { IoClose } from "react-icons/io5";

const users = [
  {
    username: "Sandhiya Ravikumar",
    email: "sandyva@gmail.com",
    phone: "+91 6789054321",
    position: "UX UI Designer",
    joiningDate: "02-11-2024",
  },
  ...Array(25).fill({
    username: "Sandhiya Ravikumar",
    email: "sandyva@gmail.com",
    phone: "+91 6789054321",
    position: "UX UI Designer",
    joiningDate: "02-11-2024",
  }),
];

const Position = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;
  const lastUserIndex = currentPage * usersPerPage;
  const firstUserIndex = lastUserIndex - usersPerPage;
  const currentUsers = users.slice(firstUserIndex, lastUserIndex);
  const totalPages = Math.ceil(users.length / usersPerPage);
  const [show, setShow] = useState(false);

  const goToPreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="p-5">
      {/* Stats Section */}
      <div className="mx-auto w-1/2 flex space-x-20 gap-2 my-5">
          <div className="flex flex-col relative left-10 items-start justify-center w-[200px] h-[100px] text-[20px]  text-[#333] text-center ">
            <span className="text-center text-[42.52px] font-medium leading-[49.83px] tracking-[0.09966778010129929px] ">
              {users.length}
            </span>
            <span className="text-center text-[9.97px] font-medium leading-[11.68px] tracking-[0.1px] text-[#C4C4C4] underline decoration-skip-ink-none">
              People
            </span>
          </div>
          <div className="h-[130px] min-h-[1em] w-px self-stretch bg-gradient-to-tr from-transparent via-neutral-500 to-transparent opacity-25 dark:via-neutral-400"></div>
          <div className="flex flex-col relative left-14 items-start justify-center w-[200px] h-[100px] text-[20px]  text-[#333] text-center  ">
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

      {/* Responsive Table */}
      <div
        className="relative w-full border border-gray-300 rounded-lg overflow-hidden"
        style={{ height: "400px" }} // Set fixed height for the container
      >
        {/* Scrollable Table Content */}
        <div
          className="overflow-y-auto h-full"
          style={{ maxHeight: "calc(100% - 50px)" }} // Adjust space for pagination
        >
        <table className="w-full border-collapse border border-white-300">
          <thead className="bg-gray-100">
            <tr>
            <th className="p-2 border"><input type="checkbox" /></th>
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
              <tr key={index} className="even:bg-white-50 odd:bg-white">
                <td className="p-2  text-center">
                  <input type="checkbox" />
                </td>
                <td className="p-2 ">{user.username}</td>
                <td className="p-2 ">{user.email}</td>
                <td className="p-2 ">{user.phone}</td>
                <td className="p-2 ">{user.position}</td>
                <td className="p-2 ">{user.joiningDate}</td>
                <td className="p-2 ">
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
    


      

      {/* Modal */}
      {show && (
        <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white shadow-lg rounded p-4">
          <div className="flex justify-between items-center mb-4">
            <select className="p-2 border rounded">
              <option>Design Team Lead</option>
              <option>UX UI Designer</option>
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
            onClick={() => setShow(false)}
          >
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default Position;
