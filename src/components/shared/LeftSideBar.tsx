"use client";

import { sidebarLinks } from "@/utils";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { NavLink } from "../features/NavLink";

export const LeftSideBar = () => {
  const { data: session, status } = useSession();
  const user = session?.user;

  return (
    <nav className="custom-scrollbar leftsidebar">
      <ul className="flex w-full flex-1 flex-col gap-6 px-6">
        {sidebarLinks.map((link) => {
          return (
            <NavLink
              key={link.label}
              to={link.route as "/"}
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
          );
        })}

        <div className="mt-auto">
          {status === "unauthenticated" || user === null || !user ? (
            <li className="leftsidebar_link flex cursor-pointer gap-4 p-4 hover:bg-primary-500 hover:bg-opacity-40">
              <Image
                priority={true}
                src={"/assets/logout.svg"}
                alt={"Login"}
                width={24}
                height={24}
              />
              <button onClick={() => signIn()}>
                <p className="text-light-1 max-lg:hidden">Log in</p>
              </button>
            </li>
          ) : (
            <li className="leftsidebar_link flex cursor-pointer gap-4 p-4 hover:bg-primary-500 hover:bg-opacity-40">
              <Image
                priority={true}
                src={"/assets/logout.svg"}
                alt={"Logout"}
                width={24}
                height={24}
              />
              <button onClick={() => signOut()}>
                <p className="text-light-1 max-lg:hidden">Log out</p>
              </button>
            </li>
          )}
        </div>
      </ul>
    </nav>
  );
};