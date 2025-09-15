export default async function getCategoryProducts(id: string) {
  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v1/products?category=${id}`
  );

  if (!res.ok) throw new Error("Failed to fetch products by category");

  const { data } = await res.json();
  return data;
}
