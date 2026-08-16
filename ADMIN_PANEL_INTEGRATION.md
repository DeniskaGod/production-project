# 🚀 Admin Panel - Installation & Integration Guide

## ✨ Что было создано?

Готовая к использованию **красивая админ-панель** для вашего приложения React.

### 📦 В коробке:

✅ Полнофункциональный компонент администратора  
✅ Redux state management  
✅ Красивый адаптивный дизайн  
✅ Поддержка двух языков (RU/EN)  
✅ Полная документация  
✅ Примеры использования  
✅ Mock данные для тестирования  

## 🎯 Быстрый старт (2 минуты)

### 1. Компонент уже готов!
Файлы находятся в: `src/pages/AdminPanelPage/`

### 2. Добавьте маршрут (опционально)
Если у вас есть конфиг маршрутов в `src/shared/const/router.ts`:

```typescript
// Добавьте в enum AppRoutes
export enum AppRoutes {
  // ... остальные маршруты
  ADMIN = 'admin',
}

// Добавьте в RoutePath
export const RoutePath: Record<AppRoutes, string> = {
  // ... остальные пути
  [AppRoutes.ADMIN]: '/admin',
};
```

### 3. Добавьте в маршрутизатор
В `src/app/routes/AppRoutes.tsx` или подобном:

```tsx
import { AdminPanelPageAsync as AdminPanelPage } from '@/pages/AdminPanelPage';

export const routeConfig: Record<AppRoutes, RouteProps> = {
  [AppRoutes.ADMIN]: {
    path: RoutePath.admin,
    element: (
      <Suspense fallback={<Pageloader />}>
        <AdminPanelPage />
      </Suspense>
    ),
    authOnly: true, // Требует аутентификации
  },
  // ... остальные маршруты
};
```

### 4. Откройте админ-панель
Перейдите на: `http://localhost:3000/admin`

## ✅ Это все!

Админ-панель работает сразу с mock данными.

---

## 🔌 Интеграция с API

Когда вы готовы подключить реальные данные:

### Шаг 1: Создайте async thunk

Создайте файл `src/pages/AdminPanelPage/model/services/fetchAdminUsers.ts`:

```typescript
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AdminUser } from '../types/admin';
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

export const fetchAdminArticles = createAsyncThunk<
  Article[],
  void,
  { rejectValue: string }
>(
  'adminPanel/fetchArticles',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/api/admin/articles');
      return response.data;
    } catch (error) {
      return rejectWithValue('Failed to fetch articles');
    }
  }
);
```

### Шаг 2: Обновите Redux слайс

В `src/pages/AdminPanelPage/model/slice/adminPanelSlice.ts`:

```typescript
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchAdminUsers, fetchAdminArticles } from '../services/fetchAdminUsers';
import { AdminPanelSchema, AdminUser } from '../types/admin';

const initialState: AdminPanelSchema = {
  users: [],
  stats: {
    totalUsers: 0,
    totalArticles: 0,
    totalComments: 0,
    averageRating: 0,
  },
  isLoading: false,
  error: undefined,
  searchQuery: '',
};

export const adminPanelSlice = createSlice({
  name: 'adminPanel',
  initialState,
  reducers: {
    // ... ваши reducers
  },
  extraReducers: (builder) => {
    // Handle fetchAdminUsers
    builder
      .addCase(fetchAdminUsers.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(fetchAdminUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = action.payload;
      })
      .addCase(fetchAdminUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
    
    // Handle fetchAdminArticles
    builder
      .addCase(fetchAdminArticles.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAdminArticles.fulfilled, (state, action) => {
        state.isLoading = false;
        // Сохраните articles в отдельное поле, если нужно
      })
      .addCase(fetchAdminArticles.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});
```

### Шаг 3: Вызовите thunk в компоненте

В `src/pages/AdminPanelPage/ui/AdminPanelPage.tsx`:

```typescript
const AdminPanelPage = memo(() => {
  const dispatch = useDispatch<AppDispatch>();
  
  useEffect(() => {
    // Вместо mock данных, загружайте с API
    dispatch(fetchAdminUsers());
    dispatch(fetchAdminArticles());
  }, [dispatch]);

  // ... остальной код
});
```

---

## 🔐 Проверка прав доступа

Создайте защиту маршрута в `src/app/routes/AppRoutes.tsx`:

```tsx
import { selectUserAuthData } from '@/entities/User';
import { UserRole } from '@/entities/User';

// Компонент для проверки прав
function AdminGuard({ children }: { children: React.ReactNode }) {
  const authData = useSelector(selectUserAuthData);
  const isAdmin = authData?.roles?.includes(UserRole.ADMIN);

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}

// Использование в маршруте
{
  path: '/admin',
  element: (
    <AdminGuard>
      <Suspense fallback={<Pageloader />}>
        <AdminPanelPage />
      </Suspense>
    </AdminGuard>
  ),
}
```

