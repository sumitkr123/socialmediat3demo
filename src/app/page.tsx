import { getServerAuthSession } from "@/server/auth";
import { type NextPage } from "next";
import Link from "next/link";

const Home: NextPage = async () => {
  const session = await getServerAuthSession();

  return (
    <section className="mt-9 flex flex-col gap-10">
      {!session ? (
        <Link
          href={"/auth/sign-in"}
          className="text-heading1-bold text-light-4 hover:underline"
        >{`Sign in-->>>>`}</Link>
      ) : (
        <header className="sticky top-0 z-10 border-b bg-white pt-2">
          <h1 className="mb-2 px-4 text-lg font-bold">Home</h1>
        </header>
      )}
    </section>
  );
};

export default Home;
