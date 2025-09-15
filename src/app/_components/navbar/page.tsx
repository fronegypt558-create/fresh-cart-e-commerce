"use client";
import { useShop } from "@/app/_context/ShopContext";
import { Badge } from "@/components/ui/badge";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React, { useState } from "react";

export default function Navbar() {
  const { data: session } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);

  const { cartCount, wishlistCount } = useShop();

  function logOut() {
    signOut({ callbackUrl: "/signin" });
  }

  return (
    <nav className="fixed top-4 right-4 left-4 z-50">
      <div className="basic-container flex items-center justify-between mx-auto py-3 px-4 backdrop-blur-sm rounded-md border-2 border-green-700">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold flex items-center gap-2">
          <i className="fa-solid fa-cart-shopping text-green-700"></i>
          <span>FreshCart</span>
        </Link>

        {/* menu-icon */}
        <button
          type="button"
          className="md:hidden flex cursor-pointer items-center justify-center w-10 h-10 rounded-lg hover:bg-green-50 transition"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          <i className="fa-solid fa-bars text-green-700 text-xl"></i>
        </button>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-8 font-medium items-center p-4">
          <li>
            <Link href="/" className="hover:text-green-700 transition">
              Home
            </Link>
          </li>
          <li>
            <Link href="/products" className="hover:text-green-700 transition">
              Products
            </Link>
          </li>
          <li>
            <Link
              href="/categories"
              className="hover:text-green-700 transition"
            >
              Categories
            </Link>
          </li>
          <li>
            <Link href="/brands" className="hover:text-green-700 transition">
              Brands
            </Link>
          </li>
          <li>
            <Link href="/allorders" className="hover:text-green-700 transition">
              Orders
            </Link>
          </li>
        </ul>

        {/* Auth Desktop */}
        <div className="hidden md:flex gap-3 items-center">
          {session ? (
            <>
              {/* cart */}
              <Link
                href={"/cart"}
                className="relative flex items-center justify-center w-10 h-10 rounded-full bg-green-100 text-green-700 hover:bg-green-200 transition"
              >
                <i className="fa-solid fa-cart-shopping text-lg"></i>
                <Badge
                  className="h-5 min-w-5 text-white rounded-full px-1 font-mono tabular-nums absolute -top-1 -right-1"
                  variant="destructive"
                >
                  {cartCount}
                </Badge>
              </Link>
              {/* Wishlist */}
              <Link
                href={"/wishlist"}
                className="relative flex items-center justify-center w-10 h-10 rounded-full bg-green-100 text-green-700 hover:bg-green-200 transition"
              >
                <i className="fa-solid fa-heart text-lg"></i>
                <Badge
                  className="h-5 min-w-5 text-white rounded-full px-1 font-mono tabular-nums absolute -top-1 -right-1"
                  variant="destructive"
                >
                  {wishlistCount}
                </Badge>
              </Link>
              <button
                onClick={logOut}
                className="flex items-center cursor-pointer justify-center w-10 h-10 rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition"
              >
                <i className="fa-solid fa-right-from-bracket text-lg"></i>
              </button>
            </>
          ) : (
            <>
              <Link
                href="/signin"
                className="py-2 px-4 text-white font-medium bg-green-700 rounded-lg hover:bg-green-800 transition"
              >
                SignIn
              </Link>
              <Link
                href="/signup"
                className="py-2 px-4 text-white font-medium bg-green-700 rounded-lg hover:bg-green-800 transition"
              >
                SignUp
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Mobile Dropdown */}
      <div
        className={`md:hidden p-4 overflow-hidden transition-all duration-300 ease-in-out  ${
          menuOpen ? "max-h-[420px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="flex flex-col font-medium bg-white border border-green-100 rounded-lg shadow-md mt-2 p-4 mx-4 ">
          <Link
            href="/"
            onClick={() => setMenuOpen(false)}
            className="p-2 hover:bg-green-50 rounded-md transition"
          >
            Home
          </Link>
          <Link
            href="/products"
            onClick={() => setMenuOpen(false)}
            className="p-2 hover:bg-green-50 rounded-md transition"
          >
            Products
          </Link>
          <Link
            href="/categories"
            onClick={() => setMenuOpen(false)}
            className="p-2 hover:bg-green-50 rounded-md transition"
          >
            Categories
          </Link>
          <Link
            href="/brands"
            onClick={() => setMenuOpen(false)}
            className="p-2 hover:bg-green-50 rounded-md transition"
          >
            Brands
          </Link>
          <Link
            href="/allorders"
            onClick={() => setMenuOpen(false)}
            className="p-2 hover:bg-green-50 rounded-md transition"
          >
            Orders
          </Link>

          <div className="pt-4 flex flex-col gap-2">
            {session ? (
              <div className="flex flex-col items-center justify-between gap-3">
                <Link
                  href={"/cart"}
                  className="relative w-full flex items-center justify-center h-10 rounded-lg bg-green-100 text-green-700 hover:bg-green-200 transition"
                >
                  <i className="fa-solid fa-cart-shopping text-lg"></i>
                  <Badge
                    className="h-5 min-w-5 text-white rounded-full px-1 font-mono tabular-nums absolute -top-1 -right-1"
                    variant="destructive"
                  >
                    {cartCount}
                  </Badge>
                </Link>
                <Link
                  href={"/wishlist"}
                  className="relative w-full flex items-center justify-center h-10 rounded-lg bg-green-100 text-green-700 hover:bg-green-200 transition"
                >
                  <i className="fa-solid fa-heart text-lg"></i>
                  <Badge
                    className="h-5 min-w-5 text-white rounded-full px-1 font-mono tabular-nums absolute -top-1 -right-1"
                    variant="destructive"
                  >
                    {wishlistCount}
                  </Badge>
                </Link>
                <button
                  onClick={logOut}
                  className="w-full cursor-pointer py-2 px-4 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition"
                >
                  Logout
                </button>
              </div>
            ) : (
              <>
                <Link
                  href="/signin"
                  onClick={() => setMenuOpen(false)}
                  className="w-full py-2 px-4 bg-green-700 text-white rounded-lg hover:bg-green-800 transition"
                >
                  SignIn
                </Link>
                <Link
                  href="/signup"
                  onClick={() => setMenuOpen(false)}
                  className="w-full py-2 px-4 bg-green-700 text-white rounded-lg hover:bg-green-800 transition"
                >
                  SignUp
                </Link>
              </>
            )}
          </div>
        </ul>
      </div>
    </nav>
  );
}
