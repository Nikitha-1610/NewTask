// import { useEffect, useState } from "react";
// import { Icon } from "@iconify/react";
// import axiosInstance from "../../common/utils/axios/axiosInstance";

// import toast, { Toaster } from "react-hot-toast";
// import CountUp from "react-countup";
// import ReactLoading from "react-loading";

// const People = () => {
//   const [allUsers, setAllUsers] = useState([]); 
//   const [currentPage, setCurrentPage] = useState(1);
//   const [usersPerPage] = useState(7);
//   const [modalVisible, setModalVisible] = useState(false);
//   const [modalActionVisible, setModalActionVisible] = useState(false);
//   const [confirmModalVisible, setConfirmModalVisible] = useState(false);
//   const [modalType, setModalType] = useState("");
//   const [selectedUserIndex, setSelectedUserIndex] = useState(null);
//   const [selectedDepartment, setSelectedDepartment] = useState("All");
//   const [selectedUserType, setSelectedUserType] = useState("All");
//   const [loading, setLoading] = useState(true);
  // const [selectedPosition, setSelectedPosition] = useState("All");

//   const getAllusers = async () => {
//     try {
//       const response = await axiosInstance.get("user/getUsers");
//       console.log(response.data.message);

//       setAllUsers(response?.data?.message);
//     } catch (error) {
//       console.error("Error syncing with server:", error);
//       toast.error("Failed to fetch users.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     getAllusers();
//   }, []);

//   const departments = ["All", ...new Set(allUsers.map(user => user.department))];
// const userType = ["All", ...new Set(allUsers.map(user => user.status))];

// const filteredUsers = allUsers.filter((user) => {
//   const matchesPosition = selectedPosition === "All" || user.position === selectedPosition;
//   const matchesUserType = selectedUserType === "All" || user.status === selectedUserType;
//   return matchesPosition && matchesUserType;
// });

//   const indexOfLastUser = currentPage * usersPerPage;
//   const indexOfFirstUser = indexOfLastUser - usersPerPage;
//   const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

//   const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

//   const openConfirmModal = (index) => {
//     setSelectedUserIndex(index);
//     setModalType("approve");
//     setConfirmModalVisible(true);
//   };

//   const openActionModal = (index) => {
//     setSelectedUserIndex(index);
//     setModalType("action");
//     setModalVisible(true);
//   };
//   const openHoldActionModal = (index) => {
//     setSelectedUserIndex(index);
//     setModalType("action");
//     setModalActionVisible(true);
//   };

//   const closeModal = () => {
//     setModalVisible(false);
//     setModalActionVisible(false); // Added this line to ensure action modal is also closed
//     setConfirmModalVisible(false);
//     setSelectedUserIndex(null);
//     setModalType("");
//   };

//   const handleApprove = async () => {
//     if (selectedUserIndex !== null) {
//       const user = currentUsers[selectedUserIndex];
//       console.log(`User approved:`, user.email);
//       try {
//         await axiosInstance.put(`employee/apporve/${user.email}`);
//         toast.success(`${user.name} has been approved.`);
//         console.log(`User approved:`, user.email);
//         getAllusers(); // Refresh the user list after approval
//       } catch (error) {
//         console.error("Error approving user:", error);
//         toast.error("Failed to approve the user.");
//       }
//     }
//     closeModal();
//   };

  
  

//   const handleAction = async (action) => {
//     if (selectedUserIndex !== null) {
//       const user = currentUsers[selectedUserIndex];
    
//       try {
//         switch (action) {
//           case "approve":
//             await axiosInstance.put(`/employee/approve/${user.email}`);
//             toast.success(`${user.name} has been approved.`);
//             console.log(`User approved:`, user.email);
//             break;
  
//           case "on-hold":
//             await axiosInstance.put(`/user/updateDetails/${user.email}`, {
//               status: "On-Hold",
//             });
//             toast.success(`${user.name} has been placed on hold.`);
//             console.log(`User on-hold:`, user.email);
//             break;
  
//           case "reject":
//             await axiosInstance.delete(`/user/reject/${user.email}`);
//             toast.success(`${user.name} has been rejected.`);
//             console.log(`User rejected:`, user.email);
//             break;
  
