import getProductDetails from "@/Api/allProducts/getProductDetails.api";
import AddBtnCart from "@/app/_components/buttons/AddBtnCart/page";
import Image from "next/image";
import React from "react";

export default async function ProductDetails({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const data = await getProductDetails(id);

  return (
    <div className="basic-sec">
      <div className="basic-container">
        {/* Product Details */}
        <div className="w-full flex gap-8 p-4 flex-row bg-green-50 border-2 border-green-700 rounded-lg">
          {/* Image */}
          <div className="w-1/3">
            <Image src={data.imageCover} alt="image" className=" rounded-md" />
          </div>
          {/* Content */}
          <div className="w-2/3 grow flex flex-col py-10">
            <div>
              <h2 className="text-3xl text-gray-950 font-semibold mb-4">
                {data.title}
              </h2>
              <p className="text-lg text-gray-600 font-medium">
                {data.description}
              </p>
            </div>
            <div className="mt-auto">
              <h3 className="text-xl mb-3 text-green-700">
                {data.category.name}
              </h3>
              <div className="flex w-full justify-between mt-2">
                <span className="text-lg font-bold">{data.price}EGP</span>
                <div className="flex items-center gap-1">
                  <span className="font-bold">{data.ratingsAverage}</span>
                  <i className="fas fa-star text-yellow-400"></i>
                </div>
              </div>
            </div>
            {/* Add Button */}
            <AddBtnCart id={data._id} />
          </div>
        </div>
      </div>
    </div>
  );
}
