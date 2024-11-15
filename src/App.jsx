import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import People from "./pages/People";
import Teams from "./pages/Teams";
// import Settings from "./pages/Settings";
import Usersemail from "./pages/Usersemail";
import InProgressTask from "./pages/InProgressTask";
import AddTasks from "./pages/AddTasks";
const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/people" element={<People />} />
          <Route path="*" element={<Dashboard />} /> {/* Default route */}
          <Route path="/usersemail" element={<Usersemail />} />
          <Route path="/task" element={<InProgressTask />} />
          <Route path="/usersemail" element={<Usersemail />} />
          <Route path="/addtasks" element={<AddTasks />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
