"use client";

import { getLoggedUserCart } from "@/Api/allCatrsApi/getLoggedUserCart.api";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { CartProduct } from "./../../_interfaces/cartProduct.interface";
import { updateProductCart } from "@/Api/allCatrsApi/updateProductCart.api";
import { toast } from "sonner";
import { removeProductCart } from "@/Api/allCatrsApi/removeProductCart.api";
import { handleApiError } from "@/utilities/handleApiError";
import { clearCart } from "@/Api/allCatrsApi/clearCart.api";
import Link from "next/link";

export default function Cart() {
  const [cartId, setCartId] = useState<string>("");
  const [cartList, setCartList] = useState<CartProduct[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);

  async function getCartList() {
    setIsFetching(true);
    try {
      const res = await getLoggedUserCart();
      setCartId(res?.cartId);
      setCartList(res.data.products);
      setTotalPrice(res.data.totalCartPrice);
    } catch (err) {
      handleApiError(err, "Failed to fetch cart data");
    } finally {
      setIsFetching(false);
    }
  }

  useEffect(() => {
    getCartList();
  }, []);

  async function updateCart(id: string, count: number) {
    if (count < 1) return;

    setIsLoading(true);
    const loadingToast = toast.loading("Updating cart...");
    try {
      const res = await updateProductCart(id, count);
      if (res.status === "success") {
        setCartList(res.data.products);
        setTotalPrice(res.data.totalCartPrice);
        toast.success("Cart updated successfully", { id: loadingToast });
      } else {
        toast.error("Failed to update cart", { id: loadingToast });
      }
    } catch (err) {
      handleApiError(err, "Failed to update cart");
    } finally {
      setIsLoading(false);
    }
  }

  async function removeItem(id: string) {
    setIsLoading(true);
    const loadingToast = toast.loading("Removing item...");
    try {
      const res = await removeProductCart(id);
      if (res.status === "success") {
        setCartList(res.data.products);
        setTotalPrice(res.data.totalCartPrice);
        toast.success("Item removed from cart", { id: loadingToast });
      } else {
        toast.error("Failed to remove item", { id: loadingToast });
      }
    } catch (err) {
      handleApiError(err, "Failed to remove item");
    } finally {
      setIsLoading(false);
    }
  }

  async function clearAllProduct() {
    if (cartList.length === 0) return;
    setIsLoading(true);
    const loadingToast = toast.loading("Clearing your cart...");
    await clearCart();
    await getCartList();
    setIsLoading(false);
    toast.success("Cart cleared successfully!", { id: loadingToast });
  }

  return (
    <div className="basic-sec">
      <div className="basic-container">
        <h1 className="text-4xl font-bold mb-6 mx-auto w-fit text-green-700">
          Cart
        </h1>

        <div className="w-full flex flex-col lg:flex-row gap-8 p-8 backdrop-blur-sm bg-white/30 border-2 border-green-600 rounded-lg">
          {/* Cart List */}
          <div className="w-full lg:w-3/4">
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
              ) : cartList.length > 0 ? (
                <div className="divide-y divide-green-100">
                  {cartList.map((item) => (
                    <div
                      key={item?.product?.id}
                      className="flex flex-col relative lg:flex-row items-center lg:items-center gap-6 p-6 bg-green-50 hover:bg-green-100 transition border-b"
                    >
                      {/* Product Image */}
                      <div className="w-3/5 lg:w-24">
                        <Image
                          width={400}
                          height={400}
                          src={item?.product?.imageCover}
                          alt={item?.product?.title}
                          className="w-full h-auto lg:w-24 aspect-square  object-cover rounded-md border border-green-200"
                        />
                      </div>

                      {/* Product Info */}
                      <div className="flex-1 text-center lg:text-left">
                        <h3 className="font-semibold text-gray-900">
                          {item?.product?.title}
                        </h3>
                        <p className="text-green-700 font-bold">
                          {item?.price} EGP
                        </p>
                      </div>

                      {/* Actions (Delete + Qty) */}
                      <div className="flex flex-col-reverse lg:flex-col items-center gap-3">
                        {/* Qty Controls */}
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() =>
                              updateCart(item?.product?.id, item?.count - 1)
                            }
                            disabled={item.count <= 1 || isLoading}
                            className="px-2 py-1 bg-green-100 border cursor-pointer border-green-300 text-green-700 rounded-full hover:bg-green-200 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            -
                          </button>
                          <span className="font-semibold text-green-800">
                            {item?.count}
                          </span>
                          <button
                            onClick={() =>
                              updateCart(item?.product?.id, item?.count + 1)
                            }
                            disabled={isLoading}
                            className="px-2 py-1 bg-green-100 border border-green-300 text-green-700 rounded-full hover:bg-green-200 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
                          >
                            +
                          </button>
                        </div>

                        {/* Delete Icon */}
                        <button
                          onClick={() => removeItem(item?.product?.id)}
                          disabled={isLoading}
                          className="text-red-600 absolute cursor-pointer top-2 right-2 hover:text-red-700 disabled:opacity-50"
                          title="Remove item"
                        >
                          <i className="fa-solid fa-close"></i>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center py-6 text-gray-500">
                  Your cart is empty
                </p>
              )}
            </div>
          </div>

          {/* Cart Summary */}
          <div className="w-full lg:w-1/4 h-fit sticky top-24 bg-white border border-green-200 rounded-lg shadow-md p-5 flex flex-col justify-between items-start gap-3">
            <h2 className="text-lg font-bold text-green-800 border-b border-green-100 w-full pb-2">
              Order Summary
            </h2>

            {isFetching ? (
              <div className="w-full space-y-2 animate-pulse">
                <div className="w-1/2 h-4 bg-gray-200 rounded"></div>
                <div className="w-1/3 h-6 bg-gray-200 rounded"></div>
                <div className="w-full h-10 bg-gray-200 rounded"></div>
              </div>
            ) : (
              <>
                <div className="flex justify-between items-center w-full">
                  <span className="text-gray-700 font-medium">Total:</span>
                  <span className="text-green-700 font-bold text-lg">
                    {totalPrice} EGP
                  </span>
                </div>

                <Link href={`/checkout/${cartId}`} className="w-full">
                  <button
                    disabled={isLoading || cartList.length === 0 ? true : false}
                    className="w-full mt-2 bg-green-700 text-white py-2 rounded-md hover:bg-green-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? "Processing..." : "Pay Now"}
                  </button>
                </Link>
                <button
                  disabled={isLoading || cartList.length === 0}
                  onClick={() => clearAllProduct()}
                  className="w-full mt-2 bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Clear All
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