//           default:
//             throw new Error("Unknown action");
//         }
//       } catch (error) {
//         console.error("An error occurred while handling the action:", error);
//         toast.error(`Failed to ${action} the user.`);
//       } finally {
//         getAllusers(); // Call this outside the switch case to refresh the user list
//         closeModal(); // Ensure the modal closes
//       }
//     }
//   };
  
 
  // const positions = ["All", ...new Set(allUsers.map(user => user.position))];
  // const statusOptions = ["All", ...new Set(allUsers.map(user => user.status))];

 

//   return (
//     <div className="p-5">
//       {loading ? (
//         <div className="flex justify-center items-center h-screen">
//           <ReactLoading type="spin" color="#000" height={50} width={50} />
//         </div>
//       ) : (
//         <div>
//           <Toaster />
//           <div className="flex flex-wrap items-center justify-center gap-6 md:gap-28 mb-5">
//             <div className="flex flex-col items-center text-center">
//               <span className="text-3xl font-medium">
//                 <CountUp end={allUsers.length} duration={2} />
//               </span>
//               <span className="text-sm text-gray-400 underline">People</span>
//             </div>
//             <div className="w-[1px] h-16 bg-gray-300"></div>
//             <div className="flex flex-col items-center text-center">
//               <span className="text-3xl font-medium">
//                 <CountUp end={5} duration={2} />
//               </span>
//               <span className="text-sm text-gray-400 underline">
//                 Departments
//               </span>
//             </div>
//           </div>

         
        //  {/* Filter Section */}
        //  <div className="flex flex-wrap gap-4 items-center mb-4">
        //     <select
        //       className="border border-gray-300 bg-gray-200 rounded-lg p-2 text-gray-700"
        //       onChange={(e) => setSelectedPosition(e.target.value)}
        //       value={selectedPosition}
        //     >
        //       <option value="All">Positions</option>
        //       {positions.map((position) => (
        //         <option key={position} value={position}>
        //           {position}
        //         </option>
        //       ))}
        //     </select>
        //     <select
        //       className="border border-gray-300 bg-gray-200 rounded-lg p-2 text-gray-700"
        //       onChange={(e) => setSelectedUserType(e.target.value)}
        //       value={selectedUserType}
        //     >
        //       <option value="All">Status</option>
        //       {statusOptions.map((status) => (
        //         <option key={status} value={status}>
        //           {status}
        //         </option>
        //       ))}
        //     </select>
        //   </div>


//           {/* Table with Fixed Height */}
//           <div
//             className="relative w-full border border-gray-300 rounded-lg"
//             style={{ height: "400px" }}
//           >
//             <div className="h-full overflow-y-auto">
//               <div className="overflow-x-auto">
//                 <table className="min-w-full border-collapse">
//                   <thead className="bg-gray-100 sticky top-0">
//                     <tr>
//                       <th className="px-4 py-2 text-left"></th>
//                       <th className="px-4 py-2 text-left">Username</th>
//                       <th className="px-4 py-2 text-left hidden md:table-cell">
//                         Mail ID
//                       </th>
//                       <th className="px-4 py-2 text-left hidden md:table-cell">
//                         Phone Number
//                       </th>
//                       <th className="px-4 py-2 text-left">Position</th>
//                       <th className="px-4 py-2 text-left hidden md:table-cell">
//                         Joining Date
//                       </th>
//                       <th className="px-4 py-2 text-left">Activity</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {currentUsers.map((user, index) => (
//                       <tr key={index} className="border-b hover:bg-gray-50">
//                         <td className="px-4 py-2">
//                           <input type="checkbox" />
//                         </td>
//                         <td className="px-4 py-2">{user.name}</td>
//                         <td className="px-4 py-2 hidden md:table-cell">
//                           {user.email}
//                         </td>
//                         <td className="px-4 py-2 hidden md:table-cell">
//                           {user.mobile}
//                         </td>
//                         <td className="px-4 py-2">{user.position}</td>
//                         <td className="px-4 py-2 hidden md:table-cell">
//                           {user.appliedDate}
//                         </td>
//                         <td className="px-4 py-2 flex gap-2">
//                           {user.status === "Init" ? (
//                             <button
//                               className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:opacity-90"
//                               onClick={() => openConfirmModal(index)}
//                             >
//                               Approve
//                             </button>
//                           ) : (
//                             <button
//                               className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:opacity-90"
//                               onClick={() => openActionModal(index)}
//                             >
//                               {user.status}
//                             </button>
//                           )}
//                           <Icon
//                             icon="pepicons-pencil:dots-y"
//                             height={22}
//                             width={22}
//                             className="cursor-pointer"
//                             onClick={() => openHoldActionModal(index)}
//                           />
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </div>

