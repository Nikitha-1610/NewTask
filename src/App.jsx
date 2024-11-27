import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import People from "./pages/People";
import Teams from "./pages/Teams";
import Position from "./pages/Position";
import MainPage from "./pages/MainPage";

// Importing other pages
import Usersemail from "./pages/Usersemail";
import InProgressTask from "./pages/InProgressTask";
import AddTasks from "./pages/AddTasks";
import AddProject from "./pages/AddProject";
import DesignTeam from "./pages/DesignTeam";
import Chats from "./pages/Chats";
import InTest from "./pages/InTest";
import AssignTask from "./pages/AssignTask";
import EmployeeForm from "./pages/EmployeeForm";
import TaskDetails from "./components/TaskDetails";
import TaskCardDetails from "./components/TaskCardDetails";
import Auth from "./pages/Auth";
import { useSelector } from "react-redux";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  return (
    <Router>
      <Routes>
        {/* Auth route outside the layout */}
        <Route path="/auth" element={<Auth />} />

        {/* Layout applied to all other routes */}
        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/people" element={<People />} />
            <Route path="/intest" element={<InTest />} />
            <Route path="/position" element={<Position />} />
            <Route path="/mainpage" element={<MainPage />} />
            <Route path="/usersemail" element={<Usersemail />} />
            <Route path="/inprogress" element={<InProgressTask />} />
            <Route path="/addtasks" element={<AddTasks />} />
            <Route path="/addproject" element={<AddProject />} />
            <Route path="/task" element={<DesignTeam />} />
            <Route path="/chats" element={<Chats />} />
            <Route path="/assign" element={<AssignTask />} />
            <Route path="/employee" element={<EmployeeForm />} />
            <Route path="/task-details" element={<TaskDetails />} />
            <Route path="/task/:taskId" element={<TaskCardDetails />} />
          </Route>
        </Route>

        {/* Default Route (Fallback) */}
        <Route path="*" element={isAuthenticated ? <Dashboard /> : <Auth />} />
      </Routes>
    </Router>
  );
};

export default App;
