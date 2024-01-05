"use client";

import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";

type OnlyLinkProps<T> = Pick<
  LinkProps<T>,
  | "href"
  | "className"
  | "onClick"
  | "target"
  | "children"
  | "style"
  | "title"
  | "download"
  | "dangerouslySetInnerHTML"
  | "prefetch"
  | "passHref"
  | "ref"
  | "prefix"
  | "inputMode"
>;

type ClassNameString<T> = OnlyLinkProps<T>["className"];

type ClassNameMethod<T> = ({
  isActive,
}: {
  isActive: boolean;
}) => OnlyLinkProps<T>["className"];

type NavLinkProps<T> = {
  [Property in keyof OnlyLinkProps<T> as Property extends "href"
    ? "to"
    : Property]-?: Property extends "className"
    ? ClassNameString<T> | ClassNameMethod<T>
    : OnlyLinkProps<T>[Property];
} & { key?: string };

type FinaLinkProps<T> = {
  [Property in keyof Omit<NavLinkProps<T>, "to">]+?: Omit<
    NavLinkProps<T>,
    "to"
  >[Property];
} & Pick<NavLinkProps<T>, "to">;

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
