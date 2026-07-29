import React, { memo, useMemo } from "react";
import { classNames } from "@/shared/lib/classNames/classNames";
import cls from "./Sidebar.module.scss";
import { ThemeSwitcher } from "@/widgets/ThemeSwitcher";
import { LangSwitcher } from "@/widgets/LangSwitcher";
import Button, { SizeButton, ThemeButton } from "@/shared/ui/Button/Button";
import { SidebarItem } from "../SidebarItem/SidebarItem";
import { getSidebarItems } from "../../model/item";
import { useSelector } from "react-redux";
import { getUserAuthData } from "@/entities/User";

interface SidebarProps {
  className?: string;
}

export const Sidebar = memo(({ className }: SidebarProps) => {
  const [collapsed, setCollapsed] = React.useState(false);
  const user = useSelector(getUserAuthData);

  const onToggle = () => {
    setCollapsed((prev) => !prev);
  };

  const itemList = useMemo(() => {
    const items = getSidebarItems(user?.id);
    return items.map((item) => (
      <SidebarItem key={item.path} item={item} collapsed={collapsed} />
    ));
  }, [collapsed, user?.id]);

  return (
    <menu
      className={classNames(cls.Sidebar, { [cls.collapsed]: collapsed }, [
        className || "",
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
      <div className={cls.items}>{itemList}</div>
      <div className={cls.switchers}>
        <ThemeSwitcher />
        <LangSwitcher
          className={cls.lang}
          size={collapsed ? SizeButton.L : SizeButton.M}
        />
      </div>
    </menu>
  );
});
Sidebar.displayName = "Sidebar";
