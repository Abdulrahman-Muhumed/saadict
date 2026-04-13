import {
  Briefcase,
  Building2,
  Bot,
  Globe,
  Layers3,
  Smartphone,
  type LucideIcon,
} from "lucide-react";

export type Service = {
  id: string;
  translationKey: string;
  icon: LucideIcon;
  Image?: string;
  comingSoon?: boolean;
};

export const services: Service[] = [
  {
    id: "saas-development",
    translationKey: "saas",
    icon: Layers3,
    Image: "/services/saas.jpg",
  },
  {
    id: "website-development",
    translationKey: "websites",
    icon: Globe,
    Image: "/services/webapp.jpg",
  },
  {
    id: "web-app-development",
    translationKey: "webApps",
    icon: Building2,
    Image: "/services/webapps.jpg",
  },
  {
    id: "mobile-app-development",
    translationKey: "mobile",
    icon: Smartphone,
    Image: "/services/mobiledev.jpg",
  },
  {
    id: "consulting",
    translationKey: "consulting",
    icon: Briefcase,
    Image: "/services/Consulting.jpg",
  },
  {
    id: "ai-apps",
    translationKey: "ai",
    icon: Bot,
    Image: "/services/ai_apps.jpg",
    comingSoon: true,
  },
];