---

## 🎨 Кастомизация

### Изменение цветов
В вашем файле CSS переменных (где определены темы):

```scss
:root {
  --primary-color: #your-color;
  --border-color: #your-border;
  // ... другие переменные
}
```

### Изменение текстов
Отредактируйте файлы переводов:
- `public/locales/ru/admin.json`
- `public/locales/en/admin.json`

### Добавление новых языков
1. Создайте файл `public/locales/{lang}/admin.json`
2. Добавьте все ключи из английской версии

### Изменение структуры
Отредактируйте компонент в `src/pages/AdminPanelPage/ui/AdminPanelPage.tsx`

---

## 📝 Примеры использования

### Redux actions
```typescript
// Поиск пользователей
dispatch(adminPanelActions.setSearchQuery('john'));

// Удаление пользователя
dispatch(adminPanelActions.deleteUser('user-id'));

// Установка загрузки
dispatch(adminPanelActions.setLoading(true));

// Установка ошибки
dispatch(adminPanelActions.setError('Error message'));
```

### Redux selectors
```typescript
const users = useSelector(selectAdminUsers);
const filteredUsers = useSelector(selectFilteredAdminUsers);
const isLoading = useSelector(selectAdminIsLoading);
const error = useSelector(selectAdminError);
```

---

## 🧪 Тестирование

### Mock данные по умолчанию
Админ-панель поставляется с mock данными для тестирования:
- 4 пользователя с разными ролями
- 4 статьи с разными статусами

### Использование mock данных
```typescript
// В AdminPanelPage.tsx
const mockUsers = [...]; // Уже определено
const mockArticles = [...]; // Уже определено
```

### Тестирование функциональности
1. Откройте админ-панель
2. Используйте поиск
3. Переключайтесь между вкладками
4. Нажимайте кнопки удаления
5. Проверьте локализацию (RU/EN)

---

## 📱 Адаптивность

Админ-панель отлично выглядит на:
- ✅ Мобильные телефоны (320px+)
- ✅ Планшеты (768px+)
- ✅ Ноутбуки (1024px+)
- ✅ Большие экраны (1920px+)

---

## 📚 Документация

| Файл | Описание |
|------|---------|
| [README.md](./src/pages/AdminPanelPage/README.md) | Полная техническая документация |
| [DESIGN.md](./src/pages/AdminPanelPage/DESIGN.md) | Гайд по дизайну и стилям |
| [USAGE_EXAMPLES.md](./src/pages/AdminPanelPage/USAGE_EXAMPLES.md) | Примеры кода |
| [ADMIN_PANEL_QUICKSTART.md](./ADMIN_PANEL_QUICKSTART.md) | Быстрый старт |
| [ADMIN_PANEL_VISUAL_DEMO.md](./ADMIN_PANEL_VISUAL_DEMO.md) | Визуальная демонстрация |
| [CREATED_FILES_LIST.md](./CREATED_FILES_LIST.md) | Список всех файлов |

---

## 🛠️ Полезные команды

```bash
# Запуск приложения
npm run dev

# Проверка TypeScript ошибок
npm run lint:ts

# Исправление стилей
npm run stylelint:fix

# Сборка для production
npm run build:prod

# Запуск тестов
npm run unit
```

---

## 🐛 Troubleshooting

### Проблема: Компонент не отображается
**Решение:** Убедитесь, что маршрут добавлен и компонент импортирован

### Проблема: Стили не применяются
**Решение:** Проверьте, что CSS Modules включены в конфиге Webpack

### Проблема: Redux не работает
**Решение:** Убедитесь, что AdminPanelSchema добавлена в StateSchema

### Проблема: Тексты не переводятся
**Решение:** Проверьте файлы локализации в `public/locales/{lang}/admin.json`

---

## 📞 Support

Для вопросов:
1. Проверьте документацию в папке AdminPanelPage/
2. Посмотрите примеры в USAGE_EXAMPLES.md
3. Проверьте visual demo в ADMIN_PANEL_VISUAL_DEMO.md

---

## ✅ Checklist интеграции

- [ ] Компонент добавлен в маршруты
- [ ] Redux store настроена
- [ ] Маршрут доступен на `/admin`
- [ ] Админ-панель работает с mock данными
- [ ] Поиск и фильтрация работают
- [ ] Удаление работает
- [ ] Переводы работают (RU/EN)
- [ ] Адаптивный дизайн проверен
- [ ] API интегрирована (опционально)
- [ ] Проверка прав доступа добавлена (опционально)

---

## 🎉 Готово!

Ваша админ-панель готова к использованию! 

Откройте `http://localhost:3000/admin` и начните управлять вашим приложением.

---

**GitHub Copilot** - Создано с ❤️ для вас!
