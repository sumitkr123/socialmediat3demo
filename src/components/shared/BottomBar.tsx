"use client";

import { sidebarLinks } from "@/utils";
import Image from "next/image";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { NavLink } from "./NavLink";

const BottomBar = () => {
  return (
    <section className="bottombar">
      <div className="bottombar_container">
        {sidebarLinks.map((link) => {
          return (
            <Tooltip key={link.label}>
              <TooltipTrigger>
                <NavLink
                  to={link.route}
                  className={({ isActive }) => {
                    return `bottombar_link ${
                      isActive
                        ? "bg-primary-500"
                        : "hover:bg-primary-500 hover:bg-opacity-40"
                    }`;
                  }}
                >
                  <Image
                    priority={true}
                    src={link.imgURL}
                    alt={link.label}
                    width={24}
                    height={24}
                  />
                  <p className="text-subtle-medium text-light-1 max-xs:hidden">
                    {link.label.split(/\s/)[0]}
                  </p>
                </NavLink>
              </TooltipTrigger>
              <TooltipContent className="bg-black" side="top">
                <p className="text-white">{link.label}</p>
              </TooltipContent>
            </Tooltip>
          );
        })}
      </div>
    </section>
  );
};

export default BottomBar;
