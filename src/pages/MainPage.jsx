import StatsCard from "../components/UserDashBoard/StatsCard";
import TaskList from "../components/UserDashBoard/TaskList";
import Timer from "../components/UserDashBoard/Timer";
import ProjectList from "../components/UserDashBoard/projectList";
import MostWorkedCard from "../components/UserDashBoard/MostWorkedCard";
import ProductivityChart from "../components/UserDashBoard/ProductivityChart";
import { Icon } from "@iconify/react";
import ProjectProgress from "../components/UserDashBoard/ProjectProgress";
import Messages from "../components/UserDashBoard/Messages";
import Assignments from "../components/UserDashBoard/Assignments";

const MainPage = () => {
  const tasks = [
    { name: "Create Wireframe", completed: false },
    { name: "Slack Logo Design", completed: true },
    { name: "Dashboard Design", completed: true },
  ];

  const projects = [
    { name: "Project Four", time: "00:30:00", isDeadline: false },
    { name: "Project Four", time: "00:30:00", isDeadline: true },
  ];

  return (
    <div className=" min-h-screen p-6">
      <header className="mb-8">
        <h1 className="text-2xl font-bold">Hello User</h1>
        <p className="text-gray-500">
          Have a great day at work. Happy Working!
        </p>
      </header>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
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
          icon={<Icon icon="mdi:project" />}
        />
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <TaskList tasks={tasks} />
        <Timer />
        <MostWorkedCard />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-8">
        <ProjectList title="Projects" projects={projects} />
        <ProjectList title="Upcoming Deadlines" projects={projects} />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-8">
        <ProductivityChart />
        <ProjectProgress />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-8">
        <Messages />
        <Assignments />
      </div>
    </div>
  );
};

export default MainPage;
