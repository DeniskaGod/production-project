import { classNames, Mods } from "@/shared/lib/classNames/classNames";
import React, { memo, useMemo } from "react";
import cls from "./Select.module.scss";

export interface SelectOption {
  value: string;
  content: string;
}

interface SelectProps {
  className?: string;
  label?: string;
  options?: SelectOption[];
  value?: string;
  onChange?: (value: string) => void;
  readonly?: boolean;
}

export const Select = memo((props: SelectProps) => {
  const {
    className,
    label,
    options,
    value,
    onChange,
    readonly,
  } = props;

  const optionList = useMemo(() => {
    return options?.map((opt) => {
      return (
        <option key={opt.value} value={opt.value}>
          {opt.content}
        </option>
      );
    });
  }, [options]);

  const onChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (!readonly) {
      onChange?.(e.target.value);
    }
  };

  const mods: Mods = {
    [cls.readonly]: readonly || false,
  };

  return (
    <div
      className={classNames(cls.Wrapper, mods, className ? [className] : [])}
    >
      {label && <span className={cls.label}>{label + ">"}</span>}
      <select 
        className={cls.select} 
        value={value} 
        onChange={onChangeHandler}
        disabled={readonly}
      >
        {optionList}
      </select>
    </div>
  );
});

Select.displayName = "Select";