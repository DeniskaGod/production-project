import { classNames } from "@/shared/lib/classNames/classNames";
import React, { memo } from "react";
import cls from "./Text.module.scss";

export enum TextTheme {
  PRIMARY = "primary",
  INVERTED = "inverted",
  ERROR = "error",
}

export enum TextAlign {
  LEFT = "left",
  RIGHT = "right",
  CENTER = "center",
}

export enum TextSize {
  S = "size_s",
  M = "size_m",
  L = "size_l",
}

export type HeaderTagType = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

const mapSizeToHeaderTag: Record<TextSize, HeaderTagType> = {
  [TextSize.M]: "h2",
  [TextSize.L]: "h1",
  [TextSize.S]: "h3",
};

interface TextProps {
  className?: string;
  title?: string;
  text?: string;
  theme?: TextTheme;
  align?: TextAlign;
  size?: TextSize;
}

export const Text = memo((props: TextProps) => {
  const {
    className,
    title,
    text,
    align = TextAlign.CENTER,
    theme = TextTheme.PRIMARY,
    size = TextSize.M,
  } = props;

  const mods: Record<string, boolean> = {
    [cls[align]]: true,
    [cls[theme]]: true,
    [cls[size]]: true,
  };

  const HeaderTag = mapSizeToHeaderTag[size] || "h2";

  return (
    <div className={classNames(cls.Text, mods, className ? [className] : [])}>
      {title && <HeaderTag className={cls.title}>{title}</HeaderTag>}
      {text && <p className={cls.text}>{text}</p>}
    </div>
  );
});

Text.displayName = "Text";
