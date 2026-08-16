import { StateSchema } from "@/app/providers/StoreProvider/config/StateSchema";

export const selectAdminUsers = (state: StateSchema) =>
  state?.adminPanel?.users || [];

export const selectAdminSearchQuery = (state: StateSchema) =>
  state?.adminPanel?.searchQuery || "";

export const selectAdminStats = (state: StateSchema) =>
  state?.adminPanel?.stats || {
    totalUsers: 0,
    totalArticles: 0,
    totalComments: 0,
    averageRating: 0,
  };

export const selectAdminIsLoading = (state: StateSchema) =>
  state?.adminPanel?.isLoading || false;

export const selectAdminError = (state: StateSchema) =>
  state?.adminPanel?.error;

export const selectFilteredAdminUsers = (state: StateSchema) => {
  const users = selectAdminUsers(state);
  const query = selectAdminSearchQuery(state);

  if (!query) {
    return users;
  }

  return users.filter(
    (user) =>
      user.username.toLowerCase().includes(query.toLowerCase()) ||
      user.email.toLowerCase().includes(query.toLowerCase()),
  );
};
