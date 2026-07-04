import { classNames } from '@/shared/lib/classNames/classNames';
import React from 'react'
import { useTranslation } from 'react-i18next';

interface ProfilePageProps {
    className?: string;
}

export default function ProfilePage({ className }: ProfilePageProps) {
    const { t } = useTranslation('profile');
  return (
    <div className={classNames('', {}, className ? [className] : [])}>
        {t('Профиль')}
    </div>
  )
}
