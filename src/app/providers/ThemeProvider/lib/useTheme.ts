import { useContext } from "react";
import { LOCAL_STORAGE_THEME_KEY, Theme, ThemeContext } from "./ThemeContext";

interface UseThemeResult {
  toggleTheme: () => void;
  theme: Theme;
}

export function useTheme(): UseThemeResult {
  const { theme, setTheme } = useContext(ThemeContext);

  const toggleTheme = () => {
    if (setTheme) {
      let newTheme: Theme;
      switch (theme) {
        case Theme.DARK:
          newTheme = Theme.LIGHT;
          break;
        case Theme.LIGHT:
          newTheme = Theme.GRAY;
          break;
        case Theme.GRAY:
          newTheme = Theme.DARK;
          break;
        default:
          newTheme = Theme.LIGHT;
      } 
      setTheme(newTheme);
      localStorage.setItem(LOCAL_STORAGE_THEME_KEY, newTheme);
    }
  };

  return {
    theme: theme || Theme.LIGHT, // ✅ fallback если theme undefined
    toggleTheme,
  };
}
