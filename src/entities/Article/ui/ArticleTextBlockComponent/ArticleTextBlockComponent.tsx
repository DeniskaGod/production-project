import { useTranslation } from "react-i18next";
import { memo } from "react";
import cls from "./ArticleTextBlockComponent.module.scss";
import { ArticleTextBlock } from "../../model/types/article";
import { Text } from "@/shared/ui/Text/Text";
import { classNames } from "@/shared/lib/classNames/classNames";
import { useLanguage } from "@/shared/lib/hooks/useLanguage/useLanguage";

interface ArticleTextBlockComponentProps {
  className?: string;
  block: ArticleTextBlock;
}

export const ArticleTextBlockComponent = memo(
  (props: ArticleTextBlockComponentProps) => {
    const { className, block } = props;
    const { currentLang } = useLanguage();

    const title = block.title?.[currentLang] || block.title?.ru || "";
    const paragraphs =
      (block.paragraphs?.[currentLang] || block.paragraphs?.ru || []) as string[];

    return (
      <div
        className={classNames(
          cls.ArticleTextBlockComponent,
          {},
          className ? [className] : [],
        )}
      >
        {title && <Text title={title} className={cls.title} />}
        {paragraphs.map((paragraph: string, index: number) => (
          <Text key={index} text={paragraph} className={cls.paragraph} />
        ))}
      </div>
    );
  },
);

ArticleTextBlockComponent.displayName = "ArticleTextBlockComponent";
