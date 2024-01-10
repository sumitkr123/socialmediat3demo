import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { UrlObject } from "url";

export const sidebarLinks: Array<{
  imgURL: string | StaticImport;
  route: UrlObject | __next_route_internal_types__.RouteImpl<"/">;
  label: string;
}> = [
  {
    imgURL: "/assets/home.svg",
    route: "/",
    label: "Home",
  },
  {
    imgURL: "/assets/search.svg",
    route: "/search",
    label: "Search",
  },
  {
    imgURL: "/assets/create.svg",
    route: "/post/create",
    label: "Post",
  },
  {
    imgURL: "/assets/user.svg",
    route: "/profile",
    label: "Profile",
  },
];
