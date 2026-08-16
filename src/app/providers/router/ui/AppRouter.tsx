import React, { memo, Suspense, useCallback } from "react";
import { Route, Routes } from "react-router-dom";
import RequireAuth from "./RequireAuth";
import { PageLoader } from "@/shared/ui/Pageloader";
import {
  AppRoutesProps,
  routeConfig,
} from "@/shared/config/routeConfig/routeConfig";

const AppRouter = () => {
  const renderWithWrapper = useCallback((route: AppRoutesProps) => {
    const element = (
      <Suspense fallback={<PageLoader />}>{route.element}</Suspense>
    );
    const wrappedElement = route.authOnly ? (
      <RequireAuth roles={route.roles}>{element}</RequireAuth>
    ) : (
      element
    );

    return (
      <Route
        key={route.path}
        path={route.path}
        element={wrappedElement}
      />
    );
  }, []);

  return <Routes>{Object.values(routeConfig).map(renderWithWrapper)}</Routes>;
};

export default memo(AppRouter);
