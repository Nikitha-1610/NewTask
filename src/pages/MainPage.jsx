// import StatsCard from "../components/UserDashBoard/StatsCard";
// import TaskList from "../components/UserDashBoard/TaskList";
// import ProjectList from "../components/UserDashBoard/projectList";
// import MostWorkedCard from "../components/UserDashBoard/MostWorkedCard";
// import ProductivityChart from "../components/UserDashBoard/ProductivityChart";
// import { Icon } from "@iconify/react";
// import ProjectProgress from "../components/UserDashBoard/ProjectProgress";
// import Messages from "../components/UserDashBoard/Messages";
// import Assignments from "../components/UserDashBoard/Assignments";
// import TaskSchedule from "../components/UserDashBoard/Taskschedule";
// import DeadLineProjects from "../components/UserDashBoard/DeadLineProjects";
// import TaskManager from "../components/UserDashBoard/TaskManager";
// import { useState } from "react";

// const MainPage = () => {
//   const [tasks, setTasks] = useState([
//     { name: "Create Wireframe", completed: true },
//     { name: "Slack Logo Design", subtasks: 3, completed: false },
//     { name: "Dashboard Design", completed: false },
//     { name: "Create Wireframe", completed: true },
//     { name: "App Icon Design", completed: false },
//   ]);

//   const projects = [
//     { name: "Project Four", time: "00:30:00", progress: 25 },
//     { name: "Project Four", time: "00:30:00", progress: 50 },
//     { name: "Project Four", time: "00:30:00", progress: 75 },
//     { name: "Project Four", time: "00:30:00", progress: 90 },
//   ];
// const handleAddTask = (newTask) => {
//   console.log("clicking");

//   setTasks([...tasks, newTask]);
// };

//   return (
//     <div className="min-h-screen p-6">
//       {/* Header Section */}
//       <header className="mb-8">
//         <h1 className="text-2xl font-bold text-gray-800">Hello User</h1>
//         <p className="text-gray-500">
//           Have a great day at work. Happy Working!
//         </p>
//       </header>

//       {/* Main Content Section */}
//       <div className="flex flex-col lg:flex-row gap-6">
//         {/* Left Section */}
//         <div className="flex-1">
//           {/* Stats Cards */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
//             <StatsCard
//               title="Today Hours"
//               value="7:00:01"
//               icon={<Icon icon="ic:outline-watch-later" />}
//             />
//             <StatsCard
//               title="Weekly Activity"
//               value="0%"
//               icon={<Icon icon="fluent:timer-24-filled" />}
//             />
//             <StatsCard
//               title="Worked This Week"
//               value="40:00:05"
//               icon={<Icon icon="mdi:work-outline" />}
//             />
//             <StatsCard
//               title="Project Worked"
//               value="02"
//               icon={<Icon icon="material-symbols:folder-outline" />}
//             />
//           </div>

// {/* Task List and Timer */}
// <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
//   <div className="lg:col-span-1">
//     <TaskList tasks={tasks} onAddTask={handleAddTask} />
//   </div>
//   <div className="lg:col-span-1">
//     <TaskManager />
//   </div>
// </div>

// {/* Project Lists */}
// <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
//   <ProjectList title="Projects" projects={projects} />
//   <DeadLineProjects title="Upcoming Deadlines" projects={projects} />
// </div>

//           {/* Productivity and Progress */}
//         </div>

//         {/* Right Section */}
//         <div className="flex flex-col gap-6 lg:w-1/3">
//           <TaskSchedule />
//           <MostWorkedCard />
//         </div>
//       </div>
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
//         <ProductivityChart />
//         <ProjectProgress />
//       </div>

//       {/* Messages and Assignments */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
//         <Messages />
//         <Assignments />
//       </div>
//     </div>
//   );
// };

// export default MainPage;



// import { useState, useEffect } from "react";
// import axios from "axios";
// import StatsCard from "../components/UserDashBoard/StatsCard";
// import TaskList from "../components/UserDashBoard/TaskList";
// import ProjectList from "../components/UserDashBoard/ProjectList";
// import MostWorkedCard from "../components/UserDashBoard/MostWorkedCard";
// import ProductivityChart from "../components/UserDashBoard/ProductivityChart";
// import { Icon } from "@iconify/react";
// import ProjectProgress from "../components/UserDashBoard/ProjectProgress";
// import Messages from "../components/UserDashBoard/Messages";
// import Assignments from "../components/UserDashBoard/Assignments";
// import TaskSchedule from "../components/UserDashBoard/TaskSchedule";
// import DeadLineProjects from "../components/UserDashBoard/DeadLineProjects";
// import TaskManager from "../components/UserDashBoard/TaskManager";

// const MainPage = () => {
//   const [stats, setStats] = useState({
//     todayCompletedHours: "0:00:00",
//     lastWeekCompletedHours: "0:00:00",
//     weeklyActivity: "0%",
//     project: "0",
//   });
//   const [upcomingDeadlineTasks, setUpcomingDeadlineTasks] = useState([]);
//   const [daywiseCompletedHours, setDaywiseCompletedHours] = useState({});

