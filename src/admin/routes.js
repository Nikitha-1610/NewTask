import AddProject from "./pages/Addproject";
import AddTasks from "./pages/addTasks";
import DesignTeam from "./pages/DesignTeam";
import Dashboard from "./pages/Dashboard";
import EmployeeForm from "./pages/EmployeeForm";
import People from "./pages/People";
import Position from "./pages/Position";
import Teams from "./pages/Teams";
import userEmail from "./pages/Usersemail";
import Chats from "./pages/Chats";
import MainPage from "./pages/MainPage";
import InProgressTasks from "./pages/InProgressTask";
import Completed from "./pages/Completed";
import TodayAssigned from "./pages/TodayAssigned";
import IntestTasks from "./pages/InTest";
import AssignTasks from "./pages/Assigntask";
import TaskCardDetails from "./components/TaskCardDetails";
import ProjectStatus from "./pages/ProjectStatus";
import EmployeeDetails from "./pages/EmployeeDetails";
import Calender from "./pages/CalenderAdmin"
import MonthView from "./pages/MonthAdmin"

const adminRoutes = [
  {
    path: "dashboard",
    component: Dashboard,
  },
  { path: "teams", component: Teams },
  { path: "employee", component: EmployeeForm },
  { path: "people", component: People },
  { path: "empdetails", component: EmployeeDetails },

  {
    path: "usersemail",
    component: userEmail,
  },
  {
    path: "task",
    component: DesignTeam,
  },
  { path: "intest", component: IntestTasks },
  { path: "inprogress", component: InProgressTasks },
  { path: "completed", component: Completed },
  { path: "assign", component: TodayAssigned },
  // { path: "assign", component: AssignTasks },
  { path: "task/:taskId", component: TaskCardDetails },
  { path: "addtasks", component: AddTasks },
  {
    path: "position",
    component: Position,
  },
  {
    path: "chats",
    component: Chats,
  },
  {
    path: "mainpage",
    component: MainPage,
  },
  {
    path: "addproject",
    component: AddProject,
  },
  {
    path: "projectstatus",
    component: ProjectStatus,
  },
  {
    path: "task/:taskId",  // New route for task details
    component: TaskCardDetails,
   
  },
  {
    path: "calender",
    component: Calender,
  },
  {
    path: "month/:year/:month",
    component: MonthView,
  },

];

export default adminRoutes;
