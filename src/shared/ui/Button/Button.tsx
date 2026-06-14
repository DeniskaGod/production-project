import React from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Button.module.scss';

export enum ThemeButton {
  CLEAR = 'clear',
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  theme?: ThemeButton;
}

export default function Button({ className, theme, ...rest }: ButtonProps) {
  return (
    <button
      type="button"
      className={classNames(cls.Button, { [cls[theme]]: true }, [className])}
      {...rest}
    >
      {rest.children}
    </button>
  );
}
