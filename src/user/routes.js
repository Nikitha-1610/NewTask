import UserHome from "./pages/UserHome";
import UserProfile from "./pages/UserProfile";
import UserTask from "./pages/Usertask";
import MainPage from "./pages/MainPage";

const userRoutes = [
  { path: "home", component: UserHome },
  { path: "profile", component: UserProfile },
  { path: "tasks", component: UserTask },
  { path: "mainpage", component: MainPage },

];

export default userRoutes;
