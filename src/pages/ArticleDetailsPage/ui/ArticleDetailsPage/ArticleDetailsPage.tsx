import { useTranslation } from "react-i18next";
import { memo, useCallback, useEffect } from "react";
import cls from "./ArticleDetailsPage.module.scss";
import { classNames } from "@/shared/lib/classNames/classNames";
import { ArticleDetails } from "@/entities/Article";
import { useParams } from "react-router-dom";
import { Text, TextSize } from "@/shared/ui/Text/Text";
import { CommentList } from "@/entities/Comment";
import DynamicModuleLoader, {
  ReducersList,
} from "@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import {
  articleDetailsCommentsReducer,
  getArticleComments,
} from "../../model/slices/articleDetailsCommentsSlice";
import { useSelector } from "react-redux";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch";
import { fetchCommentsByArticleId } from "../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId";
import { AddCommentForm } from "@/features/addCommentForm";
import { getArticleCommentsIsLoading } from "../../model/selectors/comments";
import {
  getArticleDetailsData,
  getArticleDetailsError,
  getArticleDetailsIsLoading,
} from "@/entities/Article/model/selectors/articleDetails";
import Button, { ThemeButton } from "@/shared/ui/Button/Button";
import { Page } from "@/widgets/Page/Page";
import { useLanguage } from "@/shared/lib/hooks/useLanguage/useLanguage";
import {
  articleDetailsPageRecommendationsReducer,
  getArticleRecommendations,
} from "../../model/slices/articleDetailsPageRecommendationsSlice";
import { getArticleRecommendationsIsLoading } from "../../model/selectors/recommendActions";
import { ArticleList } from "@/entities/Article/ui/ArticleList/ArticleList";
import { fetchArticleRecommendations } from "../../model/services/fetchArticleRecommendations/fetchArticleRecommendations";
import { articleDetailsPageReducer } from "../../model/slices";
import ArticleDetailsPageHeader from "../ArticleDetailsPageHeader/ArticleDetailsPageHeader";

interface ArticleDetailsPageProps {
  className?: string;
}

const reducers: ReducersList = {
  articleDetailsPage: articleDetailsPageReducer,
};

const ArticleDetailsPage = (props: ArticleDetailsPageProps) => {
  const { className } = props;
  const { t } = useTranslation("article");
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  const comments = useSelector(getArticleComments.selectAll);
  const recommendations = useSelector(getArticleRecommendations.selectAll);
  const commentsIsLoading = useSelector(getArticleCommentsIsLoading);
  const recommendationsIsLoading = useSelector(
    getArticleRecommendationsIsLoading,
  );
  const article = useSelector(getArticleDetailsData);
  const articleError = useSelector(getArticleDetailsError);
  const articleIsLoading = useSelector(getArticleDetailsIsLoading);
  const { currentLang } = useLanguage();

  useEffect(() => {
    if (id) {
      dispatch(fetchCommentsByArticleId(id));
      dispatch(fetchArticleRecommendations());
    }
  }, [dispatch, id]);

  

  const onSendComment = useCallback(
    (text: string) => {
      if (id) {
        dispatch(fetchCommentsByArticleId(id));
      }
    },
    [dispatch, id],
  );

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
            <Text
              size={TextSize.L}
              text={t("Рекомендации")}
              className={cls.commentTitle}
            />
            <ArticleList
              articles={recommendations}
              isLoading={recommendationsIsLoading}
              className={cls.recommend}
              target="_blank"
            />
            <AddCommentForm
              className={cls.commentTitle}
              onSendComment={onSendComment}
            />
            <Text
              size={TextSize.L}
              text={t("Коментарии")}
              className={cls.commentTitle}
            />
            <CommentList isLoading={commentsIsLoading} comments={comments} />
          </>
        )}
      </Page>
    </DynamicModuleLoader>
  );
};

export default memo(ArticleDetailsPage);
