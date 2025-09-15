"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { getWishlist } from "@/Api/allWishlistApi/getLoggedUserWishlist.api";
import { addToWishlist } from "@/Api/allWishlistApi/addToWishlist.api";
import { removeFromWishlist } from "@/Api/allWishlistApi/removeFromWishlist.api";
import { getLoggedUserCart } from "@/Api/allCatrsApi/getLoggedUserCart.api";
import { addToCart } from "@/Api/allCatrsApi/addToCart.api";
import { removeProductCart } from "@/Api/allCatrsApi/removeProductCart.api";
import { updateProductCart } from "@/Api/allCatrsApi/updateProductCart.api";
import { CartProduct } from "@/app/_interfaces/cartProduct.interface";
import { IwhishlistItem } from "@/app/_interfaces/wishlistItem.iterface";
import { ShopContextType } from "../_interfaces/shopContext.interface";

const ShopContext = createContext<ShopContextType | null>(null);

export function ShopProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartProduct[]>([]);
  const [wishlist, setWishlist] = useState<IwhishlistItem[]>([]);

  // ✅ Cart count & Wishlist count
  const cartCount = cart.reduce((total, item) => total + (item.count || 0), 0);
  const wishlistCount = wishlist.length;

  // ----------- Cart Functions -----------
  async function refreshCart() {
    try {
      const res = await getLoggedUserCart();
      setCart(res?.data?.products || []);
    } catch (err) {
      console.error("Failed to fetch cart:", err);
    }
  }

  async function addCartItem(id: string) {
    await addToCart(id);
    await refreshCart();
  }

  async function removeCartItem(id: string) {
    await removeProductCart(id);
    await refreshCart();
  }

  async function updateCartItem(id: string, count: number) {
    await updateProductCart(id, count);
    await refreshCart();
  }

  // ----------- Wishlist Functions -----------
  async function refreshWishlist() {
    try {
      const res = await getWishlist();
      setWishlist(res?.data || []);
    } catch (err) {
      console.error("Failed to fetch wishlist:", err);
    }
  }

  async function addWishlistItem(id: string) {
    await addToWishlist(id);
    await refreshWishlist();
  }

  async function removeWishlistItem(id: string) {
    await removeFromWishlist(id);
    await refreshWishlist();
  }

  // ----------- Load on Mount -----------
  useEffect(() => {
    refreshCart();
    refreshWishlist();
  }, []);

  return (
    <ShopContext.Provider
      value={{
        cart,
        wishlist,
        cartCount,
        wishlistCount,
        refreshCart,
        refreshWishlist,
        addCartItem,
        removeCartItem,
        updateCartItem,
        addWishlistItem,
        removeWishlistItem,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
}

export function useShop() {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error("useShop must be used within a ShopProvider");
  }
  return context;
}
