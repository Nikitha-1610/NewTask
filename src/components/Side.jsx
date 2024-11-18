import { useState } from "react";
import {
  Sidebar as ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
} from "react-pro-sidebar";
import { Icon } from "@iconify-icon/react";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";

const Side = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleResize = () => {
    // Automatically collapse the sidebar on medium screens
    if (window.innerWidth >= 768 && window.innerWidth < 1024) {
      setIsCollapsed(true);
    } else {
      setIsCollapsed(false);
    }
  };

  // Add resize event listener
  useState(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="h-screen fixed">
      {/* Toggle button for mobile */}
      <button
        onClick={toggleSidebar}
        className="md:hidden fixed top-1 p-1 left-4 z-50 bg-gray-500 text-white rounded-full"
      >
        {isOpen ? <Icon icon="maki:cross" /> : <MenuIcon />}
      </button>

      {/* Sidebar */}
      <ProSidebar
        collapsed={isCollapsed}
        className={`fixed top-0 left-0 h-full z-40 transition-transform duration-300 bg-white shadow-lg ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <Menu>
          <MenuItem
            icon={
              <Icon
                icon="material-symbols:dashboard-outline"
                height={22}
                width={22}
              />
            }
          >
            <Link to="/dashboard">Dashboard</Link>
          </MenuItem>

          <MenuItem
            icon={<Icon icon="iconamoon:profile" height={22} width={22} />}
          >
            <Link to="/profile">Profile</Link>
          </MenuItem>

          <MenuItem icon={<Icon icon="la:teamspeak" height={22} width={22} />}>
            <Link to="/teams">Teams</Link>
          </MenuItem>

          <SubMenu label="Charts" icon={<Icon icon="logos:highcharts" />}>
            <MenuItem>Pie charts</MenuItem>
            <MenuItem>Line charts</MenuItem>
          </SubMenu>

          <MenuItem
            icon={<Icon icon="iconamoon:profile" height={22} width={22} />}
          >
            <Link to="/people">People</Link>
          </MenuItem>

          <MenuItem
            icon={
              <Icon icon="material-symbols:action-key" height={22} width={22} />
            }
          >
            <Link to="/usersemail">Users Email</Link>
          </MenuItem>

          <MenuItem icon={<Icon icon="bi:list-task" height={22} width={22} />}>
            <Link to="/designteam">Task</Link>
          </MenuItem>

          <MenuItem
            icon={<Icon icon="mdi:plus-circle" height={22} width={22} />}
          >
            <Link to="/addtasks">Add Tasks</Link>
          </MenuItem>

          <MenuItem
            icon={<Icon icon="pajamas:list-task" height={22} width={22} />}
          >
            <Link to="/task">Inprogress Task</Link>
          </MenuItem>

          <MenuItem
            icon={<Icon icon="si:assignment-line" height={22} width={22} />}
          >
            <Link to="/assign">Assign Task</Link>
          </MenuItem>
          <MenuItem
            icon={<Icon icon="arcticons:serialtest" height={22} width={22} />}
          >
            <Link to="/intest">In Test</Link>
          </MenuItem>

          <MenuItem
            icon={<Icon icon="iconoir:position-align" height={22} width={22} />}
          >
            <Link to="/position">Position</Link>
          </MenuItem>
          <MenuItem
            icon={
              <Icon
                icon="material-symbols:chat-outline"
                height={22}
                width={22}
              />
            }
          >
            <Link to="/chats">Chats</Link>
          </MenuItem>
          <MenuItem
            icon={<Icon icon="duo-icons:dashboard" height={22} width={22} />}
          >
            <Link to="/mainpage">MainPage</Link>
          </MenuItem>
        </Menu>
      </ProSidebar>

      {/* Overlay to close sidebar on mobile */}
      {isOpen && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 bg-black opacity-50 z-30 md:hidden"
        ></div>
      )}
    </div>
  );
};

export default Side;
