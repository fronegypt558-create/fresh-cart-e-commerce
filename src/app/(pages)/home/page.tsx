import React from "react";
import getAllProducts from "../../../Api/allProducts/gettAllProducts.api";
import AllCategories from "../../_components/allCategory/page";
import MainSLider from "../../_components/main-slider/page";
import ProductItem from "../../_components/product-Item/page";
import { ProductType } from "../../_interfaces/product.interface";

export default async function Home() {
  const data = await getAllProducts();

  return (
    <div className="basic-sec">
      <div className="basic-container">
        <MainSLider />
        <AllCategories />
        <div className="w-full p-4 mt-5 border-2 overflow-hidden border-green-700 rounded-lg backdrop-blur-sm bg-white/30">
          <h2 className="text-2xl font-extralight mb-5">
            Show Popular Products ...
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {data.map((product: ProductType) => (
              <ProductItem data={product} key={product._id} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
