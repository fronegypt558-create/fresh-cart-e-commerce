import React from "react";
import Image from "next/image";
import { Brand } from "@/app/_interfaces/product.interface";

export default function BrandCard({ brand }: { brand: Brand }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center border border-green-100 transition hover:shadow-xl hover:scale-[1.02] duration-300">
      <div className="w-40 h-40 relative mb-6">
        <Image
          src={brand.image}
          alt={brand.name}
          fill
          className="object-contain rounded-xl"
        />
      </div>

      <h1 className="text-3xl font-bold text-green-700 mb-3 text-center">
        {brand.name}
      </h1>

      <p className="text-gray-500 text-lg mb-2">Slug: {brand.slug}</p>

      {brand.createdAt && (
        <p className="text-sm text-gray-400">
          Created At: {new Date(brand.createdAt).toLocaleDateString()}
        </p>
      )}

      {brand.updatedAt && (
        <p className="text-sm text-gray-400">
          Updated At: {new Date(brand.updatedAt).toLocaleDateString()}
        </p>
      )}
    </div>
  );
}
