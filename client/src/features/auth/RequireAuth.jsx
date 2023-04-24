import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const RequireAuth = () => {
  const location = useLocation();
  const { isAdmin } = useAuth();

  let content;

  if (isAdmin) {
    content = <Outlet />;
  } else {
    <Navigate to="/login" state={{ from: location }} replace />;
  }

  return content;
};

export default RequireAuth;
