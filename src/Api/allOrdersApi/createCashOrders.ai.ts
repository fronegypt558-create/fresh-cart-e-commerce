import { PaymentFormValues } from "@/app/_interfaces/paymentForm.interface";
import getMyToken from "@/utilities/getMyToken";

export async function onlinePayment(formValue: PaymentFormValues, id: string) {
  const token = await getMyToken();

  if (!token || token.trim() === "") {
    throw new Error("No valid token found. Please login again.");
  }

  const redirectUrl = process.env.NEXT_PUBLIC_BASE_URL;
  if (!redirectUrl) {
    throw new Error("Missing NEXT_PUBLIC_BASE_URL in environment variables");
  }

  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${id}?url=${redirectUrl}`,
    {
      method: "POST",
      headers: {
        token: token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        shippingAddress: {
          details: formValue.details,
          phone: formValue.phone,
          city: formValue.city,
        },
      }),
    }
  );

  const payload = await res.json();

  if (!res.ok) {
    console.error("Online payment error:", payload);
    throw new Error(payload.message || "Failed to create checkout session");
  }

  return payload;
}
