import { getServerAuthSession } from "@/server/auth";
import { type NextPage } from "next";
import dynamic from "next/dynamic";
import Link from "next/link";

const PostFeed = dynamic(() => import("@/components/features/posts"));

const Home: NextPage = async () => {
  const session = await getServerAuthSession();

  return (
    <section className="mt-9 flex flex-col gap-10 max-md:mt-0">
      {!session ? (
        <Link
          href={"/auth/sign-in"}
          className="text-heading1-bold text-light-4 hover:underline"
        >{`Sign in-->>>>`}</Link>
      ) : (
        <>
          <header className="sticky top-0 z-10 w-full rounded-sm border-b bg-slate-700 pt-2">
            <h1 className="mb-2 px-4 text-lg font-bold text-white">
              Post feed
            </h1>
          </header>
          <PostFeed user={session.user} />
        </>
      )}
    </section>
  );
};

export default Home;
