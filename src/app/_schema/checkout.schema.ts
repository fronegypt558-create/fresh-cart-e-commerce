import * as z from "zod";

export const PaymentSchema = z.object({
  details: z.string().nonempty("The details is required"),
  phone: z.string().nonempty("The phoen is required"),
  city: z.string().nonempty("The city is required"),
});
