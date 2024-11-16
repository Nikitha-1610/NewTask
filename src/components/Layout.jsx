import Sidebar from "./Side";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar - fixed on larger screens */}
      <div className="w-64 hidden md:block">
        <Sidebar />
      </div>
      <div className="flex-1 flex flex-col overflow-auto">
        <Navbar />
        <main className="p-4 mt-16">{children}</main>
      </div>
      <Sidebar />
    </div>
  );
};

export default Layout;
