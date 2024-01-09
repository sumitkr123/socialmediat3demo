"use client";

import { useSession } from "next-auth/react";
import { ReactNode, createContext, useEffect, useState } from "react";

export const AuthContext = createContext<{
  authenticated: boolean;
  isLoading: boolean;
}>({
  authenticated: false,
  isLoading: false,
});

export default function CustomAuthProvider({
  children,
}: {
  children: ReactNode;
}) {
  const { data: session } = useSession();

  const [authenticated, setAuthenticated] = useState<boolean>(
    session !== null && session ? true : false,
  );

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (session !== null && session) {
      setAuthenticated(true);
    } else {
      setAuthenticated(false);
    }
    setIsLoading(false);
  }, [session]);

  return (
    <AuthContext.Provider value={{ authenticated, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}
