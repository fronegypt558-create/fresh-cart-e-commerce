import getMyToken from "@/utilities/getMyToken";

export async function updateProductCart(id: string, count: number) {
  const token = await getMyToken();
  if (!token || token.trim() === "") {
    throw new Error("No valid token found. Please login again.");
  }

  const res = await fetch(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
    method: "PUT",
    headers: {
      token: token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ count: count }),
  });

  const data = await res.json();

  if (!res.ok) {
    console.error("Error updating to cart:", data);
    throw new Error(data.message || "Failed to update cart");
  }

  return data;
}
