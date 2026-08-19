import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { getUserAuthData, UserRole } from "@/entities/User";
import { RoutePath } from "@/shared/config/routeConfig/routeConfig";

interface RequireAuthProps {
  children: JSX.Element;
  roles?: UserRole[];
}

const RequireAuth = ({ children, roles }: RequireAuthProps) => {
  const location = useLocation();
  const auth = useSelector(getUserAuthData);

  if (!auth) {
    return (
      <Navigate
        to={RoutePath.main}
        state={{ from: location.pathname }}
        replace
      />
    );
  }

  const userRoles = auth.roles ?? auth.role ?? [];

  if (roles && roles.length > 0) {
    const hasRole = roles.some((role) => userRoles.includes(role));
    if (!hasRole) {
      return (
        <Navigate
          to={RoutePath.forbidden}
          state={{ from: location.pathname }}
          replace
        />
      );
    }
  }

  return children;
};

export default RequireAuth;
