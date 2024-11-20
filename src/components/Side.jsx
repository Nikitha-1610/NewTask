import { Sidebar as ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Icon } from "@iconify-icon/react";
import { Link, useLocation } from "react-router-dom";

const Side = ({ isOpen, toggleSidebar, isCollapsed }) => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const handleLinkClick = () => {
    if (isOpen) {
      toggleSidebar(); // Close the sidebar when a link is clicked
    }
  };

  return (
    <>
      {/* Sidebar */}
      <ProSidebar
        collapsed={isCollapsed}
        className={`sidebar fixed top-0 left-0 h-screen z-50 transition-transform duration-300 bg-white shadow-lg ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
        style={{ overflowY: "auto" }}
      >
        {/* <div className="flex justify-end p-2 md:hidden">
          <button
            onClick={toggleSidebar}
            className="p-2 px-3 text-white bg-gray-500 rounded-full"
          >
            <Icon icon="maki:cross" />
          </button>
        </div> */}
        <Menu>
          <MenuItem
            className={
              isActive("/dashboard") ? "bg-teal-100 text-teal-600" : ""
            }
          >
            <Link
              to="/dashboard"
              onClick={handleLinkClick}
              className="flex items-center gap-5"
            >
              <Icon
                icon="material-symbols:dashboard-outline"
                height={22}
                width={22}
              />
              Dashboard
            </Link>
          </MenuItem>
          <MenuItem
            icon={<Icon icon="la:teamspeak" height={22} width={22} />}
            className={isActive("/teams") ? "bg-teal-100 text-teal-600" : ""}
          >
            <Link to="/teams" onClick={handleLinkClick}>
              Teams
            </Link>
          </MenuItem>
          <MenuItem
            icon={<Icon icon="ic:twotone-update" height={22} width={22} />}
            className={isActive("/employee") ? "bg-teal-100 text-teal-600" : ""}
          >
            <Link to="/employee" onClick={handleLinkClick}>
              New Employee
            </Link>
          </MenuItem>

          {/* Add the same `onClick` to other links */}
          <MenuItem
            icon={<Icon icon="iconamoon:profile" height={22} width={22} />}
            className={isActive("/people") ? "bg-teal-100 text-teal-600" : ""}
          >
            <Link to="/people" onClick={handleLinkClick}>
              People
            </Link>
          </MenuItem>

          <MenuItem
            icon={
              <Icon icon="material-symbols:action-key" height={22} width={22} />
            }
            className={
              isActive("/usersemail") ? "bg-teal-100 text-teal-600" : ""
            }
          >
            <Link to="/usersemail" onClick={handleLinkClick}>
              Users Email
            </Link>
          </MenuItem>

          {/* <SubMenu label="Charts" icon={<Icon icon="logos:highcharts" />}>
            <MenuItem>Pie charts</MenuItem>
            <MenuItem>Line charts</MenuItem>
          </SubMenu> */}

          <MenuItem
            icon={<Icon icon="bi:list-task" height={22} width={22} />}
            className={
              isActive("/designteam") ? "bg-teal-100 text-teal-600" : ""
            }
          >
            <Link to="/designteam" onClick={handleLinkClick}>
              Task
            </Link>
          </MenuItem>

          <MenuItem
            icon={<Icon icon="mdi:plus-circle" height={22} width={22} />}
            className={isActive("/addtasks") ? "bg-teal-100 text-teal-600" : ""}
          >
            <Link to="/addtasks" onClick={handleLinkClick}>
              Add Tasks
            </Link>
          </MenuItem>

          {/* <MenuItem
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
          </MenuItem> */}

          <MenuItem
            icon={<Icon icon="iconoir:position-align" height={22} width={22} />}
            className={isActive("/position") ? "bg-teal-100 text-teal-600" : ""}
          >
            <Link to="/position" onClick={handleLinkClick}>
              Position
            </Link>
          </MenuItem>
          <MenuItem
            icon={
              <Icon
                icon="material-symbols:chat-outline"
                height={22}
                width={22}
              />
            }
            className={isActive("/chats") ? "bg-teal-100 text-teal-600" : ""}
          >
            <Link to="/chats" onClick={handleLinkClick}>
              Chats
            </Link>
          </MenuItem>
          <MenuItem
            icon={<Icon icon="duo-icons:dashboard" height={22} width={22} />}
            className={isActive("/mainpage") ? "bg-teal-100 text-teal-600" : ""}
          >
            <Link to="/mainpage" onClick={handleLinkClick}>
              MainPage
            </Link>
          </MenuItem>
        </Menu>
      </ProSidebar>

      {/* Overlay for closing sidebar in mobile view */}
      {isOpen && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 bg-black opacity-50 z-40 md:hidden"
        ></div>
      )}
    </>
  );
};

export default Side;
