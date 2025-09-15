import React from "react";
import getBrandDetails from "@/Api/allBrands/getBrandDetails.api";
import { Brand, ProductType } from "@/app/_interfaces/product.interface";
import Image from "next/image";
import ProductItem from "@/app/_components/product-Item/page";
import getBrandProducts from "@/Api/allBrands/getBrandProduct.api";

export default async function BrandDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const brand: Brand = await getBrandDetails(params.id);
  const products: ProductType[] = await getBrandProducts(params.id);

  return (
    <div className="basic-sec">
      <div className="basic-container">
        <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center border border-green-100">
          <div className="w-40 h-40 relative mb-6">
            <Image
              src={brand.image}
              alt={brand.name}
              fill
              className="object-contain rounded-xl"
            />
          </div>
          <h1 className="text-3xl font-bold text-green-700 mb-3">
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

        <div className="w-full p-4 mt-5 border-2 overflow-hidden border-green-700 rounded-lg backdrop-blur-sm bg-white/30">
          <h2 className="text-2xl font-semibold mt-3 mb-6 text-gray-700">
            Products from {brand.name}
          </h2>

          {products.length === 0 ? (
            <p className="text-gray-500">No products found for this brand.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductItem key={product._id} data={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
