"use client";

import { addToCart } from "@/Api/allCatrsApi/addToCart.api";
import { useShop } from "@/app/_context/ShopContext";
import { handleApiError } from "@/utilities/handleApiError";
import React from "react";
import { toast } from "sonner";

export default function AddBtnCart({ id }: { id: string }) {
  const { refreshCart } = useShop();

  async function handleAddToCart() {
    const loadingToast = toast.loading("Adding product to cart...");

    try {
      await addToCart(id);
      refreshCart();
      toast.success("Product added to cart", { id: loadingToast });
    } catch (err) {
      handleApiError(err, "Failed to add product to cart");
      toast.dismiss(loadingToast);
    }
  }

  return (
    <button
      onClick={handleAddToCart}
      className="w-[40px] h-[40px] group-hover:opacity-100 duration-500 
        opacity-0 absolute top-4 right-4 
        bg-green-600 text-white rounded-lg transition-all 
        flex items-center justify-center cursor-pointer hover:bg-green-700"
    >
      <i className="fas fa-plus"></i>
    </button>
  );
}
