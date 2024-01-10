"use client";

import { api } from "@/trpc/client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

type PostCardProps = {
  [key: string]: any;
};

const PostCards = ({
  id,
  currentUserId,
  content,
  author,
  createdAt,
  comments,
  isComment,
  isPostLiked,
}: PostCardProps) => {
  const [postLiked, setPostLiked] = useState(isPostLiked ?? false);

  useEffect(() => {
    setPostLiked(isPostLiked);
  }, [isPostLiked]);

  const addLikeToPost = api.post.addLikeToPost.useMutation({
    onError: ({ message }) => {
      setPostLiked(false);
      toast(message, { position: "top-right", duration: 1500 });
    },
  });

  const removeLikeFromPost = api.post.removeLikeFromPost.useMutation({
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
              className="relative h-11 w-11 overflow-hidden rounded-full bg-slate-500"
            >
              <Image
                priority={true}
                src={
                  newAuthor.image !== null && newAuthor.image
                    ? newAuthor.image
                    : "/assets/user.svg"
                }
                alt="Profile Photo"
                fill
                className="cursor-pointer"
              />
            </Link>

            <div className="thread-card_bar" />
          </div>

          <div className="flex w-full flex-col">
            <Link href={`/profile/${newAuthor.id}`}>
              <h4 className="cursor-pointer font-bold text-slate-400">
                {newAuthor.name}
              </h4>
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
                  onClick={hadleLikeOnThread}
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
                    <div className="absolute ml-[13px] mt-[-4px] flex h-[16px] w-[16px] flex-1 items-center justify-center rounded-full bg-red-600">
                      <span className="text-subtle-medium text-light-1">
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
    </article>
  );
};

export default PostCards;
