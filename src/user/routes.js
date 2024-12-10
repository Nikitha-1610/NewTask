import UserHome from "./pages/UserHome";
import UserProfile from "./pages/UserProfile";
import UserTask from "./pages/Usertask";

import MainPage from "./pages/MainPage";

import Calendar from "./pages/Calender";
import Chats from "./pages/Chats";
import MyTask from "./pages/MyTask";
import UserTaskDetails from "./pages/UserTaskDetails";



const userRoutes = [
  { path: "home", component: UserHome },
  { path: "profile", component: UserProfile },
  { path: "tasks", component: UserTask },

  { path: "mainpage", component: MainPage },

  { path: "mytask", component: MyTask },
  { path: "calender", component: Calendar },
  { path: "chats", component: Chats },
  { path: "home/:taskId", component: UserTaskDetails},
  

];

export default userRoutes;
