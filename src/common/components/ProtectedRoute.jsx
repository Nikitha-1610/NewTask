import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ roleRequired, children }) => {
  const { isAuthenticated, role } = useSelector((state) => state.auth);

  console.log("isAuthenticated:", isAuthenticated); 
  console.log("role:", role); 

  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  
  if (roleRequired && role !== roleRequired) {
    return <Navigate to="/" replace />;
  }

 
  return children || <Outlet />;
};

export default ProtectedRoute;


