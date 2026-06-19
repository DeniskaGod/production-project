import React, { useCallback } from "react";
import cls from "./Navbar.module.scss";
import { classNames } from "@/shared/lib/classNames/classNames";
import { Modal } from "@/shared/ui/Modal/Modal";
import { t } from "i18next";
import { useTranslation } from "react-i18next";
import Button, { ThemeButton } from "@/shared/ui/Button/Button";

interface NavbarProps {
  className?: string;
}

export const Navbar = ({ className }: NavbarProps) => {
  const { t } = useTranslation();
  const [isAuthModal, setIsAuthModal] = React.useState(false);

  const onToggleModal = useCallback(() => {
    setIsAuthModal((prev) => !prev);
  }, []);

  return (
    <div className={classNames(cls.navbar, {}, className ? [className] : [])}>
      <Button theme={ThemeButton.CLEAR_INVERTED} className={cls.links} onClick={onToggleModal}>
        {t("Войти")}
      </Button>
      <Modal className="test" isOpen={isAuthModal} onClose={onToggleModal}>
        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit omnis
          perspiciatis cupiditate porro repudiandae eos cum magnam ex, excepturi
          nesciunt, tempore maiores illum velit.
        </div>
      </Modal>
    </div>
  );
};
