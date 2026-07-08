import React, { memo } from "react";
import cls from "./SidebarItem.module.scss";
import { AppLink, AppLinkTheme } from "@/shared/ui/AppLink/AppLink";
import { classNames } from "@/shared/lib/classNames/classNames";
import { useTranslation } from "react-i18next";
import { SidebarItemType } from "../../model/item";

interface SidebarItemProps {
  item: SidebarItemType;
  collapsed?: boolean;
}

export const SidebarItem = memo(({ item, collapsed }: SidebarItemProps) => {
  const { t } = useTranslation();

  return (
    <AppLink
      theme={AppLinkTheme.SECONDARY}
      to={item.path}
      className={classNames(
        cls.item,
        { [cls.collapsed]: collapsed || false },
        [],
      )}
    >
      <item.Icon className={cls.icon} />
      <span className={classNames(cls.link, {}, [])}>{t(item.text)}</span>
    </AppLink>
  );
});

SidebarItem.displayName = "SidebarItem";
