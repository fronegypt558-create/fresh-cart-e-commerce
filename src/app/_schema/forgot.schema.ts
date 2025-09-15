import * as z from "zod";

export const ForgotSchema = z.object({
  email: z.string().email("Enter a valid email"),
});

export const ResetSchema = z.object({
  email: z.string().email(),
  newPassword: z.string().min(6, "Password must be at least 6 characters"),
});
