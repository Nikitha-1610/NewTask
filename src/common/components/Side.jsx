import { Sidebar as ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Icon } from "@iconify-icon/react";
import { Link, useLocation } from "react-router-dom";

const Side = ({ isOpen, toggleSidebar, isCollapsed, role }) => {
  console.log("Sidebar Open:", isOpen, "Sidebar Collapsed:", isCollapsed);
  const location = useLocation();

  // Highlight active links
  const isActive = (path) => location.pathname === path;
  

  // Links based on role
  const linksByRole = {
    admin: [
      {
        path: "/admin/dashboard",
        label: "Dashboard",
        icon: "material-symbols:dashboard-outline",
      },
      { path: "/admin/teams", label: "Teams", icon: "la:teamspeak" },
      { path: "/admin/employee", label: "Employee", icon: "ic:twotone-update" },
      { path: "/admin/people", label: "People", icon: "iconamoon:profile" },
      {
        path: "/admin/usersemail",
        label: "Users Email",
        icon: "material-symbols:action-key",
      },
      { path: "/admin/task", label: "Task", icon: "bi:list-task" },
      { path: "/admin/addtasks", label: "Add Task", icon: "mdi:plus-circle" },
      {
        path: "/admin/position",
        label: "Position",
        icon: "iconoir:position-align",
      },
      {
        path: "/admin/chats",
        label: "Chats",
        icon: "material-symbols:chat-outline",
      },
      {
        path: "/admin/mainpage",
        label: "Main Page",
        icon: "duo-icons:dashboard",
      },
      {
        path: "/admin/addproject",
        label: "Add Project",
        icon: "ix:project-new",
      },
    ],
    Employee: [
      {
        path: "/user/home",
        label: "Home",
        icon: "material-symbols:home-outline",
      },
      { path: "/user/tasks", label: "Tasks", icon: "bi:list-task" },
      { path: "/user/profile", label: "Profile", icon: "iconamoon:profile" },
      { path: "/user/mainpage", label: "MainPage", icon: "duo-icons:dashboard" },
      
    ],
  };

  const links = linksByRole[role];

  return (

    <>
    <div className={isOpen ? 'sidebar-open' : 'sidebar-closed'}>
      {/* Sidebar */}
      <ProSidebar
        collapsed={isCollapsed}
        className={`sidebar fixed  top-0 left-0 h-screen z-50 transition-transform duration-300 bg-white shadow-lg ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
        style={{ overflowY: "auto" }}
      >
        <Menu>
          {links.map(({ path, label, icon }) => (
            <MenuItem
              key={path}
              className={isActive(path) ? "bg-teal-100 text-teal-600" : ""}
              icon={<Icon icon={icon} height={22} width={22} />}
            >
              <Link
                to={path}
                onClick={toggleSidebar}
                className="flex items-center gap-5"
              >
                {label}
              </Link>
            </MenuItem>
          ))}
        </Menu>
      </ProSidebar>

      {/* Overlay for closing sidebar in mobile view */}
      {isOpen && (
        <div
          onClick={toggleSidebar}
          className="z-40 fixed inset-0 md:hidden bg-black opacity-50"
        ></div>
      )}
       {/* <p>Sidebar is visible</p>  Static check */}
       </div>
    </>
  );
};

export default Side;

