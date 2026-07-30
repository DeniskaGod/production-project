import { useTranslation } from "react-i18next";
import { memo, useCallback, useEffect } from "react";
import cls from "./ArticlesPage.module.scss";
import { classNames } from "@/shared/lib/classNames/classNames";
import { ArticleList } from "@/entities/Article/ui/ArticleList/ArticleList";
import { ArticleView } from "@/entities/Article/model/types/article";
import DynamicModuleLoader, {
  ReducersList,
} from "@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import {
  articlesPageActions,
  articlesPageReducer,
  getArticles,
} from "../../model/slices/articlesPageSlice";
import { useSelector } from "react-redux";
import {
  getArticlesPageError,
  getArticlesPageHasMore,
  getArticlesPageIsLoading,
  getArticlesPageNum,
  getArticlesPageView,
} from "../../model/selectors/articlesPageSelectors";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch";
import { fetchArticlesList } from "../../model/services/fetchArticlesList/fetchArticlesList";
import { ArticleViewSelector } from "@/entities/Article";
import { Page } from "@/shared/ui/Page/Page";

interface ArticlesPageProps {
  className?: string;
}

const reducers: ReducersList = {
  articlesPage: articlesPageReducer,
};

const ArticlesPage = (props: ArticlesPageProps) => {
  const { className } = props;
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const articles = useSelector(getArticles.selectAll);
  const isLoading = useSelector(getArticlesPageIsLoading);
  const error = useSelector(getArticlesPageError);
  const view = useSelector(getArticlesPageView);
  const page = useSelector(getArticlesPageNum);
  const hasMore = useSelector(getArticlesPageHasMore);

  const onLoadNextPart = useCallback(() => {
  // ✅ проверяем hasMore и isLoading
  if (hasMore && !isLoading) {
    const nextPage = page + 1;
    dispatch(articlesPageActions.setPage(nextPage));
    dispatch(fetchArticlesList({ page: nextPage }));
  }
}, [dispatch, page, hasMore, isLoading]);

  useEffect(() => {
    dispatch(articlesPageActions.initState());
    dispatch(
      fetchArticlesList({
        page: 1,
      }),
    );
  }, [dispatch]);

  const onViewClick = useCallback(
    (newView: ArticleView) => {
      dispatch(articlesPageActions.setView(newView));
    },
    [dispatch],
  );

  return (
    <DynamicModuleLoader reducers={reducers}>
      <Page
        onScrollEnd={onLoadNextPart}
        className={classNames(
          cls.ArticlesPage,
          {},
          className ? [className] : [],
        )}
      >
        <ArticleViewSelector view={view} onViewClick={onViewClick} />
        <ArticleList view={view} isLoading={isLoading} articles={articles} />
      </Page>
    </DynamicModuleLoader>
  );
};

export default memo(ArticlesPage);
