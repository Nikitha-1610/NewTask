import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import People from "./pages/People";
import Teams from "./pages/Teams";
import Screen2 from "./pages/Screen2";

import Position from "./pages/Position";

import Position from "./pages/Position"
import MainPage from "./pages/MainPage";


// import Settings from "./pages/Settings";
import Usersemail from "./pages/Usersemail";
import InProgressTask from "./pages/InProgressTask";
import AddTasks from "./pages/AddTasks";
import DesignTeam from "./pages/DesignTeam";
import Chats from "./pages/Chats";
const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/people" element={<People />} />
          <Route path="/screen2" element={<Screen2 />} />
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
