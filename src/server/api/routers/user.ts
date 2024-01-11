import { z } from "zod";

import { hash } from "bcryptjs";

import { throwPrismaErrors } from "@/lib/helper";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";

export const userRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        name: z.string(),
        email: z.string(),
        password: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // simulate a slow db call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      try {
        const hashedPassword = await hash(input.password, 10);

        const result = await ctx.db.user.create({
          data: {
            name: input.name,
            email: input.email,
            ...(hashedPassword !== null && hashedPassword
              ? {
                  password: hashedPassword,
                }
              : {}),
          },
        });

        return result;
      } catch (e) {
        throwPrismaErrors(e, input);

        throw e;
      }
    }),

  getUserById: protectedProcedure
    .input(
      z.object({
        userId: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      try {
        const result = await ctx.db.user.findFirst({
          where: {
            id: input.userId,
          },
        });

        return result;
      } catch (e) {
        throw e;
      }
    }),
});
