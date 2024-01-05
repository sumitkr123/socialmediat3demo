import { getServerAuthSession } from "@/server/auth";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await getServerAuthSession();

  if (session === null) redirect("/sign-in");

  return (
    <div className="flex h-screen flex-1 flex-col items-center justify-center">
      <h1>SignOut</h1>
    </div>
  );
}
