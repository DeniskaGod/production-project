import { classNames } from "@/shared/lib/classNames/classNames";
import React, { useCallback } from "react";
import cls from "./ProfilePageHeader.module.scss";
import { Button, ThemeButton } from "@/shared/ui/Button/Button";
import { useTranslation } from "react-i18next";
import { Text } from "@/shared/ui/Text/Text";
import { getProfileReadonly } from "@/entities/Profile/model/selectors/getProfileReadonly/getProfileReadonly";
import { useSelector } from "react-redux";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch";
import { profileActions } from "@/entities/Profile";
import { updateProfileData } from "@/entities/Profile/model/services/updateProfileData/updateProfileData";

interface ProfilePageHeaderProps {
  className?: string;
}

export default function ProfilePageHeader({
  className,
}: ProfilePageHeaderProps) {
  const { t } = useTranslation("profile");
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
    <div
      className={classNames(
        cls.ProfilePageHeader,
        {},
        className ? [className] : [],
      )}
    >
      <Text title={t("Профиль")} />
      {readonly ? (
        <Button
          className={cls.editBtn}
          theme={ThemeButton.OUTLINE}
          onClick={onEdit}
        >
          {t("Редактировать")}
        </Button>
      ) : (
        <>
          <Button
            className={cls.editBtn}
            theme={ThemeButton.OUTLINE_RED}
            onClick={onCancel}
          >
            {t("Отменить")}
          </Button>
          <Button
            className={cls.saveBtn}
            theme={ThemeButton.OUTLINE}
            onClick={onSave}
          >
            {t("Сохранить")}
          </Button>
        </>
      )}
    </div>
  );
}
