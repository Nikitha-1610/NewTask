import UserHome from "./pages/UserHome";
import UserProfile from "./pages/UserProfile";
import UserTask from "./pages/Usertask";
import Calendar from "./pages/Calender";

const userRoutes = [
  { path: "home", component: UserHome },
  { path: "profile", component: UserProfile },
  { path: "tasks", component: UserTask },
  { path: "calender", component: Calendar },
];

export default userRoutes;
