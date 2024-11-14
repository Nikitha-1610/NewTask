import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import People from "./pages/People";
import Teams from "./pages/Teams";
import Usersemail from './pages/Usersemail';
import AddTasks from "./pages/addTasks";  // Corrected import

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
          <Route path="/addtasks" element={<AddTasks />} /> {/* Corrected path */}
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
