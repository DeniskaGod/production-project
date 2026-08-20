import { memo } from "react";
import cls from "./Icon.module.scss";
import { classNames } from "@/shared/lib/classNames/classNames";

interface IconProps {
  className?: string;
  Svg: React.FunctionComponent<React.SVGProps<SVGSVGElement>>; // ✅ VFC → FunctionComponent
}

export const Icon = memo((props: IconProps) => {
  const { className, Svg } = props;

  return (
    <Svg className={classNames(cls.Icon, {}, className ? [className] : [])} />
  );
});

Icon.displayName = "Icon";
