"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CommentValidationSchema } from "@/lib/validations/PostValidationSchema";
import { api } from "@/trpc/client";
import { CommentProps } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { getQueryKey } from "@trpc/react-query";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

const Comment = ({ postId, currentUserImg, currentUserId }: CommentProps) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof CommentValidationSchema>>({
    resolver: zodResolver(CommentValidationSchema),
    defaultValues: {
      comment: "",
    },
  });

  const postByIdQueryKey = useMemo(() => {
    return getQueryKey(api.post.getPostById);
  }, [getQueryKey]);

  const queryClient = useQueryClient();

  const addCommentToPost = api.post.addCommentToPost.useMutation({
    onSuccess: (data, variables, context) => {
      if (data) {
        form.reset();
        router.refresh();
        queryClient.invalidateQueries({
          queryKey: postByIdQueryKey,
        });
      }
    },
  });

  const onSubmit = async (values: z.infer<typeof CommentValidationSchema>) => {
    // Do something with the form values.
    addCommentToPost.mutate({
      commentText: values.comment,
      postId: postId,
      userId: currentUserId,
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="comment-form">
        <FormField
          control={form.control}
          name="comment"
          render={({ field }) => (
            <>
              <FormItem className="flex w-full items-center gap-3 border-y border-y-dark-4 py-5">
                <FormLabel className="relative overflow-hidden rounded-full bg-slate-500">
                  <Image
                    priority={true}
                    src={
                      currentUserImg !== null
                        ? currentUserImg
                        : "/assets/user.svg"
                    }
                    alt="Profile Image"
                    width={48}
                    height={48}
                    className="rounded-full object-cover"
                  />
                </FormLabel>
                <FormControl className="border-none bg-transparent">
                  <Input
                    type="text"
                    placeholder="Comment..."
                    className="no-focus text-light-1 outline-none"
                    {...field}
                  />
                </FormControl>

                <Button
                  disabled={addCommentToPost.isLoading}
                  type="submit"
                  className="comment-form_btn bg-primary-500 hover:scale-110"
                >
                  Reply
                </Button>
              </FormItem>
              <FormMessage />
            </>
          )}
        />
      </form>
    </Form>
  );
};

export default Comment;
