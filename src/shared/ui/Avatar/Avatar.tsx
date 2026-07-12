import { classNames, Mods } from "@/shared/lib/classNames/classNames";
import React, { CSSProperties, useMemo } from "react";
import cls from "./Avatar.module.scss";

interface AvatarProps {
  className?: string;
  src?: string;
  alt?: string;
  size?: number;
}

export default function Avatar({ className, src, alt, size }: AvatarProps) {
    const styles = useMemo<CSSProperties>(() => {
        return {
            width: size || 100,
            height: size || 100,
        }
    }, [size])
  return (
    <img
      src={src}
      alt={alt}
      style={styles}
      className={classNames(cls.Avatar, {}, className ? [className] : [])}
    />
  );
}
