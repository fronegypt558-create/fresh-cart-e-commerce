export default async function getAllOrders() {
  const res = await fetch("https://ecommerce.routemisr.com/api/v1/orders/");
  const { data } = await res.json();
  return data;
}
