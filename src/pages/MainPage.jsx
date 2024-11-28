import { useState, useEffect } from "react";
import axios from "axios";
import StatsCard from "../components/UserDashBoard/StatsCard";
import TaskList from "../components/UserDashBoard/TaskList";
import ProjectList from "../components/UserDashBoard/ProjectList";
import MostWorkedCard from "../components/UserDashBoard/MostWorkedCard";
import ProductivityChart from "../components/UserDashBoard/ProductivityChart";
import { Icon } from "@iconify/react";
import ProjectProgress from "../components/UserDashBoard/ProjectProgress";
import Messages from "../components/UserDashBoard/Messages";
import Assignments from "../components/UserDashBoard/Assignments";
import TaskSchedule from "../components/UserDashBoard/TaskSchedule";
import DeadLineProjects from "../components/UserDashBoard/DeadLineProjects";
import TaskManager from "../components/UserDashBoard/TaskManager";

const MainPage = () => {
  const [stats, setStats] = useState({
    todayCompletedHours: "0:00:00",
    lastWeekCompletedHours: "0:00:00",
    weeklyActivity: "0%",
    project: "0",
    hoursByLabel: {},
  });
  const [upcomingDeadlineTasks, setUpcomingDeadlineTasks] = useState([]);
  const [daywiseCompletedHours, setDaywiseCompletedHours] = useState({});
  const [mostWorked, setMostWorked] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [employeeTasks, setEmployeeTasks] = useState([]); // New state for employee tasks

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Fetch data for dashboard stats
        const dashboardResponse = await axios.get(
          "https://3qhglx2bhd.execute-api.us-east-1.amazonaws.com/task/getDashboard/EMP23456",
          { responseType: "json" }
        );

        if (dashboardResponse.data && dashboardResponse.data.message) {
          const data = dashboardResponse.data.message;

          setStats({
            todayCompletedHours: data.todayCompletedHours || "0:00:00",
            lastWeekCompletedHours: data.lastWeekCompletedHours || "0:00:00",
            weeklyActivity: `${data.weeklyActivity || 0}%`,
            project: data.project || "0",
            hoursByLabel: data.hoursBylabel || {},
          });
          setDaywiseCompletedHours(data.daywiseCompletedHours || {});
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };



    const fetchEmployeeTasks = async () => {
      try {
        const employeeTaskResponse = await axios.get(
          "https://3qhglx2bhd.execute-api.us-east-1.amazonaws.com/task/getEmployeeTask/TeamLead1",
          { responseType: "json" }
        );

        console.log("API Response:", employeeTaskResponse.data);  // Log the API response

        // Extract the tasks from the 'message' property
        const tasks = employeeTaskResponse.data.message.map((task) => ({
          taskId: task.taskId,
          taskName: task.taskName,
          taskStatus: task.taskStatus,
          priority: task.priority,
          assignedTo: task.assignedTo,
          assignedDate: task.assignedDate,
          taskDescription: task.taskDescription,
        }));

        // Update state with the extracted tasks
        setEmployeeTasks(tasks);
      } catch (error) {
        console.error("Error fetching employee tasks:", error);
        setEmployeeTasks([]);  // Ensure the state is always an array
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
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen p-6">
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
              value={stats.todayCompletedHours}
              icon={<Icon icon="ic:outline-watch-later" />}
            />
            <StatsCard
              title="Weekly Activity"
              value={stats.weeklyActivity}
              icon={<Icon icon="fluent:timer-24-filled" />}
            />
            <StatsCard
              title="Worked This Week"
              value={stats.lastWeekCompletedHours}
              icon={<Icon icon="mdi:work-outline" />}
            />
            <StatsCard
              title="Projects Worked"
              value={stats.project}
              icon={<Icon icon="material-symbols:folder-outline" />}
            />
          </div>

          {/* Task List and Timer */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="lg:col-span-1">
              <TaskList employeeTasks={employeeTasks} onAddTask={handleAddTask} />
            </div>
            <div className="lg:col-span-1">
              <TaskManager  />
            </div>
          </div>

          {/* Project Lists */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
            <ProjectList title="Projects" projects={projects} />
            <DeadLineProjects
              title="Upcoming Deadlines"
              projects={upcomingDeadlineTasks}
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex flex-col gap-6 lg:w-1/3">
          <TaskSchedule employeeTasks={employeeTasks} setTasks={setEmployeeTasks} />
          <MostWorkedCard hoursByLabel={stats.hoursByLabel || {}} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <ProductivityChart daywiseHours={daywiseCompletedHours} />
        <ProjectProgress projects={projects} />
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
