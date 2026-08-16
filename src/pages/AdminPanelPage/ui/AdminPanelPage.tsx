import { Page } from "@/widgets/Page/Page";
import React, { memo, useEffect, useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import cls from "./AdminPanelPage.module.scss";
import { VStack } from "@/shared/ui/Stack";
import {
  selectFilteredAdminUsers,
  selectAdminSearchQuery,
  adminPanelActions,
} from "../model";
import type { AppDispatch } from "@/app/providers/StoreProvider";
import { $api } from "@/shared/api/api";

interface UserData {
  id: string;
  username: string;
  email?: string;
  role: string[];
  avatar?: string;
  articles?: number;
  createdAt?: string;
}

interface ArticleData {
  id: string;
  title: string | { ru: string; en: string };
  author: string;
  status: "published" | "draft" | "archived";
  views: number;
  createdAt: string;
  userId: string;
}

const AdminPanelPage = memo(() => {
  const { t, i18n } = useTranslation("admin");
  const dispatch = useDispatch<AppDispatch>();
  const filteredUsers = useSelector(selectFilteredAdminUsers);
  const searchQuery = useSelector(selectAdminSearchQuery);
  const [activeTab, setActiveTab] = useState<"users" | "articles">("users");
  const [articles, setArticles] = useState<ArticleData[]>([]);
  const [articleSearch, setArticleSearch] = useState("");

  useEffect(() => {
    // Load users and articles from db.json
    const loadData = async () => {
      try {
        // Load users
        const usersRes = await $api.get("/users");
        const users = usersRes.data.map((user: UserData) => ({
          ...user,
          email: user.email || `${user.username}@example.com`,
          articles: 0,
          createdAt: user.createdAt || new Date().toISOString().split("T")[0],
          roles: user.role,
        }));
        dispatch(adminPanelActions.setUsers(users));

        // Load articles
        const articlesRes = await $api.get("/articles");
        const transformedArticles = articlesRes.data.map(
          (article: Record<string, unknown>) => ({
            id: article.id,
            title:
              typeof article.title === "string"
                ? (article.title as string)
                : (article.title as { ru: string; en: string })?.[
                    i18n.language as keyof typeof article.title
                  ] || (article.title as { ru: string; en: string }).ru,
            author: article.userId,
            status:
              (article.type as unknown[])?.includes("ARCHIVED") ||
              article.status === "archived"
                ? "archived"
                : (article.type as unknown[])?.includes("DRAFT") ||
                    article.status === "draft"
                  ? "draft"
                  : ("published" as const),
            views: (article.views as number) || 0,
            createdAt: article.createdAt,
            userId: article.userId,
          }),
        );
        setArticles(transformedArticles);
      } catch (error) {
        dispatch(adminPanelActions.setError("Failed to load data"));
      }
    };

    loadData();
  }, [dispatch, i18n.language]);

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(adminPanelActions.setSearchQuery(e.target.value));
    },
    [dispatch],
  );

  const handleDeleteUser = useCallback(
    (userId: string) => {
      $api.delete(`/users/${userId}`).catch(() => {
        dispatch(adminPanelActions.setError("Failed to delete user"));
      });
      dispatch(adminPanelActions.deleteUser(userId));
    },
    [dispatch],
  );

  const handleDeleteArticle = (articleId: string) => {
    $api.delete(`/articles/${articleId}`).catch(() => {
      // Error handled silently
    });
    setArticles((prev) => prev.filter((article) => article.id !== articleId));
  };

  const filteredArticles = articles.filter((article) => {
    const titleStr =
      typeof article.title === "string" ? article.title : article.title.ru;
    return (
      titleStr.toLowerCase().includes(articleSearch.toLowerCase()) ||
      article.author.toLowerCase().includes(articleSearch.toLowerCase())
    );
  });

  const statsData = [
    { label: "Всего пользователей", value: filteredUsers.length },
    {
      label: "Активных статей",
      value: articles.filter((a) => a.status === "published").length,
    },
    { label: "Всего статей", value: articles.length },
    {
      label: "Средний рейтинг",
      value: (
        articles.reduce((sum, a) => sum + a.views, 0) / articles.length || 0
      ).toFixed(1),
    },
  ];

  return (
    <Page className={cls.AdminPanelPage}>
      <VStack gap="32" max>
        {/* Header */}
        <div className={cls.header}>
          <h1 className={cls.title}>{t("Панель администратора")}</h1>
          <p className={cls.description}>
            {t("Управляйте пользователями, статьями и общей статистикой сайта")}
          </p>
        </div>

        {/* Statistics Section */}
        <div className={cls.statsSection}>
          <h2 className={cls.statsTitle}>{t("Статистика")}</h2>
          <div className={cls.statsGrid}>
            {statsData.map((stat, index) => (
              <div key={index} className={cls.statCard}>
                <div className={cls.statValue}>{stat.value}</div>
                <div className={cls.statLabel}>{t(stat.label)}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Users Management Section */}
        <div className={cls.manageSection}>
          <div className={cls.tabs}>
            <button
              className={`${cls.tabButton} ${activeTab === "users" ? cls.active : ""}`}
              onClick={() => setActiveTab("users")}
            >
              {t("Пользователи")} ({filteredUsers.length})
            </button>
            <button
              className={`${cls.tabButton} ${activeTab === "articles" ? cls.active : ""}`}
              onClick={() => setActiveTab("articles")}
            >
              {t("Статьи")} ({filteredArticles.length})
            </button>
          </div>

          {activeTab === "users" && (
            <>
              <h2 className={cls.sectionTitle}>
                {t("Управление пользователями")}
              </h2>

              {/* Action Bar */}
              <div className={cls.actionBar}>
                <input
                  type="text"
                  className={cls.filterInput}
                  placeholder={t("Поиск по имени или email...")}
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
                <button className={cls.addButton}>
                  {t("+ Добавить пользователя")}
                </button>
              </div>

              {/* Users Table */}
              {filteredUsers.length > 0 ? (
                <table className={cls.userTable}>
                  <thead>
                    <tr>
                      <th>{t("Имя пользователя")}</th>
                      <th>{t("Email")}</th>
                      <th>{t("Роль")}</th>
                      <th>{t("Статьи")}</th>
                      <th>{t("Дата создания")}</th>
                      <th>{t("Действия")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map((user) => (
                      <tr key={user.id}>
                        <td>
                          <strong>{user.username}</strong>
                        </td>
                        <td>{user.email || `${user.username}@example.com`}</td>
                        <td>
                          {(user.roles || []).map(
                            (role: string, idx: number) => (
                              <span
                                key={idx}
                                className={`${cls.roleTag} ${cls[role.toLowerCase()]}`}
                              >
                                {role}
                              </span>
                            ),
                          )}
                        </td>
                        <td>{user.articles || 0}</td>
                        <td>{user.createdAt}</td>
                        <td>
                          <div className={cls.actionButtons}>
                            <button className={cls.edit}>
                              {t("Редактировать")}
                            </button>
                            <button
                              className={cls.delete}
                              onClick={() => handleDeleteUser(user.id)}
                            >
                              {t("Удалить")}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className={cls.emptyState}>
                  <p>{t("Пользователи не найдены")}</p>
                </div>
              )}
            </>
          )}

          {activeTab === "articles" && (
            <>
              <h2 className={cls.sectionTitle}>{t("Управление статьями")}</h2>

              {/* Action Bar */}
              <div className={cls.actionBar}>
                <input
                  type="text"
                  className={cls.filterInput}
                  placeholder={t("Поиск по названию или автору...")}
                  value={articleSearch}
                  onChange={(e) => setArticleSearch(e.target.value)}
                />
                <button className={cls.addButton}>
                  {t("+ Добавить статью")}
                </button>
              </div>

              {/* Articles Table */}
              {filteredArticles.length > 0 ? (
                <table className={cls.userTable}>
                  <thead>
                    <tr>
                      <th>{t("Название")}</th>
                      <th>{t("Автор")}</th>
                      <th>{t("Статус")}</th>
                      <th>{t("Просмотры")}</th>
                      <th>{t("Дата создания")}</th>
                      <th>{t("Действия")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredArticles.map((article) => {
                      const titleStr =
                        typeof article.title === "string"
                          ? article.title
                          : article.title;
                      return (
                        <tr key={article.id}>
                          <td>
                            <strong>{titleStr}</strong>
                          </td>
                          <td>{article.author}</td>
                          <td>
                            <span
                              className={`${cls.roleTag} ${cls[article.status]}`}
                            >
                              {article.status === "published"
                                ? t("Опубликована")
                                : article.status === "draft"
                                  ? t("Черновик")
                                  : t("Архивирована")}
                            </span>
                          </td>
                          <td>{article.views}</td>
                          <td>{article.createdAt}</td>
                          <td>
                            <div className={cls.actionButtons}>
                              <button className={cls.edit}>
                                {t("Редактировать")}
                              </button>
                              <button
                                className={cls.delete}
                                onClick={() => handleDeleteArticle(article.id)}
                              >
                                {t("Удалить")}
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              ) : (
                <div className={cls.emptyState}>
                  <p>{t("Статьи не найдены")}</p>
                </div>
              )}
            </>
          )}
        </div>
      </VStack>
    </Page>
  );
});

AdminPanelPage.displayName = "AdminPanelPage";

export default AdminPanelPage;
