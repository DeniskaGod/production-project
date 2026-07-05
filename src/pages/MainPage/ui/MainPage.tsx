import { memo } from "react";
import { useTranslation } from "react-i18next";

export const MainPage = memo(() => {
  const { t } = useTranslation("main");
  return (
    <div>
      {t("Главная страница")}
    </div>
  );
});

export default MainPage;
MainPage.displayName = "MainPage";
