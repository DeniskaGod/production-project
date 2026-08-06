import { classNames } from "@/shared/lib/classNames/classNames";
import React, { useCallback } from "react";
import cls from "./ArticleDetailsPageHeader.module.scss";
import Button, { ThemeButton } from "@/shared/ui/Button/Button";
import { useTranslation } from "react-i18next";
import { getUserAuthData } from "@/entities/User";
import { useSelector } from "react-redux";
import { getArticleDetailsData } from "@/entities/Article/model/selectors/articleDetails";
import { getCanEditArticle } from "../../model/selectors/article";
import { useNavigate } from "react-router-dom";
import { RoutePath } from "@/shared/config/routeConfig/routeConfig";

interface ArticleDetailsPageHeaderProps {
  className?: string;
}

export default function ArticleDetailsPageHeader({
  className,
}: ArticleDetailsPageHeaderProps) {
  const { t } = useTranslation("article");
  const userData = useSelector(getUserAuthData);
  const article = useSelector(getArticleDetailsData);
  const canEdit = useSelector(getCanEditArticle);
  const navigate = useNavigate();
  const onBackToList = useCallback(() => {
    window.history.back();
  }, []);

  const onEditArticle = useCallback(() => {
    navigate(RoutePath.articles_details + article?.id + "/edit");
  }, [navigate, article?.id]);
  return (
    <div
      className={classNames(
        cls.ArticleDetailsPageHeader,
        {},
        className ? [className] : [],
      )}
    >
      <Button theme={ThemeButton.OUTLINE} onClick={onBackToList}>
        {t("Назад к списку")}
      </Button>
      {canEdit && (
        <Button
          className={cls.editButton}
          theme={ThemeButton.OUTLINE}
          onClick={onEditArticle}
        >
          {t("Редактировать")}
        </Button>
      )}
    </div>
  );
}
