import React from "react";
import { createPortal } from "react-dom";

interface PortalProps {
  children?: React.ReactNode;
  element?: HTMLElement;
}

export default function Portal({ children, element }: PortalProps) {
  return createPortal(children, element || document.body);
}
