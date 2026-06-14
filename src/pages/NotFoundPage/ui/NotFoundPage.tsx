import { classNames } from '@/shared/lib/classNames/classNames';
import React from 'react'
import cls from './NotFoundPage.module.scss';
import { useTranslation } from 'react-i18next';

interface NotFoundPageProps {
    className?: string;
}

export default function NotFoundPage({ className }: NotFoundPageProps) {
    const {t} = useTranslation('notfound');
  return (
    <div className={classNames(cls.NotFoundPage, {}, [className])}>
        {t('Страница не найдена')}
    </div>
  )
}
