import { useTranslation } from 'react-i18next';
import cls from './LoginForm.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import Button, { ThemeButton } from '@/shared/ui/Button/Button';
import { Input } from '@/shared/ui/Input/Input';

interface LoginFormProps {
    className?: string;
}

export const LoginForm = ({ className }: LoginFormProps) => {
    const { t } = useTranslation();

    return (
        <div className={classNames(cls.LoginForm, {}, className ? [className] : [])}>
            <Input
                autofocus
                type="text"
                className={cls.input}
                placeholder={t('Введите username')}
            />
            <Input
                type="text"
                className={cls.input}
                placeholder={t('Введите пароль')}
            />
            <Button
                className={cls.loginBtn}
            >
                {t('Войти')}
            </Button>
        </div>
    );
};
