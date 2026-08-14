import { useTranslation } from "react-i18next";
import { memo } from "react";
import { useParams } from "react-router-dom";
import cls from "./ArticleEditPage.module.scss";
import { classNames } from "@/shared/lib/classNames/classNames";
import { Page } from "@/widgets/Page/Page";

interface ArticleEditPageProps {
  className?: string;
}

const ArticleEditPage = memo((props: ArticleEditPageProps) => {
  const { className } = props;
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const isEdit = Boolean(id);

  return (
    <Page
      className={classNames(
        cls.ArticleEditPage,
        {},
        className ? [className] : [],
      )}
    >
      {isEdit
        ? t("Редактирование статьи с ID = ") + id
        : t("Создание новой статьи")}
    </Page>
  );
});

ArticleEditPage.displayName = "ArticleEditPage";

export default ArticleEditPage;