//   // Fetch data on component mount
//   useEffect(() => {
//     const fetchDashboardData = async () => {
//       try {
//         const response = await axios.get("task/getDashboard/EMP23456");
//         const data = response.data.message;

//         // Update states with fetched data
//         setStats({
//           todayCompletedHours: data.todayCompletedHours || "0:00:00",
//           lastWeekCompletedHours: data.lastWeekCompletedHours || "0:00:00",
//           weeklyActivity: `${data.weeklyActivity || 0}%`,
//           project: data.project || "0",
//         });
//         setUpcomingDeadlineTasks(data.upcomingDeadlineTasks || []);
//         setDaywiseCompletedHours(data.daywiseCompletedHours || {});
//       } catch (error) {
//         console.error("Error fetching dashboard data:", error);
//       }
//     };

//     fetchDashboardData();
//   }, []);

//   return (
//     <div className="min-h-screen p-6">
//       {/* Header Section */}
//       <header className="mb-8">
//         <h1 className="text-2xl font-bold text-gray-800">Hello User</h1>
//         <p className="text-gray-500">Have a great day at work. Happy Working!</p>
//       </header>

//       {/* Main Content Section */}
//       <div className="flex flex-col lg:flex-row gap-6">
//         {/* Left Section */}
//         <div className="flex-1">
//           {/* Stats Cards */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
//             <StatsCard
//               title="Today Hours"
//               value={stats.todayCompletedHours}
//               icon={<Icon icon="ic:outline-watch-later" />}
//             />
//             <StatsCard
//               title="Weekly Activity"
//               value={stats.weeklyActivity}
//               icon={<Icon icon="fluent:timer-24-filled" />}
//             />
//             <StatsCard
//               title="Worked This Week"
//               value={stats.lastWeekCompletedHours}
//               icon={<Icon icon="mdi:work-outline" />}
//             />
//             <StatsCard
//               title="Projects Worked"
//               value={stats.project}
//               icon={<Icon icon="material-symbols:folder-outline" />}
//             />
//           </div>

//           {/* Upcoming Deadlines */}
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
//             <DeadLineProjects title="Upcoming Deadlines" projects={upcomingDeadlineTasks} />
//           </div>
//         </div>

//         {/* Right Section */}
//         <div className="flex flex-col gap-6 lg:w-1/3">
//           <TaskSchedule />
//           <MostWorkedCard />
//         </div>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
//         <ProductivityChart daywiseHours={daywiseCompletedHours} />
//         <ProjectProgress />
//       </div>

//       {/* Messages and Assignments */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
//         <Messages />
//         <Assignments />
//       </div>
//     </div>
//   );
// };

// export default MainPage;



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
    hoursByLabel: {}
  });
  const [upcomingDeadlineTasks, setUpcomingDeadlineTasks] = useState([]);
  const [daywiseCompletedHours, setDaywiseCompletedHours] = useState({});
  const [mostWorked, setMostWorked] = useState([]);


  const [tasks, setTasks] = useState([]);
  const handleAddTask = (newTask) => {
    console.log("clicking");

    setTasks([...tasks, newTask]);
  };
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await axios.get("https://3qhglx2bhd.execute-api.us-east-1.amazonaws.com//task/getDashboard/EMP23456", { responseType: 'json' });
        console.log('Response:', response);

        // Check if the response is JSON
        if (response.headers['content-type'] && response.headers['content-type'].includes('application/json')) {
          const data = response.data;
          console.log('Parsed Data:', data);

          if (data && data.message) {

            setStats({
              todayCompletedHours: data.message.todayCompletedHours || "0:00:00",
              lastWeekCompletedHours: data.message.lastWeekCompletedHours || "0:00:00",
              weeklyActivity: `${data.message.weeklyActivity || 0}%`,
              project: data.message.project || "0",
              hoursByLabel: data.message.hoursBylabel || {},
                
            });
            setDaywiseCompletedHours(data.message.daywiseCompletedHours || {});

          } else {
            setError("Invalid data structure or missing message field");
          }
        } else {
          setError("API response is not in JSON format");
        }
      } catch (error) {
        setError("Error fetching dashboard data");
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);


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
              <TaskList tasks={tasks} onAddTask={handleAddTask} />
            </div>
            <div className="lg:col-span-1">
              <TaskManager />
            </div>
          </div>

          {/* Project Lists */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
            <ProjectList title="Projects" projects={projects} />
            <DeadLineProjects title="Upcoming Deadlines" projects={upcomingDeadlineTasks} />
          </div>

          {/* Upcoming Deadlines */}
          {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
            <DeadLineProjects title="Upcoming Deadlines" projects={upcomingDeadlineTasks} />
          </div> */}
        </div>

        {/* Right Section */}
        <div className="flex flex-col gap-6 lg:w-1/3">
          <TaskSchedule />
          {/* <MostWorkedCard data={mostWorked} /> */}
          <MostWorkedCard hoursByLabel={stats.hoursByLabel || {}} />

        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <ProductivityChart daywiseHours={daywiseCompletedHours} />  
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
