export default async function getUserOrders(id: string) {
  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v1/orders/user/${id}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch user orders");
  }

  const orders = await res.json();
  return orders;
}
