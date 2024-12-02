import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

// const ProtectedRoute = ({ roleRequired }) => {
//   const { isAuthenticated, role } = useSelector((state) => state.auth);
//   if (!isAuthenticated) {
//     return <Navigate to="/login" replace />;
//   }

//   if (roleRequired && role !== roleRequired) {
//     return <Navigate to="/" replace />;
//   }

//   return <Outlet />;
// };

// export default ProtectedRoute;


// const ProtectedRoute = ({ roleRequired}) => {
//   const { isAuthenticated, role } = useSelector((state) => state.auth);

//   console.log("isAuthenticated:", isAuthenticated); // Check if the user is authenticated
//   console.log("role:", role); // Check the current role

//   if (!isAuthenticated) {
//     return <Navigate to="/login" replace />;
//   }

//   if (roleRequired && role !== roleRequired) {
//     return <Navigate to="/" replace />;
//   }

//   return <Outlet />;
// };

// export default ProtectedRoute;

const ProtectedRoute = ({ roleRequired, children }) => {
  const { isAuthenticated, role } = useSelector((state) => state.auth);

  console.log("isAuthenticated:", isAuthenticated); // Check if the user is authenticated
  console.log("role:", role); // Check the current role

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (roleRequired && role !== roleRequired) {
    return <Navigate to="/" replace />;
  }

  // Render the protected children
  return children;
};

export default ProtectedRoute;
