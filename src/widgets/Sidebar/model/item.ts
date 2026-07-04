import MainIcon from "@/shared/assets/icons/main.svg";
import AboutIcon from "@/shared/assets/icons/about.svg";
import ProfileIcon from "@/shared/assets/icons/profile.svg";
import { RoutePath } from "@/shared/config/routeConfig/routeConfig";
export interface SidebarItemType {
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
  text: string;
  path: string;
}

export const SidebarItemsList: SidebarItemType[] = [
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
    path: RoutePath.profile,
  },
];
