import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import type { LoginLocationState } from "../types";

interface ProtectedRouteProps {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user } = useAuth();
  const location = useLocation();
  if (!user) {
    const state: LoginLocationState = { from: location.pathname };
    return <Navigate to="/login" replace state={state} />;
  }
  return <>{children}</>;
}
