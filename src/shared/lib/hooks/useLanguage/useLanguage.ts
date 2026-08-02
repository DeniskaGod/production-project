import { useTranslation } from "react-i18next";

export const useLanguage = () => {
  const { i18n } = useTranslation();
  const currentLang = i18n.language as "ru" | "en";

  return { currentLang };
};
