import { SignUp } from "@/components/forms/sign-up";
import { getServerAuthSession } from "@/server/auth";
import { getProviders } from "next-auth/react";
import { redirect } from "next/navigation";

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
