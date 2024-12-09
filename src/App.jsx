// import { Routes, Route, Navigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import Login from "./common/components/Auth";
// import Layout from "./common/components/Layout";
// import adminRoutes from "./admin/routes";
// import userRoutes from "./user/routes";
// import ProtectedRoute from "./common/components/ProtectedRoute";
// import RegistrationPage from "./common/components/Registration";

// const App = () => {
//   const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
//   const role = useSelector((state) => state.auth.role);

//   const defaultRoute = isAuthenticated
//     ? role === "TeamLead"
//       ? "/admin/dashboard" // Default route for admin
//       : "/user/home" // Default route for user
//     : "/login";

//   return (
//     <div className="App">
//       <Routes>
//         {/* Login Route */}
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<RegistrationPage />} />
//         {/* Admin Routes */}
//         <Route
//           path="/admin/*" 
//           element={
//             <ProtectedRoute roleRequired="TeamLead">
//               <Layout role={role} />
//             </ProtectedRoute>
//           }
//         >
//           {/* Redirect `/admin` to `/admin/dashboard` */}
//           <Route
//             index
//             element={<Navigate to="/admin/dashboard" replace />} // Redirect to /admin/dashboard
//           />
//           {adminRoutes.map((route, index) => (
//             <Route key={index} path={route.path} element={<route.component />}>
//               {route.children?.map((child, childIndex) => (
//                 <Route
//                   key={childIndex}
//                   path={child.path}
//                   element={<child.component />}
//                 />
//               ))}
//             </Route>
//           ))}
//         </Route>

//         {/* User Routes */}
//         <Route
//           path="/user/*"
//           element={
//             <ProtectedRoute roleRequired="Employee">
//               <Layout role={role} />
//             </ProtectedRoute>
//           }
//         >
//           {/* Redirect `/user` to `/user/home` */}
//           <Route index element={<Navigate to="/user/home" replace />} />
//           {userRoutes.map(({ path, component: Component }) => (
//             <Route key={path} path={path} element={<Component />} />
//           ))}
//         </Route>

//         {/* Default Route */}
//         <Route path="/" element={<Navigate to={defaultRoute} replace />} />
//       </Routes>
//     </div>
//   );
// };

// export default App;

import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Login from "./common/components/Auth";
import Layout from "./common/components/Layout";
import adminRoutes from "./admin/routes";
import userRoutes from "./user/routes";
import ProtectedRoute from "./common/components/ProtectedRoute";
import RegistrationPage from "./common/components/Registration";
import ForgetPasswordPage from "./common/components/ForgotPassword";
import ResetPasswordPage from "./common/components/ResetPassword";

const App = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const role = useSelector((state) => state.auth.role);

  const defaultRoute = isAuthenticated
    ? role === "TeamLead"
      ? "/admin/dashboard" // Default route for admin
      : "/user/home" // Default route for user
    : "/login";

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="App">
        <Routes>
          {/* Login Route */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/forgot-password" element={<ForgetPasswordPage />} />
          <Route path="/reset-password/:employeeId" element={<ResetPasswordPage />} />
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
              <Route key={index} path={route.path} element={<route.component />} />
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
    </DndProvider>
  );
};

export default App;


