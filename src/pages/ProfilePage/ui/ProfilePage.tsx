import { fetchProfileData } from '@/entities/Profile/model/services/fetchProfileData/fetchProfileData';
import { profileReducer } from '@/entities/Profile/model/slice/profileSlice';
import { ProfileCard } from '@/entities/Profile/ui/ProfileCard/ProfileCard';
import { classNames } from '@/shared/lib/classNames/classNames';
import DynamicModuleLoader, { ReducersList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import React, { memo, useEffect } from 'react'
import { useTranslation } from 'react-i18next';

const reducers: ReducersList = {
  profile: profileReducer,
}

interface ProfilePageProps {
    className?: string;
}

export const ProfilePage = memo(({ className }: ProfilePageProps) => {
    const { t } = useTranslation('profile');
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(fetchProfileData());
    }, [dispatch]);



  return (
    <DynamicModuleLoader reducers={reducers}>
    <div className={classNames('', {}, className ? [className] : [])}>
      <ProfileCard />
    </div>
    </DynamicModuleLoader>
  )
});

export default ProfilePage;
ProfilePage.displayName = 'ProfilePage';
