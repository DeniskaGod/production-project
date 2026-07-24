import MainIcon from "@/shared/assets/icons/main.svg";
import AboutIcon from "@/shared/assets/icons/about.svg";
import ProfileIcon from "@/shared/assets/icons/profile.svg";
import ArticleIcon from "@/shared/assets/icons/article.svg";
import { RoutePath } from "@/shared/config/routeConfig/routeConfig";

export interface SidebarItemType {
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
  text: string;
  path: string;
  authOnly?: boolean;
}

export const getSidebarItems = (userId?: string): SidebarItemType[] => {

  const profilePath = userId 
    ? `${RoutePath.profile}${userId}` 
    : RoutePath.profile;

  return [
    {
      Icon: MainIcon,
      text: "Главная",
      path: RoutePath.main,
    },
    {
      Icon: AboutIcon,
      text: "О сайте",
      path: RoutePath.about,
    },
    {
      Icon: ProfileIcon,
      text: "Профиль",
      path: profilePath, 
      authOnly: true,
    },
    {
      Icon: ArticleIcon,
      text: "Статьи",
      path: RoutePath.articles,
      authOnly: true,
    },
  ];
};

export const SidebarItemsList = getSidebarItems();