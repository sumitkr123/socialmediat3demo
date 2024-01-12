import * as z from "zod";

export const PostValidationSchema = z.object({
  content: z.string().min(1, { message: "**Post is required." }),
});

export const CommentValidationSchema = z.object({
  comment: z
    .string()
    .min(1, { message: "**Comment is required." })
    .min(3, { message: "**Minimum 3 characters." }),
});
