"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useState } from "react";
import { handleApiError } from "@/utilities/handleApiError";
import { ForgotSchema } from "@/app/_schema/forgot.schema";
import Link from "next/link";

type ForgotValues = z.infer<typeof ForgotSchema>;

export default function ForgotPassword() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const form = useForm<ForgotValues>({
    resolver: zodResolver(ForgotSchema),
    defaultValues: {
      email: "",
    },
  });

  async function handleForgot(values: ForgotValues) {
    try {
      setLoading(true);
      await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
        values
      );
      toast.success("Reset code sent to your email");
      router.push("/verify-code");
    } catch (err) {
      handleApiError(err, "Failed to send reset code");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md backdrop-blur-sm bg-white/50 shadow-lg rounded-2xl p-8">
        <h2 className="text-3xl font-bold text-green-700 text-center mb-6">
          Forgot Password
        </h2>
        <p className="text-center text-gray-600 mb-6 text-sm">
          Enter your email to receive a reset code.
        </p>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleForgot)}
            className="flex flex-col gap-5"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Enter your email"
                      type="email"
                      {...field}
                      className="bg-gray-50 border-gray-300 focus:border-green-600 focus:ring-green-600"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 text-lg font-semibold text-white rounded-lg transition-all duration-300 ${
                loading
                  ? "bg-green-400 cursor-not-allowed"
                  : "bg-green-700 hover:bg-green-800"
              }`}
            >
              {loading ? "Sending..." : "Send Reset Code"}
            </button>
          </form>
        </Form>
        <div className="font-semibold mt-4 text-green-600 text-s hover:underline hover:text-green-800 transition-all duration-300 ">
          <Link href="/signin">back to sign in</Link>
        </div>
      </div>
    </div>
  );
}
