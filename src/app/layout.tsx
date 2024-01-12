import "@/styles/globals.css";

import dynamic from "next/dynamic";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["cyrillic"] });

export const metadata = {
  title: "Create T3 App",
  description: "Generated by create-t3-app",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const Providers = dynamic(() => import("@/provider/Providers"));
const SignedIn = dynamic(() => import("@/provider/SignedIn"));
const SignedOut = dynamic(() => import("@/provider/SignedOut"));
const LeftSideBar = dynamic(() => import("@/components/shared/LeftSideBar"));
const BottomBar = dynamic(() => import("@/components/shared/BottomBar"));
const Toaster = dynamic(() => import("@/components/ui/sonner"));

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} custom-scrollbar`}>
        <main className="flex flex-row">
          <Providers>
            <SignedIn>
              <LeftSideBar />
              <section className="main-container max-md:p-0">
                <div className="w-full max-w-4xl">{children}</div>
              </section>
              <BottomBar />
            </SignedIn>
            <SignedOut>
              <section className="main-container">{children}</section>
            </SignedOut>
            <Toaster />
          </Providers>
        </main>
      </body>
    </html>
  );
}
