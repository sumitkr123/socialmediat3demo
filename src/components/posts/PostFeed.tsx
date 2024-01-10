"use client";

import { api } from "@/trpc/client";
import { User } from "next-auth";
import PostCards from "../cards/PostCards";
import { Loader } from "../shared/Loader";

type PostFeedProps = {
  user: User | null;
};

const PostFeed = ({ user }: PostFeedProps) => {
  const { data: posts, isLoading } = api.post.getAllPosts.useQuery({
    includeAuthor: true,
    includecomments: true,
    includeLikes: true,
  });

  return (
    <div className="flex flex-col gap-10 max-md:px-10">
      {isLoading ? (
        <Loader />
      ) : posts?.length === 0 || !posts ? (
        <p className="text-center text-2xl text-light-3">No posts found</p>
      ) : (
        posts.map((post) => {
          return (
            <PostCards
              key={post.id}
              id={post.id}
              currentUserId={user !== null && user ? user.id : ""}
              content={post.content}
              author={JSON.stringify(post.createdBy)}
              createdAt={post.createdAt}
              comments={post.comments}
              isPostLiked={
                [...post.likes].some(({ userId }) => {
                  return userId === user?.id;
                }) ?? false
              }
            />
          );
        })
      )}
    </div>
  );
};

export default PostFeed;
