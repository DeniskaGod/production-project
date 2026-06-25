import React, { useCallback } from "react";
import cls from "./Navbar.module.scss";
import { classNames } from "@/shared/lib/classNames/classNames";
import { Modal } from "@/shared/ui/Modal/Modal";
import { t } from "i18next";
import { useTranslation } from "react-i18next";
import Button, { ThemeButton } from "@/shared/ui/Button/Button";
import { LogError } from "concurrently";
import { LoginModal } from "@/features/AuthByUsername/ui/LoginModal/LoginModal";

interface NavbarProps {
  className?: string;
}

export const Navbar = ({ className }: NavbarProps) => {
  const { t } = useTranslation();
  const [isAuthModal, setIsAuthModal] = React.useState(false);

  const onCloseModal = useCallback(() => {
    setIsAuthModal(false);
  }, []);

  const onShowModal = useCallback(() => {
    setIsAuthModal(true);
  }, []);

  return (
    <div className={classNames(cls.navbar, {}, className ? [className] : [])}>
      <Button theme={ThemeButton.CLEAR_INVERTED} className={cls.links} onClick={onShowModal}>
        {t("Войти")}
      </Button>
      <LoginModal isOpen={isAuthModal} onClose={onCloseModal} />
    </div>
  );
};
