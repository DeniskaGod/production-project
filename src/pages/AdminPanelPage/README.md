# Admin Panel - Документация

## Описание

Красивая и функциональная панель администратора с поддержкой управления пользователями и статьями.

## Структура файлов

```
AdminPanelPage/
├── ui/
│   ├── AdminPanelPage.tsx          # Основной компонент панели
│   ├── AdminPanelPage.module.scss  # Стили панели
│   ├── AdminPanelPage.async.tsx    # Ленивая загрузка
│   └── components/
│       ├── ArticlesList/
│       │   └── ArticlesList.tsx    # Компонент списка статей
│       └── StatsCard/
│           └── StatsCard.tsx        # Компонент карточки статистики
├── model/
│   ├── types/
│   │   └── admin.ts                # TypeScript типы
│   ├── slice/
│   │   └── adminPanelSlice.ts      # Redux слайс
│   ├── selectors/
│   │   └── adminSelectors.ts       # Redux селекторы
│   └── index.ts                     # Экспорты модели
└── index.ts                          # Экспорт страницы
```

## Функциональность

### 1. **Статистика** 
- Всего пользователей
- Активных статей
- Всего комментариев
- Средний рейтинг

Статистика отображается в виде красивых карточек с эффектом hover.

### 2. **Управление пользователями** 👥
- Список всех пользователей
- Фильтрация по имени или email
- Просмотр ролей пользователя (ADMIN, USER, MANAGER, OWNER)
- Кнопки действий:
  -  Редактировать
  -  Удалить

### 3. **Управление статьями** 
- Список всех статей
- Фильтрация по названию или автору
- Просмотр статуса (Опубликована, Черновик, Архивирована)
- Количество просмотров
- Кнопки действий:
  - 📝 Редактировать
  - 🗑️ Удалить

## Компоненты Redux

### AdminPanelSchema
```typescript
interface AdminPanelSchema {
  users: AdminUser[];
  stats: AdminStats;
  isLoading: boolean;
  error?: string;
  searchQuery: string;
}
```

### Actions
- `setUsers()` - установить пользователей
- `setSearchQuery()` - установить поисковую строку
- `deleteUser()` - удалить пользователя
- `updateUser()` - обновить пользователя
- `setLoading()` - установить статус загрузки
- `setError()` - установить ошибку

### Selectors
- `selectAdminUsers()` - получить всех пользователей
- `selectAdminSearchQuery()` - получить поисковую строку
- `selectAdminStats()` - получить статистику
- `selectAdminIsLoading()` - получить статус загрузки
- `selectAdminError()` - получить ошибку
- `selectFilteredAdminUsers()` - получить отфильтрованных пользователей

## Локализация

Переводы находятся в:
- `public/locales/ru/admin.json` (русский)
- `public/locales/en/admin.json` (английский)

## Стили

Панель использует CSS Modules с SCSS и CSS переменные для темизации:

### Ключевые классы:
- `.AdminPanelPage` - основной контейнер
- `.statsCard` - карточка статистики
- `.userTable` - таблица пользователей
- `.roleTag` - тег роли с цветовой кодировкой:
  - `.admin` - красный
  - `.manager` - оранжевый
  - `.user` - зеленый
  - `.owner` - фиолетовый
- `.tabs` - система вкладок
- `.actionButtons` - кнопки действий

## Использование

```tsx
import { AdminPanelPage } from '@/pages/AdminPanelPage';

// В маршрутизации
<Route path="/admin" element={<AdminPanelPage />} />
```

## Функции

### Поиск и фильтрация
- Поиск по имени пользователя или email
- Поиск по названию статьи или автору
- Вкладки для переключения между пользователями и статьями

### Удаление
- Удаление пользователей (action button)
- Удаление статей (action button)

## Будущие улучшения

- [ ] Интеграция с API для загрузки данных
- [ ] Модальные окна для редактирования
- [ ] Добавление новых пользователей/статей
- [ ] Пагинация для больших таблиц
- [ ] Сортировка по столбцам
- [ ] Экспорт данных в CSV/PDF
- [ ] Более подробные логи активности
- [ ] Расширенные фильтры и поиск

## Примеры данных

### Пользователи
```
id: "1"
username: "admin"
email: "admin@example.com"
roles: ["ADMIN"]
articles: 15
createdAt: "2023-01-15"
```

### Статьи
```
id: "a1"
title: "Введение в React"
author: "admin"
status: "published" | "draft" | "archived"
views: 1250
createdAt: "2024-01-15"
```

---

**Автор:** GitHub Copilot  
**Дата создания:** 2026-08-16
