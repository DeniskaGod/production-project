import { Country } from "@/shared/const/common";
import { classNames } from "@/shared/lib/classNames/classNames";
import { Select } from "@/shared/ui/Select/Select";
import { memo, useCallback } from "react";
import { useTranslation } from "react-i18next";

interface CountrySelectProps {
  className?: string;
  value?: Country;
  onChange?: (value: Country) => void;
  readonly?: boolean;
}

const options = [
  { value: Country.Moldova, content: Country.Moldova },
  { value: Country.Russia, content: Country.Russia },
  { value: Country.Belarus, content: Country.Belarus },
  { value: Country.Ukraine, content: Country.Ukraine },
];

export const CountrySelect = memo(
  ({ className, value, onChange, readonly }: CountrySelectProps) => {
    const { t } = useTranslation("profile");

    const onChangeHandler = useCallback(
      (value: string) => {
        onChange?.(value as Country);
      },
      [onChange],
    );

    return (
      <Select
        className={classNames("", {}, className ? [className] : [])}
        label={t("Укажите страну")}
        options={options}
        value={value}
        onChange={onChangeHandler}
        readonly={readonly}
      />
    );
  },
);

CountrySelect.displayName = "CountrySelect";