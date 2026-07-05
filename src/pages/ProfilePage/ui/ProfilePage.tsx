import { profileReducer } from '@/entities/Profile/model/slice/profileSlice';
import { classNames } from '@/shared/lib/classNames/classNames';
import DynamicModuleLoader, { ReducersList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import React, { memo } from 'react'
import { useTranslation } from 'react-i18next';

const reducers: ReducersList = {
  profile: profileReducer,
}

interface ProfilePageProps {
    className?: string;
}

export const ProfilePage = memo(({ className }: ProfilePageProps) => {
    const { t } = useTranslation('profile');
  return (
    <DynamicModuleLoader reducers={reducers}>
    <div className={classNames('', {}, className ? [className] : [])}>
        {t('Профиль')}
    </div>
    </DynamicModuleLoader>
  )
});

export default ProfilePage;
ProfilePage.displayName = 'ProfilePage';
