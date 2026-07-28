import { memo } from "react";
import TiledIcon from "@/shared/assets/icons/tiled.svg";
import ListIcon from "@/shared/assets/icons/list.svg";
import cls from "./ArticleViewSelector.module.scss";
import { ArticleView } from "../../model/types/article";
import Button, { ThemeButton } from "@/shared/ui/Button/Button";
import { classNames } from "@/shared/lib/classNames/classNames";
import { Icon } from "@/shared/ui/Icon/Icon";

interface ArticleViewSelectorProps {
  className?: string;
  view: ArticleView;
  onViewClick?: (view: ArticleView) => void;
}

const viewTypes = [
  {
    view: ArticleView.SMALL,
    icon: TiledIcon,
  },
  {
    view: ArticleView.BIG,
    icon: ListIcon,
  },
];

export const ArticleViewSelector = memo((props: ArticleViewSelectorProps) => {
  const { className, view, onViewClick } = props;

  const onClick = (newView: ArticleView) => () => {
    onViewClick?.(newView);
  };

  return (
    <div
      className={classNames(
        cls.ArticleViewSelector,
        {},
        className ? [className] : [],
      )}
    >
      {viewTypes.map((viewType) => (
        <Button
          theme={ThemeButton.CLEAR}
          onClick={onClick(viewType.view)}
          key={viewType.view}
        >
          <Icon
            Svg={viewType.icon}
            className={classNames("", {
              [cls.notSelected]: viewType.view !== view,
            })}
          />
        </Button>
      ))}
    </div>
  );
});

ArticleViewSelector.displayName = "ArticleViewSelector";
