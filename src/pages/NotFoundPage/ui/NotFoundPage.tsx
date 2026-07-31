import { classNames } from '@/shared/lib/classNames/classNames';
import React, { memo } from 'react'
import cls from './NotFoundPage.module.scss';
import { useTranslation } from 'react-i18next';
import { Page } from '@/widgets/Page/Page';

interface NotFoundPageProps {
    className?: string;
}

export const NotFoundPage = memo(({ className }: NotFoundPageProps) => {
    const {t} = useTranslation('notfound');
  return (
    <Page className={classNames(cls.NotFoundPage, {}, className ? [className] : [])}>
        {t('Страница не найдена')}
    </Page>
  )
});
export default NotFoundPage;
NotFoundPage.displayName = 'NotFoundPage';
