"use client";

import getAllOrders from "@/Api/allOrdersApi/getAllOrders.api";
import { Iorders, ICartItem } from "@/app/_interfaces/orders.interface";
import React, { useEffect, useState } from "react";

export default function OrdersTable() {
  const [orders, setOrders] = useState<Iorders[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const res = await getAllOrders();
        setOrders(res);
      } catch (error) {
        console.error("Error fetching orders", error);
      } finally {
        setLoading(false);
      }
    }
    fetchOrders();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center p-20">
        <span className="loader"></span>
      </div>
    );

  return (
    <div className="overflow-x-auto p-4">
      <table className="min-w-full border border-green-300 rounded-lg overflow-x-scroll">
        <thead className="bg-green-100">
          <tr>
            <th className="px-4 py-2 border">Order ID</th>
            <th className="px-4 py-2 border">User</th>
            <th className="px-4 py-2 border">Email</th>
            <th className="px-4 py-2 border">Phone</th>
            <th className="px-4 py-2 border">Total Price</th>
            <th className="px-4 py-2 border">Payment</th>
            <th className="px-4 py-2 border">Paid</th>
            <th className="px-4 py-2 border">Delivered</th>
            <th className="px-4 py-2 border">Created At</th>
            <th className="px-4 py-2 border">Products</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order: Iorders) => (
            <tr key={order._id} className="text-center align-top">
              <td className="px-4 py-2 border">{order._id}</td>
              <td className="px-4 py-2 border">{order.user?.name}</td>
              <td className="px-4 py-2 border">{order.user?.email}</td>
              <td className="px-4 py-2 border">{order.user?.phone}</td>
              <td className="px-4 py-2 border">{order.totalOrderPrice}</td>
              <td className="px-4 py-2 border">{order.paymentMethodType}</td>
              <td className="px-4 py-2 border">
                {order.isPaid ? "Yes" : "No"}
              </td>
              <td className="px-4 py-2 border">
                {order.isDelivered ? "Yes" : "No"}
              </td>
              <td className="px-4 py-2 border">
                {new Date(order.createdAt).toLocaleString()}
              </td>
              <td className="px-4 py-2 border">
                <div className="max-h-40 overflow-y-auto">
                  <table className="min-w-full border border-green-200 text-sm">
                    <thead className="bg-green-50 sticky top-0">
                      <tr>
                        <th className="px-2 py-1 border">Title</th>
                        <th className="px-2 py-1 border">Category</th>
                        <th className="px-2 py-1 border">Quantity</th>
                        <th className="px-2 py-1 border">Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {order.cartItems?.map((item: ICartItem) => (
                        <tr key={item._id} className="text-center">
                          <td className="px-2 py-1 border">
                            {item.product?.title}
                          </td>
                          <td className="px-2 py-1 border">
                            {item.product?.category?.name}
                          </td>
                          <td className="px-2 py-1 border">{item.count}</td>
                          <td className="px-2 py-1 border">{item.price}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
