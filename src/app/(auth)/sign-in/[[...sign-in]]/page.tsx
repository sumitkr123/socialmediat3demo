import { getServerAuthSession } from "@/server/auth";
import { redirect } from "next/navigation";

export default async function Page({ params }: { params: any }) {
  console.log("🚀 ~ file: page.tsx:5 ~ Page ~ params:", params);

  const session = await getServerAuthSession();

  if (session !== null) redirect("/");

  return (
    <div className="flex h-screen flex-1 flex-col items-center justify-center">
      <h1 className="text-xl text-light-1">SignIn</h1>
    </div>
  );
}
