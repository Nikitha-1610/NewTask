import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Login from "./common/components/Auth";
import Layout from "./common/components/Layout";
import adminRoutes from "./admin/routes";
import userRoutes from "./user/routes";
import ProtectedRoute from "./common/components/ProtectedRoute";
import RegistrationPage from "./common/components/Registration";

const App = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const role = useSelector((state) => state.auth.role);
  console.log("here is role", role);

  const defaultRoute = isAuthenticated
    ? role === "TeamLead"
      ? "/admin/dashboard" // Default route for admin
      : "/user/home" // Default route for user
    : "/login";

  return (
    <div className="App">
      <Routes>
        {/* Login Route */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegistrationPage />} />
        {/* Admin Routes */}
        <Route
          path="/admin/*" 
          element={
            <ProtectedRoute roleRequired="TeamLead">
              <Layout role={role} />
            </ProtectedRoute>
          }
        >
          {/* Redirect `/admin` to `/admin/dashboard` */}
          <Route
            index
            element={<Navigate to="/admin/dashboard" replace />} // Redirect to /admin/dashboard
          />
          {adminRoutes.map((route, index) => (
            <Route key={index} path={route.path} element={<route.component />}>
              {route.children?.map((child, childIndex) => (
                <Route
                  key={childIndex}
                  path={child.path}
                  element={<child.component />}
                />
              ))}
            </Route>
          ))}
        </Route>

        {/* User Routes */}
        <Route
          path="/user/*"
          element={
            <ProtectedRoute roleRequired="Employee">
              <Layout role={role} />
            </ProtectedRoute>
          }
        >
          {/* Redirect `/user` to `/user/home` */}
          <Route index element={<Navigate to="/user/home" replace />} />
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

