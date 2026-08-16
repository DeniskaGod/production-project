export interface AdminUser {
  id: string;
  username: string;
  email: string;
  roles: string[];
  articles: number;
  createdAt: string;
}

export interface AdminStats {
  totalUsers: number;
  totalArticles: number;
  totalComments: number;
  averageRating: number;
}

export interface AdminPanelSchema {
  users: AdminUser[];
  stats: AdminStats;
  isLoading: boolean;
  error?: string;
  searchQuery: string;
}
