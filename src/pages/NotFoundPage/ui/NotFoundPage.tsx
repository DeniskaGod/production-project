import { classNames } from '@/shared/lib/classNames/classNames';
import React, { memo } from 'react'
import cls from './NotFoundPage.module.scss';
import { useTranslation } from 'react-i18next';

interface NotFoundPageProps {
    className?: string;
}

export const NotFoundPage = memo(({ className }: NotFoundPageProps) => {
    const {t} = useTranslation('notfound');
  return (
    <div className={classNames(cls.NotFoundPage, {}, [className])}>
        {t('Страница не найдена')}
    </div>
  )
});
export default NotFoundPage;
NotFoundPage.displayName = 'NotFoundPage';
