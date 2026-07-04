// Мокаем все зависимости
jest.mock("@/shared/assets/icons/1.svg", () => "svg-mock");
jest.mock("@/shared/assets/icons/2.svg", () => "svg-mock");

// Мокаем ThemeSwitcher с правильным экспортом
jest.mock("@/widgets/ThemeSwitcher", () => ({
  ThemeSwitcher: () => <div data-testid="theme-switcher-mock" />,
}));

// Мокаем LangSwitcher с правильным экспортом
jest.mock("@/widgets/LangSwitcher", () => ({
  LangSwitcher: () => <div data-testid="lang-switcher-mock">Язык</div>,
}));

// Мокаем Button
jest.mock("@/shared/ui/Button/Button", () => ({
  __esModule: true,
  default: ({ children, onClick }: any) => (
    <button onClick={onClick} data-testid="button-mock">
      {children}
    </button>
  ),
  ThemeButton: {},
}));

import { render, screen } from "@testing-library/react";
import Sidebar from "./Sidebar/Sidebar";


describe("Sidebar", () => {
  test("проверка рендера компонента", () => {
    render(<Sidebar />);

    // Проверяем что компонент отрендерился
    expect(screen.getByTestId("button-mock")).toBeInTheDocument();
    expect(screen.getByText("Язык")).toBeInTheDocument();
  });
});