//             {/* Fixed Pagination */}
//             <div className="absolute bottom-0 w-full bg-white border-t border-gray-300 py-2 flex justify-center items-center px-4">
//               <button
//                 className="text-gray-500 hover:text-black mr-2"
//                 onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//                 disabled={currentPage === 1}
//               >
//                 Previous
//               </button>
//               <div className="flex items-center gap-2">
//     {[...Array(totalPages)].map((_, index) => (
//       <button
//         key={index}
//         className={`px-3 py-1 rounded-md ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-white text-gray-500'}`}
//         onClick={() => setCurrentPage(index + 1)}
//       >
//         {index + 1}
//       </button>
//     ))}
//   </div>
//               <button
//                 className="text-gray-500 hover:text-black ml-2"
//                 onClick={() =>
//                   setCurrentPage((prev) => Math.min(prev + 1, totalPages))
//                 }
//                 disabled={currentPage === totalPages}
//               >
//                 Next
//               </button>
//             </div>
//           </div>

//           {/* Approve Confirmation Modal */}
//           {confirmModalVisible && (
//             <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//               <div className="bg-white p-6 rounded-lg shadow-lg">
//                 <p className="mb-4">
//                   Are you sure you want to approve this user?
//                 </p>
//                 <div className="flex gap-4 justify-end">
//                   <button
//                     className="bg-blue-500 text-white px-4 py-2 rounded-lg"
//                     onClick={handleApprove}
//                   >
//                     Confirm
//                   </button>
//                   <button
//                     className="bg-gray-300 px-4 py-2 rounded-lg"
//                     onClick={closeModal}
//                   >
//                     Cancel
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Action Modal (Reject/Hold) */}
//           {modalVisible && (
//             <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//               <div className="bg-white p-6 rounded-lg shadow-lg">
//                 <div className="flex justify-end">
//                   <button
//                     className="bg-gray-300 px-1 py-1 rounded-lg"
//                     onClick={closeModal} // Fix: Ensures modal closes on clicking close icon
//                   >
//                     <Icon icon="material-symbols:close" />
//                   </button>
//                 </div>
//                 <p className="mb-4">Choose an action for this user:</p>
//                 <div className="flex gap-4 justify-end">
//                   <button
//                     className="bg-red-500 text-white px-4 py-2 rounded-lg"
//                     onClick={() => handleAction("reject")}
//                   >
//                     Reject
//                   </button>
//                   <button
//                     className="bg-blue-500 text-white px-4 py-2 rounded-lg"
//                     onClick={() => handleAction("approve")}
//                   >
//                     Approve
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )}
//           {modalActionVisible && (
//             <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//               <div className="bg-white p-6 rounded-lg shadow-lg">
//                 <div className="flex justify-end">
//                   <button
//                     className="bg-gray-300 px-1 py-1 rounded-lg"
//                     onClick={closeModal} // Fix: Ensures modal closes on clicking close icon
//                   >
//                     <Icon icon="material-symbols:close" />
//                   </button>
//                 </div>
//                 <p className="mb-4">Choose an action for this user:</p>
//                 <div className="flex gap-4 justify-end">
//                   <button
//                     className="bg-red-500 text-white px-4 py-2 rounded-lg"
//                     onClick={() => handleAction("reject")}
//                   >
//                     Reject
//                   </button>
//                   <button
//                     className="bg-yellow-500 text-white px-4 py-2 rounded-lg"
//                     onClick={() => handleAction("on-hold")}
//                   >
//                     On-Hold
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default People;

import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";

import toast, { Toaster } from "react-hot-toast";
import CountUp from "react-countup";
import ReactLoading from "react-loading";
import axiosInstance from "../../common/utils/axios/axiosInstance";

