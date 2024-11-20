import StatsCard from "../components/UserDashBoard/StatsCard";
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
import { useState } from "react";

const MainPage = () => {
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
  const handleAddTask = (newTask) => {
    console.log("clicking");

    setTasks([...tasks, newTask]);
  };

  return (
    <div className="min-h-screen p-6">
      {/* Header Section */}
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Hello User</h1>
        <p className="text-gray-500">
          Have a great day at work. Happy Working!
        </p>
      </header>

      {/* Main Content Section */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Section */}
        <div className="flex-1">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <StatsCard
              title="Today Hours"
              value="7:00:01"
              icon={<Icon icon="ic:outline-watch-later" />}
            />
            <StatsCard
              title="Weekly Activity"
              value="0%"
              icon={<Icon icon="fluent:timer-24-filled" />}
            />
            <StatsCard
              title="Worked This Week"
              value="40:00:05"
              icon={<Icon icon="mdi:work-outline" />}
            />
            <StatsCard
              title="Project Worked"
              value="02"
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
            <DeadLineProjects title="Upcoming Deadlines" projects={projects} />
          </div>

          {/* Productivity and Progress */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
            <ProductivityChart />
            <ProjectProgress />
          </div>

          {/* Messages and Assignments */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
            <Messages />
            <Assignments />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex flex-col gap-6 lg:w-1/3">
          <TaskSchedule />
          <MostWorkedCard />
        </div>
      </div>
    </div>
  );
};

export default MainPage;
