"use client";

import { FinaLinkProps } from "@/types";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function NavLink<T>(props: FinaLinkProps<T>) {
  const pathName = usePathname();

  const isActive = pathName === props.to;

  return (
    <Link
      {...props}
      className={
        typeof props.className === "string"
          ? props.className
          : props.className?.({ isActive })
      }
      href={props.to}
    />
  );
}
