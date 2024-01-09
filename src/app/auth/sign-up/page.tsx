import { getServerAuthSession } from "@/server/auth";
import { getProviders } from "next-auth/react";
import dynamic from "next/dynamic";
import { redirect } from "next/navigation";

const SignUp = dynamic(() => import("@/components/forms/sign-up"));

const RegisterPage = async () => {
  const session = await getServerAuthSession();

  if (session !== null) redirect("/");

  const providers = await getProviders();

  return (
    <div className="fixed flex h-screen flex-1 flex-col items-center justify-center self-center">
      <SignUp providers={providers} />
    </div>
  );
};

export default RegisterPage;