const People = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(7);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalActionVisible, setModalActionVisible] = useState(false);
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);
  const [modalType, setModalType] = useState("");
  const [selectedUserIndex, setSelectedUserIndex] = useState(null);
  const [selectedDepartment, setSelectedDepartment] = useState("All");
  const [selectedUserType, setSelectedUserType] = useState("All");
  const [loading, setLoading] = useState(true);
  const [selectedPosition, setSelectedPosition] = useState("All");
  

  const getAllusers = async () => {
    try {
      const response = await axiosInstance.get("user/getUsers");
      console.log(response.data.message);

      setAllUsers(response?.data?.message);
    } catch (error) {
      console.error("Error syncing with server:", error);
      toast.error("Failed to fetch users.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllusers();
  }, []);

  const departments = ["All", ...new Set(allUsers.map(user => user.department))];
  const userType = ["All", ...new Set(allUsers.map(user => user.status))];

  const filteredUsers = allUsers.filter((user) => {
    const matchesPosition = selectedPosition === "All" || user.position === selectedPosition;
    const matchesUserType = selectedUserType === "All" || user.status === selectedUserType;
    return matchesPosition && matchesUserType;
  });
  
  

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const openConfirmModal = (index) => {
    setSelectedUserIndex(index);
    setModalType("approve");
    setConfirmModalVisible(true);
  };

  const openActionModal = (index) => {
    setSelectedUserIndex(index);
    setModalType("action");
    setModalVisible(true);
  };
  const openHoldActionModal = (index) => {
    setSelectedUserIndex(index);
    setModalType("action");
    setModalActionVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setModalActionVisible(false); // Added this line to ensure action modal is also closed
    setConfirmModalVisible(false);
    setSelectedUserIndex(null);
    setModalType("");
  };

  const handleApprove = async () => {
    if (selectedUserIndex !== null) {
      const user = currentUsers[selectedUserIndex];
      console.log(`User approved:`, user.email);
      try {
        await axiosInstance.put(`employee/apporve/${user.email}`);
        toast.success(`${user.name} has been approved.`);
        console.log(`User approved:`, user.email);
        getAllusers(); // Refresh the user list after approval
      } catch (error) {
        console.error("Error approving user:", error);
        toast.error("Failed to approve the user.");
      }
    }
    closeModal();
  };

  const handleAction = async (action) => {
    if (selectedUserIndex !== null) {
      const user = currentUsers[selectedUserIndex];

      try {
        // Handle action based on the type (approve, on-hold, reject)
        switch (action) {
          case "approve":
            await axiosInstance.put(`/employee/approve/${user.email}`);
            toast.success(`${user.name} has been approved.`);
            console.log(`User approved:`, user.email);
            break;

          case "on-hold":
            // Pass status: "On-Hold" in the request body
            await axiosInstance.put(`/user/updateDetails/${user.email}`, {
              status: "On-Hold",
            });
            toast.success(`${user.name} has been placed on hold.`);
            console.log(`User on-hold:`, user.email);
            break;

          case "reject":
            await axiosInstance.delete(`/user/reject/${user.email}`);
            toast.success(`${user.name} has been rejected.`);
            console.log(`User rejected:`, user.email);
            break;

          default:
            throw new Error("Unknown action");
        }

        // Refresh the user list after action
        getAllusers();
      } catch (error) {
        console.error(`Error performing ${action} action:`, error);
        toast.error(`Failed to ${action} the user.`);
      } finally {
        // Ensure modal is closed in both success and failure cases
        closeModal();
      }
    }
  };

  
  const positions = ["All", ...new Set(allUsers.map(user => user.position))];
  const statusOptions = ["All", ...new Set(allUsers.map(user => user.status))];

  return (
    <div className="p-5">
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <ReactLoading type="spin" color="#000" height={50} width={50} />
        </div>
      ) : (
        <div>
          <Toaster />
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-28 mb-5">
            <div className="flex flex-col items-center text-center">
              <span className="text-3xl font-medium">
                <CountUp end={allUsers.length} duration={2} />
              </span>
              <span className="text-sm text-gray-400 underline">People</span>
            </div>
            <div className="w-[1px] h-16 bg-gray-300"></div>
            <div className="flex flex-col items-center text-center">
              <span className="text-3xl font-medium">
                <CountUp end={5} duration={2} />
              </span>
              <span className="text-sm text-gray-400 underline">
                Departments
              </span>
            </div>
          </div>

          {/* Filter Section */}
          {/* Filter Section */}
         <div className="flex flex-wrap gap-4 items-center mb-4">
            <select
              className="border border-gray-300 bg-gray-200 rounded-lg p-2 text-gray-700"
              onChange={(e) => setSelectedPosition(e.target.value)}
              value={selectedPosition}
            >
              <option value="All">Positions</option>
              {positions.map((position) => (
                <option key={position} value={position}>
                  {position}
                </option>
              ))}
            </select>
            <select
              className="border border-gray-300 bg-gray-200 rounded-lg p-2 text-gray-700"
              onChange={(e) => setSelectedUserType(e.target.value)}
              value={selectedUserType}
            >
              <option value="All">Status</option>
              {statusOptions.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>

          {/* Table with Fixed Height */}
          <div
            className="relative w-full border border-gray-300 rounded-lg"
            style={{ height: "400px" }}
          >
            <div className="h-full overflow-y-auto">
              <div className="overflow-x-auto">
                <table className="min-w-full border-collapse">
                  <thead className="bg-gray-100 sticky top-0">
                    <tr>
                      <th className="px-4 py-2 text-left"></th>
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
                        <td className="px-4 py-2">{user.name}</td>
                        <td className="px-4 py-2 hidden md:table-cell">
                          {user.email}
                        </td>
                        <td className="px-4 py-2 hidden md:table-cell">
                          {user.mobile}
                        </td>
                        <td className="px-4 py-2">{user.position}</td>
                        <td className="px-4 py-2 hidden md:table-cell">
                          {user.appliedDate}
                        </td>
                        <td className="px-4 py-2 flex gap-2">
                          {user.status === "Init" ? (
                            <button
                              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:opacity-90"
                              onClick={() => openConfirmModal(index)}
                            >
                              Approve
                            </button>
                          ) : (
                            <button
                              className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:opacity-90"
                              onClick={() => openActionModal(index)}
                            >
                              {user.status}
                            </button>
                          )}
                          <Icon
                            icon="pepicons-pencil:dots-y"
                            height={22}
                            width={22}
                            className="cursor-pointer"
                            onClick={() => openHoldActionModal(index)}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
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

          {/* Approve Confirmation Modal */}
          {confirmModalVisible && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <p className="mb-4">
                  Are you sure you want to approve this user?
                </p>
                <div className="flex gap-4 justify-end">
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                    onClick={handleApprove}
                  >
                    Confirm
                  </button>
                  <button
                    className="bg-gray-300 px-4 py-2 rounded-lg"
                    onClick={closeModal}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Action Modal (Reject/Hold) */}
          {modalVisible && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <div className="flex justify-end">
                  <button
                    className="bg-gray-300 px-1 py-1 rounded-lg"
                    onClick={closeModal} // Fix: Ensures modal closes on clicking close icon
                  >
                    <Icon icon="material-symbols:close" />
                  </button>
                </div>
                <p className="mb-4">Choose an action for this user:</p>
                <div className="flex gap-4 justify-end">
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded-lg"
                    onClick={() => handleAction("reject")}
                  >
                    Reject
                  </button>
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                    onClick={() => handleAction("approve")}
                  >
                    Approve
                  </button>
                </div>
              </div>
            </div>
          )}
          {modalActionVisible && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <div className="flex justify-end">
                  <button
                    className="bg-gray-300 px-1 py-1 rounded-lg"
                    onClick={closeModal} // Fix: Ensures modal closes on clicking close icon
                  >
                    <Icon icon="material-symbols:close" />
                  </button>
                </div>
                <p className="mb-4">Choose an action for this user:</p>
                <div className="flex gap-4 justify-end">
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded-lg"
                    onClick={() => handleAction("reject")}
                  >
                    Reject
                  </button>
                  <button
                    className="bg-yellow-500 text-white px-4 py-2 rounded-lg"
                    onClick={() => handleAction("on-hold")}
                  >
                    On-Hold
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default People;