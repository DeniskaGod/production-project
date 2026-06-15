import React from "react";
import { classNames } from "@/shared/lib/classNames/classNames";
import cls from "./Sidebar.module.scss";
import { ThemeSwitcher } from "@/widgets/ThemeSwitcher";
import { LangSwitcher } from "@/widgets/LangSwitcher";
import Button, { SizeButton, ThemeButton } from "@/shared/ui/Button/Button";
import { AppLink, AppLinkTheme } from "@/shared/ui/AppLink/AppLink";
import { t } from "i18next";
import { RoutePath } from "@/shared/config/routeConfig/routeConfig";
import { useTranslation } from "react-i18next";

interface SidebarProps {
  className?: string;
}

export default function Sidebar({ className }: SidebarProps) {
  const [collapsed, setCollapsed] = React.useState(false);
  const { t } = useTranslation();
  
  const onToggle = () => {
    setCollapsed((prev) => !prev);
  };

  return (
    <div
      className={classNames(cls.Sidebar, { [cls.collapsed]: collapsed }, [
        className,
      ])}
    >
      <Button
        onClick={onToggle}
        className={cls.collapseBtn}
        theme={ThemeButton.BACKGROUND_INVERTED}
        size={SizeButton.L}
      >
        {collapsed ? ">" : "<"}
      </Button>
      <div className={cls.items}>
        <AppLink
          theme={AppLinkTheme.SECONDARY}
          to={RoutePath.main}
          className={cls.link}
        >
          {t("Главная страница")}
        </AppLink>
        <AppLink
          theme={AppLinkTheme.RED}
          to={RoutePath.about}
          className={cls.link}
        >
          {t("О сайте")}
        </AppLink>
      </div>
      <div className={cls.switchers}>
        <ThemeSwitcher />
        <LangSwitcher
          className={cls.lang}
          size={collapsed ? SizeButton.L : SizeButton.M}
        />
      </div>
    </div>
  );
}
