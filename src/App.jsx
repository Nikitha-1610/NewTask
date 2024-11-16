import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import People from "./pages/People";
import Screen2 from "./pages/Screen2";
import Position from "./pages/Position"
import MainPage from "./pages/MainPage";

// import Settings from "./pages/Settings";

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/people" element={<People />} />
          <Route path="/screen2" element={<Screen2 />} />
          <Route path="/position" element={<Position />} />
          <Route path="/mainpage" element={<MainPage />} />
          {/* <Route path="/settings" element={<Settings />} /> */}
          <Route path="*" element={<Dashboard />} /> {/* Default route */}
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
