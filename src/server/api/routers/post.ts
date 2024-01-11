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
    .query(async ({ ctx, input }) => {
      try {
        const result = await ctx.db.post.findMany({
          include: {
            createdBy: input.includeAuthor === true,
            comments: input.includecomments === true,
            likes:
              input.includeLikes === true
                ? {
                    select: {
                      userId: true,
                      user: true,
                    },
                  }
                : false,
          },
        });

        return result;
      } catch (e) {
        throw e;
      }
    }),

  getInfinitePosts: protectedProcedure
    .input(
      z.object({
        includeAuthor: z.boolean(),
        includecomments: z.boolean(),
        includeLikes: z.boolean(),
        limit: z.number().min(1).max(100),
        cursor: z.number().nullish(),
      }),
    )
    .query(async ({ ctx, input }) => {
      try {
        const result = await ctx.db.post.findMany({
          take: input.limit + 1,
          cursor: input.cursor ? { id: input.cursor } : undefined,
          orderBy: {
            id: "asc",
          },
          include: {
            createdBy: input.includeAuthor === true,
            comments: input.includecomments === true,
            likes:
              input.includeLikes === true
                ? {
                    select: {
                      userId: true,
                      user: true,
                    },
                  }
                : false,
          },
        });

        let nextCursor: typeof input.cursor | undefined = undefined;

        if (result.length > input.limit) {
          const nextItem = result.pop();
          nextCursor = nextItem!.id;
        }
        return {
          result,
          nextCursor,
        };
      } catch (e) {
        throw e;
      }
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
