import { useTranslation } from "react-i18next";
import { memo } from "react";
import cls from "./ArticleImageBlockComponent.module.scss";
import { ArticleImageBlock } from "../../model/types/article";
import { Text, TextAlign } from "@/shared/ui/Text/Text";
import { classNames } from "@/shared/lib/classNames/classNames";
import { useLanguage } from "@/shared/lib/hooks/useLanguage/useLanguage";

interface ArticleImageBlockComponentProps {
  className?: string;
  block: ArticleImageBlock;
}

export const ArticleImageBlockComponent = memo(
  (props: ArticleImageBlockComponentProps) => {
    const { className, block } = props;
    const { currentLang } = useLanguage();

    const title = block.title?.[currentLang] || block.title?.ru || "";

    return (
      <div
        className={classNames(
          cls.ArticleImageBlockComponent,
          {},
          className ? [className] : [],
        )}
      >
        <img src={block.src} alt={title} className={cls.img} />
        {title && <Text text={title} align={TextAlign.CENTER} />}
      </div>
    );
  },
);

ArticleImageBlockComponent.displayName = "ArticleImageBlockComponent";
