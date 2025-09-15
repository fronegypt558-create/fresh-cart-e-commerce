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
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { SigninSchema } from "@/app/_schema/signin.schema";
import { SigninFormValues } from "@/app/_interfaces/formSignIn.interface";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { handleApiError } from "@/utilities/handleApiError";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const form = useForm<SigninFormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(SigninSchema),
  });

  async function handleSignin(value: SigninFormValues) {
    let toastId: string | number | undefined;

    // Clear previous manual errors
    form.clearErrors();

    try {
      setLoading(true);
      toastId = toast.loading("Signing in...");

      // Use redirect: false so we can inspect response and show toasts/errors
      const res = await signIn("credentials", {
        email: value?.email,
        password: value?.password,
        redirect: false,
        callbackUrl: "/",
      });

      // If credentials provider returns an error
      if (res?.error) {
        const errorMessage =
          "Invalid email or password. Please update your email or password.";
        form.setError("email", { type: "manual", message: errorMessage });
        form.setError("password", { type: "manual", message: errorMessage });

        toast.error(errorMessage, {
          id: toastId,
          position: "top-center",
          duration: 4000,
        });
        setLoading(false);
        return;
      }

      // If signIn reports ok (success)
      if (res?.ok) {
        toast.success("Signed in successfully", {
          id: toastId,
          position: "top-center",
          duration: 2000,
        });
        router.push("/");
        return;
      }

      // Fallback (unexpected)
      toast.error("Unexpected error. Please try again.", {
        id: toastId,
        position: "top-center",
        duration: 3000,
      });
    } catch (err) {
      toast.error("Something went wrong while signing in", {
        id: toastId,
        position: "top-center",
        duration: 3000,
      });
      handleApiError(err, "Failed to sign in");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md backdrop-blur-sm bg-white/50 shadow-lg rounded-2xl p-8">
        <h2 className="text-3xl font-bold text-green-700 text-center mb-6">
          Welcome Back
        </h2>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSignin)}
            className="flex flex-col gap-5"
          >
            {/* Email Field */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={loading || form.formState.isSubmitting}
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

            {/* Password Field */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={loading || form.formState.isSubmitting}
                      placeholder="Enter your password"
                      type="password"
                      {...field}
                      className="bg-gray-50 border-gray-300 focus:border-green-600 focus:ring-green-600"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Forgot Password */}
            <div className="flex justify-end">
              <Link
                href="/forgot-password"
                className="text-sm text-green-700 hover:underline"
              >
                Forgot Password?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full cursor-pointer py-3 text-lg font-semibold text-white rounded-lg transition-all duration-300 ${
                loading
                  ? "bg-green-400 disabled:cursor-not-allowed"
                  : "bg-green-700 hover:bg-green-800"
              }`}
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>
        </Form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-1 h-px bg-gray-300" />
          <span className="px-3 text-gray-500 text-sm">OR</span>
          <div className="flex-1 h-px bg-gray-300" />
        </div>

        {/* Create Account */}
        <p className="text-center text-gray-700 text-sm">
          Don’t have an account?{" "}
          <Link
            href="/signup"
            className="text-green-700 font-semibold hover:underline"
          >
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}
