"use client";

import { api } from "@/trpc/client";
import { PostCardProps } from "@/types";
import { useQueryClient } from "@tanstack/react-query";
import { getQueryKey } from "@trpc/react-query";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";
import { ScrollArea } from "../../ui/scroll-area";

const PostCards = ({
  id,
  currentUserId,
  content,
  author,
  createdAt,
  comments,
  isComment,
  isPostLiked,
  likes,
}: PostCardProps) => {
  const [postLiked, setPostLiked] = useState(isPostLiked ?? false);
  const [likers, setLikers] = useState(likes ?? []);

  const queryclient = useQueryClient();

  useEffect(() => {
    setPostLiked(isPostLiked);
    setLikers(likes);
  }, [isPostLiked, likes]);

  const infinitePostsQueryKey = useMemo(() => {
    return getQueryKey(api.post.getInfinitePosts);
  }, [getQueryKey]);

  const allPostsQueryKey = useMemo(() => {
    return getQueryKey(api.post.getAllPosts);
  }, [getQueryKey]);

  const postByIdQueryKey = useMemo(() => {
    return getQueryKey(api.post.getPostById);
  }, [getQueryKey]);

  const addLikeToPost = api.post.addLikeToPost.useMutation({
    onSuccess: (data) => {
      if (data) {
        queryclient.invalidateQueries({
          queryKey: infinitePostsQueryKey,
        });
        queryclient.invalidateQueries({
          queryKey: postByIdQueryKey,
        });
        queryclient.invalidateQueries({
          queryKey: allPostsQueryKey,
        });
      }
    },
    onError: ({ message }) => {
      setPostLiked(false);
      toast(message, { position: "top-right", duration: 1500 });
    },
  });

  const removeLikeFromPost = api.post.removeLikeFromPost.useMutation({
    onSuccess: (data) => {
      if (data) {
        queryclient.invalidateQueries({
          queryKey: infinitePostsQueryKey,
        });
        queryclient.invalidateQueries({
          queryKey: postByIdQueryKey,
        });
        queryclient.invalidateQueries({
          queryKey: allPostsQueryKey,
        });
      }
    },
    onError: ({ message }) => {
      setPostLiked(true);
      toast(message, { position: "top-right", duration: 1500 });
    },
  });

  const newId = useMemo(() => {
    if (id) {
      if (typeof id === "string") {
        return JSON.parse(id);
      } else {
        return id;
      }
    }
  }, [id]);

  const newAuthor = useMemo<{
    name: string;
    image: string;
    id: string;
  }>(() => {
    if (author) {
      if (typeof author === "string") {
        return JSON.parse(author);
      } else {
        return author;
      }
    }
  }, [author]);

  const newComments = useMemo<
    Array<{
      author: {
        image: string;
      };
    }>
  >(() => {
    if (comments) {
      if (typeof comments === "string") {
        return JSON.parse(comments);
      } else {
        return comments;
      }
    }
  }, [comments]);

  const hadleLikeOnThread = () => {
    if (postLiked) {
      setPostLiked(false);
      removeLikeFromPost.mutate({
        postId: id,
        userId: currentUserId,
      });
    } else {
      setPostLiked(true);
      addLikeToPost.mutate({
        postId: id,
        userId: currentUserId,
      });
    }
  };

  return (
    <Popover modal>
      <article
        className={`card flex w-full flex-col overflow-hidden rounded-xl ${
          isComment ? "px-0 xs:px-7" : "bg-dark-2 p-7"
        }`}
      >
        <div className="flex items-start justify-between">
          <div className="flex w-full flex-1 flex-row gap-4 ">
            <div className="flex flex-col items-center">
              <Link
                href={`/profile/${newAuthor.id}`}
                className="relative overflow-hidden rounded-full bg-slate-500"
              >
                <Image
                  priority={true}
                  src={
                    newAuthor.image !== null && newAuthor.image
                      ? newAuthor.image
                      : "/assets/user.svg"
                  }
                  alt="Profile Photo"
                  width={44}
                  height={44}
                  className="cursor-pointer"
                />
              </Link>

              <div className="thread-card_bar" />
            </div>

            <div className="flex w-full flex-col">
              <Link href={`/profile/${newAuthor.id}`} className="w-fit">
                <p className="cursor-pointer font-bold text-slate-400">
                  {newAuthor.name}
                </p>
              </Link>

              <p className="mt-5 whitespace-pre-line text-light-2">{content}</p>

              <div className="mt-5 flex flex-col gap-3">
                <div className="flex gap-3.5">
                  <Image
                    priority={true}
                    src={
                      postLiked
                        ? "/assets/heart-filled.svg"
                        : "/assets/heart-gray.svg"
                    }
                    alt="heart"
                    width={24}
                    height={24}
                    className="cursor-pointer object-contain"
                    onClick={
                      addLikeToPost.isLoading || removeLikeFromPost.isLoading
                        ? () => {}
                        : (e) => hadleLikeOnThread()
                    }
                  />
                  <Link href={`/post/${newId}`} className="min-h-fit min-w-fit">
                    <Image
                      priority={true}
                      src={"/assets/reply.svg"}
                      alt="reply"
                      width={24}
                      height={24}
                      className="cursor-pointer resize-none object-contain"
                    />
                    {!isComment && newComments.length > 0 && (
                      <div className="absolute ml-[13px] mt-[-32px] flex h-[12px] w-[12px] flex-1 items-center justify-center rounded-full bg-red-600 p-2">
                        <span className="text-subtle-medium text-xs text-light-1">
                          {newComments.length >= 10
                            ? newComments.length.toString() + "+"
                            : newComments.length}
                        </span>
                      </div>
                    )}
                  </Link>
                  <Image
                    priority={true}
                    src={"/assets/repost.svg"}
                    alt="repost"
                    width={24}
                    height={24}
                    className="cursor-pointer object-contain"
                  />
                  <Image
                    priority={true}
                    src={"/assets/share.svg"}
                    alt="share"
                    width={24}
                    height={24}
                    className="cursor-pointer object-contain"
                  />
                </div>
                <PopoverTrigger className="self-start">
                  <p className="cursor-pointer text-slate-600 hover:underline">
                    View all likes
                  </p>
                </PopoverTrigger>

                {isComment && newComments.length > 0 && (
                  <Link
                    href={`/post/${newId}`}
                    className="text-subtle-medium mt-1 inline-flex w-fit text-gray-1"
                  >
                    {newComments.length} replies
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>

        <PopoverContent className="flex h-32 items-center bg-slate-800">
          <ScrollArea className="flex flex-1 items-center">
            {likers.length > 0 ? (
              likers.map((like: any) => {
                return (
                  <Link
                    key={like.userId}
                    href={`/profile/${like.userId}`}
                    className="my-3 flex min-w-fit flex-col px-4 hover:scale-110"
                  >
                    <div className="flex gap-3">
                      <div className="min-h-fit min-w-fit rounded-full bg-slate-600">
                        <Image
                          priority={true}
                          src={
                            like?.user?.image !== null && like?.user?.image
                              ? like.user.image
                              : "/assets/user.svg"
                          }
                          alt="Profile Photo"
                          width={24}
                          height={24}
                          className="cursor-pointer rounded-full object-contain"
                        />
                      </div>

                      <h4 className="cursor-pointer font-bold text-slate-400">
                        {like.user.name}
                      </h4>
                    </div>

                    <div className="mt-3 h-[0.5px] w-full bg-slate-700" />
                  </Link>
                );
              })
            ) : (
              <h1 className="my-8 text-center text-light-1">
                No likes found..!
              </h1>
            )}
          </ScrollArea>
        </PopoverContent>
      </article>
    </Popover>
  );
};

export default PostCards;
