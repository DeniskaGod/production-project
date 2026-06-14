import React from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ThemeSwitcher.module.scss';
import { useTheme, Theme } from '@/app/providers/ThemeProvider';
import LightIcon from '@/shared/assets/icons/1.svg';
import DarkIcon from '@/shared/assets/icons/2.svg';
import Button, { ThemeButton } from '@/shared/ui/Button/Button';

interface ThemeSwitcherProps {
    className?: string;
}

export default function ThemeSwitcher({ className }: ThemeSwitcherProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      theme={ThemeButton.CLEAR}
      className={classNames(cls.ThemeSwitcher, {}, [className])}
      onClick={toggleTheme}
    >
      {theme === Theme.DARK ? <DarkIcon /> : <LightIcon />}
    </Button>
  );
}
