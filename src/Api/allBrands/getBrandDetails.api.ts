export default async function getBrandDetails(id: string) {
  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v1/brands/${id}`
  );
  const { data } = await res.json();
  return data;
}
