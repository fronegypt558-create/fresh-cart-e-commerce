import getAllProducts from "@/Api/allProducts/gettAllProducts.api";
import React from "react";
import { ProductType } from "./../../_interfaces/product.interface";
import ProductItem from "./../../_components/product-Item/page";

export default async function Products() {
  const datalist = await getAllProducts();

  return (
    <div className="basic-sec">
      <div className="basic-container">
        <h1 className="text-4xl font-bold mb-6 mx-auto w-fit">Products</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {datalist.map((product: ProductType) => (
            <ProductItem data={product} key={product._id} />
          ))}
        </div>
      </div>
    </div>
  );
}
