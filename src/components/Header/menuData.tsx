import { Menu } from "@/types/menu";


const menuData: Menu[] = [
  {
    id: 1,
    label: "Home",
   href: "/",
    newTab: false,
  },
  {
    id: 2,
    label: "About",
   href: "/about",
    newTab: false,
  },
  {
    id: 3,
    label: "Work",
   href: "/work",
    newTab: false,
  },
  // {
  //   id: 3,
  //   label: "Services",
  //  href: "/services",
  //   newTab: false,
  // },
  {
    id: 4,
    label: "Pricing",
   href: "/pricing",
    newTab: false,
  },
  {
    id: 5,
    label: "Blog",
   href: "/articles",
    newTab: false,
  },
  {
    id: 6,
    label: "Contact",
   href: "/contact",
    newTab: false,
  },
  
];
export default menuData;