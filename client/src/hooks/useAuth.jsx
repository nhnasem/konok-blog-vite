import { useSelector } from "react-redux";
import { selectCurrentToken } from "../features/auth/authSlice";
import jwtDecode from "jwt-decode";
import { useEffect } from "react";

const useAuth = () => {
  const token = useSelector(selectCurrentToken);

  let isAdmin = false;

  if (token) {
    const decoded = jwtDecode(token);
    const { email, role } = decoded.UserInfo;

    if (role === "admin" || role === "Admin") {
      isAdmin = true;
    }

    return { email, role, isAdmin };
  }

  return { email: null, role: null, isAdmin: false };
};

export default useAuth;
