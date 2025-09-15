import getCategoryDetails from "@/Api/allCategories/getCategoryDetails.api";
import Image from "next/image";
import React from "react";
import { ProductType } from "@/app/_interfaces/product.interface";
import getCategoryProducts from "@/Api/allCategories/getCategoryProduct.api";
import ProductItem from "@/app/_components/product-Item/page";

export default async function CategoyDetails({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  // get category details
  const data = await getCategoryDetails(id);

  // get products for this category
  const products: ProductType[] = await getCategoryProducts(id);

  return (
    <div className="basic-sec">
      <div className="basic-container">
        {/* Category Details */}
        <div className="w-full flex gap-8 p-4 flex-row backdrop-blur-sm bg-white/45 border-2 border-green-700 rounded-lg mb-10">
          {/* Image */}
          <div className="w-1/3">
            {data?.image ? (
              <Image
                src={data.image}
                alt={data?.name || "Category image"}
                width={400}
                height={400}
                className="rounded-md object-cover"
              />
            ) : (
              <div className="w-full h-64 bg-gray-200 rounded-md flex items-center justify-center">
                No Image
              </div>
            )}
          </div>

          {/* Content */}
          <div className="w-2/3 grow flex flex-col py-10">
            <div>
              <h2 className="text-3xl text-gray-950 font-semibold mb-4">
                {data?.name}
              </h2>
              <p className="text-lg text-gray-600 font-medium">{data?.slug}</p>
            </div>

            <div className="mt-auto">
              <h3 className="text-xl mb-3 text-green-700">
                {data?.name || "No category name"}
              </h3>
              <div className="flex w-full justify-between mt-2">
                <span className="text-lg font-bold">
                  Created: {data?.createdAt?.slice(0, 10) || "N/A"}
                </span>
                <span className="text-lg font-bold">
                  Updated: {data?.updatedAt?.slice(0, 10) || "N/A"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="w-full p-4 mt-5 border-2 overflow-hidden border-green-700 rounded-lg backdrop-blur-sm bg-white/30">
          <h2 className="text-2xl font-bold text-gray-700 mt-3 mb-6">
            Products in {data?.name}
          </h2>
          {products.length === 0 ? (
            <p className="text-gray-500">No products found in this category.</p>
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
