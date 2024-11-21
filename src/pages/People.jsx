import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { IoClose } from "react-icons/io5";
import axiosInstance from "../utilities/axios/axiosInstance";

const People = () => {
  // const allUsers = Array(24).fill({
  //   username: "Sandhiya Ravikumar",
  //   mailId: "sandyva@gmail.com",
  //   phoneNumber: "+91 6789054321",
  //   position: "UX UI Designer",
  //   department: "Design",
  //   joiningDate: "02-11-2024",
  //   actionType: "Approve", // Default action
  // });
  const [allUsers, setAllUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(7);
  const [selectedDepartment, setSelectedDepartment] = useState("All");
  const [modalVisible, setModalVisible] = useState(false);
  const [actionType, setActionType] = useState(""); // To store the selected action (Approve, Reject, Hold)
  const [selectedUserIndex, setSelectedUserIndex] = useState(null);
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);

  const getAllusers = async () => {
    try {
      const response = await axiosInstance.get("user/getUsers", {
        // headers: {
        //   "Content-Type": "application/json",
        //   Authorization: `Bearer ${token}`, // Include token in the header
        // },
      });
      console.log("here is all users data", response.data.message);
      setAllUsers(response?.data?.message);
    } catch (error) {
      console.error("Error syncing with server:", error);
    }
  };
  useEffect(() => {
    console.log("all users", allUsers);

    getAllusers();
  }, []);

  const departments = ["All", "Design", "Development", "Marketing"];

  const filteredUsers =
    selectedDepartment === "All"
      ? allUsers
      : allUsers.filter((user) => user.department === selectedDepartment);

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const openConfirmModal = (userIndex) => {
    setSelectedUserIndex(userIndex);
    setConfirmModalVisible(true);
  };

  const openActionModal = (userIndex) => {
    setSelectedUserIndex(userIndex);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setConfirmModalVisible(false);
    setSelectedUserIndex(null);
    setActionType("");
  };

  const confirmAction = () => {
    if (selectedUserIndex !== null) {
      // Update the selected user's action type based on modal choice
      if (actionType) {
        currentUsers[selectedUserIndex].actionType = actionType;
      }
    }
    closeModal();
  };

  const handleApprove = () => {
    openConfirmModal(selectedUserIndex); // Open confirm modal when clicking approve
  };

  return (
    <div className="p-5">
      {/* Stats Section */}
      <div className="mx-auto w-1/2 flex space-x-20 gap-2 my-5">
        <div className="flex flex-col relative left-10 items-start justify-center w-[200px] h-[100px] text-[20px]  text-[#333] text-center ">
          <span className="text-center text-[42.52px] font-medium leading-[49.83px] tracking-[0.09966778010129929px] ">
            {allUsers.length}
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

      {/* Filter Section */}
      <div className="flex flex-wrap gap-2 items-center mb-4">
        <select
          className="border border-gray-300 bg-gray-200 rounded-lg p-2 text-gray-700"
          onChange={(e) => setSelectedDepartment(e.target.value)}
        >
          {departments.map((dept) => (
            <option key={dept} value={dept}>
              {dept}
            </option>
          ))}
        </select>
        <select className="p-2 border rounded bg-gray-200">
          <option value="all-departments">All Departments</option>
          <option value="hr">HR</option>
          <option value="finance">Finance</option>
          <option value="marketing">Marketing</option>
        </select>
      </div>

      {/* Table with Fixed Height */}
      <div
        className="relative w-full border border-gray-300 rounded-lg overflow-hidden"
        style={{ height: "400px" }}
      >
        <div
          className="overflow-y-auto h-full"
          style={{ maxHeight: "calc(100% - 50px)" }}
        >
          <table className="w-full">
            <thead className="bg-gray-100 sticky top-0">
              <tr>
                <th className="px-4 py-2 text-left">
                  <input type="checkbox" />
                </th>
                <th className="px-4 py-2 text-left">Username</th>
                <th className="px-4 py-2 text-left hidden md:table-cell">
                  Mail ID
                </th>
                <th className="px-4 py-2 text-left hidden md:table-cell">
                  Phone Number
                </th>
                <th className="px-4 py-2 text-left">Position</th>
                <th className="px-4 py-2 text-left hidden md:table-cell">
                  Joining Date
                </th>
                <th className="px-4 py-2 text-left">Activity</th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.map((user, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2">
                    <input type="checkbox" />
                  </td>
                  <td className="px-4 py-2">{user.username}</td>
                  <td className="px-4 py-2 hidden md:table-cell">
                    {user.mailId}
                  </td>
                  <td className="px-4 py-2 hidden md:table-cell">
                    {user.phoneNumber}
                  </td>
                  <td className="px-4 py-2">{user.position}</td>
                  <td className="px-4 py-2 hidden md:table-cell">
                    {user.joiningDate}
                  </td>
                  <td className="px-4 py-2 flex gap-2">
                    {/* Display action button based on the selected action */}
                    {user.actionType === "Approve" ? (
                      <button
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:opacity-90"
                        onClick={handleApprove}
                      >
                        Approve
                      </button>
                    ) : (
                      <button
                        className={`${
                          user.actionType === "Reject"
                            ? "bg-red-500"
                            : "bg-yellow-500"
                        } text-white px-4 py-2 rounded-lg hover:opacity-90`}
                      >
                        {user.actionType}
                      </button>
                    )}
                    <Icon
                      icon="pepicons-pencil:dots-y"
                      height={22}
                      width={22}
                      className="cursor-pointer"
                      onClick={() => openActionModal(index)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Fixed Pagination */}
        <div className="absolute bottom-0 w-full bg-white border-t border-gray-300 py-2 flex justify-between items-center px-4">
          <button
            className="text-gray-500 hover:text-black"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <p>
            Page {currentPage} of {totalPages}
          </p>
          <button
            className="text-gray-500 hover:text-black"
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>

      {/* Confirm Action Modal */}
      {confirmModalVisible && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h3 className="text-lg font-bold mb-4">Confirm Approve</h3>
            <div className="flex justify-between space-x-4">
              <button
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                onClick={() => {
                  setActionType("Approve");
                  confirmAction();
                }}
              >
                Confirm
              </button>
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
                onClick={closeModal}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reject/Hold Action Modal */}
      {modalVisible && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <div className="flex justify-between">
              <h3 className="text-lg font-bold mb-4">Select Action</h3>
              <div className="">
                <button
                  className="ml-2 p-1 h-6 bg-red-500 text-white rounded"
                  onClick={() => closeModal(false)}
                >
                  <IoClose />
                </button>
              </div>
            </div>
            <div className="flex justify-between space-x-4">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                onClick={() => {
                  setActionType("Reject");
                  confirmAction();
                }}
              >
                Reject
              </button>
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
                onClick={() => {
                  setActionType("Hold");
                  confirmAction();
                }}
              >
                Hold
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default People;
