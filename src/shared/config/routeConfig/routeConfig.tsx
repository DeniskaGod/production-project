import { useTheme } from '@/app/providers/ThemeProvider/lib/useTheme';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { ProfilePage } from '@/pages/ProfilePage';
import { classNames } from '@/shared/lib/classNames/classNames';
import { lazy } from 'react';
import { RouteProps } from 'react-router-dom';

const MainPage = lazy(() => import('@/pages/MainPage/ui/MainPage'));
const AboutPage = lazy(() => import('@/pages/AboutPage/ui/AboutPage'));

// Компонент-обертка для страниц
const PageWrapper = ({ children }: { children: React.ReactNode }) => {
  const { theme } = useTheme(); // Получаем текущую тему
  
  return (
    <div className={classNames('page-wrapper', {}, [theme])}>
      {children}
    </div>
  );
};

export type AppRoutesProps = RouteProps & {
  authOnly?: boolean;
}

export enum AppRoutes {
    MAIN = 'main',
    ABOUT = 'about',
    NOT_FOUND = 'not_found',
    PROFILE = 'profile'
}

export const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.MAIN]: '/',
  [AppRoutes.ABOUT]: '/about',
  [AppRoutes.PROFILE]: '/profile',
  [AppRoutes.NOT_FOUND]: '*',
};

export const routeConfig: Record<AppRoutes, AppRoutesProps> = {
  [AppRoutes.MAIN]: {
    path: RoutePath[AppRoutes.MAIN],
    element: <PageWrapper><MainPage /></PageWrapper>,
  },
  [AppRoutes.ABOUT]: {
    path: RoutePath[AppRoutes.ABOUT],
    element: <PageWrapper><AboutPage /></PageWrapper>,
  },
  [AppRoutes.PROFILE]: {
    path: RoutePath[AppRoutes.PROFILE],
    element: <PageWrapper><ProfilePage /></PageWrapper>,
    authOnly: true
  },
  [AppRoutes.NOT_FOUND]: {
    path: RoutePath[AppRoutes.NOT_FOUND],
    element: <PageWrapper><NotFoundPage /></PageWrapper>,
  },
};
