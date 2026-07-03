import { Modal } from "@/shared/ui/Modal/Modal";
import { Suspense } from "react";
import { LoginForm } from "../LoginForm/LoginForm";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal = ({ isOpen, onClose }: LoginModalProps) => (
  <Modal isOpen={isOpen} onClose={onClose} lazy>
    <LoginForm onSuccess={onClose} />
  </Modal>
);

export default LoginModal;
