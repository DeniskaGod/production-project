import React, { memo, useCallback } from "react";
import { useNavigate } from "react-router-dom"; // ✅ импорт
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

export const Navbar = memo(({ className }: NavbarProps) => {
  const { t } = useTranslation();
  const [isAuthModal, setIsAuthModal] = React.useState(false);
  const authData = useSelector(getUserAuthData);
  const dispatch = useDispatch();
  const navigate = useNavigate(); // ✅ добавляем navigate

  const onCloseModal = useCallback(() => {
    setIsAuthModal(false);
  }, []);

  const onShowModal = useCallback(() => {
    setIsAuthModal(true);
  }, []);

  const onLogout = useCallback(() => {
    dispatch(userActions.logout());
    navigate("/"); // ✅ редирект на главную
  }, [dispatch, navigate]);

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
});
Navbar.displayName = "Navbar";