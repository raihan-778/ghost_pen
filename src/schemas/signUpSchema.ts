import { z } from "zod";

export const userNameValidation = z
  .string()
  .min(2, { message: "Username must be at least 2 characters long" })
  .max(20, { message: "Username must be not more then 20 characters" })
  .regex(/^[a-zA-Z0-9_]+$/, {
    message: "Username can only contain letters, numbers, and underscores",
  });

export const signUpSchema = z.object({
  username: userNameValidation,
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});
