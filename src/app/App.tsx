import { Suspense, useEffect } from "react";
import { classNames } from "@/shared/lib/classNames/classNames";
import { useTheme } from "./providers/ThemeProvider";
import { Navbar } from "@/widgets/Navbar";
import { Sidebar } from "@/widgets/Sidebar";
import { AppRouter } from "./providers/router";
import { useDispatch, useSelector } from "react-redux";
import { getUserInited, userActions } from "@/entities/User";
import { useTranslation } from "react-i18next";

export default function App() {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const inited = useSelector(getUserInited)
  useEffect(() => {
    dispatch(userActions.initAuthData());
  }, [dispatch]);

  return (
    <div className={classNames("app", {}, [theme])}>
      <Suspense fallback={<div>{t("Loading...")}</div>}>
        <Navbar />
        <div className="content-page">
          <Sidebar />
          {inited && <AppRouter />}
        </div>
      </Suspense>
    </div>
  );
}
