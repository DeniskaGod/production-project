import { useTranslation } from "react-i18next";
import { HTMLAttributeAnchorTarget, memo, useCallback } from "react";
import EyeIcon from "@/shared/assets/icons/eye.svg";
import { useNavigate } from "react-router-dom";
import cls from "./ArticleListItem.module.scss";
import {
  Article,
  ArticleBlockType,
  ArticleTextBlock,
  ArticleView,
} from "../../model/types/article";
import { ArticleTextBlockComponent } from "../ArticleTextBlockComponent/ArticleTextBlockComponent";
import { RoutePath } from "@/shared/config/routeConfig/routeConfig";
import { Text } from "@/shared/ui/Text/Text";
import { Icon } from "@/shared/ui/Icon/Icon";
import { classNames } from "@/shared/lib/classNames/classNames";
import Avatar from "@/shared/ui/Avatar/Avatar";
import Button, { ThemeButton } from "@/shared/ui/Button/Button";
import { Card } from "@/shared/ui/Card/Card";
import { useLanguage } from "@/shared/lib/hooks/useLanguage/useLanguage";
import { AppLink } from "@/shared/ui/AppLink/AppLink";

interface ArticleListItemProps {
  className?: string;
  article: Article;
  view: ArticleView;
  target?: HTMLAttributeAnchorTarget;
}

export const ArticleListItem = memo((props: ArticleListItemProps) => {
  const { className, article, view, target } = props;
  const { t } = useTranslation();
  const { currentLang } = useLanguage();

  const title = article.title?.[currentLang as keyof typeof article.title] || article.title?.ru || "";
  const subtitle =
    article.subtitle?.[currentLang as keyof typeof article.subtitle] || article.subtitle?.ru || "";

  const types = <Text text={article.type.join(", ")} className={cls.types} />;
  const views = (
    <>
      <Text text={String(article.views)} className={cls.views} />
      <Icon Svg={EyeIcon} />
    </>
  );

  if (view === ArticleView.BIG) {
    const textBlock = article.blocks.find(
      (block) => block.type === ArticleBlockType.TEXT,
    ) as ArticleTextBlock;

    return (
      <div
        className={classNames(
          cls.ArticleListItem,
          {},
          className ? [className, cls[view]] : [],
        )}
      >
        <Card className={cls.card}>
          <div className={cls.header}>
            <Avatar size={30} src={article.user.avatar} />
            <Text text={article.user.username} className={cls.username} />
            <Text text={article.createdAt} className={cls.date} />
          </div>
          <Text title={title} className={cls.title} />
          {types}
          <img src={article.img} className={cls.img} alt={title} />
          {textBlock && (
            <ArticleTextBlockComponent
              block={textBlock}
              className={cls.textBlock}
            />
          )}
          <div className={cls.footer}>
            <AppLink to={RoutePath.articles_details + article.id} target={target}>
              <Button theme={ThemeButton.OUTLINE}>
                {t("Читать далее...")}
              </Button>
            </AppLink>
            {views}
          </div>
        </Card>
      </div>
    );
  }

  return (
    <AppLink
      to={RoutePath.articles_details + article.id}
      target={target}
      className={classNames(
        cls.ArticleListItem,
        {},
        className ? [className, cls[view]] : [],
      )}
    >
      <Card className={cls.card}>
        <div className={cls.imageWrapper}>
          <img alt={title} src={article.img} className={cls.img} />
          <Text text={article.createdAt} className={cls.date} />
        </div>
        <div className={cls.infoWrapper}>
          {types}
          {views}
        </div>
        <Text text={title} className={cls.title} />
      </Card>
    </AppLink>
  );
});

ArticleListItem.displayName = "ArticleListItem";
