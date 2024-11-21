import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MenuIcon from "@mui/icons-material/Menu";

const Navbar = ({ toggleSidebar }) => {
  return (
    <header className="navbar w-full h-16 flex items-center justify-between p-4 bg-white shadow-lg fixed top-0 left-0 z-40 mb-0">
      {/* Sidebar toggle button */}
      <button
        onClick={toggleSidebar}
        className="block md:hidden p-2 rounded-full bg-gray-500 text-white"
      >
        <MenuIcon />
      </button>

      {/* <div className="font-semibold text-lg md:text-xl">
        <span className="hidden md:inline">Dashboard</span>
      </div> */}

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
          <h2 className="font-semibold text-sm">Mr.xyz</h2>
          <h6 className="text-slate-700 text-xs tracking-tight">
            Software Developer
          </h6>
        </div>

        <Avatar
          alt="Travis Howard"
          src="https://material-ui.com/static/images/avatar/2.jpg"
        />
      </div>
    </header>
  );
};

export default Navbar;
