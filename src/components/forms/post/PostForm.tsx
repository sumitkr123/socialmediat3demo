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
import { Textarea } from "@/components/ui/textarea";
import { PostValidationSchema } from "@/lib/validations/PostValidationSchema";
import { api } from "@/trpc/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const PostForm = () => {
  const router = useRouter();

  const form = useForm<z.infer<typeof PostValidationSchema>>({
    resolver: zodResolver(PostValidationSchema),
    defaultValues: {
      content: "",
    },
  });

  const postForm = api.post.create.useMutation({
    onSuccess: (data) => {
      if (data) {
        router.push("/");
      }
    },
    onError: (error) => {
      toast(error.message, { position: "top-right", duration: 1500 });
    },
  });

  const onSubmit = async (values: z.infer<typeof PostValidationSchema>) => {
    // Do something with the form values.

    postForm.mutate({
      ...values,
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mt-10  flex flex-col justify-start gap-10"
      >
        <FormField
          required
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col gap-3">
              <FormLabel className="text-base-semibold text-light-2">
                Content
              </FormLabel>
              <FormControl className="no-focus border border-dark-4 bg-dark-3 text-light-1">
                <Textarea
                  rows={15}
                  className="account-form_input no-focus"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          disabled={postForm.isLoading}
          type="submit"
          className="bg-primary text-light-1 hover:bg-primary-500"
        >
          Post
        </Button>
      </form>
    </Form>
  );
};

export default PostForm;
