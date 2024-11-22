import { useState } from "react";
import { Icon } from "@iconify/react";
const People = () => {
//   const allUsers = Array(24).fill({
// import { useState } from "react"; 
// import { IoClose } from "react-icons/io5";
// import { Icon } from "@iconify/react";

// const initialUsers = [
//   {
//     username: "Sandhiya Ravikumar",
//     mailId: "sandyva@gmail.com",
//     phoneNumber: "+91 6789054321",
//     position: "UX UI Designer",
//     department: "Design",
//     joiningDate: "02-11-2024",
//   });
//     isApproved: false,
//     isRejected: false,
//   },
//   ...Array(25).fill({
//     username: "Sandhiya Ravikumar",
//     email: "sandyva@gmail.com",
//     phone: "+91 6789054321",
//     position: "UX UI Designer",
//     joiningDate: "02-11-2024",
//     isApproved: false,
//     isRejected: false,
//   }),
// ];

//   const [currentPage, setCurrentPage] = useState(1);
//   const [usersPerPage] = useState(7);
//   const [selectedDepartment, setSelectedDepartment] = useState("All");
//   const [modalVisible, setModalVisible] = useState(false);
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [modalVisible, setModalVisible] = useState(false);

//   const departments = ["All", "Design", "Development", "Marketing"];

//   const filteredUsers =
//     selectedDepartment === "All"
//       ? allUsers
//       : allUsers.filter((user) => user.department === selectedDepartment);

//   const indexOfLastUser = currentPage * usersPerPage;
//   const indexOfFirstUser = indexOfLastUser - usersPerPage;
//   const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

//   const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
//   const lastUserIndex = currentPage * usersPerPage;
//   const firstUserIndex = lastUserIndex - usersPerPage;
//   const currentUsers = users.slice(firstUserIndex, lastUserIndex);
//   const totalPages = Math.ceil(users.length / usersPerPage);

//   const openModal = (user) => {
//     setSelectedUser(user);
//     setModalVisible(true);
//   };
//   const closeModal = () => {
//     setModalVisible(false);
//     setSelectedUser(null);
//     setShow(false);
//   };
//   // const confirmAction = (index) => {
//   //       closeModal();
   
//   //   setShow(false);
//   //   const updatedUsers = users.map((user, idx) =>
//   //     idx === index ? { ...user, isApproved: true } : user
//   //   );
//   //   setUsers(updatedUsers);
//   // };
//   const confirmAction = (index) => {
//     const updatedUsers = users.map((user, idx) =>
//       idx === index ? { ...user, isApproved: true } : user
//     );
//     setShow(false);
//     setUsers(updatedUsers);
//     approveUser(selectedUser);
                  
//   };

//   const openModal = (user) => {
//     setSelectedUser(user);
//     setModalVisible(true);
//   };

//   const closeModal = () => {
//     setModalVisible(false);
//     setSelectedUser(null);
//   };
//   // const rejectUser = (index) => {
//   //   const updatedUsers = users.map((user, idx) =>
//   //     idx === index ? { ...user, isRejected: true } : user
//   //   );
//   //   setUsers(updatedUsers);
//   // };

//   const confirmAction = () => {
//     alert(`Approved ${selectedUser?.username}`);
//     closeModal();
//   };
  
//   // const approvedHold = (index) => {
//   //   const updatedUsers = users.map((user, idx) =>
//   //     idx === index ? { ...user, isRejected: false } : user
//   //   );
//   //   setUsers(updatedUsers);
//   // };
//   return (
//     <div className="p-4 md:p-8">
//       {/* Summary Section */}
//       <div className="flex justify-center gap-6 items-center mb-4">
//         <div className="text-center">
//           <h2 className="text-2xl font-bold">{filteredUsers.length}</h2>
//           <p className="text-gray-500">People</p>
//         </div>
//         <div className=" bg-slate-300 h-24 w-0.5"></div>
//         <div className="text-center">
//           <h2 className="text-2xl font-bold">{departments.length - 1}</h2>
//           <p className="text-gray-500">Departments</p>
//         </div>
//       </div>

//       {/* Filter Section */}
//       <div className="flex flex-wrap gap-2 items-center mb-4">
//         <select
//           className="border border-gray-300 rounded-lg p-2 text-gray-700"
//           onChange={(e) => setSelectedDepartment(e.target.value)}
//         >
//           {departments.map((dept) => (
//             <option key={dept} value={dept}>
//               {dept}
//             </option>
//           ))}
//     <div className="p-5">
//       {/* Statistics Section */}
//       <div className="mx-auto w-1/2 flex space-x-20 gap-2 my-5">
//           <div className="flex flex-col relative left-10 items-start justify-center w-[200px] h-[100px] text-[20px]  text-[#333] text-center ">
//             <span className="text-center text-[42.52px] font-medium leading-[49.83px] tracking-[0.09966778010129929px] ">
//               {users.length}
//             </span>
//             <span className="text-center text-[9.97px] font-medium leading-[11.68px] tracking-[0.1px] text-[#C4C4C4] underline decoration-skip-ink-none">
//               People
//             </span>
//           </div>
//           <div className="h-[130px] min-h-[1em] w-px self-stretch bg-gradient-to-tr from-transparent via-neutral-500 to-transparent opacity-25 dark:via-neutral-400"></div>
//           <div className="flex flex-col relative left-14 items-start justify-center w-[200px] h-[100px] text-[20px]  text-[#333] text-center  ">
//             <span className="text-center text-[42.52px] font-medium leading-[49.83px] tracking-[0.09966778010129929px] ">
//               5
//             </span>
//             <span className="text-center text-[9.97px] font-medium leading-[11.68px] tracking-[0.1px] text-[#C4C4C4] underline decoration-skip-ink-none">
//               Department
//             </span>
//           </div>
//           <div className="h-[130px] min-h-[1em] w-px self-stretch bg-gradient-to-tr from-transparent via-neutral-500 to-transparent opacity-25 dark:via-neutral-400"></div>
//         </div>
      

//       {/* Filters */}
//       <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-6">
//         <select className="p-2 border rounded bg-gray-200">
//           <option value="all">All</option>
//           <option value="option1">Option 1</option>
//           <option value="option2">Option 2</option>
//         </select>
//         <select className="p-2 border rounded bg-gray-200">
//           <option value="all-departments">All Departments</option>
//           <option value="hr">HR</option>
//           <option value="finance">Finance</option>
//           <option value="marketing">Marketing</option>
//         </select>
//       </div>

//       {/* Table */}
//       <div
//         className="relative w-full border border-gray-300 rounded-lg overflow-hidden"
//         style={{ height: "400px" }} // Set fixed height for the container
//       >
//         {/* Scrollable Table Content */}
//         <div
//           className="overflow-y-auto h-full"
//           style={{ maxHeight: "calc(100% - 50px)" }} // Adjust space for pagination
//         >
//         <table className="min-w-full border-none">
//           <thead className="bg-white">
//             <tr className="bg-gray-200">
//               <th className="p-2 "><input type="checkbox" /></th>
//               <th className="p-2 ">Username</th>
//               <th className="p-2 ">Mail ID</th>
//               <th className="p-2 bordr">Phone</th>
//               <th className="p-2 ">Position</th>
//               <th className="p-2 ">Joining Date</th>
//               <th className="p-2 ">Activity</th>
//             </tr>
//           </thead>
//           <tbody>
//             {currentUsers.map((user, index) => (
//               <tr key={index} className="odd:bg-white-50">
//                 <td className="p-2  text-center">
//                   <input type="checkbox" />
//                 </td>
//                 <td className="p-2 ">{user.username}</td>
//                 <td className="p-2 ">{user.email}</td>
//                 <td className="p-2 ">{user.phone}</td>
//                 <td className="p-2 ">{user.position}</td>
//                 <td className="p-2 ">{user.joiningDate}</td>
//                 <td className="p-2  text-center flex">
//                   <button
//                     onClick={() => {
//                       setSelectedUser(index + firstUserIndex);
//                       setShow(true);
//                     }}
//                     className={`px-3 py-1 rounded ${
//                       user.isApproved ? "bg-green-500 text-white" : "bg-gray-300"
//                     }`}
//                   >
//                     {user.isApproved ? "Approved" : "Approve"}
//                   </button>
//                   <Icon onClick={() => openModal(user)}
//                       icon="pepicons-pencil:dots-y"
//                       height={22}
//                       width={22}
//                     />
//                 </td>
//               </tr> 
//             ))}
//           </tbody>
//         </table>
//       </div>
//       <div className="absolute bottom-0 w-full bg-white border-t border-gray-300 py-2 flex justify-between items-center px-4">
//         <button
//           onClick={goToPreviousPage}
//           disabled={currentPage === 1}
//           className="px-4 py-2 border rounded disabled:opacity-50"
//         >
//           Previous
//         </button>
//         <span>
//           Page {currentPage} of {totalPages}
//         </span>
//         <button
//           onClick={goToNextPage}
//           disabled={currentPage === totalPages}
//           className="px-4 py-2 border rounded disabled:opacity-50"
//         >
//           Next
//         </button>
//       </div>
//       </div>

     
//       {/* Modal */}
//       {modalVisible && (
//         <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white p-6 rounded-lg shadow-lg w-80">
//             <h3 className="text-lg font-bold mb-4">Approve User</h3>
//             <p>Are you sure you want to approve {selectedUser?.username}?</p>
//             <div className="flex justify-end space-x-4 mt-4">
//       {show && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
//           <div className="bg-white p-6 rounded shadow-md max-w-sm w-full">
//             <div className="flex justify-end">
             
//             </div>
//             <p className="mb-4 text-center">Are you sure to Approve?</p>
//             <div className="flex justify-around">
//               <button
//                 className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
//                 onClick={closeModal}
//               >
//                 Cancel
//                 Confirm
//               </button>
//               <button
//                 className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
//                 onClick={confirmAction}
//                 onClick={() => {
//                   approvedDenied(selectedUser);
//                   setShow(false);
//                 }}
//                 className="px-4 py-2 bg-red-500 text-white rounded"
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
        
//       )}
//         {modalVisible && (
//         <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white p-6 rounded-lg shadow-lg w-80">
//           <div className="flex justify-around">
              
            
//             <h3 className="text-lg font-bold mb-4 relative left-8">Reject or Hold</h3>
//             <div className="relative left-8 bottom-3">
//             <button onClick={() => setShow(false)} className="text-red-500" >
//                 <IoClose size={24} />
//               </button>
//               </div>
//             </div>
//             <div className="flex justify-around space-x-4 mt-4">
//               <button
//                 className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
//                 onClick={closeModal}
//               >
//                 Hold
//               </button>
//               <button
//                 className="bg-red-300 text-white px-4 py-2 rounded-lg hover:bg-red-500"
//                 onClick={confirmAction}
                
//               >
//                 Confirm
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
};

export default People;
