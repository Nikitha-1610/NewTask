import { useState, useEffect } from "react";
import Sidebar from "./Side";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false); // Sidebar open/close state for mobile
  const [isCollapsed, setIsCollapsed] = useState(false); // Sidebar collapsed state for medium/large screens
  const [isMobile, setIsMobile] = useState(false); // Track mobile view

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleResize = () => {
    const width = window.innerWidth;

    if (width < 768) {
      setIsMobile(true); // Mobile view
      setIsCollapsed(false); // No marginLeft adjustments for mobile
    } else {
      setIsMobile(false); // Larger screens
      if (width >= 768 && width < 1024) {
        setIsCollapsed(true); // Sidebar collapsed
      } else {
        setIsCollapsed(false); // Sidebar expanded
      }
    }
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar
        isOpen={isOpen}
        toggleSidebar={toggleSidebar}
        isCollapsed={isCollapsed}
      />

      {/* Main Content */}
      <div
        className="flex-1 flex flex-col"
        style={{
          paddingTop: "4rem", // Space for fixed Navbar
          marginLeft:
            !isMobile && !isCollapsed ? "px" : isCollapsed ? "0px" : "-250px", // Adjust only for visible sidebar
          transition: "margin-left 0.3s ease",
        }}
      >
        {/* Navbar */}
        <Navbar toggleSidebar={toggleSidebar} />

        {/* Content - Scrollable */}
        <main className="flex-1 overflow-y-auto p-4">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
