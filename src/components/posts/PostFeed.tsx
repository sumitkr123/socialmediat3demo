"use client";

import { api } from "@/trpc/client";
import { User } from "next-auth";
import { useMemo } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import PacmanLoader from "react-spinners/PacmanLoader";
import PostCards from "../cards/PostCards";

type PostFeedProps = {
  user: User | null;
};

const PostFeed = ({ user }: PostFeedProps) => {
  const { data, isLoading, fetchNextPage, hasNextPage } =
    api.post.getInfinitePosts.useInfiniteQuery(
      {
        includeAuthor: true,
        includecomments: true,
        includeLikes: true,
        limit: 5,
      },
      {
        getNextPageParam: (lastPage) => {
          return lastPage.nextCursor;
        },
      },
    );

  const posts = useMemo(() => {
    if (data?.pages.length) {
      return data?.pages.flatMap((page) => {
        return page.result;
      });
    }
    return [];
  }, [data?.pages.length]);

  return (
    <div className="no-scrollbar flex flex-col max-md:px-10">
      {isLoading ? (
        <PacmanLoader
          color={"white"}
          loading={true}
          cssOverride={{
            alignSelf: "center",
          }}
          size={50}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      ) : posts ? (
        <InfiniteScroll
          dataLength={posts?.length}
          className="no-scrollbar flex flex-col gap-8"
          hasMore={hasNextPage ?? false}
          loader={
            <PacmanLoader
              color={"white"}
              loading={true}
              cssOverride={{
                alignSelf: "center",
              }}
              size={50}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          }
          next={fetchNextPage}
        >
          {posts?.map((post) => {
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
                likes={post.likes}
              />
            );
          })}
        </InfiniteScroll>
      ) : (
        <h1>No Posts found..!</h1>
      )}
    </div>
  );
};

export default PostFeed;
