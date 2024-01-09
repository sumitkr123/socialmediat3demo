"use client";

import { Loader } from "@/components/shared/Loader";
import { useAuthStatus } from "@/hooks/useAuthStatus";
import { ReactNode } from "react";

export default function SignedOut({ children }: { children: ReactNode }) {
  const { authenticated, isLoading } = useAuthStatus();

  if (isLoading) {
    return <Loader />;
  } else if (authenticated) {
    return null;
  } else {
    return children;
  }
}
