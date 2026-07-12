import { classNames } from "@/shared/lib/classNames/classNames";
import React, { memo } from "react";
import cls from "./Text.module.scss";

export enum TextTheme {
  PRIMARY = "primary",
  ERROR = "error",
}

export enum TextAlign {
  LEFT = "left",
  RIGHT = "right",
  CENTER = "center",
}

interface TextProps {
  className?: string;
  title?: string;
  text?: string;
  theme?: TextTheme;
  align?: TextAlign;
}

export const Text = memo((props: TextProps) => { 
  const {
    className,
    title,
    text,
    align =TextAlign.CENTER,
    theme = TextTheme.PRIMARY 
  } = props;

  const mods: Record<string, boolean> = {
    [cls[align]]: true,
    [cls[theme]]: true,
  };

  return (
    <div className={classNames(
      cls.Text,
      mods,
      className ? [className] : []
    )}>
      {title && <p className={cls.title}>{title}</p>}
      {text && <p className={cls.text}>{text}</p>}
    </div>
  );
});

Text.displayName = "Text";