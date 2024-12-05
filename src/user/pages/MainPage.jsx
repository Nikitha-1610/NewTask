import StatsCard from "../Components/UserDashBoard/Stats";
import TaskList from "../components/UserDashBoard/TaskList";
import ProjectList from "../components/UserDashBoard/projectList";
import MostWorkedCard from "../components/UserDashBoard/MostWorkedCard";
import ProductivityChart from "../components/UserDashBoard/ProductivityChart";
import { Icon } from "@iconify/react";
import ProjectProgress from "../components/UserDashBoard/ProjectProgress";
import Messages from "../components/UserDashBoard/Messages";
import Assignments from "../components/UserDashBoard/Assignments";
import TaskSchedule from "../components/UserDashBoard/Taskschedule";
import DeadLineProjects from "../components/UserDashBoard/DeadLineProjects";
import TaskManager from "../components/UserDashBoard/TaskManager";
import { useState, useEffect } from "react";
import axios from "axios";
import { FaPlay } from "react-icons/fa";

const MainPage = () => {

  const [stats, setStats] = useState({
    todayCompletedHours: 0,
    lastWeekCompletedHours: 0,
    weeklyActivity: "0%",
    project: 0,
    hoursByLabel: {},
  });
  const [upcomingDeadlineTasks, setUpcomingDeadlineTasks] = useState([]);
  const [daywiseCompletedHours, setDaywiseCompletedHours] = useState({});
  const [mostWorked, setMostWorked] = useState([]);
  // const [tasks, setTasks] = useState([]);
  // const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [employeeTasks, setEmployeeTasks] = useState([]);
  const [tasks, setTasks] = useState([
    { name: "Create Wireframe", completed: true },
    { name: "Slack Logo Design", subtasks: 3, completed: false },
    { name: "Dashboard Design", completed: false },
    { name: "Create Wireframe", completed: true },
    { name: "App Icon Design", completed: false },
  ]);

  const projects = [
    { name: "Project Four", time: "00:30:00", progress: 25 },
    { name: "Project Four", time: "00:30:00", progress: 50 },
    { name: "Project Four", time: "00:30:00", progress: 75 },
    { name: "Project Four", time: "00:30:00", progress: 90 },
  ];



  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Fetch data for dashboard stats
        const dashboardResponse = await axios.get(
          "https://3qhglx2bhd.execute-api.us-east-1.amazonaws.com/task/getDashboard/Mukilan",
          { responseType: "json" }
        );

        console.log("API Response:", dashboardResponse.data);

        if (dashboardResponse.data && dashboardResponse.data.message) {
          const data = dashboardResponse.data.message;
          console.log("Dashboard Data:", data); 

          setStats({
            todayCompletedHours: data.todayCompletedHours || 0,
            lastWeekCompletedHours: data.lastWeekCompletedHours || 0,
            weeklyActivity: `${data.weeklyActivity || 0}%`,
            project: data.project || 0,
            hoursByLabel: data.hoursBylabel || {},
          });

          setDaywiseCompletedHours(data.daywiseCompletedHours || {});
        }
        else {
          console.log("Error: message is null in the response.");
        }

      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
      finally {
        setLoading(false);
      }

    };



  




    const fetchAllData = async () => {
      setLoading(true);
      await Promise.all([fetchDashboardData()]);
      setLoading(false);
    };

    fetchAllData();
  }, []);



  const formatHours = (value) => {
    return value === 0 ? "0:00:00" : value;
  };

  const formatProjectValue = (value) => {
    return value === 0 ? "0" : value;
  };












  const handleAddTask = (newTask) => {
    console.log("clicking");

    setTasks([...tasks, newTask]);
  };

  return (
    <div className="min-h-screen p-6">
      {/* Header Section */}
      {/* <header className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Hello User</h1>
        <p className="text-gray-500">
          Have a great day at work. Happy Working!
        </p>

      </header> */}

    
    


<header className="flex items-center justify-between mb-8">
  {/* Left Side: Greeting */}
  <div>
    <h1 className="text-2xl font-bold text-gray-800">Hello User</h1>
    <p className="text-gray-500">Have a great day at work. Happy Working!!!</p>
  </div>

  {/* Right Side: Start Time Tracker */}
  <div className="flex items-center space-x-2 p-2 rounded-lg border shadow-sm">
    <p className="text-gray-800 font-medium">Start Time Tracker</p>
    {/* Play Icon */}
    <div className="flex items-center justify-center w-8 h-8 bg-green-100 rounded-full">
      <FaPlay className="text-cyan-500" />
    </div>
  </div>
</header>



      {/* Main Content Section */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Section */}
        <div className="flex-1">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatsCard
          title="Today Hours"
          value={formatHours(stats.todayCompletedHours)}
          icon={<Icon icon="ic:outline-watch-later" />}
        />
        <StatsCard
          title="Weekly Activity"
          value={stats.weeklyActivity}
          icon={<Icon icon="fluent:timer-24-filled" />}
        />
        <StatsCard
          title="Worked This Week"
          value={formatHours(stats.lastWeekCompletedHours)}
          icon={<Icon icon="mdi:work-outline" />}
        />
        <StatsCard
          title="Projects Worked"
          value={formatProjectValue(stats.project)}
          icon={<Icon icon="material-symbols:folder-outline" />}
        />
      </div>

      {/* Task List and Timer Section */}
          {/* Task List and Timer */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="lg:col-span-1">
              <TaskList tasks={tasks} onAddTask={handleAddTask} />
            </div>
            <div className="lg:col-span-1">
              <TaskManager />
            </div>
          </div>

  {/* Conditionally Render Project Sections */}
  {projects.length > 0 || upcomingDeadlineTasks.length > 0 ? (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
      {projects.length > 0 && (
        <ProjectList title="Projects" projects={projects} />
      )}
      {upcomingDeadlineTasks.length > 0 && (
        <DeadLineProjects
          title="Upcoming Deadlines"
          projects={upcomingDeadlineTasks}
        />
      )}
    </div>
) : null}

    </div>


        {/* Right Section */}
        <div className="flex flex-col gap-6 lg:w-1/3">
          <TaskSchedule />
          <MostWorkedCard hoursByLabel={stats.hoursByLabel || {}} />
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
      <div className={`col-span-1 ${projects.length === 0 ? "lg:col-span-2" : "lg:col-span-1"}`}>
    <ProductivityChart 
      daywiseHours={daywiseCompletedHours} 
      isFullWidth={projects.length === 0}  // Full width if no projects
    />
  </div>
        <ProjectProgress />
      </div>

      {/* Messages and Assignments */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <Messages />
        <Assignments />
      </div>
    </div>
  );
};

export default MainPage;