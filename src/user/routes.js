import UserHome from "./pages/UserHome";
import UserProfile from "./pages/UserProfile";
import UserTask from "./pages/Usertask";
import MainPage from "./pages/MainPage";
import Calendar from "./pages/Calender";
import Chats from "./pages/Chats";
import MyTask from "./pages/MyTask";
import UserTaskDetails from "./pages/UserTaskDetails";
import AssignPage from "./pages/AssignPage";
import InProgressPage from "./pages/InProgressPage"; 
import InTestPage from "./pages/InTestPage"; 
import CompletedPage from "./pages/CompletedPage"; // ✅ Add this

const userRoutes = [
  { path: "home", component: UserHome },
  { path: "profile", component: UserProfile },
  { path: "tasks", component: UserTask },
  { path: "mainpage", component: MainPage },
  { path: "mytask", component: MyTask },
  { path: "calender", component: Calendar },
  { path: "chats", component: Chats },
  { path: "home/:taskId", component: UserTaskDetails},
  { path: "assigned", component: AssignPage },
  { path: "in-progress", component: InProgressPage },
  { path: "in-test", component: InTestPage },
  { path: "completed", component: CompletedPage } // ✅ Add this
];

export default userRoutes;
