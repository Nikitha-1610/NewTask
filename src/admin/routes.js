import AddProject from "./pages/Addproject";
import AddTasks from "./pages/addTasks";
import AdminDashboard from "./pages/DesignTeam";
import Dashboard from "./pages/Dashboard";
import EmployeeForm from "./pages/EmployeeForm";
import People from "./pages/People";
import Position from "./pages/Position";
import Teams from "./pages/Teams";
import userEmail from "./pages/Usersemail";
import Chats from "./pages/Chats";
import MainPage from "./pages/MainPage";
import TaskCardDetails from "../components/TaskCardDetails";  // Import the TaskCardDetails component

const adminRoutes = [
  {
    path: "dashboard",
    component: Dashboard,
  },
  { path: "teams", component: Teams },
  { path: "employee", component: EmployeeForm },
  { path: "people", component: People },
  {
    path: "usersemail",
    component: userEmail,
  },
  { path: "task", component: AdminDashboard },
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
    path: "task/:taskId",  // New route for task details
    component: TaskCardDetails,
   
  },
];

export default adminRoutes;
