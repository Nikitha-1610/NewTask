import React, { useState, useEffect } from "react";
import { Sidebar as ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Icon } from "@iconify-icon/react";
import { Link, useLocation } from "react-router-dom";

const Side = ({ isOpen, toggleSidebar, role }) => {
  const [isCollapsed, setIsCollapsed] = useState(false); 
  const [isMobile, setIsMobile] = useState(true); 
  const location = useLocation();

  // Detect screen size for mobile and tablet views
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setIsMobile(true); 
        setIsCollapsed(false); 
      } else {
        setIsMobile(false); 
        setIsCollapsed(true); 
      }
    };

    handleResize(); // Initial screen size check
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize); 
  }, []);

  const isActive = (path) => location.pathname === path;

  const linksByRole = {
    TeamLead: [
      { path: "/admin/dashboard", label: "Dashboard", icon: "material-symbols:dashboard-outline" },
      { path: "/admin/teams", label: "Teams", icon: "la:teamspeak" },
      { path: "/admin/employee", label: "Employee", icon: "ic:twotone-update" },
      { path: "/admin/people", label: "People", icon: "iconamoon:profile" },
      { path: "/admin/usersemail", label: "Users Email", icon: "material-symbols:action-key" },
      { path: "/admin/task", label: "Task", icon: "bi:list-task" },
      { path: "/admin/addtasks", label: "Add Task", icon: "mdi:plus-circle" },
      { path: "/admin/position", label: "Position", icon: "iconoir:position-align" },
      { path: "/admin/chats", label: "Chats", icon: "material-symbols:chat-outline" },
      { path: "/admin/mainpage", label: "Main Page", icon: "duo-icons:dashboard" },
      { path: "/admin/addproject", label: "Add Project", icon: "ix:project-new" },
    ],
    Employee: [
      { path: "/user/home", label: "Home", icon: "material-symbols:home-outline" },
      { path: "/user/tasks", label: "Tasks", icon: "bi:list-task" },
      { path: "/user/profile", label: "Profile", icon: "iconamoon:profile" },
      { path: "/user/mainpage", label: "MainPage", icon: "duo-icons:dashboard" },
      { path: "/user/calender", label: "Calender", icon: "iconamoon:calender" },
      { path: "/user/mytask", label: "MyTask", icon: "iconamoon:profile" },
      { path: "/user/chats", label: "Chats", icon: "bi:chat-dots" },
    ],
  };

  const links = linksByRole[role];

  const handleLinkClick = () => {
    if (isOpen && isMobile) {
      toggleSidebar(); 
    }
  };

  const handleToggleClick = () => {
    if (!isMobile) {
      setIsCollapsed(!isCollapsed);
    }
  };

  return (
    <div className={isOpen ? "sidebar-open" : "sidebar-closed"}>
      <ProSidebar
        collapsed={isCollapsed} 
        className={`sidebar fixed top-0 left-0 h-screen z-50 transition-transform duration-300 bg-white shadow-lg ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } ${isMobile ? "absolute" : "md:translate-x-0"}`}
        style={{ overflowY: "auto" }}
      >
      
        {!isMobile && (
          <Menu>
            <MenuItem
              onClick={handleToggleClick}
              icon={
                <Icon
                  icon={isCollapsed ? "mdi:menu" : "mdi:menu-open"} 
                  height={24}
                  width={24}
                />
              }
              className="flex justify-center cursor-pointer py-2"
              style={{ marginBottom: 0 }}
            >
             
            </MenuItem>
          </Menu>
        )}

        {/* Sidebar Links */}
        <Menu>
          {links.map(({ path, label, icon }) => (
            <MenuItem
              key={path}
              className={isActive(path) ? "bg-teal-100 text-teal-600" : ""}
            >
              <Link
                to={path}
                onClick={handleLinkClick} 
                className="flex items-center gap-5"
              >
                
                <Icon icon={icon} height={22} width={22} />
               
                {!isCollapsed && <span>{label}</span>}
              </Link>
            </MenuItem>
          ))}
        </Menu>
      </ProSidebar>

     
      {isOpen && isMobile && (
        <div
          onClick={toggleSidebar}
          className="z-40 fixed inset-0 md:hidden bg-black opacity-50"
        ></div>
      )}
    </div>
  );
};

export default Side;
