import UserOrderTable from "@/app/_components/userOrderTable/page";
import React from "react";

export default function Orders() {
  return (
    <section className="basic-sec py-8">
      <div className="basic-container">
        {/* العنوان */}
        <div className="mb-6 text-center mx-auto">
          <h1 className="text-2xl font-bold text-gray-800">User Orders</h1>
          <p className="text-gray-500 text-sm mt-1">
            Manage and review all orders from your store.
          </p>
        </div>

        <div className="bg-white/45 backdrop-blur-sm shadow-md rounded-xl border-2 border-green-700 p-4">
          <UserOrderTable />
        </div>
      </div>
    </section>
  );
}
