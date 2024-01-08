import { z } from "zod";

import { hash } from "bcryptjs";

import {
  mailRegex,
  nameRegex,
  passwordRegex,
  userNameRegex,
} from "@/lib/utils";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const userRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        name: z
          .string()
          .min(1, "**Name is required.")
          .max(30, "**Name is too long.")
          .regex(nameRegex, "**Please enter a valid name"),
        username: z
          .string()
          .min(1, "**Username is required.")
          .max(30, "**Username is too long.")
          .regex(userNameRegex, "**Please enter a valid username"),
        email: z
          .string()
          .min(1, "**Email is required.")
          .regex(mailRegex, "**Please enter a valid email address"),
        password: z
          .string()
          .min(1, "**Password is required.")
          .regex(passwordRegex, "**Please enter a valid password"),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // simulate a slow db call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const hashedPassword = await hash(input.password, 10);

      return ctx.db.user.create({
        data: {
          name: input.name,
          username: input.username,
          email: input.email,
          password: hashedPassword,
        },
      });
    }),
});
