"use client";

import { useShop } from "@/app/_context/ShopContext";
import { handleApiError } from "@/utilities/handleApiError";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

export default function AddBtnWishlist({ id }: { id: string }) {
  const { wishlist, refreshWishlist, addWishlistItem, removeWishlistItem } =
    useShop();
  const [inWishlist, setInWishlist] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const exists = wishlist?.some((item) => item._id === id);
    setInWishlist(!!exists);
  }, [wishlist, id]);

  async function toggleWishlist() {
    if (loading) return;

    setLoading(true);
    const loadingToast = toast.loading(
      inWishlist ? "Removing from wishlist..." : "Adding to wishlist..."
    );

    try {
      if (inWishlist) {
        await removeWishlistItem(id);
        refreshWishlist();
        toast.success("Product removed from wishlist", { id: loadingToast });
      } else {
        await addWishlistItem(id);
        refreshWishlist();
        toast.success("Product added to wishlist", { id: loadingToast });
      }
    } catch (err) {
      handleApiError(err, "Wishlist action failed");
      toast.dismiss(loadingToast);
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={toggleWishlist}
      disabled={loading}
      className="w-[40px] h-[40px] group-hover:opacity-100 duration-500 
        opacity-0 absolute top-4 right-16 disabled:cursor-not-allowed
        bg-green-600 text-white rounded-lg transition-all 
        flex items-center justify-center cursor-pointer hover:bg-green-700 disabled:opacity-50"
    >
      <i
        className={`fas fa-heart text-lg transition ${
          inWishlist ? "text-red-500" : "text-white"
        }`}
      ></i>
    </button>
  );
}
