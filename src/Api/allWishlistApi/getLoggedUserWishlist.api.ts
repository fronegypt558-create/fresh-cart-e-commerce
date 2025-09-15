import getMyToken from "@/utilities/getMyToken";

export async function getWishlist() {
  const token = await getMyToken();

  // check if token is valid
  if (!token || token.trim() === "") {
    return null;
  }

  const res = await fetch("https://ecommerce.routemisr.com/api/v1/wishlist", {
    method: "GET",
    headers: {
      token: token,
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();

  if (!res.ok) {
    console.error("Error:", data);
    throw new Error(data.message || "Failed to get wishlist list");
  }

  return data;
}
