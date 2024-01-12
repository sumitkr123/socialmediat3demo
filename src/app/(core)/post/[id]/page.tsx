import { getServerAuthSession } from "@/server/auth";
import { api } from "@/trpc/server";
import { PostByIdScreenParams } from "@/types";
import dynamic from "next/dynamic";

const PostWithComments = dynamic(
  () => import("@/components/features/posts/PostWithComments"),
);

const PostByIdPage = async ({ params }: PostByIdScreenParams) => {
  if (!params.id) return null;
  const session = await getServerAuthSession();

  if (!session) return null;

  const userInfo = await api.user.getUserById.query({
    userId: session.user.id,
  });

  return (
    <section className="relative">
      <PostWithComments postId={params.id} userInfo={userInfo} />
    </section>
  );
};

export default PostByIdPage;
