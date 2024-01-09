import { z } from "zod";

import { throwPrismaErrors } from "@/lib/helper";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";

export const postRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  create: protectedProcedure
    .input(z.object({ content: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      console.log("🚀 ~ .mutation ~ ctx:", ctx);
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

  getLatest: protectedProcedure.query(({ ctx }) => {
    return ctx.db.post.findFirst({
      orderBy: { createdAt: "desc" },
      where: { createdBy: { id: ctx.session.user.id } },
    });
  }),

  getAllPosts: protectedProcedure
    .input(z.object({ author: z.boolean() }))
    .query<
      Array<{
        id: number;
        content: string;
        createdAt: Date;
        updatedAt: Date;
        createdById: string;
        createdBy?: {
          id: string;
          name: string | null;
          email: string | null;
          emailVerified: Date | null;
          image: string | null;
        };
      }>
    >(({ ctx, input }) => {
      if (input.author === true) {
        return ctx.db.post.findMany({
          include: {
            createdBy: true,
          },
        });
      } else {
        return ctx.db.post.findMany();
      }
    }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});
