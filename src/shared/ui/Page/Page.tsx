import { classNames } from "@/shared/lib/classNames/classNames";
import React, { memo } from "react";
import cls from "./Page.module.scss";

interface PageProps {
  className?: string;
  children: React.ReactNode;
}

export const Page = memo(({ className, children }: PageProps) => {
  return (
    <section className={classNames(cls.Page, {}, className ? [className] : [])}>
      {children}
    </section>
  );
});

Page.displayName = "Page";
