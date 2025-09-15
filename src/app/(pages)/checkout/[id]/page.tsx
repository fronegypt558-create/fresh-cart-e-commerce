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
import { PaymentFormValues } from "@/app/_interfaces/paymentForm.interface";
import { PaymentSchema } from "@/app/_schema/checkout.schema";
import { handleApiError } from "@/utilities/handleApiError";
import { toast } from "sonner";
import { onlinePayment } from "@/Api/allOrdersApi/createCashOrders.ai";
import { useParams } from "next/navigation";

export default function CheckOut() {
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const form = useForm<PaymentFormValues>({
    defaultValues: {
      details: "",
      phone: "",
      city: "",
    },
    resolver: zodResolver(PaymentSchema),
  });

  async function handlePAyment(value: PaymentFormValues) {
    let toastId: string | number | undefined;

    try {
      setLoading(true);
      toastId = toast.loading("Payment...");

      const res = await onlinePayment(value, id as string);

      if (res.status === "success" && res.session?.url) {
        toast.success("Redirecting to checkout...", {
          id: toastId,
          position: "top-center",
          duration: 2000,
        });
        window.location.href = res.session.url;
        return;
      }

      if (res?.error) {
        toast.error(res.error || "Failed to process payment", {
          id: toastId,
          position: "top-center",
          duration: 3000,
        });
        return;
      }

      toast.error("Unexpected payment response", {
        id: toastId,
        position: "top-center",
        duration: 3000,
      });
    } catch (err) {
      toast.error("Something went wrong", {
        id: toastId,
        position: "top-center",
        duration: 3000,
      });
      handleApiError(err, "Failed to Payment");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md backdrop-blur-sm bg-white/50 shadow-lg rounded-2xl p-8">
        <h2 className="text-3xl font-bold text-green-700 text-center mb-6">
          Pay Now
        </h2>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handlePAyment)}
            className="flex flex-col gap-5"
          >
            {/* Email Field */}
            <FormField
              control={form.control}
              name="details"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={loading || form.formState.isSubmitting}
                      placeholder="Enter your details"
                      type="text"
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
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={loading || form.formState.isSubmitting}
                      placeholder="Enter your phone"
                      type="tel"
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
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={loading || form.formState.isSubmitting}
                      placeholder="Enter your city"
                      type="text"
                      {...field}
                      className="bg-gray-50 border-gray-300 focus:border-green-600 focus:ring-green-600"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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
              {loading ? "Sending ..." : "Send"}
            </button>
          </form>
        </Form>
      </div>
    </div>
  );
}
