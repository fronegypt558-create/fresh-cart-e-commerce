import * as z from "zod";

export const SignupSchema = z
  .object({
    name: z
      .string()
      .nonempty("The name is requiresd")
      .min(3, "The name is too short")
      .max(10, "The max lenght is 10"),
    email: z.email().nonempty("The email is required"),
    password: z.string().nonempty("The password is required"),
    rePassword: z.string().nonempty("Confirm password is required"),
    phone: z
      .string()
      .nonempty("The phone is required")
      .regex(/^01[0125][0-9]{8}$/),
  })
  .refine((obj) => obj.password == obj.rePassword, {
    path: ["rePassword"],
    error: "the password & rePassword is not matched",
  });
