"use client";

import Comment from "@/components/forms/comment";
import { Loader } from "@/components/shared/Loader";
import { api } from "@/trpc/client";
import { PostWithCommentsProps } from "@/types";
import PostCards from "./PostCards";

const PostWithComments = ({ postId, userInfo }: PostWithCommentsProps) => {
  const { data: post, isLoading } = api.post.getPostById.useQuery({
    postId: typeof postId === "number" ? postId : parseInt(postId),
  });

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : post !== null && userInfo !== null && post ? (
        <div className="flex flex-col">
          <PostCards
            key={post.id}
            id={post.id}
            currentUserId={userInfo !== null ? userInfo.id : ""}
            content={post.content}
            author={JSON.stringify(post.createdBy)}
            createdAt={post.createdAt}
            comments={post.comments}
            isPostLiked={
              [...post.likes].some(({ userId }) => {
                return userId === userInfo?.id;
              }) ?? false
            }
            likes={post.likes}
          />
          <div className="mt-7">
            <Comment
              postId={post.id}
              currentUserImg={userInfo.image}
              currentUserId={userInfo?.id}
            />
          </div>
          {post.comments.length > 0 && (
            <div className="mt-10">
              {post.comments.map((comment) => {
                return (
                  <div key={comment.id.toString()} className="mt-10">
                    <PostCards
                      key={comment.id}
                      id={comment.id}
                      currentUserId={userInfo !== null ? userInfo.id : ""}
                      content={comment.content}
                      author={JSON.stringify(comment.createdBy)}
                      createdAt={comment.createdAt}
                      comments={comment.comments}
                      isComment
                      isPostLiked={
                        [...comment.likes].some(({ userId }) => {
                          return userId === userInfo?.id;
                        }) ?? false
                      }
                      likes={comment.likes}
                    />
                  </div>
                );
              })}
            </div>
          )}
        </div>
      ) : (
        <h1 className="text-light-1">Resource not found..!</h1>
      )}
    </>
  );
};

export default PostWithComments;
