import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './LangSwitcher.module.scss';
import Button, { SizeButton, ThemeButton } from '@/shared/ui/Button/Button';

interface LangSwitcherProps {
  className?: string;
  size?: SizeButton;
}

export default function LangSwitcher({ className, size }: LangSwitcherProps) {
  const { t, i18n } = useTranslation();

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'ru' ? 'en' : 'ru');
  };
  return (
    <Button
      className={classNames('', {}, className ? [className] : [] )}
      theme={ThemeButton.CLEAR}
      onClick={toggleLanguage}
    >
      {t(size === SizeButton.L || size === SizeButton.XL ? 'Короткий язык' : 'Язык')}
    </Button>
  );
}
