import { IBrand } from "@/app/_interfaces/brands.interface";

export default async function getAllBrands(): Promise<IBrand[]> {
  const res = await fetch("https://ecommerce.routemisr.com/api/v1/brands");
  const { data } = await res.json();
  return data as IBrand[];
}
