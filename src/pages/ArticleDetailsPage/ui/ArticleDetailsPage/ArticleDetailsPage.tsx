import { useTranslation } from "react-i18next";
import { memo, useCallback, useEffect } from "react";
import cls from "./ArticleDetailsPage.module.scss";
import { classNames } from "@/shared/lib/classNames/classNames";
import { ArticleDetails } from "@/entities/Article";
import { useParams } from "react-router-dom";
import { Text } from "@/shared/ui/Text/Text";
import { CommentList } from "@/entities/Comment";
import DynamicModuleLoader, {
  ReducersList,
} from "@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import {
  articleDetailsCommentsReducer,
  getArticleComments,
} from "../../model/slices/articleDetailsCommentsSlice";
import { useSelector } from "react-redux";
import { getArticleCommentsIsLoading } from "../../model/selectors/comments";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch";
import { fetchCommentsByArticleId } from "../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId";
import { AddCommentForm } from "@/features/addCommentForm";

interface ArticleDetailsPageProps {
  className?: string;
}

const reducers: ReducersList = {
  articleDetailsComments: articleDetailsCommentsReducer,
};

const ArticleDetailsPage = (props: ArticleDetailsPageProps) => {
  const { className } = props;
  const { t } = useTranslation("article");
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  const comments = useSelector(getArticleComments.selectAll);
  const commentsIsLoading = useSelector(getArticleCommentsIsLoading);

  useEffect(() => {
    if (id) {
      dispatch(fetchCommentsByArticleId(id));
    }
  }, [dispatch, id]);

  const onSendComment = useCallback(
    (text: string) => {
      // ✅ Обновляем список комментариев после отправки
      if (id) {
        dispatch(fetchCommentsByArticleId(id));
      }
    },
    [dispatch, id],
  );

  if (!id) {
    return (
      <div
        className={classNames(
          cls.ArticleDetailsPage,
          {},
          className ? [className] : [],
        )}
      >
        {t("ARTICLE_NOT_FOUND")}
      </div>
    );
  }
  

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
      <div
        className={classNames(
          cls.ArticleDetailsPage,
          {},
          className ? [className] : [],
        )}
      >
        <ArticleDetails id={id} />
        <AddCommentForm
          className={cls.commentTitle}
          onSendComment={onSendComment}
        />
        <Text text={t("Коментарии")} className={cls.commentTitle} />
        <CommentList isLoading={commentsIsLoading} comments={comments} />
      </div>
    </DynamicModuleLoader>
  );
};
export default memo(ArticleDetailsPage);
