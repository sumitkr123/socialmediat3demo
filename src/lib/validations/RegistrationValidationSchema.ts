import * as z from "zod";
import { mailRegex, nameRegex, passwordRegex } from "../utils";

export const RegistrationValidationSchema = z
  .object({
    name: z
      .string()
      .min(1, "**Name is required.")
      .max(30, "**Name is too long.")
      .regex(nameRegex, "**Please enter a valid name"),
    email: z
      .string()
      .min(1, "**Email is required.")
      .regex(mailRegex, "**Please enter a valid email address"),
    password: z
      .string()
      .min(1, "**Password is required.")
      .regex(passwordRegex, "**Please enter a valid password"),
    confirmPassword: z.string().min(1, "**Password is required."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "**Passwords don't match",
    path: ["confirmPassword"], // path of error
  });
