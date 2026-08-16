# Admin Panel - Design & Styling Guide

## Визуальная структура

```
┌─────────────────────────────────────────────────────────────┐
│  Панель администратора                                      │
│  Управляйте пользователями, статьями и общей статистикой   │
└─────────────────────────────────────────────────────────────┘

┌──────────────┬──────────────┬──────────────┬──────────────┐
│    Total:    │   Active:    │   Comments:  │   Rating:    │
│      4       │      3       │     128      │     4.8      │
│  Users       │  Articles    │   Comments   │   Average    │
└──────────────┴──────────────┴──────────────┴──────────────┘

┌─────────────────────────────────────────────────────────────┐
│   Users (4)  │   Articles (4)                             │
├─────────────────────────────────────────────────────────────┤
│ [Search...]                              [+ Add User]        │
├──────┬────────┬─────────┬────────┬──────────┬────────────────┤
│User  │ Email  │ Role    │Articles│Created   │ Actions        │
├──────┼────────┼─────────┼────────┼──────────┼────────────────┤
│admin │admin@  │ ADMIN   │  15   │2023-01-15│ Edit | Delete  │
│      │ex.com  │         │        │          │                │
├──────┼────────┼─────────┼────────┼──────────┼────────────────┤
│john  │john@   │ USER    │   8   │2023-06-20│ Edit | Delete  │
│_doe  │ex.com  │         │        │          │                │
├──────┼────────┼─────────┼────────┼──────────┼────────────────┤
│manag │manag@  │MANAGER  │  12   │2023-03-10│ Edit | Delete  │
│er    │ex.com  │         │        │          │                │
└──────┴────────┴─────────┴────────┴──────────┴────────────────┘
```

## Color Scheme - Цветовая схема

### Role Tags - Роли пользователей
```
ADMIN       → 🔴 Red (#ff3b30)       - Системный администратор
MANAGER     → 🟠 Orange (#ff9800)    - Менеджер контента
USER        → 🟢 Green (#4caf50)     - Обычный пользователь
OWNER       → 🟣 Purple (#9c27b0)    - Владелец контента
```

### Article Status - Статусы статей
```
Published   → 🟢 Green (#4caf50)     - Опубликована
Draft       → 🟡 Yellow (#ffc107)    - Черновик
Archived    → ⚫ Gray (#9e9e9e)      - Архивирована
```

### Action Buttons - Кнопки действий
```
Edit        → 🔵 Blue (#2196f3)      - Редактировать
Delete      → 🔴 Red (#ff3b30)       - Удалить
Add         → 🟢 Green (Primary)     - Добавить новый элемент
```

## Typography - Типография

```
Заголовок панели
├─ Font: Bold 28px
├─ Color: Primary Color
└─ Margin Bottom: 32px

Описание
├─ Font: Regular 14px
├─ Color: Secondary (opacity 0.7)
└─ Line Height: 1.5

Названия секций
├─ Font: Bold 20px
├─ Color: Primary Color
├─ Border Bottom: 2px solid primary
└─ Margin Bottom: 16px

Таблицы
├─ Header Font: Bold 13px, UPPERCASE
├─ Header Background: Secondary BG
├─ Row Font: Regular 14px
├─ Row Hover: Light secondary background
└─ Border: 1px solid light border
```

## Spacing - Отступы

```
Component Padding:      20px
Header Margin Bottom:   32px
Section Margin Bottom:  40px
Grid Gap:              16px (горизонтально), 16px (вертикально)
Table Padding:         16px (ячейки)
Stack Gap:             8px - 32px (в зависимости от контекста)
```

## Responsive Design - Адаптивный дизайн

```
Desktop (> 1024px)
├─ Stats Grid: 4 columns
├─ Table: Полная ширина
└─ Action Bar: Horizontal layout

Tablet (768px - 1024px)
├─ Stats Grid: auto-fit minmax(200px, 1fr)
├─ Table: Scrollable
└─ Action Bar: Horizontal, wrap if needed

Mobile (< 768px)
├─ Stats Grid: auto-fit minmax(150px, 1fr)
├─ Table: Horizontal scroll or card layout
└─ Action Bar: Vertical (flex-direction: column)
```

## Hover & Active States - Эффекты при наведении

```
Stat Cards
├─ Hover: transform: translateY(-4px)
├─ Shadow: 0 4px 12px rgba(0,0,0,0.1)
└─ Transition: 0.3s ease

Buttons
├─ Hover: opacity 0.9, translateY(-2px)
├─ Active: translateY(0)
├─ Shadow: 0 4px 8px rgba(0,0,0,0.15)
└─ Transition: 0.2s ease

Table Rows
├─ Hover: background rgba(0,0,0,0.02)
└─ Transition: background 0.2s ease

Input Fields
├─ Focus: border-color: primary
├─ Shadow: 0 0 0 3px rgba(0,0,0,0.05)
└─ Outline: none
```

## Animations - Анимации

```
Card Hover
└─ @keyframes cardHover:
   from { transform: translateY(0); }
   to   { transform: translateY(-4px); }
   Duration: 0.3s

Button Press
├─ @keyframes buttonPress:
│  from { transform: translateY(-2px); }
│  to   { transform: translateY(0); }
│  Duration: 0.2s ease
└─ Used on: Edit & Delete buttons

Tab Switch
├─ Smooth border bottom animation
├─ No opacity fade, just border movement
└─ Duration: 0.2s ease
```

## CSS Variables Used

```css
--primary-color              /* Основной цвет темы */
--secondary-color            /* Вторичный цвет текста */
--bg-color                   /* Основной фон */
--bg-secondary-color         /* Вторичный фон */
--border-color               /* Цвет границ */
--inverted-primary-color     /* Инвертированный основной цвет */
--inverted-secondary-color   /* Инвертированный вторичный цвет */
```

## Breakpoints - Точки разрыва

```
Small (sm):    < 640px   /* Смартфоны */
Medium (md):   768px     /* Планшеты */
Large (lg):    1024px    /* Ноутбуки */
XL:            1280px    /* Большие экраны */
```

## Accessibility - Доступность

```
✓ Семантическая разметка (table, thead, tbody)
✓ Правильная контрастность цветов
✓ Клавиатурная навигация (Tab, Enter, Delete)
✓ ARIA labels для кнопок действий
✓ Focus states для интерактивных элементов
✓ Локализация для всех текстов
```

## Performance Optimizations - Оптимизация производительности

```
✓ CSS Modules для изоляции стилей
✓ memo() обертка компонента
✓ useCallback для функций обработчиков
✓ Lazy loading через AdminPanelPage.async.tsx
✓ Redux для глобального состояния (избегаем лишних re-renders)
```

## Dark Mode Support - Поддержка темного режима

```
Светлая тема (по умолчанию)
├─ Background: белый / светло-серый
├─ Text: черный / темно-серый
└─ Borders: легкие серые

Темная тема (через CSS переменные)
├─ Background: темно-серый / черный
├─ Text: белый / светло-серый
└─ Borders: яркие серые

Переключение: использует встроенную систему тем проекта
```

---

**Для дополнительной информации см.**:
- [README.md](./README.md) - Основная документация
- [USAGE_EXAMPLES.md](./USAGE_EXAMPLES.md) - Примеры использования
