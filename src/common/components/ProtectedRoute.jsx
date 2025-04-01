import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ roleRequired, children }) => {
  const { isAuthenticated, role } = useSelector((state) => state.auth);

  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  
  if (roleRequired && !["TeamLead", "Manager", "CEO"].includes(role)) {
    return <Navigate to="/login" replace />;
  }

 
  return children || <Outlet />;
};

export default ProtectedRoute;


