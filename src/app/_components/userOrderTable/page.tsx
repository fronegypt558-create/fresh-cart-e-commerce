"use client";

import React, { useEffect, useState } from "react";
import getUserOrders from "@/Api/allOrdersApi/getUserOrders.api";
import { IUserOrder } from "@/app/_interfaces/userOrder.interface";
import getMyToken from "@/utilities/getMyToken";
import getUserIdFromToken from "@/utilities/getUserIdFromToken";

export default function UserOrderTable() {
  const [orders, setOrders] = useState<IUserOrder[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const token = await getMyToken();
        if (!token) {
          console.error("No token found");
          setLoading(false);
          return;
        }

        const id = getUserIdFromToken(token);

        if (id) {
          const res = await getUserOrders(id);
          setOrders(res);
        }
      } catch (error) {
        console.error("Error fetching orders", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center p-20">
        <span className="loader"></span>
      </div>
    );

  return (
    <div className="overflow-x-auto p-4">
      {orders.length === 0 ? (
        <p>No orders found</p>
      ) : (
        <table className="min-w-full border border-green-300 rounded-lg overflow-x-scroll">
          <thead className="bg-green-100">
            <tr>
              <th className="px-4 py-2 border">Order ID</th>
              <th className="px-4 py-2 border">Total Price</th>
              <th className="px-4 py-2 border">Payment</th>
              <th className="px-4 py-2 border">Paid</th>
              <th className="px-4 py-2 border">Delivered</th>
              <th className="px-4 py-2 border">Created At</th>
              <th className="px-4 py-2 border">Products</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id} className="text-center align-top">
                <td className="px-4 py-2 border">{order._id}</td>
                <td className="px-4 py-2 border">
                  {order.totalOrderPrice} EGP
                </td>
                <td className="px-4 py-2 border">{order.paymentMethodType}</td>
                <td className="px-4 py-2 border">
                  {order.isPaid ? "Yes" : "No"}
                </td>
                <td className="px-4 py-2 border">
                  {order.isDelivered ? "Yes" : "No"}
                </td>
                <td className="px-4 py-2 border">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>
                <td className="px-4 py-2 border">
                  <table className="min-w-full border border-green-200">
                    <thead className="bg-green-50">
                      <tr>
                        <th className="px-2 py-1 border">Title</th>
                        <th className="px-2 py-1 border">Category</th>
                        <th className="px-2 py-1 border">Quantity</th>
                        <th className="px-2 py-1 border">Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {order.cartItems.map((item) => (
                        <tr key={item._id} className="text-sm text-center">
                          <td className="px-2 py-1 border">
                            {item.product.title}
                          </td>
                          <td className="px-2 py-1 border">
                            {item.product.category?.name}
                          </td>
                          <td className="px-2 py-1 border">{item.count}</td>
                          <td className="px-2 py-1 border">{item.price} EGP</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
