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
import { ResetSchema } from "@/app/_schema/forgot.schema";

type ResetValues = z.infer<typeof ResetSchema>;

export default function ResetPassword() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const form = useForm<ResetValues>({
    resolver: zodResolver(ResetSchema),
    defaultValues: {
      email: "",
      newPassword: "",
    },
  });

  async function handleReset(values: ResetValues) {
    try {
      setLoading(true);
      await axios.put(
        "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
        values
      );
      toast.success("Password reset successfully");
      router.push("/signin");
    } catch (err) {
      handleApiError(err, "Failed to reset password");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md backdrop-blur-sm bg-white/50 shadow-lg rounded-2xl p-8">
        <h2 className="text-3xl font-bold text-green-700 text-center mb-6">
          Reset Password
        </h2>
        <p className="text-center text-gray-600 mb-6 text-sm">
          Enter your email and new password.
        </p>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleReset)}
            className="flex flex-col gap-5"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Your Email"
                      type="email"
                      {...field}
                      className="bg-gray-50 border-gray-300 focus:border-green-600 focus:ring-green-600"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="New Password"
                      type="password"
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
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </form>
        </Form>
      </div>
    </div>
  );
}
