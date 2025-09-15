import getMyToken from "@/utilities/getMyToken";

export async function removeProductCart(id: string) {
  const token = await getMyToken();

  // check if token is valid
  if (!token || token.trim() === "") {
    throw new Error("No valid token found. Please login again.");
  }

  const res = await fetch(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
    method: "DELETE",
    headers: {
      token: token,
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();

  if (!res.ok) {
    console.error("Error updating to cart:", data);
    throw new Error(data.message || "Failed to remove to cart");
  }

  return data;
}
