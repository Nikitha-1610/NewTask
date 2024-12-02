import UserHome from "./pages/UserHome";
import UserProfile from "./pages/UserProfile";
import UserTask from "./pages/Usertask";

const userRoutes = [
  { path: "home", component: UserHome },
  { path: "profile", component: UserProfile },
  { path: "tasks", component: UserTask },
];

export default userRoutes;
