import { getArticleDetailsData } from "@/entities/Article/model/selectors/articleDetails";
import { getUserAuthData } from "@/entities/User";
import { createSelector } from "@reduxjs/toolkit";

export const getCanEditArticle = createSelector(
  getArticleDetailsData,
  getUserAuthData,
  (article, user) => {
    if (!article || !user) {
      return false;
    }

    return article.user.id === user.id;
  },
);
