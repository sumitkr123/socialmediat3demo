import { User } from "next-auth";
import { BuiltInProviderType } from "next-auth/providers/index";
import { ClientSafeProvider } from "next-auth/react";
import { LinkProps } from "next/link";
import { LiteralUnion } from "react-hook-form";

export type PostFeedProps = {
  user: User | null;
};

export type PostCardProps = {
  id: number;
  currentUserId: string;
  content: string;
  author:
    | string
    | {
        id: string;
        name: string;
        email: string;
        emailVerified: Date | null;
        password: string | null;
        image: string | null;
        createdAt: Date;
        updatedAt: Date;
      };
  createdAt: Date;
  comments: unknown[];
  isComment?: boolean;
  isPostLiked: boolean;
  likes: {
    user: {
      id: string;
      name: string;
      email: string;
      emailVerified: Date | null;
      password: string | null;
      image: string | null;
      createdAt: Date;
      updatedAt: Date;
    };
    userId: string;
  }[];
};

export type PostWithCommentsProps = {
  postId: string | number;
  userInfo: {
    id: string;
    name: string;
    email: string;
    emailVerified: Date | null;
    password: string | null;
    image: string | null;
    createdAt: Date;
    updatedAt: Date;
  } | null;
};

export type CommentProps = {
  postId: number;
  currentUserImg: string | null;
  currentUserId: string;
};

export type SignInProps = {
  providers: Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null;
};

export type SignUpProps = SignInProps;

export type OnlyLinkProps<T> = Pick<
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

export type ClassNameString<T> = OnlyLinkProps<T>["className"];

export type ClassNameMethod<T> = ({
  isActive,
}: {
  isActive: boolean;
}) => OnlyLinkProps<T>["className"];

export type NavLinkProps<T> = {
  [Property in keyof OnlyLinkProps<T> as Property extends "href"
    ? "to"
    : Property]-?: Property extends "className"
    ? ClassNameString<T> | ClassNameMethod<T>
    : OnlyLinkProps<T>[Property];
} & { key?: string };

export type FinaLinkProps<T> = {
  [Property in keyof Omit<NavLinkProps<T>, "to">]+?: Omit<
    NavLinkProps<T>,
    "to"
  >[Property];
} & Pick<NavLinkProps<T>, "to">;
