"use client";

import { sidebarLinks } from "@/utils";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { NavLink } from "./NavLink";

const LeftSideBar = () => {
  const { data: session, status } = useSession();
  const user = session?.user;

  return (
    <nav className={`leftsidebar`}>
      <ul className="flex w-full flex-1 flex-col gap-6 px-6">
        {sidebarLinks.map((link) => {
          return (
            <li key={link.label}>
              <Tooltip>
                <TooltipTrigger>
                  <NavLink
                    to={link.route}
                    className={({ isActive }) => {
                      return `leftsidebar_link ${
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
                    <p className="text-light-1 max-lg:hidden">{link.label}</p>
                  </NavLink>
                </TooltipTrigger>
                <TooltipContent className="bg-black" side="right">
                  <p className="text-white">{link.label}</p>
                </TooltipContent>
              </Tooltip>
            </li>
          );
        })}

        <li className="mt-auto">
          <Tooltip>
            <TooltipTrigger>
              {status === "unauthenticated" || user === null || !user ? (
                <Link
                  href={"/auth/sign-in"}
                  className="leftsidebar_link flex cursor-pointer gap-4 p-4 hover:bg-primary-500 hover:bg-opacity-40"
                >
                  <Image
                    priority={true}
                    src={"/assets/logout.svg"}
                    alt={"Login"}
                    width={24}
                    height={24}
                  />
                  <p className="text-light-1 max-lg:hidden">Log in</p>
                </Link>
              ) : (
                <span
                  onClick={async () => await signOut()}
                  className="leftsidebar_link flex cursor-pointer gap-4 p-4 hover:bg-primary-500 hover:bg-opacity-40"
                >
                  <Image
                    priority={true}
                    src={"/assets/logout.svg"}
                    alt={"Logout"}
                    width={24}
                    height={24}
                  />
                  <p className="text-light-1 max-lg:hidden">Log out</p>
                </span>
              )}
            </TooltipTrigger>
            <TooltipContent className="bg-black" side="right">
              <p className="text-white">
                {status === "unauthenticated" || user === null || !user
                  ? "Log in"
                  : "Log out"}
              </p>
            </TooltipContent>
          </Tooltip>
        </li>
      </ul>
    </nav>
  );
};

export default LeftSideBar;
