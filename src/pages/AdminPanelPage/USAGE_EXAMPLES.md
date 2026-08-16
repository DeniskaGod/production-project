// Пример интеграции AdminPanelPage в основной маршрутизатор

// 1. Если используется динамическая загрузка:
import { AdminPanelPage } from '@/pages/AdminPanelPage';

// В конфиге маршрутов:
export const routeConfig: Record<AppRoutes, RouteProps> = {
  [AppRoutes.ADMIN]: {
    path: '/admin',
    element: <AdminPanelPage />,
    authOnly: true, // Требует аутентификации
  },
  // ... другие маршруты
};

// 2. Или с ленивой загрузкой (рекомендуется):
import { AdminPanelPageAsync as AdminPanelPage } from '@/pages/AdminPanelPage';
import { Suspense } from 'react';
import { Pageloader } from '@/shared/ui/Pageloader';

<Suspense fallback={<Pageloader />}>
  <AdminPanelPage />
</Suspense>

// ============================================
// ПРИМЕР ИСПОЛЬЗОВАНИЯ REDUX ACTIONS
// ============================================

import {
  adminPanelActions,
  selectFilteredAdminUsers,
  selectAdminSearchQuery,
} from '@/pages/AdminPanelPage/model';
import { useDispatch, useSelector } from 'react-redux';

function MyComponent() {
  const dispatch = useDispatch();
  const users = useSelector(selectFilteredAdminUsers);
  const search = useSelector(selectAdminSearchQuery);

  // Устанавливаем пользователей
  const handleLoadUsers = () => {
    dispatch(adminPanelActions.setUsers([
      {
        id: '1',
        username: 'john',
        email: 'john@example.com',
        roles: ['USER'],
        articles: 5,
        createdAt: '2024-01-01',
      },
    ]));
  };

  // Обновляем поисковую строку
  const handleSearch = (query: string) => {
    dispatch(adminPanelActions.setSearchQuery(query));
  };

  // Удаляем пользователя
  const handleDeleteUser = (userId: string) => {
    dispatch(adminPanelActions.deleteUser(userId));
  };

  // Обновляем пользователя
  const handleUpdateUser = () => {
    dispatch(adminPanelActions.updateUser({
      id: '1',
      username: 'john_updated',
      email: 'john@example.com',
      roles: ['ADMIN'],
      articles: 10,
      createdAt: '2024-01-01',
    }));
  };

  // Устанавливаем статус загрузки
  const handleSetLoading = () => {
    dispatch(adminPanelActions.setLoading(true));
  };

  // Устанавливаем ошибку
  const handleSetError = () => {
    dispatch(adminPanelActions.setError('Ошибка при загрузке данных'));
  };

  return (
    <div>
      <p>Найдено пользователей: {users.length}</p>
      <p>Поисковая строка: {search}</p>
      <button onClick={handleLoadUsers}>Загрузить пользователей</button>
      <button onClick={() => handleSearch('john')}>Поиск "john"</button>
    </div>
  );
}

// ============================================
// ПРИМЕР ИНТЕГРАЦИИ С API
// ============================================

import { createAsyncThunk } from '@reduxjs/toolkit';
import { AdminUser } from '@/pages/AdminPanelPage/model';
import { api } from '@/shared/api';

export const fetchAdminUsers = createAsyncThunk<
  AdminUser[],
  void,
  { rejectValue: string }
>(
  'adminPanel/fetchUsers',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/api/admin/users');
      return response.data;
    } catch (error) {
      return rejectWithValue('Failed to fetch users');
    }
  }
);

// Использование в компоненте:
function AdminPanelContainer() {
  const dispatch = useDispatch<AppDispatch>();
  const { data: users, isLoading } = useSelector(
    (state) => state.adminPanel
  );

  useEffect(() => {
    dispatch(fetchAdminUsers());
  }, [dispatch]);

  if (isLoading) return <Pageloader />;

  return <AdminPanel users={users} />;
}

// ============================================
// ПРОВЕРКА ПРАВ ДОСТУПА
// ============================================

import { useSelector } from 'react-redux';
import { selectUserAuthData } from '@/entities/User';

function AdminPanelGuard() {
  const authData = useSelector(selectUserAuthData);
  const isAdmin = authData?.roles?.includes('ADMIN');

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return <AdminPanelPage />;
}

// ============================================
// ПРИМЕР ИСПОЛЬЗОВАНИЯ В МАРШРУТИЗАЦИИ
// ============================================

import { AppRoutes, RoutePath } from '@/shared/const/router';
import { AccessDeniedPage } from '@/pages/AccessDeniedPage';

const routeConfig: Record<AppRoutes, RouteProps> = {
  [AppRoutes.ADMIN]: {
    path: RoutePath.admin,
    element: (
      <Suspense fallback={<Pageloader />}>
        <AdminPanelGuard>
          <AdminPanelPage />
        </AdminPanelGuard>
      </Suspense>
    ),
    authOnly: true,
  },
};

// Добавьте в shared/const/router.ts:
export enum AppRoutes {
  // ... остальные маршруты
  ADMIN = 'admin',
}

export const RoutePath: Record<AppRoutes, string> = {
  // ... остальные пути
  [AppRoutes.ADMIN]: '/admin',
};
