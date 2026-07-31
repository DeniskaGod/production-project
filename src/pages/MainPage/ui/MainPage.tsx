import { Page } from "@/widgets/Page/Page";
import { memo } from "react";
import { useTranslation } from "react-i18next";

export const MainPage = memo(() => {
  const { t } = useTranslation("main");
  return (
    <Page>
      {t("Главная страница")}
    </Page>
  );
});

export default MainPage;
MainPage.displayName = "MainPage";
