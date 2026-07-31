import { ProfilePageHeader } from "@/pages/ProfilePage/index";
import { fetchProfileData } from "@/entities/Profile/model/services/fetchProfileData/fetchProfileData";
import { profileReducer } from "@/entities/Profile/model/slice/profileSlice";
import { ProfileCard } from "@/entities/Profile/ui/ProfileCard/ProfileCard";
import { classNames } from "@/shared/lib/classNames/classNames";
import DynamicModuleLoader, {
  ReducersList,
} from "@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch";
import React, { memo, useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  getProfileData,
  getProfileError,
  getProfileForm,
  getProfileIsLoading,
  getProfileReadonly,
  getProfileValidateErrors,
  profileActions,
  ValidateProfileError,
} from "@/entities/Profile";
import { Country, Currency } from "@/shared/const/common";
import { Text, TextTheme } from "@/shared/ui/Text/Text";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { getUserAuthData } from "@/entities/User";
import { Page } from "@/widgets/Page/Page";

const reducers: ReducersList = {
  profile: profileReducer,
};

interface ProfilePageProps {
  className?: string;
}

export const ProfilePage = memo(({ className }: ProfilePageProps) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation("profile");
  const formData = useSelector(getProfileForm);
  const isLoading = useSelector(getProfileIsLoading);
  const error = useSelector(getProfileError);
  const readonly = useSelector(getProfileReadonly);
  const validateErrors = useSelector(getProfileValidateErrors);
  const { id } = useParams<{ id: string }>();

  const authData = useSelector(getUserAuthData);
  const profileData = useSelector(getProfileData);
  
  const canEdit = authData?.id === profileData?.id;

  const validateErrorTranslate = {
    [ValidateProfileError.SERVER_ERROR]: t("Произошла ошибка при сохранении"),
    [ValidateProfileError.INCORRECT_USER_DATA]: t(
      "Произошла ошибка при сохранении пользовательских данных",
    ),
    [ValidateProfileError.INCORRECT_AGE]: t(
      "Произошла ошибка при сохранении возраста",
    ),
    [ValidateProfileError.INCORRECT_COUNTRY]: t(
      "Произошла ошибка при сохранении страны",
    ),
    [ValidateProfileError.NO_DATA]: t("Произошла ошибка при сохранении данных"),
  };

  useEffect(() => {
    if (id) {
      dispatch(fetchProfileData(id));
    }
  }, [id, dispatch]);

  const onChangeFirstname = useCallback(
    (newFirstname?: string) => {
      dispatch(profileActions.updateProfile({ first: newFirstname || "" }));
    },
    [dispatch],
  );

  const onChangeLastname = useCallback(
    (newLastname?: string) => {
      dispatch(profileActions.updateProfile({ lastname: newLastname || "" }));
    },
    [dispatch],
  );

  // ✅ Валидация возраста
  const onChangeAge = useCallback(
    (newAge?: string) => {
      // Если поле пустое - сохраняем undefined
      if (!newAge) {
        dispatch(profileActions.updateProfile({ age: undefined }));
        return;
      }

      // Проверяем что введены только цифры
      const ageNumber = Number(newAge);
      if (!isNaN(ageNumber) && ageNumber >= 0 && ageNumber <= 150) {
        dispatch(profileActions.updateProfile({ age: ageNumber }));
      }
      // Если введены не цифры - ничего не делаем
    },
    [dispatch],
  );

  const onChangeCity = useCallback(
    (newCity?: string) => {
      dispatch(profileActions.updateProfile({ city: newCity || "" }));
    },
    [dispatch],
  );

  const onChangeCurrency = useCallback(
    (currency: Currency) => {
      dispatch(profileActions.updateProfile({ currency }));
    },
    [dispatch],
  );

  const onChangeCountry = useCallback(
    (country: Country) => {
      dispatch(profileActions.updateProfile({ country }));
    },
    [dispatch],
  );
  const onChangeUsername = useCallback(
    (newUsername?: string) => {
      dispatch(profileActions.updateProfile({ username: newUsername || "" }));
    },
    [dispatch],
  );
  const onChangeAvatar = useCallback(
    (newAvatar?: string) => {
      dispatch(profileActions.updateProfile({ avatar: newAvatar || "" }));
    },
    [dispatch],
  );

  return (
    <DynamicModuleLoader reducers={reducers}>
       <Page className={className}>
        <ProfilePageHeader />
        {validateErrors?.length &&
          validateErrors.map((err) => (
            <Text
              theme={TextTheme.ERROR}
              text={validateErrorTranslate[err]}
              key={err}
            />
          ))}
        <ProfileCard
          data={formData}
          isLoading={isLoading}
          error={error}
          onChangeFirstname={onChangeFirstname}
          onChangeLastname={onChangeLastname}
          onChangeAge={onChangeAge}
          onChangeCity={onChangeCity}
          onChangeUsername={onChangeUsername}
          onChangeAvatar={onChangeAvatar}
          readonly={!canEdit || readonly}
          onChangeCurrency={onChangeCurrency}
          onChangeCountry={onChangeCountry}
        />
      </Page>
    </DynamicModuleLoader>
  );
});

export default ProfilePage;
ProfilePage.displayName = "ProfilePage";
