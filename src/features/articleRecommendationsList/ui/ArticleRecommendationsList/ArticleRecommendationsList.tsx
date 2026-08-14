import { useTranslation } from "react-i18next";
import { memo } from "react";
import { useArticleRecommendationsList } from "../../api/aritcleRecommendationsApi";
import { VStack } from "@/shared/ui/Stack";
import { classNames } from "@/shared/lib/classNames/classNames";
import { Text, TextSize } from "@/shared/ui/Text/Text";
import { ArticleList } from "@/entities/Article/ui/ArticleList/ArticleList";
import { useSelector } from "react-redux";
import { getArticleDetailsData } from "@/entities/Article/model/selectors/articleDetails";
import { Article } from "@/entities/Article"; // ✅ импорт типа

interface ArticleRecommendationsListProps {
  className?: string;
}

export const ArticleRecommendationsList = memo(
  (props: ArticleRecommendationsListProps) => {
    const { className } = props;
    const { t } = useTranslation();
    const article = useSelector(getArticleDetailsData);

    const {
      isLoading,
      data: articles,
      error,
    } = useArticleRecommendationsList(4);

    if (isLoading || error || !articles) {
      return null;
    }

    const filteredArticles = articles.filter(
      (recommended: Article) => recommended.id !== article?.id,
    );

    if (filteredArticles.length === 0) {
      return null;
    }

    return (
      <VStack gap="8" className={classNames("", {}, [className])}>
        <Text size={TextSize.L} title={t("Рекомендуем")} />
        <ArticleList articles={filteredArticles} target="_blank" />
      </VStack>
    );
  },
);

ArticleRecommendationsList.displayName = "ArticleRecommendationsList";