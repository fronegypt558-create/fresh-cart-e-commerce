import getMyToken from "@/utilities/getMyToken";

export async function addToWishlist(id: string) {
  const token = await getMyToken();
  // check if token is valid
  if (!token || token.trim() === "") {
    throw new Error("No valid token found. Please login again.");
  }

  const res = await fetch("https://ecommerce.routemisr.com/api/v1/wishlist", {
    method: "POST",
    headers: {
      token: token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ productId: id }),
  });

  const data = await res.json();

  if (!res.ok) {
    console.error("Error adding to wishlist:", data);
    throw new Error(data.message || "Failed to add to wishlist");
  }

  return data;
}
