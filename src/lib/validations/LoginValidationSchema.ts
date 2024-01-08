import * as z from "zod";
import { passwordRegex } from "../utils";

export const LoginValidationSchema = z.object({
  email: z.string().min(1, "**Email is required."),
  password: z
    .string()
    .min(1, "**Password is required.")
    .regex(passwordRegex, "**Please enter a valid password"),
});
