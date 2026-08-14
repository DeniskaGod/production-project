import { useTranslation } from "react-i18next";
import { memo } from "react";
import cls from "./ArticleDetailsPage.module.scss";
import { classNames } from "@/shared/lib/classNames/classNames";
import { ArticleDetails } from "@/entities/Article";
import { useParams } from "react-router-dom";
import DynamicModuleLoader, {
  ReducersList,
} from "@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { useSelector } from "react-redux";
import {
  getArticleDetailsData,
  getArticleDetailsError,
  getArticleDetailsIsLoading,
} from "@/entities/Article/model/selectors/articleDetails";
import { Page } from "@/widgets/Page/Page";
import { useLanguage } from "@/shared/lib/hooks/useLanguage/useLanguage";
import { articleDetailsPageReducer } from "../../model/slices";
import ArticleDetailsPageHeader from "../ArticleDetailsPageHeader/ArticleDetailsPageHeader";
import { ArticleRecommendationsList } from "@/features/articleRecommendationsList";
import { ArticleDetailsComments } from "../ArticleDetailsComments/ArticleDetailsComments";

interface ArticleDetailsPageProps {
  className?: string;
}

const reducers: ReducersList = {
  articleDetailsPage: articleDetailsPageReducer,
};

const ArticleDetailsPage = (props: ArticleDetailsPageProps) => {
  const { className } = props;
  const { t } = useTranslation("article");
  const { id } = useParams<{ id: string }>();
  const article = useSelector(getArticleDetailsData);
  const articleError = useSelector(getArticleDetailsError);
  const articleIsLoading = useSelector(getArticleDetailsIsLoading);
  const { currentLang } = useLanguage();

  if (!id) {
    return (
      <Page
        className={classNames(
          cls.ArticleDetailsPage,
          {},
          className ? [className] : [],
        )}
      >
        {t("ARTICLE_NOT_FOUND")}
      </Page>
    );
  }

  const showComments = article && !articleError && !articleIsLoading;

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
      <Page
        className={classNames(
          cls.ArticleDetailsPage,
          {},
          className ? [className] : [],
        )}
      >
        <ArticleDetailsPageHeader />
        <ArticleDetails id={id} currentLang={currentLang} />

        {showComments && (
          <>
            <ArticleRecommendationsList />
            <ArticleDetailsComments id={id} />
          </>
        )}
      </Page>
    </DynamicModuleLoader>
  );
};

export default memo(ArticleDetailsPage);
