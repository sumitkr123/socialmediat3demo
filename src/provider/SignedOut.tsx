"use client";

import { useSession } from "next-auth/react";
import { ReactNode } from "react";

export default function SignedOut({ children }: { children: ReactNode }) {
  const { data: session, status } = useSession();

  if (session === null || !session || status !== "authenticated") {
    return children;
  } else {
    return null;
  }
}
