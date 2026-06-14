import React, { Suspense } from "react";
import "./styles/index.scss";
import { classNames } from "@/shared/lib/classNames/classNames";
import { useTheme } from "./providers/ThemeProvider";
import { Navbar } from "@/widgets/Navbar";
import { Sidebar } from "@/widgets/Sidebar";
import { AppRouter } from "./providers/router";
import { t } from "i18next";
import { useTranslation } from "react-i18next";

export default function App() {
  const { theme } = useTheme();
  const { t } = useTranslation();

  return (
    <div className={classNames("app", {}, [theme])}>
      <Suspense fallback={<div>{t("Loading...")}</div>}>
        <Navbar />
        <div className="content-page">
          <Sidebar />
          <AppRouter />
        </div>
      </Suspense>
    </div>
  );
}
