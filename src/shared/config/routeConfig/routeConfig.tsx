import { useTheme } from "@/app/providers/ThemeProvider/lib/useTheme";
import { ArticleDetailsPageAsync } from "@/pages/ArticleDetailsPage/ui/ArticleDetailsPage/ArticleDetailsPage.async";
import { ArticleEditPage } from "@/pages/ArticleEditPage";
import { ArticlesPageAsync } from "@/pages/ArticlesPage/ui/ArticlesPage/ArticlesPage.async";
import { NotFoundPage } from "@/pages/NotFoundPage";
import { ProfilePage } from "@/pages/ProfilePage";
import { classNames } from "@/shared/lib/classNames/classNames";
import { lazy } from "react";
import { RouteProps } from "react-router-dom";

const MainPage = lazy(() => import("@/pages/MainPage/ui/MainPage"));
const AboutPage = lazy(() => import("@/pages/AboutPage/ui/AboutPage"));

// Компонент-обертка для страниц
const PageWrapper = ({ children }: { children: React.ReactNode }) => {
  const { theme } = useTheme(); // Получаем текущую тему

  return (
    <div className={classNames("page-wrapper", {}, [theme])}>{children}</div>
  );
};

export type AppRoutesProps = RouteProps & {
  authOnly?: boolean;
};

export enum AppRoutes {
  MAIN = "main",
  ABOUT = "about",
  PROFILE = "profile",
  ARTICLES = "articles",
  ARTICLES_DETAILS = "articles_details",
  ARTICLES_CREATE = "articles_create",
  ARTICLES_EDIT = "articles_edit",
  // Last
  NOT_FOUND = "not_found",
}

export const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.MAIN]: "/",
  [AppRoutes.ABOUT]: "/about",
  [AppRoutes.PROFILE]: "/profile/", // + id
  [AppRoutes.ARTICLES]: "/articles",
  [AppRoutes.ARTICLES_DETAILS]: "/articles/", // + id
  [AppRoutes.ARTICLES_CREATE]: "/articles/new",
  [AppRoutes.ARTICLES_EDIT]: "/articles/:id/edit",
  [AppRoutes.NOT_FOUND]: "*",
};

export const routeConfig: Record<AppRoutes, AppRoutesProps> = {
  [AppRoutes.MAIN]: {
    path: RoutePath[AppRoutes.MAIN],
    element: (
      <PageWrapper>
        <MainPage />
      </PageWrapper>
    ),
  },
  [AppRoutes.ABOUT]: {
    path: RoutePath[AppRoutes.ABOUT],
    element: (
      <PageWrapper>
        <AboutPage />
      </PageWrapper>
    ),
  },
  [AppRoutes.PROFILE]: {
    path: RoutePath[AppRoutes.PROFILE] + ":id",
    element: (
      <PageWrapper>
        <ProfilePage />
      </PageWrapper>
    ),
    authOnly: true,
  },
  [AppRoutes.ARTICLES]: {
    path: RoutePath[AppRoutes.ARTICLES],
    element: (
      <PageWrapper>
        <ArticlesPageAsync />
      </PageWrapper>
    ),
    authOnly: true,
  },
  [AppRoutes.ARTICLES_DETAILS]: {
    path: RoutePath[AppRoutes.ARTICLES_DETAILS] + ":id",
    element: (
      <PageWrapper>
        <ArticleDetailsPageAsync />
      </PageWrapper>
    ),
    authOnly: true,
  },
  [AppRoutes.ARTICLES_CREATE]: {
    path: RoutePath[AppRoutes.ARTICLES_CREATE],
    element: (
      <PageWrapper>
        <ArticleEditPage />
      </PageWrapper>
    ),
    authOnly: true,
  },
  [AppRoutes.ARTICLES_EDIT]: {
    path: RoutePath[AppRoutes.ARTICLES_EDIT],
    element: (
      <PageWrapper>
        <ArticleEditPage />
      </PageWrapper>
    ),
    authOnly: true,
  },
  [AppRoutes.NOT_FOUND]: {
    path: RoutePath[AppRoutes.NOT_FOUND],
    element: (
      <PageWrapper>
        <NotFoundPage />
      </PageWrapper>
    ),
  },
};
