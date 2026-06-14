import { lazy } from 'react';
import { RouteProps } from 'react-router-dom';

const MainPage = lazy(() => import('@/pages/MainPage/ui/MainPage'));
const AboutPage = lazy(() => import('@/pages/AboutPage/ui/AboutPage'));

// Компонент-обертка для страниц
const PageWrapper = ({ children }: { children: React.ReactNode }) => (
  <div className="page-wrapper">
    {children}
  </div>
);

export enum AppRoutes {
    MAIN = 'main',
    ABOUT = 'about',
}

export const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.MAIN]: '/',
  [AppRoutes.ABOUT]: '/about',
};

export const routeConfig: Record<AppRoutes, RouteProps> = {
  [AppRoutes.MAIN]: {
    path: RoutePath[AppRoutes.MAIN],
    element: <PageWrapper><MainPage /></PageWrapper>,
  },
  [AppRoutes.ABOUT]: {
    path: RoutePath[AppRoutes.ABOUT],
    element: <PageWrapper><AboutPage /></PageWrapper>,
  },
};
