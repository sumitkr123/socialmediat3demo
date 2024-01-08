import { SignIn } from "@/components/forms/sign-in";
import { getServerAuthSession } from "@/server/auth";
import { getProviders } from "next-auth/react";
import { redirect } from "next/navigation";

const LoginPage = async () => {
  const session = await getServerAuthSession();

  if (session !== null) redirect("/");

  const providers = await getProviders();

  return (
    <div className="flex h-screen flex-1 flex-col items-center justify-center">
      <SignIn providers={providers} />
    </div>
  );
};

export default LoginPage;
