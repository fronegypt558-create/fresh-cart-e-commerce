import { ProductType } from "@/app/_interfaces/product.interface";

export default async function getBrandProducts(
  brandId: string
): Promise<ProductType[]> {
  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v1/products?brand=${brandId}`
  );
  const { data } = await res.json();
  return data as ProductType[];
}
