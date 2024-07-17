import { NavItem } from "@/core/interfaces/navbar.interface";
import { Package, PackagePlus } from "lucide-react";

export const NavItems: NavItem[] = [
    {
      title: "Meus produtos",
      icon: Package,
      href: "/managment",
      color: "text-primary",
    },  
    {
      title: "Publicar / Editar produto",
      icon: PackagePlus,
      href: "/managment/createProduct",
      color: "text-primary",
      routerTags: ['/managment/product']
    }, 
];

/*   {
      title: "eventos",
      icon: HomeIcon,
      href: "/managment/events",
      color: "text-orange-500",
      isChidren: true,
      children: [
        {
          title: "eventos-01",
          icon: HomeIcon,
          color: "text-red-500",
          href: "/",
        },
        {
          title: "Example-02",
          icon: HomeIcon,
          color: "text-red-500",
          href: "/",
        },
        {
          title: "eventos-03",
          icon: HomeIcon,
          color: "text-red-500",
          href: "/",
        },
      ],
    }, */