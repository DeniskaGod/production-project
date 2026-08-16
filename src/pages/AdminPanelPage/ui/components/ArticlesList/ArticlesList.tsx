import React, { memo } from "react";
import cls from "../AdminPanelPage.module.scss";
import { useTranslation } from "react-i18next";

interface AdminArticle {
  id: string;
  title: string;
  author: string;
  status: "published" | "draft" | "archived";
  views: number;
  createdAt: string;
}

interface ArticlesListProps {
  articles: AdminArticle[];
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
}

const getStatusStyle = (status: "published" | "draft" | "archived"): string => {
  switch (status) {
    case "published":
      return cls.published;
    case "draft":
      return cls.draft;
    case "archived":
      return cls.archived;
    default:
      return "";
  }
};

const ArticlesList = memo(
  ({ articles, onDelete, onEdit }: ArticlesListProps) => {
    const getStatusLabel = (
      status: "published" | "draft" | "archived",
    ): string => {
      const labels = {
        published: "Published",
        draft: "Draft",
        archived: "Archived",
      };
      return labels[status];
    };

    const { t } = useTranslation();

    return (
      <>
        {articles.length > 0 ? (
          <table className={cls.userTable}>
            <thead>
              <tr>
                <th>{t("Title")}</th>
                <th>{t("Author")}</th>
                <th>{t("Status")}</th>
                <th>{t("Views")}</th>
                <th>{t("Created Date")}</th>
                <th>{t("Actions")}</th>
              </tr>
            </thead>
            <tbody>
              {articles.map((article) => (
                <tr key={article.id}>
                  <td>
                    <strong>{article.title}</strong>
                  </td>
                  <td>{article.author}</td>
                  <td>
                    <span
                      className={`${cls.roleTag} ${getStatusStyle(article.status)}`}
                    >
                      {getStatusLabel(article.status)}
                    </span>
                  </td>
                  <td>{article.views}</td>
                  <td>{article.createdAt}</td>
                  <td>
                    <div className={cls.actionButtons}>
                      <button
                        className={cls.edit}
                        onClick={() => onEdit(article.id)}
                      >
                        {t("Edit")}
                      </button>
                      <button
                        className={cls.delete}
                        onClick={() => onDelete(article.id)}
                      >
                        {t("Delete")}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className={cls.emptyState}>
            <p>{t("No articles found")}</p>
          </div>
        )}
      </>
    );
  },
);

ArticlesList.displayName = "ArticlesList";

export default ArticlesList;
