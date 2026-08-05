import { classNames, Mods } from "@/shared/lib/classNames/classNames";
import React, { memo, useMemo } from "react";
import cls from "./Select.module.scss";

export interface SelectOption<T extends string> {
  value: T;
  content: string;
}

interface SelectProps<T extends string> {
  className?: string;
  label?: string;
  options?: SelectOption<T>[];
  value?: T;
  onChange?: (value: T) => void;
  readonly?: boolean;
}

export const Select = <T extends string>(props: SelectProps<T>) => {
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
      onChange?.(e.target.value as T);
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
};

Select.displayName = "Select";