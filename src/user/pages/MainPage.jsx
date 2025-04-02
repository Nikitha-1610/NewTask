import StatsCard from '../Components/UserDashBoard/Stats';
import TaskList from "../Components/UserDashBoard/TaskList";
import ProjectList from "../Components/UserDashBoard/projectList";
import MostWorkedCard from "../Components/UserDashBoard/MostWorkedCard";
import ProductivityChart from "../Components/UserDashBoard/ProductivityChart";
import { Icon } from "@iconify/react";
import ProjectProgress from "../Components/UserDashBoard/ProjectProgress";
import Messages from "../Components/UserDashBoard/Messages";
import Assignments from "../Components/UserDashBoard/Assignments";
import TaskSchedule from "../Components/UserDashBoard/Taskschedule";
import DeadLineProjects from "../Components/UserDashBoard/DeadLineProjects";
import TaskManager from "../Components/UserDashBoard/TaskManager";
import { useState, useEffect } from "react";
import axiosInstance from "../../common/utils/axios/axiosInstance";
import axios from "axios";
import { FaPlay } from "react-icons/fa";
import ReactLoading from "react-loading";

const MainPage = () => {

  // const [stats, setStats] = useState(null); 
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
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [employeeTasks, setEmployeeTasks] = useState([]);
  // const employeeName = localStorage.getItem("name");
  const name = localStorage.getItem("name")

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
      const dashboardResponse =  await axiosInstance.get(
  `task/getDashboard/${name}`,
  { responseType: "json" }
);

        

        if (dashboardResponse.data && dashboardResponse.data.message) {
          const data = dashboardResponse.data.message;

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



    const fetchEmployeeTasks = async () => {
      try {
        const employeeTaskResponse = await axiosInstance.get(
          `task/getEmployeeTask/${name}`,
          { responseType: "json" }
        );


        // Extract the tasks from the 'message' property
        const tasks = employeeTaskResponse.data.message.map((task) => ({
          taskId: task.taskId,
          taskName: task.taskName,
          taskStatus: task.taskStatus,
          priority: task.priority,
          assignedTo: task.assignedTo,
          assignedBy: task.assignedBy,
          assignedDate: task.assignedDate,
          taskDescription: task.taskDescription,
          referenceFileUrl: task.referenceFileUrl
        }));

       
        setEmployeeTasks(tasks);
      } catch (error) {
        console.error("Error fetching employee tasks:", error);
        setEmployeeTasks([]);  
      }
    };




    const fetchAllData = async () => {
      setLoading(true);
      await Promise.all([fetchDashboardData(), fetchEmployeeTasks()]);
      setLoading(false);
    };

    fetchAllData();
  }, []);

  const handleAddTask = (newTask) => {
    console.log("Adding task:", newTask);
    setTasks([...employeeTasks, newTask]);
  };


  if (loading) {
    return (
      <div className="fixed inset-0 flex justify-center items-center bg-white bg-opacity-40 z-50">
        <ReactLoading type="spin" color="#00bfae" height={50} width={50} />
      </div>
    );
  }

  const formatHours = (value) => {
    return value === 0 ? "0:00:00" : value;
  };

  const formatProjectValue = (value) => {
    return value === 0 ? "0" : value;
  };



  return (
<div className="min-h-screen sm:p-6 p-2">
  {/* Header Section */}
  <header className="mb-8">
    <h1 className="text-2xl font-bold text-gray-800">Hello User</h1>
    <p className="text-gray-500">Have a great day at work. Happy Working!</p>
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
        <div className={`grid grid-cols-1 ${projects.length > 0 || upcomingDeadlineTasks.length > 0 ? "lg:grid-cols-2" : ""} gap-6 mb-8`}>
    {/* Task List */}
    <div className="col-span-1">
      <TaskList employeeTasks={employeeTasks} onAddTask={handleAddTask} />
    </div>

    {/* Timer */}
    <div className="col-span-1">
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
    <div className="flex flex-col gap-6 lg:w-[40%]">
      <TaskSchedule employeeTasks={employeeTasks} setTasks={setEmployeeTasks} />
      <MostWorkedCard hoursByLabel={stats.hoursByLabel || {}} />
    </div>
  </div>

  {/* Conditional Rendering of ProductivityChart and ProjectProgress */}
  <div className={`grid grid-cols-1 ${projects.length > 0 ? "lg:grid-cols-2" : ""} gap-6 mt-8`}>
  {/* Always display the ProductivityChart */}
  <div className={`col-span-1 ${projects.length === 0 ? "lg:col-span-2" : "lg:col-span-1"}`}>
    <ProductivityChart 
      daywiseHours={daywiseCompletedHours} 
      isFullWidth={projects.length === 0}  // Full width if no projects
    />
  </div>

  {/* Render ProjectProgress only if projects are available */}
  {projects.length > 0 && (
    <div className="col-span-1">
      <ProjectProgress projects={projects} />
    </div>
  )}
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
