import { useState, useEffect } from "react";
import Sidebar from "./Side";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleResize = () => {
    const width = window.innerWidth;
    setWindowWidth(width); // Update window width
    if (width < 768) {
      setIsMobile(true);
      setIsCollapsed(false);
    } else {
      setIsMobile(false);
      if (width >= 768 && width < 1024) {
        setIsCollapsed(true);
      } else {
        setIsCollapsed(false);
      }
    }
  };

  useEffect(() => {
    handleResize(); // Initial calculation
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const getMarginLeft = () => {
    if (isMobile) {
      return "-250px"; // No margin for mobile
    }
    if (isCollapsed) {
      return "0px"; // Collapsed sidebar width
    }
    return isOpen ? "250px" : "0px"; // Full sidebar width or no margin
  };

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
          paddingTop: "4rem",
          marginLeft: getMarginLeft(),
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
