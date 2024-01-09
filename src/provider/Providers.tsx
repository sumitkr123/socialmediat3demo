import { TRPCReactProvider } from "@/trpc/client";
import { cookies } from "next/headers";
import { ReactNode } from "react";
import CustomAuthProvider from "./CustomAuthProvider";
import NextAuthProvider from "./SessionProvider";
import { ThemeProvider } from "./ThemeProvider";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <NextAuthProvider>
        <CustomAuthProvider>
          <TRPCReactProvider cookies={cookies().toString()}>
            {children}
          </TRPCReactProvider>
        </CustomAuthProvider>
      </NextAuthProvider>
    </ThemeProvider>
  );
}
