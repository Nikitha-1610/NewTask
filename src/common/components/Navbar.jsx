import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MenuIcon from "@mui/icons-material/Menu";

const Navbar = ({ toggleSidebar }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State to control dropdown visibility
  const user = JSON.parse(localStorage.getItem("user")) || {};
  const userName = user.name || "Guest";
  const userRole = JSON.parse(localStorage.getItem("role")) || "Unknown";

  // Toggle the dropdown visibility
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Handle logout action
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <header className="navbar w-full h-16 flex items-center justify-between p-4 bg-white shadow-lg fixed top-0 left-0 z-40 mb-0">
      {/* Sidebar toggle button */}
      <button
        onClick={toggleSidebar}
        className="block md:hidden p-2 rounded-full bg-gray-500 text-white"
      >
        <MenuIcon />
      </button>

      <div className="flex-1 max-w-md mx-auto hidden sm:block">
        <input
          type="text"
          placeholder="Search Projects..."
          className="w-full p-2 bg-slate-200 rounded-md"
        />
      </div>

      <div className="flex items-center gap-4">
        <Badge badgeContent={17} color="error">
          <NotificationsIcon />
        </Badge>

        <div className="hidden md:block">
          <h2 className="font-semibold text-sm">{userName}</h2>
          <h6 className="text-slate-700 text-xs tracking-tight">{userRole}</h6>
        </div>

        <div className="relative">
          {/* Avatar with dropdown */}
          <Avatar
            alt="User Avatar"
            src="https://material-ui.com/static/images/avatar/2.jpg"
            onClick={toggleDropdown} // Toggle dropdown when clicked
            className="cursor-pointer"
          />

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md p-2 z-50">
              <button
                onClick={handleLogout}
                className="w-full text-left p-2 text-sm text-red-500 hover:bg-gray-100 rounded-md"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
// import { useState } from "react";
// import Avatar from "@mui/material/Avatar";
// import Badge from "@mui/material/Badge";
// import NotificationsIcon from "@mui/icons-material/Notifications";
// import MenuIcon from "@mui/icons-material/Menu";

// const Navbar = ({ toggleSidebar }) => {
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State to control dropdown visibility
//   const user = JSON.parse(localStorage.getItem("user")) || {};
//   const userName = user.name || "Guest";
//   const userRole = JSON.parse(localStorage.getItem("role")) || "Unknown";

//   console.log("User Name:", userName); // Debugging log
//   console.log("User Role:", userRole); // Debugging log

//   // Toggle the dropdown visibility
//   const toggleDropdown = () => {
//     setIsDropdownOpen(!isDropdownOpen);
//   };

//   // Handle logout action
//   const handleLogout = () => {
//     localStorage.clear();
//     window.location.href = "/login";
//   };

//   return (
//     <header className="navbar w-full h-16 flex items-center justify-between p-4 bg-white shadow-lg fixed top-0 left-0 z-40 mb-0">
//       {/* Sidebar toggle button */}
//       <button
//         onClick={toggleSidebar}
//         className="block md:hidden p-2 rounded-full bg-gray-500 text-white"
//       >
//         <MenuIcon />
//       </button>

//       <div className="flex-1 max-w-md mx-auto hidden sm:block">
//         <input
//           type="text"
//           placeholder="Search Projects..."
//           className="w-full p-2 bg-slate-200 rounded-md"
//         />
//       </div>

//       <div className="flex items-center gap-4">
//         <Badge badgeContent={17} color="error">
//           <NotificationsIcon />
//         </Badge>

//         <div className="hidden md:block">
//           <h2 className="font-semibold text-sm">{userName}</h2>{" "}
//           {/* Now using userName property */}
//           <h6 className="text-slate-700 text-xs tracking-tight">{userRole}</h6>
//         </div>

//         <div className="relative">
//           {/* Avatar with dropdown */}
//           <Avatar
//             alt="User Avatar"
//             src="https://material-ui.com/static/images/avatar/2.jpg"
//             onClick={toggleDropdown} // Toggle dropdown when clicked
//             className="cursor-pointer"
//           />

//           {/* Dropdown Menu */}
//           {isDropdownOpen && (
//             <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md p-2 z-50">
//               <button
//                 onClick={handleLogout}
//                 className="w-full text-left p-2 text-sm text-red-500 hover:bg-gray-100 rounded-md"
//               >
//                 Logout
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Navbar;
