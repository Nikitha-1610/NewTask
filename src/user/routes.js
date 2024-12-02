import UserHome from "./pages/UserHome";
import UserProfile from "./pages/UserProfile";
import UserTask from "./pages/Usertask";

import MainPage from "./pages/MainPage";

import Calendar from "./pages/Calender";


const userRoutes = [
  { path: "home", component: UserHome },
  { path: "profile", component: UserProfile },
  { path: "tasks", component: UserTask },

  { path: "mainpage", component: MainPage },


  { path: "calender", component: Calendar },

];

export default userRoutes;
