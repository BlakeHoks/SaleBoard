import { useAuth } from "../../../hooks/useAuth.js";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const RequireAuth = ({ children }) => {
  const { isAuth } = useAuth();
  const nav = useNavigate();

  if (isAuth) return children;
  else
    useEffect(() => {
      nav("/auth", { replace: true });
    });
};
