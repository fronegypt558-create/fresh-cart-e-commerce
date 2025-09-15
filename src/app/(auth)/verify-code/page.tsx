"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useState } from "react";
import { handleApiError } from "@/utilities/handleApiError";

type CodeValues = { resetCode: string };

export default function VerifyCode() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const form = useForm<CodeValues>({
    defaultValues: {
      resetCode: "",
    },
  });

  async function handleVerify(values: CodeValues) {
    try {
      setLoading(true);
      await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
        values
      );
      toast.success("Code verified successfully");
      router.push("/reset-password");
    } catch (err) {
      handleApiError(err, "Failed to verify code");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md backdrop-blur-sm bg-white/50 shadow-lg rounded-2xl p-8">
        <h2 className="text-3xl font-bold text-green-700 text-center mb-6">
          Verify Code
        </h2>
        <p className="text-center text-gray-600 mb-6 text-sm">
          Enter the reset code sent to your email.
        </p>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleVerify)}
            className="flex flex-col gap-5"
          >
            <FormField
              control={form.control}
              name="resetCode"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Enter reset code"
                      type="text"
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
              {loading ? "Verifying..." : "Verify Code"}
            </button>
          </form>
        </Form>
      </div>
    </div>
  );
}
