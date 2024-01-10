import { z } from "zod";

import { throwPrismaErrors } from "@/lib/helper";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

export const postRouter = createTRPCRouter({
  create: protectedProcedure
    .input(z.object({ content: z.string() }))
    .mutation(async ({ ctx, input }) => {
      // simulate a slow db call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      try {
        const result = await ctx.db.post.create({
          data: {
            content: input.content,
            createdBy: { connect: { id: ctx.session.user.id } },
          },
        });

        return result;
      } catch (e) {
        throwPrismaErrors(e, input);

        throw e;
      }
    }),

  getAllPosts: protectedProcedure
    .input(
      z.object({
        includeAuthor: z.boolean(),
        includecomments: z.boolean(),
        includeLikes: z.boolean(),
      }),
    )
    .query(({ ctx, input }) => {
      return ctx.db.post.findMany({
        include: {
          createdBy: input.includeAuthor === true,
          comments: input.includecomments === true,
          likes:
            input.includeLikes === true
              ? {
                  select: {
                    userId: true,
                  },
                }
              : false,
        },
      });
    }),

  addLikeToPost: protectedProcedure
    .input(z.object({ postId: z.number(), userId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      // simulate a slow db call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      try {
        const result = await ctx.db.post.update({
          data: {
            likes: {
              upsert: {
                update: {
                  user: { connect: { id: input.userId } },
                },
                create: {
                  user: { connect: { id: input.userId } },
                },
                where: {
                  userId_postId: {
                    postId: input.postId,
                    userId: input.userId,
                  },
                },
              },
            },
          },
          where: {
            id: input.postId,
          },
        });

        return result;
      } catch (e) {
        throwPrismaErrors(e, input);

        throw e;
      }
    }),

  removeLikeFromPost: protectedProcedure
    .input(z.object({ postId: z.number(), userId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      // simulate a slow db call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      try {
        const result = await ctx.db.post.update({
          data: {
            likes: {
              delete: {
                userId_postId: {
                  postId: input.postId,
                  userId: input.userId,
                },
              },
            },
          },
          where: {
            id: input.postId,
          },
        });

        return result;
      } catch (e) {
        throwPrismaErrors(e, input);

        throw e;
      }
    }),
});
