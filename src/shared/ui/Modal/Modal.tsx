import { classNames } from "@/shared/lib/classNames/classNames";
import React, { useCallback, useEffect } from "react";
import cls from "./Modal.module.scss";
import Portal from "../Portal/Portal";

interface ModalProps {
  className?: string; // Добавьте ? чтобы сделать опциональным
  children?: React.ReactNode; // Добавьте ? чтобы сделать опциональным
  isOpen?: boolean; // Добавьте ? чтобы сделать опциональным
  onClose?: () => void;
}

export const Modal = (props: ModalProps) => {
  const { className, children, isOpen, onClose } = props;

  const [isClosing, setIsClosing] = React.useState(false);
  const timerRef = React.useRef<ReturnType<typeof setTimeout>>();

  const closeHandler = useCallback(() => {
    if (onClose) {
      setIsClosing(true);
      timerRef.current = setTimeout(() => {
        onClose();
        setIsClosing(false);
      }, 300);
    }
  }, [onClose]);

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeHandler();
      }
    },
    [closeHandler],
  );

  useEffect(() => {
    if (isOpen) {
      window.addEventListener("keydown", onKeyDown);
    }
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [isOpen, onKeyDown]);

  const mods: Record<string, boolean> = {
    [cls.opened]: isOpen ?? false,
    [cls.isClosing]: isClosing,
  };

  return (
    <Portal>
      <div
        className={classNames(cls.Modal, mods, className ? [className] : [])}
      >
        <div className={cls.overlay} onClick={closeHandler}>
          <div className={cls.content} onClick={(e) => e.stopPropagation()}>
            {children}
          </div>
        </div>
      </div>
    </Portal>
  );
};

export default Modal;
