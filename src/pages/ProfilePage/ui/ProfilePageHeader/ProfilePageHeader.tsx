import { classNames } from "@/shared/lib/classNames/classNames";
import React, { useCallback } from "react";
import cls from "./ProfilePageHeader.module.scss";
import { Button, ThemeButton } from "@/shared/ui/Button/Button";
import { useTranslation } from "react-i18next";
import { Text } from "@/shared/ui/Text/Text";
import { getProfileReadonly } from "@/entities/Profile/model/selectors/getProfileReadonly/getProfileReadonly";
import { useSelector } from "react-redux";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch";
import { getProfileData, profileActions } from "@/entities/Profile";
import { updateProfileData } from "@/entities/Profile/model/services/updateProfileData/updateProfileData";
import { getUserAuthData } from "@/entities/User";
import { HStack } from "@/shared/ui/Stack";

interface ProfilePageHeaderProps {
  className?: string;
}

export default function ProfilePageHeader({
  className,
}: ProfilePageHeaderProps) {
  const { t } = useTranslation("profile");
  const authData = useSelector(getUserAuthData);
  const profileData = useSelector(getProfileData);
  const canEdit = authData?.id === profileData?.id;
  const readonly = useSelector(getProfileReadonly);
  const dispatch = useAppDispatch();

  const onEdit = useCallback(() => {
    dispatch(profileActions.setReadonly(false));
  }, [dispatch]);

  const onCancel = useCallback(() => {
    dispatch(profileActions.cancelEdit());
  }, [dispatch]);

  const onSave = useCallback(() => {
    dispatch(updateProfileData());
  }, [dispatch]);

  return (
    <HStack
      max
      justify="between"
      className={classNames(
        '',
        {},
        className ? [className] : [],
      )}
    >
      <Text title={t("Профиль")} />
      {canEdit && (
        <div>
          {readonly ? (
            <Button
              theme={ThemeButton.OUTLINE}
              onClick={onEdit}
            >
              {t("Редактировать")}
            </Button>
          ) : (
            <HStack gap="8">
              <Button
                theme={ThemeButton.OUTLINE_RED}
                onClick={onCancel}
              >
                {t("Отменить")}
              </Button>
              <Button
                theme={ThemeButton.OUTLINE}
                onClick={onSave}
              >
                {t("Сохранить")}
              </Button>
            </HStack>
          )}
        </div>
      )}
    </HStack>
  );
}
