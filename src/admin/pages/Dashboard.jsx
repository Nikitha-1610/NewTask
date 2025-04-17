import { useState, useEffect } from "react";
import axiosInstance from "../../common/utils/axios/axiosInstance";
import ReactLoading from "react-loading";
import { FiUsers, FiCheckCircle, FiClock, FiLoader } from "react-icons/fi";

const userFilters = ["All Users", "User A", "User B", "User C"];
const yearFilters = ["All", "I", "II", "III", "IV"];
const sectionFilters = ["All", "A", "B", "C", "D"];

const cardConfig = [
  {
    key: "totalTask",
    label: "Total Tasks",
    icon: <FiUsers className="text-white text-xl" />,
    color: "bg-indigo-500",
  },
  {
    key: "completedTask",
    label: "Completed Tasks",
    icon: <FiCheckCircle className="text-white text-xl" />,
    color: "bg-green-500",
  },
  {
    key: "taskInProgress",
    label: "In Progress",
    icon: <FiLoader className="text-white text-xl animate-spin-slow" />,
    color: "bg-yellow-500",
  },
  {
    key: "pendingTask",
    label: "Pending Tasks",
    icon: <FiClock className="text-white text-xl" />,
    color: "bg-pink-500",
  },
];

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState("All Users");
  const [selectedYear, setSelectedYear] = useState("All");
  const [selectedSection, setSelectedSection] = useState("All");
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/task/adminDashboard", {
        params: {
          user: selectedUser,
          year: selectedYear,
          section: selectedSection,
        },
      });
      if (response.status === 200) {
        setDashboardData(response.data.message);
      } else {
        console.error("Failed to fetch data:", response.statusText);
      }
    } catch (err) {
      setError("Failed to load data");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [selectedUser, selectedYear, selectedSection]);

  if (loading)
    return (
      <div className="fixed inset-0 flex justify-center items-center bg-white bg-opacity-70 z-50">
        <ReactLoading type="spin" color="#6366f1" height={50} width={50} />
      </div>
    );

  if (error)
    return <div className="text-center mt-10 text-red-600">{error}</div>;

  return (
    <div className="w-full px-4 py-6 max-w-screen-xl mx-auto bg-gray-50 min-h-screen">
      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {/* Year Filter */}
        <div className="w-full relative">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Year
          </label>
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="w-full cursor-pointer border border-gray-300 text-gray-700 px-4 py-2 pr-10 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#0D9488] hover:border-[#0D9488] transition-all duration-200 ease-in-out focus:border-[#0D9488]"
          >
            {yearFilters.map((year, idx) => (
              <option key={idx} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        {/* Section Filter */}
        <div className="w-full relative">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Section
          </label>
          <select
            value={selectedSection}
            onChange={(e) => setSelectedSection(e.target.value)}
            className="w-full cursor-pointer border border-gray-300 text-gray-700 px-4 py-2 pr-10 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#0D9488] hover:border-[#0D9488] transition-all duration-200 ease-in-out focus:border-[#0D9488]"
          >
            {sectionFilters.map((sec, idx) => (
              <option key={idx} value={sec}>
                {sec}
              </option>
            ))}
          </select>
        </div>

        {/* User Filter */}
        <div className="w-full relative">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Students
          </label>
          <select
            value={selectedUser}
            onChange={(e) => setSelectedUser(e.target.value)}
            className="w-full cursor-pointer border border-gray-300 text-gray-700 px-4 py-2 pr-10 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#0D9488] hover:border-[#0D9488] transition-all duration-200 ease-in-out focus:border-[#0D9488]"
          >
            {userFilters.map((filter, idx) => (
              <option key={idx} value={filter}>
                {filter}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 gap-6">
        {cardConfig.map(({ key, label, icon, color }, index) => (
          <div
            key={index}
            className="p-6 rounded-2xl bg-white shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300"
          >
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-1">
                <h3 className="text-gray-500 text-sm uppercase font-semibold tracking-wide">
                  {label}
                </h3>
                <h1 className="text-4xl font-bold text-gray-800">
                  {dashboardData?.[key] ?? 0}
                </h1>
                <p className="text-sm text-gray-400">110 last month</p>
              </div>
              <div
                className={`w-12 h-12 flex items-center justify-center rounded-full ${color} shadow-inner`}
              >
                {icon}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
