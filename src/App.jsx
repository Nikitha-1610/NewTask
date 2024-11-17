import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import People from "./pages/People";
import Teams from "./pages/Teams";
import Assign from "./pages/Assigntask";
import Position from "./pages/Position";
// import Settings from "./pages/Settings";
import Usersemail from "./pages/Usersemail";
import InProgressTask from "./pages/InProgressTask";
import AddTasks from "./pages/AddTasks";
import DesignTeam from "./pages/DesignTeam";
import Chats from "./pages/Chats";
import InTest from "./pages/InTest";
import MainPage from "./pages/MainPage";
const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/people" element={<People />} />
          <Route path="/assign" element={<Assign />} />
          <Route path="/intest" element={<InTest />} />
          <Route path="/position" element={<Position />} />
          <Route path="/mainpage" element={<MainPage />} />
          {/* <Route path="/settings" element={<Settings />} /> */}
          <Route path="*" element={<Dashboard />} />
          <Route path="/usersemail" element={<Usersemail />} />
          <Route path="/task" element={<InProgressTask />} />
          <Route path="/usersemail" element={<Usersemail />} />
          <Route path="/addtasks" element={<AddTasks />} />
          <Route path="/designteam" element={<DesignTeam />} />
          <Route path="/chats" element={<Chats />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
