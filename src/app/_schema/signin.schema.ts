import * as z from "zod";

export const SigninSchema = z.object({
  email: z.email().nonempty("The email is required"),
  password: z.string().nonempty("The password is required"),
});
