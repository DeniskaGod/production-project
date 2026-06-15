import React from "react";
import { classNames } from "@/shared/lib/classNames/classNames";
import cls from "./Button.module.scss";

export enum ThemeButton {
  CLEAR = "clear",
  BACKGROUND = "background",
  BACKGROUND_INVERTED = "backgroundInverted",
}

export enum SizeButton {
  M = "size_m",
  L = "size_l",
  XL = "size_xl",
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  theme?: ThemeButton;
  size?: SizeButton;
}

export default function Button({
  className,
  theme,
  size,
  ...rest
}: ButtonProps) {

  const mods: Record<string, boolean> = {
    [cls[theme]]: true,
    [cls[size]]: true,
  };
  return (
    <button
      type="button"
      className={classNames(cls.Button, mods, [className])}
      {...rest}
    >
      {rest.children}
    </button>
  );
}
