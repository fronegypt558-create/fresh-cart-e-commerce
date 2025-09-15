"use client";

import { getWishlist } from "@/Api/allWishlistApi/getLoggedUserWishlist.api";
import { removeFromWishlist } from "@/Api/allWishlistApi/removeFromWishlist.api";
import { IwhishlistItem } from "@/app/_interfaces/wishlistItem.iterface";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { handleApiError } from "@/utilities/handleApiError";
import { addToCart } from "@/Api/allCatrsApi/addToCart.api";

export default function Wishlist() {
  const [wishlist, setWishlist] = useState<IwhishlistItem[]>([]);
  const [isFetching, setIsFetching] = useState(true);
  const [isLoading, setIsLoading] = useState<string | null>(null);

  async function getWishlistData() {
    setIsFetching(true);
    try {
      const res = await getWishlist();
      setWishlist(res.data);
    } catch (err) {
      handleApiError(err, "Failed to fetch wishlist");
    } finally {
      setIsFetching(false);
    }
  }

  useEffect(() => {
    getWishlistData();
  }, []);

  async function removeItem(id: string) {
    setIsLoading(id);
    const loadingToast = toast.loading("Removing from wishlist...");
    try {
      const res = await removeFromWishlist(id);
      if (res.status === "success") {
        setWishlist((prev) => prev.filter((item) => item._id !== id));
        toast.success("Item removed from wishlist", { id: loadingToast });
      } else {
        toast.error("Failed to remove item", { id: loadingToast });
      }
    } catch (err) {
      handleApiError(err, "Failed to remove item");
    } finally {
      setIsLoading(null);
    }
  }

  async function moveToCart(id: string) {
    setIsLoading(id);
    const loadingToast = toast.loading("Moving item to cart...");
    try {
      const product = wishlist.find((item) => item._id === id);
      if (!product) throw new Error("Product not found");

      await addToCart(id);
      await removeFromWishlist(id);

      setWishlist((prev) => prev.filter((item) => item._id !== id));
      toast.success("Item moved to cart", { id: loadingToast });
    } catch (err) {
      handleApiError(err, "Failed to move item to cart");
    } finally {
      setIsLoading(null);
    }
  }

  return (
    <div className="basic-sec">
      <div className="basic-container">
        <h1 className="text-4xl font-bold mb-6 mx-auto w-fit text-green-700">
          Wishlist
        </h1>

        <div className="w-full gap-8 p-8 backdrop-blur-sm bg-white/30 border-2 border-green-600 rounded-lg">
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg border border-green-200">
            {isFetching ? (
              <div className="p-6 space-y-4 animate-pulse">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="flex items-center gap-4 border-b pb-4 last:border-none"
                  >
                    <div className="w-16 h-16 bg-gray-200 rounded-md"></div>
                    <div className="flex-1 space-y-2">
                      <div className="w-1/2 h-4 bg-gray-200 rounded"></div>
                      <div className="w-1/3 h-4 bg-gray-200 rounded"></div>
                    </div>
                    <div className="w-20 h-6 bg-gray-200 rounded"></div>
                  </div>
                ))}
              </div>
            ) : wishlist.length > 0 ? (
              <div className="divide-y divide-green-100">
                {wishlist.map((item) => (
                  <div
                    key={item?._id}
                    className="flex flex-col relative lg:flex-row items-center lg:items-center gap-6 p-6 bg-green-50 hover:bg-green-100 transition border-b"
                  >
                    {/* Product Image */}
                    <div className="w-3/5 lg:w-24">
                      <Link href={`/products/${item._id}`}>
                        <Image
                          width={400}
                          height={400}
                          src={item?.imageCover}
                          alt={item?.title}
                          className="w-full h-auto lg:w-24 aspect-square object-cover rounded-md border border-green-200"
                        />
                      </Link>
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 text-center lg:text-left">
                      <Link
                        href={`/products/${item._id}`}
                        className="hover:text-green-600 transition"
                      >
                        <h3 className="font-semibold text-gray-900">
                          {item?.title}
                        </h3>
                      </Link>
                      <p className="text-green-700 font-bold">
                        {item?.price} EGP
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col-reverse lg:flex-col items-center gap-3">
                      <button
                        onClick={() => moveToCart(item._id)}
                        disabled={isLoading === item._id}
                        className="px-3 py-2 bg-green-600 text-white rounded-md shadow-sm disabled:cursor-not-allowed cursor-pointer hover:bg-green-700 disabled:opacity-50"
                      >
                        Move to Cart
                      </button>

                      {/* Delete Icon */}
                      <button
                        onClick={() => removeItem(item._id)}
                        disabled={isLoading === item._id}
                        className="text-red-600 absolute cursor-pointer top-2 right-2 hover:text-red-700 disabled:opacity-50"
                        title="Remove item"
                      >
                        <i className="fa-solid fa-xmark"></i>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-12 text-center text-gray-500">
                <div className="flex flex-col items-center gap-3">
                  <i className="fas fa-heart text-4xl text-green-300"></i>
                  <p className="text-lg">Your wishlist is empty</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
