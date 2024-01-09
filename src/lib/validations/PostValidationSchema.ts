import * as z from "zod";

export const PostValidationSchema = z.object({
  content: z.string().min(1, { message: "**Post is required." }),
});

export const CommentValidationSchema = z.object({
  thread: z
    .string()
    .min(1, { message: "**Thread name is required." })
    .min(3, { message: "**Minimum 3 characters." }),
});
