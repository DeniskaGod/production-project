import React, { useCallback } from "react";
import cls from "./Navbar.module.scss";
import { classNames } from "@/shared/lib/classNames/classNames";
import { useTranslation } from "react-i18next";
import Button, { ThemeButton } from "@/shared/ui/Button/Button";
import { getUserAuthData, userActions } from "@/entities/User";
import { useDispatch, useSelector } from "react-redux";
import { LoginModalAsync } from "@/features/AuthByUsername/ui/LoginModal/LoginModal.async";

interface NavbarProps {
  className?: string;
}

export const Navbar = ({ className }: NavbarProps) => {
  const { t } = useTranslation();
  const [isAuthModal, setIsAuthModal] = React.useState(false);
  const authData = useSelector(getUserAuthData);
  const dispatch = useDispatch();
  const onCloseModal = useCallback(() => {
    setIsAuthModal(false);
  }, []);

  const onShowModal = useCallback(() => {
    setIsAuthModal(true);
  }, []);

  const onLogout = useCallback(() => {
    dispatch(userActions.logout());
  }, [dispatch]);

  if (authData) {
    return (
      <div className={classNames(cls.navbar, {}, className ? [className] : [])}>
        <Button
          theme={ThemeButton.CLEAR_INVERTED}
          className={cls.links}
          onClick={onLogout}
        >
          {t("Выйти")}
        </Button>
      </div>
    );
  }

  return (
    <div className={classNames(cls.navbar, {}, className ? [className] : [])}>
      <Button
        theme={ThemeButton.CLEAR_INVERTED}
        className={cls.links}
        onClick={onShowModal}
      >
        {t("Войти")}
      </Button>
      {isAuthModal && <LoginModalAsync isOpen={isAuthModal} onClose={onCloseModal} /> }
    </div>
  );
};
