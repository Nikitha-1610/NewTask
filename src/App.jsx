import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Login from "./common/components/Auth";
import Layout from "./common/components/Layout";
import adminRoutes from "./admin/routes";
import userRoutes from "./user/routes";
import ProtectedRoute from "./common/components/ProtectedRoute";

const App = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const role = useSelector((state) => state.auth.role);
  console.log("here is role", role);

  const defaultRoute = isAuthenticated
    ? role === "Employee"
      ? "/admin"
      : "/user"
    : "/login";

  return (
    <div className="App">
      <Routes>
        {/* Login Route */}
        <Route path="/login" element={<Login />} />

        {/* Admin Routes */}
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute roleRequired="Employee">
              {/* <Layout role="Employee" /> */}
              <Layout role={role} />
              
            </ProtectedRoute>
          }
        >
          {adminRoutes.map(({ path, component: Component }) => (
            <Route key={path} path={path} element={<Component />} />
          ))}
        </Route>

        {/* User Routes */}
        <Route
          path="/user/*"
          element={
            <ProtectedRoute roleRequired="user">
              <Layout role="user" />
            </ProtectedRoute>
          }
        >
          {userRoutes.map(({ path, component: Component }) => (
            <Route key={path} path={path} element={<Component />} />
          ))}
        </Route>

        {/* Default Route */}
        <Route path="/" element={<Navigate to={defaultRoute} replace />} />
      </Routes>
    </div>
  );
};

export default App;

